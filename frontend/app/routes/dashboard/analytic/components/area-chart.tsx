"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "~/components/ui/card";
import {
	type ChartConfig,
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
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

interface AreaChartData {
	month: string;
	pollinated: number;
	not_pollinated: number;
}

interface AreaChartCardProps {
	data?: AreaChartData[];
}

export function AreaChartCard({ data }: AreaChartCardProps) {
	const chartData = data || [];

	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-2xl font-semibold">Area Chart</CardTitle>
			</CardHeader>
			<CardContent>
				<ChartContainer config={chartConfig}>
					<AreaChart
						accessibilityLayer
						data={chartData}
						margin={{
							left: 12,
							right: 12,
						}}
					>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey="month"
							tickLine={false}
							axisLine={false}
							tickMargin={8}
							tickFormatter={(value) => value.slice(0, 3)}
						/>
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent indicator="line" />}
						/>
						{Object.entries(chartConfig).map(([key, config]) => (
							<Area
								key={key}
								dataKey={key}
								type="natural"
								fill={`var(--color-${key})`}
								fillOpacity={0.4}
								stroke={`var(--color-${key})`}
								stackId="a"
							/>
						))}
						<ChartLegend content={<ChartLegendContent />} />
					</AreaChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}
