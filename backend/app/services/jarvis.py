import os
from typing import List, Dict, Any, Optional
from sqlalchemy.orm import Session
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.agents import create_tool_calling_agent, AgentExecutor
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.tools import tool
from langchain_core.messages import HumanMessage, AIMessage

from app.utils.database import SessionLocal
from app.models.user import User
from app.models.plantation import Plantation
from app.models.tree import Tree
from app.models.log import Log

from dotenv import load_dotenv

load_dotenv()

# Define tools as standalone functions
@tool
def get_users_tool() -> List[Dict[str, Any]]:
    """Get all users from the database."""
    with SessionLocal() as session:
        users = session.query(User).all()
        return [
            {
                "id": str(user.id),
                "username": user.username,
            }
            for user in users
        ]

@tool
def get_plantations_tool(user_id: str = None, username: str = None, plantation_name: str = None) -> List[Dict[str, Any]]:
    """Get plantations from the database. Can filter by user_id, username, or plantation name."""
    with SessionLocal() as session:
        query = session.query(Plantation)

        if user_id:
            query = query.filter(Plantation.user_id == user_id)
        elif username:
            # Find user by username and get their plantations
            user = session.query(User).filter(User.username == username).first()
            if user:
                query = query.filter(Plantation.user_id == user.id)
            else:
                return []  # No user found with that username
        elif plantation_name:
            query = query.filter(Plantation.name.ilike(f"%{plantation_name}%"))

        plantations = query.all()
        return [
            {
                "id": str(plantation.id),
                "name": plantation.name,
                "location": plantation.location,
                "user_id": str(plantation.user_id),
            }
            for plantation in plantations
        ]

@tool
def get_trees_tool(plantation_id: str = None, plantation_name: str = None, username: str = None) -> List[Dict[str, Any]]:
    """Get trees from the database. Can filter by plantation_id, plantation name, or username."""
    with SessionLocal() as session:
        query = session.query(Tree)

        if plantation_id:
            query = query.filter(Tree.plantation_id == plantation_id)
        elif plantation_name:
            # Find plantation by name and get its trees
            plantation = session.query(Plantation).filter(Plantation.name.ilike(f"%{plantation_name}%")).first()
            if plantation:
                query = query.filter(Tree.plantation_id == plantation.id)
            else:
                return []  # No plantation found with that name
        elif username:
            # Find user by username, then find their plantations, then get trees
            user = session.query(User).filter(User.username == username).first()
            if user:
                plantation_ids = [p.id for p in session.query(Plantation).filter(Plantation.user_id == user.id).all()]
                if plantation_ids:
                    query = query.filter(Tree.plantation_id.in_(plantation_ids))
                else:
                    return []  # User has no plantations
            else:
                return []  # No user found with that username

        trees = query.all()
        return [
            {
                "id": str(tree.id),
                "name": tree.name,
                "flower_status": tree.flower_status,
                "pollination_status": tree.pollination_status,
                "latitude": tree.latitude,
                "longitude": tree.longitude,
                "plantation_id": str(tree.plantation_id),
            }
            for tree in trees
        ]

@tool
def get_logs_tool(plantation_id: str = None, plantation_name: str = None, username: str = None, limit: int = 50) -> List[Dict[str, Any]]:
    """Get logs from the database. Can filter by plantation_id, plantation name, or username."""
    with SessionLocal() as session:
        query = session.query(Log).order_by(Log.timestamp.desc())

        if plantation_id:
            query = query.filter(Log.plantation_id == plantation_id)
        elif plantation_name:
            # Find plantation by name and get its logs
            plantation = session.query(Plantation).filter(Plantation.name.ilike(f"%{plantation_name}%")).first()
            if plantation:
                query = query.filter(Log.plantation_id == plantation.id)
            else:
                return []  # No plantation found with that name
        elif username:
            # Find user by username, then find their plantations, then get logs
            user = session.query(User).filter(User.username == username).first()
            if user:
                plantation_ids = [p.id for p in session.query(Plantation).filter(Plantation.user_id == user.id).all()]
                if plantation_ids:
                    query = query.filter(Log.plantation_id.in_(plantation_ids))
                else:
                    return []  # User has no plantations
            else:
                return []  # No user found with that username

        logs = query.limit(limit).all()
        return [
            {
                "id": str(log.id),
                "message": log.message,
                "timestamp": log.timestamp.isoformat(),
                "plantation_id": str(log.plantation_id),
            }
            for log in logs
        ]

@tool
def get_analytics_tool(plantation_name: str = None, username: str = None) -> Dict[str, Any]:
    """Get analytics data. Can filter by plantation name or username, or get global analytics."""
    with SessionLocal() as session:
        base_tree_query = session.query(Tree)
        base_plantation_query = session.query(Plantation)

        # Filter by plantation name or username if provided
        if plantation_name:
            plantation = session.query(Plantation).filter(Plantation.name.ilike(f"%{plantation_name}%")).first()
            if plantation:
                base_tree_query = base_tree_query.filter(Tree.plantation_id == plantation.id)
                base_plantation_query = base_plantation_query.filter(Plantation.id == plantation.id)
            else:
                return {"error": f"No plantation found with name containing '{plantation_name}'"}
        elif username:
            user = session.query(User).filter(User.username == username).first()
            if user:
                plantations = session.query(Plantation).filter(Plantation.user_id == user.id).all()
                if plantations:
                    plantation_ids = [p.id for p in plantations]
                    base_tree_query = base_tree_query.filter(Tree.plantation_id.in_(plantation_ids))
                    base_plantation_query = base_plantation_query.filter(Plantation.id.in_(plantation_ids))
                else:
                    return {"error": f"User '{username}' has no plantations"}
            else:
                return {"error": f"No user found with username '{username}'"}

        # Get total tree count
        total_trees = base_tree_query.count()

        # Get pollination statistics
        pollinated_trees = base_tree_query.filter(Tree.pollination_status == True).count()
        pollination_rate = (pollinated_trees / total_trees * 100) if total_trees > 0 else 0

        # Get plantation count
        total_plantations = base_plantation_query.count()

        # Get trees by plantation
        if plantation_name or username:
            # For filtered results, just return the stats
            return {
                "total_trees": total_trees,
                "pollinated_trees": pollinated_trees,
                "pollination_rate": f"{pollination_rate:.1f}%",
                "total_plantations": total_plantations,
            }
        else:
            # For global analytics, include plantation breakdown
            plantations_data = session.query(
                Plantation.name,
                Plantation.id,
                Tree.id.label('tree_id')
            ).join(Tree).all()

            plantation_stats = {}
            for name, plantation_id, tree_id in plantations_data:
                if name not in plantation_stats:
                    plantation_stats[name] = 0
                plantation_stats[name] += 1

            # Get user count
            total_users = session.query(User).count()

            return {
                "total_trees": total_trees,
                "pollinated_trees": pollinated_trees,
                "pollination_rate": f"{pollination_rate:.1f}%",
                "total_plantations": total_plantations,
                "total_users": total_users,
                "trees_per_plantation": plantation_stats,
            }


class JarvisService:
    def __init__(self):
        self.llm: Optional[ChatGoogleGenerativeAI] = None
        self.agent_executor: Optional[AgentExecutor] = None
        self._initialized = False

    def _ensure_initialized(self):
        """Lazy initialization of the LLM and agent."""
        if self._initialized:
            return

        google_api_key = os.getenv("GOOGLE_API_KEY")
        if not google_api_key:
            raise ValueError("GOOGLE_API_KEY environment variable is not set")

        # Initialize Gemini model
        self.llm = ChatGoogleGenerativeAI(
            model="gemini-2.0-flash",
            google_api_key=google_api_key,
            temperature=0.1,
        )

        # Create tools for database operations
        self.tools = [
            get_users_tool,
            get_plantations_tool,
            get_trees_tool,
            get_logs_tool,
            get_analytics_tool,
        ]

        # Create the agent
        self.agent_executor = self._create_agent()
        self._initialized = True

    def _create_agent(self):
        """Create the LangChain agent with tool calling capabilities."""
        prompt = ChatPromptTemplate.from_messages([
            ("system", """You are Jarvis, an intelligent assistant for a palm tree and palm plantation management system. You can give general information about palm trees and their care.

You have access to the following database tables:
- Users: Contains user information (id, username, password)
- Plantations: Contains plantation information (id, name, location, user_id)
- Trees: Contains tree information (id, name, flower_status, pollination_status, latitude, longitude, plantation_id)
- Logs: Contains activity logs (id, message, timestamp, plantation_id)

You can help users with:
- Viewing user information
- Managing plantations - users can search by plantation name or their username
- Monitoring trees and their pollination status - can filter by plantation name or username
- Reviewing activity logs - can filter by plantation name or username
- Getting analytics and insights - can get global stats or filter by plantation name/username

Users can query using natural language like:
- "Show me my plantations" (will use their username if provided)
- "What trees are in the North Field plantation?"
- "Give me analytics for the South Grove"
- "Show recent logs for John"
- "How many trees does Mary have?"

IMPORTANT: When a user says "my" or "me", use the username provided in the context (it will be prefixed like "User 'admin' says: ..."). Do not ask for user ID or username if it's already provided in the context.

Always be helpful, informative, and provide clear explanations. Use the available tools to gather information before responding."""),
            ("placeholder", "{chat_history}"),
            ("human", "{input}"),
            ("placeholder", "{agent_scratchpad}"),
        ])

        agent = create_tool_calling_agent(self.llm, self.tools, prompt)
        return AgentExecutor(
            agent=agent,
            tools=self.tools,
            verbose=True,
            handle_parsing_errors=True,
        )

    async def chat(self, message: str, chat_history: List[Dict[str, str]] = None, username: str = None, user_id: str = None) -> str:
        """Process a chat message and return the AI response."""
        try:
            # Ensure the service is initialized
            self._ensure_initialized()

            # Convert chat history to LangChain format
            formatted_history = []
            if chat_history:
                for msg in chat_history[-10:]:  # Keep last 10 messages for context
                    if msg["role"] == "user":
                        formatted_history.append(HumanMessage(content=msg["content"]))
                    elif msg["role"] == "assistant":
                        formatted_history.append(AIMessage(content=msg["content"]))

            # Add user context to the message if available
            enhanced_message = message
            if username:
                enhanced_message = f"User '{username}' says: {message}"
            elif user_id:
                enhanced_message = f"User ID '{user_id}' says: {message}"

            # Execute the agent
            result = await self.agent_executor.ainvoke({
                "input": enhanced_message,
                "chat_history": formatted_history,
            })

            return result["output"]

        except Exception as e:
            return f"I apologize, but I encountered an error while processing your request: {str(e)}. Please try again or rephrase your question."


# Global instance - initialized lazily
jarvis_service = JarvisService()
