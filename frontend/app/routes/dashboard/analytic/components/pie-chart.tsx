import { Pie, PieChart, Legend } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
	ChartLegend,
	ChartLegendContent,
	type ChartConfig,
} from "~/components/ui/chart";

const chartConfig = {
	pollinated: {
		label: "Pollinated",
		color: "#059669",
	},
	not_pollinated: {
		label: "Not Pollinated",
		color: "#EAB308",
	},
} satisfies ChartConfig;

interface PieChartData {
	pollination_status: string;
	value: number;
}

interface PieChartCardProps {
	data?: PieChartData[];
}

export function PieChartCard({ data }: PieChartCardProps) {
	const chartData =
		data?.map((item) => ({
			...item,
			fill:
				item.pollination_status === "pollinated"
					? "var(--color-pollinated)"
					: "var(--color-not_pollinated)",
		})) || [];

	return (
		<Card className="flex flex-col">
			<CardHeader className="items-center pb-0">
				<CardTitle className="text-2xl font-semibold">
					Current Pollination Rate
				</CardTitle>
			</CardHeader>
			<CardContent className="flex-1 pb-0">
				<ChartContainer
					config={chartConfig}
					className="mx-auto aspect-square max-h-[250px]"
				>
					<PieChart>
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent hideLabel />}
						/>
						<Pie
							data={chartData}
							dataKey="value"
							nameKey="pollination_status"
							innerRadius={50}
						/>
						<ChartLegend
							content={<ChartLegendContent nameKey="pollination_status" />}
							className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center"
						/>
					</PieChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}
