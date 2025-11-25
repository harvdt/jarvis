import { ChartColumnDecreasing, FileClock, MapIcon, Plane } from "lucide-react";

export const sidebarOptions = [
	{
		title: "My Field",
		href: "/dashboard/",
		icon: MapIcon,
	},
	{
		title: "Analytics",
		href: "/dashboard/analytics",
		icon: ChartColumnDecreasing,
	},
	{
		title: "Logs",
		href: "/dashboard/logs",
		icon: FileClock,
	},
	{
		title: "Start Pollinating",
		href: "/dashboard/pollinate",
		icon: Plane,
	},
];
