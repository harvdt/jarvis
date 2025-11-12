import {
	type RouteConfig,
	index,
	layout,
	route,
} from "@react-router/dev/routes";

export default [
	index("routes/home.tsx"),
	route("login", "routes/login/index.tsx"),
	route("dashboard", "routes/dashboard/index.tsx", [
		index("routes/dashboard/fields/index.tsx"),
		route("fields/:fieldId", "routes/dashboard/fields/field.tsx"),
		route("analytics", "routes/dashboard/analytic/index.tsx"),
		route("logs", "routes/dashboard/log/index.tsx"),
		route("pollinate", "routes/dashboard/pollinate/index.tsx"),
	]),
] satisfies RouteConfig;
