import React from "react";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuItem,
} from "./ui/sidebar";
import { sidebarOptions } from "~/constants/sidebar";
import { Link, useLocation } from "react-router";

export default function AppSidebar() {
	const location = useLocation();
	const pathname = location.pathname;

	return (
		<Sidebar>
			<SidebarHeader className="text-center">
				<div className="text-emerald-600 py-2">
					<p className="text-2xl font-bold">RAPID</p>
					<p className="text-xs font-medium">
						The Robot-Assisted Pollination Drone
					</p>
				</div>
			</SidebarHeader>
			<SidebarContent className="px-4 py-5">
				<SidebarMenu className="space-y-2">
					{sidebarOptions.map((option, index) => (
						<SidebarMenuItem
							key={index}
							className={
								pathname === option.href ? "font-medium text-emerald-600" : ""
							}
						>
							<Link to={option.href} className="flex">
								<option.icon className="w-5 h-5 mr-3" />
								<span>{option.title}</span>
							</Link>
						</SidebarMenuItem>
					))}
				</SidebarMenu>
			</SidebarContent>
			<SidebarFooter></SidebarFooter>
		</Sidebar>
	);
}
