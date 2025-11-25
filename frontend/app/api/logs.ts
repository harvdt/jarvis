import api from "~/lib/api";
import type { Log } from "~/types/api";

export async function getAllLogs(): Promise<Log[]> {
	try {
		const response = await api.get<Log[]>("/logs");
		return response.data;
	} catch (error: unknown) {
		if (error && typeof error === "object" && "response" in error) {
			const axiosError = error as {
				response: { data?: { message?: string }; status?: number };
			};
			throw new Error(
				axiosError.response?.data?.message || "Failed to fetch logs"
			);
		}
		throw new Error("Network error. Please try again.");
	}
}

export async function getLogsByPlantation(
	plantationId: string
): Promise<Log[]> {
	try {
		const response = await api.get<Log[]>(`/logs/plantation/${plantationId}`);
		return response.data;
	} catch (error: unknown) {
		if (error && typeof error === "object" && "response" in error) {
			const axiosError = error as {
				response: { data?: { message?: string }; status?: number };
			};
			throw new Error(
				axiosError.response?.data?.message || "Failed to fetch logs"
			);
		}
		throw new Error("Network error. Please try again.");
	}
}
