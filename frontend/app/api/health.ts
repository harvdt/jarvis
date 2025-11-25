import api from "~/lib/api";
import type { ApiResponse } from "~/types/api";
import type { HealthStatus } from "~/types/health";

export default async function getHealth() {
	try {
		const response = await api.get<ApiResponse<HealthStatus>>(`/health`);

		return response.data;
	} catch (error: unknown) {
		if (error && typeof error === "object" && "response" in error) {
			const axiosError = error as {
				response: { data?: { message?: string }; status?: number };
			};

			throw new Error(axiosError.response?.data?.message);
		}

		throw new Error("Network error. Please try again.");
	}
}
