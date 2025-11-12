import type { LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader } from "~/components/ui/card";

type AnalyticCardProps = {
	title: string;
	value: string | number;
	Icon: LucideIcon;
};

export default function AnalyticCard({
	title,
	value,
	Icon,
}: AnalyticCardProps) {
	return (
		<Card>
			<CardHeader className="flex justify-between items-center">
				{title}
				<Icon />
			</CardHeader>
			<CardContent>
				<p className="font-bold text-2xl">{value}</p>
			</CardContent>
		</Card>
	);
}
