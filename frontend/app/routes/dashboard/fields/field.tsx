import React, { useRef, useState, useEffect } from "react";
import { useParams } from "react-router";
import Mapping from "./sections/mapping/mapping";
import TreeSection from "./sections/tree/tree";
import type { MapRef } from "./sections/mapping/components/map";
import type { Tree } from "~/types/tree";
import PageBreadcrumbs from "~/components/page-breadcrumbs";
import { breadcrumbConfigs } from "~/constants/breadcrumb";
import { getTreesByPlantation } from "~/api/trees";
import { getPlantationById } from "~/api/plantations";

interface Plantation {
	id: string;
	name: string;
	location: string;
}

export default function TreePage() {
	const { fieldId } = useParams();
	const mapRef = useRef<MapRef>(null);
	const [trees, setTrees] = useState<Tree[]>([]);
	const [plantation, setPlantation] = useState<Plantation | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			if (!fieldId) return;

			try {
				setLoading(true);
				setError(null);

				// Fetch trees and plantation data in parallel
				const [treesData, plantationData] = await Promise.all([
					getTreesByPlantation(fieldId),
					getPlantationById(fieldId),
				]);

				setTrees(treesData);
				setPlantation(plantationData);
			} catch (err) {
				setError(err instanceof Error ? err.message : "Failed to fetch data");
				console.error("Error fetching data:", err);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [fieldId]);

	const handleShowOnMap = (tree: Tree) => {
		mapRef.current?.flyToTree(tree);
		const mapElement = document.getElementById("tree-map");
		if (mapElement) {
			mapElement.scrollIntoView({ behavior: "smooth", block: "center" });
		}
	};

	if (loading) {
		return (
			<section className="p-4 space-y-6">
				<div className="text-center py-8">Loading field data...</div>
			</section>
		);
	}

	if (error) {
		return (
			<section className="p-4 space-y-6">
				<div className="text-center py-8 text-red-500">{error}</div>
			</section>
		);
	}

	const plantationName = plantation?.name || `Field ${fieldId}`;

	return (
		<section className="p-4 space-y-6">
			<PageBreadcrumbs items={breadcrumbConfigs.fieldDetail(plantationName)} />
			<Mapping data={trees} ref={mapRef} />
			<TreeSection data={trees} onShowOnMap={handleShowOnMap} />
		</section>
	);
}
