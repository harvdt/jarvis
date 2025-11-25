import { Palmtree } from "lucide-react";
import React from "react";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import type { Tree } from "~/types/tree";

export default function ProgressCard({
	data,
	iteration,
}: {
	data: Tree[];
	iteration: number;
}) {
	return (
		<Card>
			<CardHeader>
				<p className="font-semibold text-2xl">Route {iteration}</p>
			</CardHeader>
			<CardContent>
				{data.map((tree) => (
					<div key={tree.id} className="flex items-center gap-x-3 mb-3">
						<Palmtree />

						<div>
							<p className="font-semibold">{tree.name}</p>
							<p
								className={
									tree.pollination_status
										? "text-emerald-600"
										: "text-yellow-500"
								}
							>
								Status:{" "}
								{tree.pollination_status ? "Pollinated" : "Not Pollinated"}
							</p>
						</div>
					</div>
				))}
			</CardContent>
		</Card>
	);
}
