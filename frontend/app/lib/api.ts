import axios from "axios";
import type { AxiosInstance, AxiosResponse } from "axios";

const getApiUrl = (): string => {
	const apiUrl = import.meta.env.VITE_API_URL;

	if (!apiUrl) {
		throw new Error("Server URL not found");
	}

	return apiUrl + "/api";
};

export const apiClient: AxiosInstance = axios.create({
	baseURL: getApiUrl(),
	timeout: 10000,
	headers: {
		"Content-Type": "application/json",
	},
});

export const api = {
	get: <T = unknown>(url: string): Promise<AxiosResponse<T>> =>
		apiClient.get(url),

	post: <T = unknown>(url: string, data?: unknown): Promise<AxiosResponse<T>> =>
		apiClient.post(url, data),

	put: <T = unknown>(url: string, data?: unknown): Promise<AxiosResponse<T>> =>
		apiClient.put(url, data),

	delete: <T = unknown>(url: string): Promise<AxiosResponse<T>> =>
		apiClient.delete(url),
};

export default api;
