import { Card } from "~/components/ui/card";
import TreeTable from "./components/tree-table";
import type { Tree } from "~/types/tree";
import { Input } from "~/components/ui/input";

export default function TreeSection({
	data,
	onShowOnMap,
}: {
	data: Tree[];
	onShowOnMap?: (tree: Tree) => void;
}) {
	return (
		<section>
			<Card className="p-4">
				<div className="space-y-1">
					<p className="text-3xl font-bold">My Trees</p>
					<p className="font-medium text-muted-foreground">
						Get to know your trees
					</p>
				</div>

				<TreeTable data={data} onShowOnMap={onShowOnMap} />
			</Card>
		</section>
	);
}
