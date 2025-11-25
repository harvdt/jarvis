import { Button } from "~/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

export default function Login() {
	return (
		<main className="min-h-screen flex flex-col text-center gap-y-5 justify-center items-center text-emerald-600 bg-muted">
			<div>
				<p className="text-4xl font-bold">RAPID</p>
				<p className="text-lg font-medium">
					The Robot-Assisted Pollination Drone
				</p>
			</div>

			<Card className="w-full max-w-sm">
				<CardHeader>
					<CardTitle className="text-emerald-600 font-semibold text-lg">
						Dashboard
					</CardTitle>
					<CardDescription className="text-emerald-600 font-medium">
						Log in to the dashboard
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form>
						<div className="flex flex-col gap-6">
							<div className="grid gap-2">
								<Label htmlFor="email">Email</Label>
								<Input
									id="email"
									type="email"
									placeholder="example@example.com"
									required
								/>
							</div>
							<div className="grid gap-2">
								<Label htmlFor="password">Password</Label>

								<Input
									placeholder="Type your password here"
									id="password"
									type="password"
									required
								/>
							</div>
						</div>
					</form>
				</CardContent>
				<CardFooter className="flex-col gap-2">
					<Button
						type="submit"
						className="w-full bg-emerald-600 hover:bg-emerald-700"
					>
						Login
					</Button>
				</CardFooter>
			</Card>
		</main>
	);
}
