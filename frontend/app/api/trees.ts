import api from "~/lib/api";
import type { Tree } from "~/types/tree";

// Tree API functions
const treeApi = {
	getAll: () => api.get<Tree[]>("/trees"),
	getById: (id: string) => api.get<Tree>(`/trees/${id}`),
	getByPlantation: (plantationId: string) =>
		api.get<Tree[]>(`/trees/plantation/${plantationId}`),
	create: (tree: Omit<Tree, "id">) => api.post<Tree>("/trees", tree),
	update: (id: string, tree: Omit<Tree, "id">) =>
		api.put<Tree>(`/trees/${id}`, tree),
	delete: (id: string) => api.delete<{ message: string }>(`/trees/${id}`),
};

export async function getAllTrees(): Promise<Tree[]> {
	try {
		const response = await treeApi.getAll();
		return response.data;
	} catch (error: unknown) {
		if (error && typeof error === "object" && "response" in error) {
			const axiosError = error as {
				response: { data?: { message?: string }; status?: number };
			};
			throw new Error(
				axiosError.response?.data?.message || "Failed to fetch trees"
			);
		}
		throw new Error("Network error. Please try again.");
	}
}

export async function getTreeById(id: string): Promise<Tree> {
	try {
		const response = await treeApi.getById(id);
		return response.data;
	} catch (error: unknown) {
		if (error && typeof error === "object" && "response" in error) {
			const axiosError = error as {
				response: { data?: { message?: string }; status?: number };
			};
			throw new Error(
				axiosError.response?.data?.message || "Failed to fetch tree"
			);
		}
		throw new Error("Network error. Please try again.");
	}
}

export async function getTreesByPlantation(
	plantationId: string
): Promise<Tree[]> {
	try {
		const response = await treeApi.getByPlantation(plantationId);
		return response.data;
	} catch (error: unknown) {
		if (error && typeof error === "object" && "response" in error) {
			const axiosError = error as {
				response: { data?: { message?: string }; status?: number };
			};
			throw new Error(
				axiosError.response?.data?.message || "Failed to fetch trees"
			);
		}
		throw new Error("Network error. Please try again.");
	}
}

export async function createTree(tree: Omit<Tree, "id">): Promise<Tree> {
	try {
		const response = await treeApi.create(tree);
		return response.data;
	} catch (error: unknown) {
		if (error && typeof error === "object" && "response" in error) {
			const axiosError = error as {
				response: { data?: { message?: string }; status?: number };
			};
			throw new Error(
				axiosError.response?.data?.message || "Failed to create tree"
			);
		}
		throw new Error("Network error. Please try again.");
	}
}

export async function updateTree(
	id: string,
	tree: Omit<Tree, "id">
): Promise<Tree> {
	try {
		const response = await treeApi.update(id, tree);
		return response.data;
	} catch (error: unknown) {
		if (error && typeof error === "object" && "response" in error) {
			const axiosError = error as {
				response: { data?: { message?: string }; status?: number };
			};
			throw new Error(
				axiosError.response?.data?.message || "Failed to update tree"
			);
		}
		throw new Error("Network error. Please try again.");
	}
}

export async function deleteTree(id: string): Promise<{ message: string }> {
	try {
		const response = await treeApi.delete(id);
		return response.data;
	} catch (error: unknown) {
		if (error && typeof error === "object" && "response" in error) {
			const axiosError = error as {
				response: { data?: { message?: string }; status?: number };
			};
			throw new Error(
				axiosError.response?.data?.message || "Failed to delete tree"
			);
		}
		throw new Error("Network error. Please try again.");
	}
}
