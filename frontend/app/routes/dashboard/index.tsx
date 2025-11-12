import { MessageCircle } from "lucide-react";
import React, { useState } from "react";
import { Outlet } from "react-router";
import { Chatbot } from "~/components/chatbot";
import Header from "~/components/header";
import AppSidebar from "~/components/sidebar";
import { Button } from "~/components/ui/button";
import { SidebarProvider } from "~/components/ui/sidebar";
import { appTitle, dummyUser } from "~/constants/dummy";

export default function Dashboard() {
	const [isChatOpen, setIsChatOpen] = useState(false);

	return (
		<SidebarProvider>
			<AppSidebar />
			<main className="min-h-screen bg-muted w-full">
				<Header title={appTitle} username={dummyUser.name} />

				<Outlet />

				{isChatOpen && (
					<Chatbot
						onClose={() => setIsChatOpen(false)}
						username={dummyUser.name}
					/>
				)}
				<Button
					className="fixed bottom-4 right-4 z-50 rounded-full w-12 h-12 p-0"
					onClick={() => setIsChatOpen(true)}
				>
					<MessageCircle size={24} />
				</Button>
			</main>
		</SidebarProvider>
	);
}
