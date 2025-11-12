import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "~/components/ui/table";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import type { Tree } from "~/types/tree";
import { Input } from "~/components/ui/input";
import { useState, useEffect } from "react";

export default function TreeTable({
	data,
	onShowOnMap,
}: {
	data: Tree[];
	onShowOnMap?: (tree: Tree) => void;
}) {
	const [searchTerm, setSearchTerm] = useState("");
	const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
	const [filteredData, setFilteredData] = useState(data);

	useEffect(() => {
		const timer = setTimeout(() => {
			setDebouncedSearchTerm(searchTerm);
		}, 300);

		return () => {
			clearTimeout(timer);
		};
	}, [searchTerm]);

	useEffect(() => {
		if (!debouncedSearchTerm) {
			setFilteredData(data);
		} else {
			const filtered = data.filter((tree) =>
				tree.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
			);
			setFilteredData(filtered);
		}
	}, [debouncedSearchTerm, data]);

	return (
		<div>
			<Input
				placeholder="Find your tree"
				className="mb-4"
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
			/>
			<Table className="rounded-md border">
				<TableHeader>
					<TableRow>
						<TableHead>Name</TableHead>
						<TableHead>Coordinates</TableHead>
						<TableHead>Flower Status</TableHead>
						<TableHead>Pollination Status</TableHead>
						<TableHead>Show on Map</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{filteredData.length === 0 ? (
						<TableRow>
							<TableCell
								colSpan={5}
								className="text-center text-muted-foreground"
							>
								{searchTerm
									? "No trees found matching your search"
									: "No data found"}
							</TableCell>
						</TableRow>
					) : (
						filteredData.map((tree) => (
							<TableRow key={tree.id}>
								<TableCell className="font-medium">{tree.name}</TableCell>
								<TableCell>
									[{tree.latitude.toFixed(4)}, {tree.longitude.toFixed(4)}]
								</TableCell>
								<TableCell>
									<Badge
										className={
											tree.flower_status ? "bg-emerald-600" : "bg-yellow-500"
										}
									>
										{tree.flower_status ? "Ripe" : "Not Ripe"}
									</Badge>
								</TableCell>
								<TableCell>
									<Badge
										className={
											tree.pollination_status
												? "bg-emerald-600"
												: "bg-yellow-500"
										}
									>
										{tree.pollination_status ? "Pollinated" : "Not Pollinated"}
									</Badge>
								</TableCell>
								<TableCell>
									<Button
										onClick={() => onShowOnMap?.(tree)}
										variant={"outline"}
									>
										Show
									</Button>
								</TableCell>
							</TableRow>
						))
					)}
				</TableBody>
			</Table>
		</div>
	);
}
