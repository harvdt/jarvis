import api from "~/lib/api";

interface AnalyticsData {
	tree_count: number;
	pollination_rate: string;
	active_drones: number;
	pie_chart: Array<{
		pollination_status: string;
		value: number;
	}>;
	area_chart: Array<{
		month: string;
		pollinated: number;
		not_pollinated: number;
	}>;
}

interface AnalyticsSummary {
	tree_count: number;
	pollination_rate: string;
	active_drones: number;
}

const analyticsApi = {
	getAll: () => api.get<AnalyticsData>("/analytics"),
	getSummary: () => api.get<AnalyticsSummary>("/analytics/summary"),
};

export async function getAnalytics(): Promise<AnalyticsData> {
	try {
		const response = await analyticsApi.getAll();
		return response.data;
	} catch (error: unknown) {
		if (error && typeof error === "object" && "response" in error) {
			const axiosError = error as {
				response: { data?: { message?: string }; status?: number };
			};
			throw new Error(
				axiosError.response?.data?.message || "Failed to fetch analytics"
			);
		}
		throw new Error("Network error. Please try again.");
	}
}

export async function getAnalyticsSummary(): Promise<AnalyticsSummary> {
	try {
		const response = await analyticsApi.getSummary();
		return response.data;
	} catch (error: unknown) {
		if (error && typeof error === "object" && "response" in error) {
			const axiosError = error as {
				response: { data?: { message?: string }; status?: number };
			};
			throw new Error(
				axiosError.response?.data?.message ||
					"Failed to fetch analytics summary"
			);
		}
		throw new Error("Network error. Please try again.");
	}
}
