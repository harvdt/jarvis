import { useState } from "react";
import { Button } from "./ui/button";
import { jarvisApi, type ChatMessage } from "~/api/jarvis";

interface Message {
	id: number;
	text: string;
	sender: "user" | "bot";
}

interface ChatbotProps {
	onClose: () => void;
	username?: string;
}

export function Chatbot({ onClose, username }: ChatbotProps) {
	const [messages, setMessages] = useState<Message[]>([
		{
			id: 1,
			text: "Hello! I'm Jarvis, your palm plantation assistant. How can I help you today?",
			sender: "bot",
		},
	]);
	const [input, setInput] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const sendMessage = async () => {
		if (input.trim() && !isLoading) {
			const userMessage: Message = {
				id: messages.length + 1,
				text: input,
				sender: "user",
			};

			setMessages((prev) => [...prev, userMessage]);
			setInput("");
			setIsLoading(true);

			try {
				// Convert messages to ChatMessage format for API
				const chatHistory: ChatMessage[] = messages
					.filter((msg) => msg.id !== 1) // Exclude the initial greeting
					.map((msg) => ({
						role: msg.sender === "user" ? "user" : "assistant",
						content: msg.text,
					}));

				// Add the current user message to history
				chatHistory.push({
					role: "user",
					content: userMessage.text,
				});

				const response = await jarvisApi.chat({
					message: userMessage.text,
					chat_history: chatHistory.slice(-10), // Keep last 10 messages
					username: username,
				});

				const botResponse: Message = {
					id: messages.length + 2,
					text: response.response,
					sender: "bot",
				};

				setMessages((prev) => [...prev, botResponse]);
			} catch (error) {
				console.error("Error sending message to Jarvis:", error);
				const errorResponse: Message = {
					id: messages.length + 2,
					text: "Sorry, I'm having trouble connecting right now. Please try again later.",
					sender: "bot",
				};
				setMessages((prev) => [...prev, errorResponse]);
			} finally {
				setIsLoading(false);
			}
		}
	};

	return (
		<div className="fixed bottom-20 right-4 w-96 h-96 bg-background border rounded-lg shadow-lg flex flex-col z-50">
			<div className="flex items-center justify-between p-4 border-b">
				<p className="font-semibold">Jarvis Assistant</p>
				<Button variant="ghost" size="sm" onClick={onClose}>
					×
				</Button>
			</div>
			<div className="flex-1 p-4 overflow-auto">
				<div className="space-y-2">
					{messages.map((message) => (
						<div
							key={message.id}
							className={`p-2 rounded-lg max-w-[80%] ${
								message.sender === "user"
									? "ml-auto bg-primary text-primary-foreground"
									: "bg-muted"
							}`}
						>
							{message.text}
						</div>
					))}
					{isLoading && (
						<div className="bg-muted p-2 rounded-lg max-w-[80%]">
							<div className="flex items-center space-x-2">
								<div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
								<span className="text-sm text-muted-foreground">
									Jarvis is thinking...
								</span>
							</div>
						</div>
					)}
				</div>
			</div>
			<div className="p-4 border-t flex gap-2">
				<input
					type="text"
					value={input}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						setInput(e.target.value)
					}
					placeholder="Ask Jarvis about your plantations..."
					onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) =>
						e.key === "Enter" && !isLoading && sendMessage()
					}
					disabled={isLoading}
					className="flex-1 px-3 py-2 border rounded-md disabled:opacity-50"
				/>
				<Button onClick={sendMessage} disabled={isLoading || !input.trim()}>
					{isLoading ? "..." : "Send"}
				</Button>
			</div>
		</div>
	);
}
