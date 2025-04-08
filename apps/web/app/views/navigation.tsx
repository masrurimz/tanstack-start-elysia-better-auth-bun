import { Link } from "@tanstack/react-router";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from "~/ui/navigation-menu";
import { cn } from "~/ui/utils";

const navigationItems = [
	{ name: "Home", href: "/" },
	{ name: "Count Manager", href: "/count" },
	{
		name: "Pokemon",
		href: "/pokemon",
		submenu: [
			{ name: "Vote", href: "/pokemon" },
			{ name: "Results", href: "/pokemon/results" },
		],
	},
	{ name: "Messages", href: "/messages" },
];

export function MainNavigation() {
	return (
		<div className="border-b">
			<div className="container flex h-16 items-center">
				<NavigationMenu>
					<NavigationMenuList>
						{navigationItems.map((item) =>
							item.submenu ? (
								<NavigationMenuItem key={item.name}>
									<NavigationMenuTrigger>{item.name}</NavigationMenuTrigger>
									<NavigationMenuContent>
										<ul className="grid w-[200px] gap-3 p-4">
											{item.submenu.map((subItem) => (
												<li key={subItem.name}>
													<NavigationMenuLink asChild>
														<Link
															to={subItem.href}
															className={cn(
																"block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
															)}
														>
															<div className="text-sm font-medium leading-none">
																{subItem.name}
															</div>
														</Link>
													</NavigationMenuLink>
												</li>
											))}
										</ul>
									</NavigationMenuContent>
								</NavigationMenuItem>
							) : (
								<NavigationMenuItem key={item.name}>
									<Link to={item.href} className={navigationMenuTriggerStyle()}>
										{item.name}
									</Link>
								</NavigationMenuItem>
							),
						)}
					</NavigationMenuList>
				</NavigationMenu>
			</div>
		</div>
	);
}
