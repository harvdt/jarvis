import React from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "~/components/ui/table";
import { Badge } from "~/components/ui/badge";
import type { Log } from "~/types/api";

interface LogTableProps {
	data: Log[];
}

export default function LogTable({ data }: LogTableProps) {
	const formatTimestamp = (timestamp: string) => {
		return new Date(timestamp).toLocaleString();
	};

	const getPlantationName = (plantationId: string) => {
		// This would normally come from an API or context
		const plantations = {
			"1": "Hackaton 2025",
			"2": "North Field",
			"3": "South Valley",
		};
		return (
			plantations[plantationId as keyof typeof plantations] ||
			`Plantation ${plantationId}`
		);
	};

	return (
		<div className="rounded-md border">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Timestamp</TableHead>
						<TableHead>Plantation</TableHead>
						<TableHead>Message</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{data.length === 0 ? (
						<TableRow>
							<TableCell
								colSpan={3}
								className="text-center text-muted-foreground"
							>
								No logs found
							</TableCell>
						</TableRow>
					) : (
						data.map((log) => (
							<TableRow key={log.id}>
								<TableCell className="font-mono text-sm">
									{formatTimestamp(log.timestamp)}
								</TableCell>
								<TableCell>
									<Badge variant="outline">
										{getPlantationName(log.plantation_id)}
									</Badge>
								</TableCell>
								<TableCell>{log.message}</TableCell>
							</TableRow>
						))
					)}
				</TableBody>
			</Table>
		</div>
	);
}
