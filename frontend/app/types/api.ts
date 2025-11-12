export interface ApiResponse<T> {
	success: true;
	message: string;
	data: T;
}

export interface Log {
	id: string;
	message: string;
	timestamp: string;
	plantation_id: string;
}
