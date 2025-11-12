import api from "~/lib/api";

interface Plantation {
	id: string;
	name: string;
	location: string;
	user_id: string;
}

// Plantation API functions
const plantationApi = {
	getAll: () => api.get<Plantation[]>("/plantations"),
	getById: (id: string) => api.get<Plantation>(`/plantations/${id}`),
	create: (plantation: Omit<Plantation, "id">) =>
		api.post<Plantation>("/plantations", plantation),
	update: (id: string, plantation: Omit<Plantation, "id">) =>
		api.put<Plantation>(`/plantations/${id}`, plantation),
	delete: (id: string) => api.delete<{ message: string }>(`/plantations/${id}`),
};

export async function getAllPlantations(): Promise<Plantation[]> {
	try {
		const response = await plantationApi.getAll();
		return response.data;
	} catch (error: unknown) {
		if (error && typeof error === "object" && "response" in error) {
			const axiosError = error as {
				response: { data?: { message?: string }; status?: number };
			};
			throw new Error(
				axiosError.response?.data?.message || "Failed to fetch plantations"
			);
		}
		throw new Error("Network error. Please try again.");
	}
}

export async function getPlantationById(id: string): Promise<Plantation> {
	try {
		const response = await plantationApi.getById(id);
		return response.data;
	} catch (error: unknown) {
		if (error && typeof error === "object" && "response" in error) {
			const axiosError = error as {
				response: { data?: { message?: string }; status?: number };
			};
			throw new Error(
				axiosError.response?.data?.message || "Failed to fetch plantation"
			);
		}
		throw new Error("Network error. Please try again.");
	}
}

export async function createPlantation(
	plantation: Omit<Plantation, "id">
): Promise<Plantation> {
	try {
		const response = await plantationApi.create(plantation);
		return response.data;
	} catch (error: unknown) {
		if (error && typeof error === "object" && "response" in error) {
			const axiosError = error as {
				response: { data?: { message?: string }; status?: number };
			};
			throw new Error(
				axiosError.response?.data?.message || "Failed to create plantation"
			);
		}
		throw new Error("Network error. Please try again.");
	}
}

export async function updatePlantation(
	id: string,
	plantation: Omit<Plantation, "id">
): Promise<Plantation> {
	try {
		const response = await plantationApi.update(id, plantation);
		return response.data;
	} catch (error: unknown) {
		if (error && typeof error === "object" && "response" in error) {
			const axiosError = error as {
				response: { data?: { message?: string }; status?: number };
			};
			throw new Error(
				axiosError.response?.data?.message || "Failed to update plantation"
			);
		}
		throw new Error("Network error. Please try again.");
	}
}

export async function deletePlantation(
	id: string
): Promise<{ message: string }> {
	try {
		const response = await plantationApi.delete(id);
		return response.data;
	} catch (error: unknown) {
		if (error && typeof error === "object" && "response" in error) {
			const axiosError = error as {
				response: { data?: { message?: string }; status?: number };
			};
			throw new Error(
				axiosError.response?.data?.message || "Failed to delete plantation"
			);
		}
		throw new Error("Network error. Please try again.");
	}
}
