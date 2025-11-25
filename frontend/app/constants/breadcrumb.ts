export const breadcrumbConfigs = {
	home: [{ label: "Home" }],
	dashboard: [{ label: "Home", href: "/" }, { label: "Dashboard" }],
	fields: [
		{ label: "Home", href: "/" },
		{ label: "Dashboard", href: "/dashboard" },
		{ label: "My Fields" },
	],
	fieldDetail: (fieldName: string) => [
		{ label: "Home", href: "/" },
		{ label: "Dashboard", href: "/dashboard" },
		{ label: "My Fields", href: "/dashboard" },
		{ label: fieldName },
	],
	analytics: [
		{ label: "Home", href: "/" },
		{ label: "Dashboard", href: "/dashboard" },
		{ label: "Analytics" },
	],
	logs: [
		{ label: "Home", href: "/" },
		{ label: "Dashboard", href: "/dashboard" },
		{ label: "Logs" },
	],
	pollinate: [
		{ label: "Home", href: "/" },
		{ label: "Dashboard", href: "/dashboard" },
		{ label: "Pollinate" },
	],
};
