import React, { useState, useEffect } from "react";
import PageBreadcrumbs from "~/components/page-breadcrumbs";
import { breadcrumbConfigs } from "~/constants/breadcrumb";
import { getAllLogs } from "~/api/logs";
import LogTable from "./components/log-table";
import type { Log } from "~/types/api";

export default function Log() {
	const [logs, setLogs] = useState<Log[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchLogs = async () => {
			try {
				setLoading(true);
				setError(null);
				const data = await getAllLogs();
				setLogs(data);
			} catch (err) {
				setError(err instanceof Error ? err.message : "Failed to fetch logs");
				console.error("Error fetching logs:", err);
			} finally {
				setLoading(false);
			}
		};

		fetchLogs();
	}, []);

	if (loading) {
		return (
			<div className="p-4 space-y-4">
				<PageBreadcrumbs items={breadcrumbConfigs.logs} />
				<div className="flex items-center justify-between">
					<p className="text-emerald-600 text-3xl font-semibold">Logs</p>
					<div className="text-sm text-muted-foreground">Loading logs...</div>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="p-4 space-y-4">
				<PageBreadcrumbs items={breadcrumbConfigs.logs} />
				<div className="flex items-center justify-between">
					<p className="text-emerald-600 text-3xl font-semibold">Logs</p>
					<div className="text-sm text-red-500">{error}</div>
				</div>
			</div>
		);
	}

	return (
		<div className="p-4 space-y-4">
			<PageBreadcrumbs items={breadcrumbConfigs.logs} />
			<div className="flex items-center justify-between">
				<p className="text-emerald-600 text-3xl font-semibold">Logs</p>
				<div className="text-sm text-muted-foreground">
					Showing {logs.length} log entries
				</div>
			</div>
			<LogTable data={logs} />
		</div>
	);
}
