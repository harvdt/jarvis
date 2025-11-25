export const dummyPlantation = [
	{
		id: "1",
		name: "Hackaton 2025",
		location: "PIDI 4.0",
	},
	{
		id: "2",
		name: "North Field",
		location: "Sumatra Region A",
	},
	{
		id: "3",
		name: "South Valley",
		location: "Sumatra Region B",
	},
];

export const dummyTrees = [
	{
		id: "1",
		plantation_id: "1",
		name: "Palm Tree #1",
		flower_status: true,
		pollination_status: true,
		latitude: 3.5952,
		longitude: 98.6722,
	},
	{
		id: "2",
		plantation_id: "1",
		name: "Palm Tree #2",
		flower_status: false,
		pollination_status: null,
		latitude: 3.5955,
		longitude: 98.6725,
	},
	{
		id: "3",
		plantation_id: "1",
		name: "Palm Tree #3",
		flower_status: null,
		pollination_status: false,
		latitude: 3.5958,
		longitude: 98.6728,
	},
	{
		id: "4",
		plantation_id: "1",
		name: "Palm Tree #4",
		flower_status: true,
		pollination_status: false,
		latitude: 3.595,
		longitude: 98.673,
	},
	{
		id: "5",
		plantation_id: "1",
		name: "Palm Tree #5",
		flower_status: false,
		pollination_status: true,
		latitude: 3.5953,
		longitude: 98.672,
	},
	{
		id: "6",
		plantation_id: "2",
		name: "Palm Tree #6",
		flower_status: true,
		pollination_status: null,
		latitude: 3.5956,
		longitude: 98.6718,
	},
	{
		id: "7",
		plantation_id: "2",
		name: "Palm Tree #7",
		flower_status: null,
		pollination_status: true,
		latitude: 3.5949,
		longitude: 98.6724,
	},
	{
		id: "8",
		plantation_id: "2",
		name: "Palm Tree #8",
		flower_status: true,
		pollination_status: true,
		latitude: 3.5954,
		longitude: 98.6727,
	},
	{
		id: "9",
		plantation_id: "3",
		name: "Palm Tree #9",
		flower_status: false,
		pollination_status: false,
		latitude: 3.5957,
		longitude: 98.6721,
	},
	{
		id: "10",
		plantation_id: "3",
		name: "Palm Tree #10",
		flower_status: null,
		pollination_status: null,
		latitude: 3.5951,
		longitude: 98.6726,
	},
];

export const appTitle = "RAPID Dashboard";

export const dummyUser = {
	id: "u1",
	name: "admin",
	email: "admin@admin.com",
	plantation_id: "1",
};

export const dummyLogs = [
	{
		id: "log1",
		message: "Tree #1 pollination completed successfully",
		timestamp: "2025-11-12T10:30:00Z",
		plantation_id: "1",
	},
	{
		id: "log2",
		message: "Flower detected on Tree #2",
		timestamp: "2025-11-12T09:15:00Z",
		plantation_id: "1",
	},
	{
		id: "log3",
		message: "Tree #3 pollination initiated",
		timestamp: "2025-11-12T08:45:00Z",
		plantation_id: "1",
	},
	{
		id: "log4",
		message: "Tree #4 flower status updated",
		timestamp: "2025-11-12T07:20:00Z",
		plantation_id: "1",
	},
	{
		id: "log5",
		message: "Tree #5 pollination completed",
		timestamp: "2025-11-12T06:10:00Z",
		plantation_id: "1",
	},
	{
		id: "log6",
		message: "Tree #6 flower detected",
		timestamp: "2025-11-12T11:00:00Z",
		plantation_id: "2",
	},
	{
		id: "log7",
		message: "Tree #7 pollination successful",
		timestamp: "2025-11-12T10:45:00Z",
		plantation_id: "2",
	},
	{
		id: "log8",
		message: "Tree #8 status updated",
		timestamp: "2025-11-12T09:30:00Z",
		plantation_id: "2",
	},
];
