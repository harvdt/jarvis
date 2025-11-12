import React from "react";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";

interface BreadcrumbItemType {
	label: string;
	href?: string;
}

interface PageBreadcrumbsProps {
	items: BreadcrumbItemType[];
}

export default function PageBreadcrumbs({ items }: PageBreadcrumbsProps) {
	return (
		<Breadcrumb>
			<BreadcrumbList>
				{items.map((item, index) => (
					<React.Fragment key={item.label}>
						<BreadcrumbItem>
							{item.href ? (
								<a
									href={item.href}
									className="hover:text-foreground transition-colors"
								>
									{item.label}
								</a>
							) : (
								<BreadcrumbPage>{item.label}</BreadcrumbPage>
							)}
						</BreadcrumbItem>
						{index < items.length - 1 && <BreadcrumbSeparator />}
					</React.Fragment>
				))}
			</BreadcrumbList>
		</Breadcrumb>
	);
}
