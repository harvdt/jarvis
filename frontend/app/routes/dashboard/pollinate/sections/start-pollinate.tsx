import React, { useState, useEffect } from "react";
import { Card, CardHeader } from "~/components/ui/card";
import Map from "../../fields/sections/mapping/components/map";
import { Badge } from "~/components/ui/badge";
import type { Tree } from "~/types/tree";
import { Button } from "~/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "~/components/ui/select";
import { getAllPlantations } from "~/api/plantations";

interface Plantation {
	id: string;
	name: string;
	location: string;
}

interface StartPollinateProps {
	data: Tree[];
	selectedPlantation: string;
	onPlantationChange: (plantationId: string) => void;
}

export default function StartPollinate({
	data,
	selectedPlantation,
	onPlantationChange,
}: StartPollinateProps) {
	const [plantations, setPlantations] = useState<Plantation[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchPlantations = async () => {
			try {
				setLoading(true);
				setError(null);
				const data = await getAllPlantations();
				setPlantations(data);
			} catch (err) {
				setError(
					err instanceof Error ? err.message : "Failed to fetch plantations"
				);
				console.error("Error fetching plantations:", err);
			} finally {
				setLoading(false);
			}
		};

		fetchPlantations();
	}, []);

	const filteredTrees = data; // Data is already filtered by plantation

	return (
		<section id="tree-map">
			<Card className="p-4">
				<CardHeader className="flex justify-between items-center">
					<div className="space-y-1">
						<p className="text-3xl font-bold">Choose A Field</p>
						<p className="font-medium text-muted-foreground">
							Select the field you want to start pollinate
						</p>
					</div>

					<Select
						value={selectedPlantation}
						onValueChange={onPlantationChange}
						disabled={loading}
					>
						<SelectTrigger className="z-9999 relative">
							<SelectValue
								placeholder={
									loading
										? "Loading..."
										: error
											? "Error loading plantations"
											: "Select a plantation..."
								}
							/>
						</SelectTrigger>
						<SelectContent className="z-9999">
							{plantations.map((plantation) => (
								<SelectItem key={plantation.id} value={plantation.id}>
									{plantation.name}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</CardHeader>

				<Map data={filteredTrees} />

				<div className="flex justify-between items-center mb-2">
					<div className="flex space-x-2">
						<Badge className="bg-emerald-600">Pollinated</Badge>
						<Badge className="bg-yellow-500">Not Pollinated</Badge>
					</div>

					<Button
						disabled={!selectedPlantation}
						className="bg-emerald-600 hover:bg-emerald-700"
					>
						Start Pollinating
					</Button>
				</div>
			</Card>
		</section>
	);
}
