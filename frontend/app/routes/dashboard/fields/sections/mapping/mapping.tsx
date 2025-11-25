import React, { forwardRef } from "react";
import Map from "./components/map";
import type { MapRef } from "./components/map";
import type { Tree } from "~/types/tree";
import { Card } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";

const Mapping = forwardRef<MapRef, { data: Tree[] }>(({ data }, ref) => {
	return (
		<section id="tree-map">
			<Card className="p-4">
				<div className="space-y-1">
					<p className="text-3xl font-bold">Tree Mapping</p>
					<p className="font-medium text-muted-foreground">
						See where the trees in your fields are
					</p>
				</div>

				<Map data={data} ref={ref} />

				<div className="flex space-x-2 mb-2">
					<Badge className="bg-emerald-600">Pollinated</Badge>
					<Badge className="bg-yellow-500">Not Pollinated</Badge>
				</div>
			</Card>
		</section>
	);
});

Mapping.displayName = "Mapping";

export default Mapping;
