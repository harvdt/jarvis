import React, { useState, useEffect } from "react";
import { getAnalytics } from "~/api/analytics";
import AnalyticCard from "./components/analytic-card";
import { PieChartCard } from "./components/pie-chart";
import { breadcrumbConfigs } from "~/constants/breadcrumb";
import PageBreadcrumbs from "~/components/page-breadcrumbs";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "~/components/ui/select";
import { getAllPlantations } from "~/api/plantations";
import { CardSimIcon, ChartBar, Palmtree } from "lucide-react";
import { AreaChartCard } from "./components/area-chart";

interface Plantation {
	id: string;
	name: string;
	location: string;
}

interface AnalyticsData {
	tree_count: number;
	pollination_rate: string;
	active_drones: number;
	pie_chart: Array<{
		pollination_status: string;
		value: number;
	}>;
	area_chart: Array<{
		month: string;
		pollinated: number;
		not_pollinated: number;
	}>;
}

export default function Analytic() {
	const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(
		null
	);
	const [plantations, setPlantations] = useState<Plantation[]>([]);
	const [selectedPlantation, setSelectedPlantation] = useState<string>("");
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				setError(null);

				const [analyticsResponse, plantationsResponse] = await Promise.all([
					getAnalytics(),
					getAllPlantations(),
				]);

				setAnalyticsData(analyticsResponse);
				setPlantations(plantationsResponse);
			} catch (err) {
				setError(err instanceof Error ? err.message : "Failed to fetch data");
				console.error("Error fetching analytics data:", err);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	const analyticCards = [
		{
			title: "Tree Count",
			value: analyticsData?.tree_count?.toString() || "0",
			key: "tree_count",
			Icon: Palmtree,
		},
		{
			title: "Pollination Rate",
			value: analyticsData?.pollination_rate || "0%",
			key: "pollination_rate",
			Icon: CardSimIcon,
		},
		{
			title: "Active Drones",
			value: analyticsData?.active_drones?.toString() || "0",
			key: "active_drones",
			Icon: ChartBar,
		},
	];

	if (loading) {
		return (
			<div className="p-4 space-y-4">
				<div className="text-center py-8">Loading analytics...</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="p-4 space-y-6">
				<div className="text-center py-8 text-red-500">{error}</div>
			</div>
		);
	}

	return (
		<div className="p-4 space-y-4">
			<PageBreadcrumbs items={breadcrumbConfigs.analytics} />

			<div>
				<p className="text-emerald-600 text-3xl font-semibold">Analytic</p>

				<Select
					value={selectedPlantation}
					onValueChange={setSelectedPlantation}
				>
					<SelectTrigger>
						<SelectValue placeholder="Select Plantation" />
					</SelectTrigger>
					<SelectContent>
						{plantations.map((plantation) => (
							<SelectItem key={plantation.id} value={plantation.id}>
								{plantation.name}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>

			<div className="grid grid-cols-3 gap-4">
				{analyticCards.map((card) => (
					<AnalyticCard
						key={card.key}
						title={card.title}
						value={card.value}
						Icon={card.Icon}
					/>
				))}
			</div>

			<div className="grid grid-cols-2 gap-4">
				<PieChartCard data={analyticsData?.pie_chart} />
				<AreaChartCard data={analyticsData?.area_chart} />
			</div>
		</div>
	);
}
