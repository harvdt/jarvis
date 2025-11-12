import type { Route } from "./+types/home";
import { Welcome } from "./welcome/welcome";
import getHealth from "~/api/health";

export function meta({}: Route.MetaArgs) {
	return [{ title: "RAPID" }, { name: "description", content: "RAPID" }];
}

export async function loader() {
	return getHealth();
}

export default function Home() {
	return <Welcome />;
}
