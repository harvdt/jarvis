import React from "react";
import { dummyTrees } from "~/constants/dummy";
import ProgressCard from "./components/progress-card";
import type { Tree } from "~/types/tree";

export default function Progress({ data }: { data: Tree[] }) {
	const safeData = data || [];

	const chunkSize = 3;
	const routes = [];
	for (let i = 0; i < safeData.length; i += chunkSize) {
		routes.push(safeData.slice(i, i + chunkSize));
	}

	return (
		<section>
			<p className="text-emerald-600 text-3xl font-semibold mb-4">
				Pollination Progress
			</p>

			<div className={`grid grid-cols-${routes.length} gap-4`}>
				{routes.map((routeData, index) => (
					<ProgressCard key={index} data={routeData} iteration={index + 1} />
				))}
			</div>
		</section>
	);
}
