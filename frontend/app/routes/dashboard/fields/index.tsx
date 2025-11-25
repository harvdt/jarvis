import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import PageBreadcrumbs from "~/components/page-breadcrumbs";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { breadcrumbConfigs } from "~/constants/breadcrumb";
import { getAllPlantations } from "~/api/plantations";

interface Plantation {
	id: string;
	name: string;
	location: string;
}

export default function Field() {
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

	if (loading) {
		return (
			<main className="p-4 space-y-4">
				<PageBreadcrumbs items={breadcrumbConfigs.fields} />
				<p className="text-emerald-600 text-3xl font-semibold">My Fields</p>
				<div className="mt-5">Loading plantations...</div>
			</main>
		);
	}

	if (error) {
		return (
			<main className="p-4 space-y-4">
				<PageBreadcrumbs items={breadcrumbConfigs.fields} />
				<p className="text-emerald-600 text-3xl font-semibold">My Fields</p>
				<div className="mt-5 text-red-500">{error}</div>
			</main>
		);
	}

	return (
		<main className="p-4 space-y-4">
			<PageBreadcrumbs items={breadcrumbConfigs.fields} />
			<p className="text-emerald-600 text-3xl font-semibold">My Fields</p>
			<div className="grid grid-cols-3 gap-4 mt-5">
				{plantations.map((plantation) => (
					<Card key={plantation.id}>
						<CardHeader className="text-2xl font-semibold">
							{plantation.name}
						</CardHeader>
						<CardContent className="space-y-3">
							<div className="h-56 w-full">
								<img
									src="https://miniox.brin.go.id/website//uploads/images/posts//2023/11/1700195283-18076596.webp"
									alt={plantation.name}
									className="w-full h-full object-cover rounded-xl"
								/>
							</div>
							<Button className="bg-emerald-600 hover:bg-emerald-700 w-full">
								<Link to={`/dashboard/fields/${plantation.id}`}>Details</Link>
							</Button>
						</CardContent>
					</Card>
				))}
			</div>
		</main>
	);
}
