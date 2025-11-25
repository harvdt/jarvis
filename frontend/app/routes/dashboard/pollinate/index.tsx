import React, { useState, useEffect } from "react";
import Progress from "./sections/progress-card/progress";
import StartPollinate from "./sections/start-pollinate";
import { getTreesByPlantation } from "~/api/trees";
import type { Tree } from "~/types/tree";

export default function Pollinate() {
	const [selectedPlantation, setSelectedPlantation] = useState<string>("");
	const [trees, setTrees] = useState<Tree[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchTrees = async () => {
			if (!selectedPlantation) {
				setTrees([]);
				return;
			}

			try {
				setLoading(true);
				setError(null);
				const data = await getTreesByPlantation(selectedPlantation);
				setTrees(data);
			} catch (err) {
				setError(err instanceof Error ? err.message : "Failed to fetch trees");
				console.error("Error fetching trees:", err);
			} finally {
				setLoading(false);
			}
		};

		fetchTrees();
	}, [selectedPlantation]);

	if (loading) {
		return <div className="p-4">Loading trees...</div>;
	}

	if (error) {
		return <div className="p-4 text-red-500">{error}</div>;
	}

	return (
		<main className="p-4 space-y-4">
			<StartPollinate
				data={trees}
				selectedPlantation={selectedPlantation}
				onPlantationChange={setSelectedPlantation}
			/>
			<Progress data={trees} />
		</main>
	);
}
