import React from "react";
import { Input } from "./ui/input";
import { ChevronDown, LogOut, User } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { SidebarTrigger } from "./ui/sidebar";

type HeaderProps = {
	title: string;
	username: string;
};

export default function Header({ title, username }: HeaderProps) {
	return (
		<header className="flex justify-between items-center px-6 py-4">
			<div className="flex justify-center items-center gap-x-4">
				<SidebarTrigger />
				<p className="text-xl font-semibold text-neutral-800">{title}</p>
			</div>

			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<div className="flex items-center gap-2 text-neutral-700 cursor-pointer">
						<User className="w-5 h-5" />
						<span className="text-sm font-medium">{username}</span>
						<ChevronDown className="w-4 h-4 text-neutral-500" />
					</div>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					<DropdownMenuItem className="cursor-pointer">
						<LogOut />
						<span>Logout</span>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</header>
	);
}
