import { Link, useRouter } from "@tanstack/react-router";
import { ChevronsDown, Menu, User } from "lucide-react";
import { useEffect, useState } from "react";
import ThemeToggle from "~/components/ThemeToggle";
import { Button } from "~/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "~/components/ui/navigation-menu";
import { Separator } from "~/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";
import { authClientRepo } from "~/libs/better-auth/auth-client-repo";
import GithubIcon from "./github-icon";

interface RouteProps {
  href: string;
  label: string;
}

interface FeatureProps {
  title: string;
  description: string;
}

const Navbar = ({ user }: { user?: { name: string } }) => {
  const [mode] = useState("dark");
  const router = useRouter();

  useEffect(() => {
    // Set initial dark mode
    const root = window.document.documentElement;
    root.classList.remove("light");
    root.classList.add("dark");
  }, []);

  const [isOpen, setIsOpen] = useState(false);

  const routeList: RouteProps[] = [
    { href: "#testimonials", label: "Testimonials" },
    { href: "#team", label: "Team" },
    { href: "#contact", label: "Contact" },
    { href: "#faq", label: "FAQ" },
  ];

  const featureList: FeatureProps[] = [
    {
      title: "Showcase Your Value",
      description: "Highlight how your product solves user problems.",
    },
    {
      title: "Build Trust",
      description: "Leverages social proof elements to establish trust and credibility.",
    },
    {
      title: "Capture Leads",
      description: "Make your lead capture form visually appealing and strategically.",
    },
  ];

  const handleSignOut = async () => {
    await authClientRepo.signOut();
    await router.invalidate();
  };

  return (
    <header
      className={`${
        mode === "light"
          ? "shadow-[inset_0_0_5px_rgba(0,0,0,0.085)]"
          : "shadow-[inset_0_0_5px_rgba(255,255,255,0.141)]"
      } bg-card sticky top-5 z-40 mx-auto flex w-[90%] items-center justify-between rounded-2xl border p-2 shadow-md md:w-[70%] lg:w-[75%] lg:max-w-screen-xl`}
    >
      <a href="/" className="flex items-center text-lg font-bold">
        <ChevronsDown className="from-primary via-primary/70 to-primary mr-2 h-9 w-9 rounded-lg border bg-gradient-to-tr text-white" />
        ShadcnTanStart
      </a>

      {/* Mobile */}
      <div className="flex items-center lg:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Menu onClick={() => setIsOpen(true)} className="cursor-pointer" />
          </SheetTrigger>

          <SheetContent
            side="left"
            className="bg-card flex flex-col justify-between rounded-tr-2xl rounded-br-2xl"
          >
            <div>
              <SheetHeader className="mb-4 ml-4">
                <SheetTitle className="flex items-center">
                  <a href="/" className="flex items-center">
                    <ChevronsDown className="from-primary/70 via-primary to-primary/70 mr-2 h-9 w-9 rounded-lg border bg-gradient-to-tr text-white" />
                    ShadcnVue
                  </a>
                </SheetTitle>
              </SheetHeader>

              <div className="flex flex-col gap-2">
                {routeList.map((item) => (
                  <Button
                    key={item.label}
                    variant="ghost"
                    className="justify-start text-base"
                    asChild
                  >
                    <a href={item.href} onClick={() => setIsOpen(false)}>
                      {item.label}
                    </a>
                  </Button>
                ))}

                {user ? (
                  <>
                    <Button variant="ghost" className="justify-start text-base" asChild>
                      <Link to="/dashboard" onClick={() => setIsOpen(false)}>
                        Dashboard
                      </Link>
                    </Button>
                    <Button
                      variant="destructive"
                      className="justify-start text-base"
                      onClick={() => {
                        handleSignOut();
                        setIsOpen(false);
                      }}
                    >
                      Sign out
                    </Button>
                  </>
                ) : (
                  <Button variant="default" className="justify-start text-base" asChild>
                    <Link to="/signin" onClick={() => setIsOpen(false)}>
                      Sign in
                    </Link>
                  </Button>
                )}
              </div>
            </div>

            <SheetFooter className="flex-col items-start justify-start sm:flex-col">
              <Separator className="mb-2" />
              <ThemeToggle size="sm" variant="ghost" className="justify-start" />
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop */}
      <NavigationMenu className="hidden lg:block">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-card text-base">
              Features
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="grid w-[600px] grid-cols-2 gap-5 p-4">
                <img
                  src="https://www.radix-vue.com/logo.svg"
                  alt="Beach"
                  className="h-full w-full rounded-md object-cover"
                />
                <ul className="flex flex-col gap-2">
                  {featureList.map((feature) => (
                    <li
                      key={feature.title}
                      className="hover:bg-muted rounded-md p-3 text-sm"
                    >
                      <p className="text-foreground mb-1 leading-none font-semibold">
                        {feature.title}
                      </p>
                      <p className="text-muted-foreground line-clamp-2">
                        {feature.description}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            {routeList.map((item) => (
              <Button
                key={item.label}
                variant="ghost"
                className="justify-start text-base"
                asChild
              >
                <NavigationMenuLink asChild>
                  <a href={item.href}>{item.label}</a>
                </NavigationMenuLink>
              </Button>
            ))}
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <div className="hidden items-center gap-2 lg:flex">
        <ThemeToggle size="sm" variant="ghost" className="justify-start" />

        {user ? (
          <div className="flex items-center gap-2">
            <Button size="sm" variant="ghost" aria-label="User Profile">
              <User className="h-5 w-5" />
              <span className="ml-1">{user.name}</span>
            </Button>
            <Button size="sm" asChild>
              <Link to="/dashboard">Dashboard</Link>
            </Button>
            <Button onClick={handleSignOut} size="sm" variant="destructive">
              Sign out
            </Button>
          </div>
        ) : (
          <>
            <Button asChild size="sm" variant="ghost" aria-label="View on GitHub">
              <a
                aria-label="View on GitHub"
                href="https://github.com/leoMirandaa/shadcn-vue-landing-page.git"
                target="_blank"
              >
                <GithubIcon className="h-5 w-5" />
              </a>
            </Button>
            <Button size="sm" asChild>
              <Link to="/signin">Sign in</Link>
            </Button>
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;
