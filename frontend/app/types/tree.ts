export interface Tree {
	id: string;
	plantation_id: string;
	name: string;
	latitude: number;
	longitude: number;
	flower_status: boolean | null;
	pollination_status: boolean | null;
}
