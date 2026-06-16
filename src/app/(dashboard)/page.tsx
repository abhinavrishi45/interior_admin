import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Users, Briefcase, TrendingUp, DollarSign } from "lucide-react";

export const metadata = {
  title: "Overview | Admin Panel",
};

export default function DashboardOverview() {
  const stats = [
    { name: "Total Enquiries", value: "124", icon: Users, change: "+12%", trend: "up" },
    { name: "Active Projects", value: "18", icon: Briefcase, change: "+2", trend: "up" },
    { name: "Conversion Rate", value: "24.5%", icon: TrendingUp, change: "+4.1%", trend: "up" },
    { name: "Est. Revenue", value: "$1.2M", icon: DollarSign, change: "-2%", trend: "down" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Overview</h1>
        <p className="text-muted-foreground mt-1">Here is what&apos;s happening with your commercial projects today.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.name} className="bg-card">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.name}
                </CardTitle>
                <Icon className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <p className={`text-xs mt-1 ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                  {stat.change} from last month
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Placeholder for charts or recent activity */}
        <Card className="h-96">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center h-[calc(100%-100px)] text-muted-foreground">
            Activity feed component goes here
          </CardContent>
        </Card>
        <Card className="h-96">
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center h-[calc(100%-100px)] text-muted-foreground">
            Chart component goes here
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
