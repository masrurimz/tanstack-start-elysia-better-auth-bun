import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/dashboard")({
  component: AdminDashboard,
});

function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">Welcome to your admin dashboard.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <DashboardCard
          title="Total Users"
          value="1,234"
          description="+12% from last month"
        />
        <DashboardCard
          title="Active Users"
          value="952"
          description="+5% from last month"
        />
        <DashboardCard
          title="Revenue"
          value="$12,345"
          description="+18% from last month"
        />
        <DashboardCard
          title="Pending Orders"
          value="23"
          description="-3% from last month"
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border bg-card p-6">
          <h3 className="text-lg font-medium">Recent Activity</h3>
          <div className="mt-4 space-y-4">
            <ActivityItem
              title="New user registered"
              timestamp="2 minutes ago"
              description="John Doe signed up for an account"
            />
            <ActivityItem
              title="Payment received"
              timestamp="1 hour ago"
              description="$129.00 received from Jane Smith"
            />
            <ActivityItem
              title="Order fulfilled"
              timestamp="3 hours ago"
              description="Order #1234 was shipped"
            />
          </div>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <h3 className="text-lg font-medium">Quick Actions</h3>
          <div className="mt-4 grid gap-2">
            <a
              href="/admin/users"
              className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              View all users
            </a>
            <a
              href="/admin/products"
              className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              Manage products
            </a>
            <a
              href="/admin/settings"
              className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              Configure settings
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

interface DashboardCardProps {
  title: string;
  value: string;
  description: string;
}

function DashboardCard({ title, value, description }: DashboardCardProps) {
  return (
    <div className="rounded-lg border bg-card p-6">
      <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
      <div className="mt-2 flex items-baseline">
        <p className="text-2xl font-semibold">{value}</p>
      </div>
      <p className="text-xs text-muted-foreground">{description}</p>
    </div>
  );
}

interface ActivityItemProps {
  title: string;
  timestamp: string;
  description: string;
}

function ActivityItem({ title, timestamp, description }: ActivityItemProps) {
  return (
    <div className="flex items-start gap-4">
      <div className="rounded-full bg-primary/10 p-2">
        <div className="h-2 w-2 rounded-full bg-primary" />
      </div>
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
        <p className="text-xs text-muted-foreground">{timestamp}</p>
      </div>
    </div>
  );
}
