import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";
import { AppSidebar } from "~/components/app-layout/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbPage,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbLink,
} from "~/components/ui/breadcrumb";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "~/components/ui/sidebar";
import { Separator } from "~/components/ui/separator";
import { authController } from "~/features/auth/_controllers/auth-controller";

export const Route = createFileRoute("/admin")({
  component: AdminRoute,
  beforeLoad: async () => {
    try {
      const session = await authController.getSession();
      // Check if user is logged in
      if (!session?.user) {
        throw redirect({
          to: "/login",
        });
      }

      // Here you could add additional admin role check
      // const isAdmin = session.user.role === "admin";
      // if (!isAdmin) {
      //   throw redirect({
      //     to: "/",
      //   });
      // }

      return { user: session.user };
    } catch (error) {
      if (error instanceof Error && "redirect" in error) {
        throw error;
      }
      throw redirect({
        to: "/login",
      });
    }
  },
});

function AdminRoute() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">Building Your Application</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
          </div>
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
