import api from "~/lib/api";

export interface ChatMessage {
	role: "user" | "assistant";
	content: string;
}

export interface JarvisChatRequest {
	message: string;
	chat_history?: ChatMessage[];
	username?: string;
	user_id?: string;
}

export interface JarvisChatResponse {
	response: string;
}

export const jarvisApi = {
	async chat(request: JarvisChatRequest): Promise<JarvisChatResponse> {
		const response = await api.post<JarvisChatResponse>(
			"/jarvis/chat",
			request
		);
		return response.data;
	},
};
