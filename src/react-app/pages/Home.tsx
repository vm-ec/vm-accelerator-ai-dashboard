import { useState, useEffect } from "react";
import { Activity, RefreshCw, Moon, Sun, Sparkles } from "lucide-react";
import { KPICard } from "@/react-app/components/dashboard/KPICard";
import { ModelDistributionChart } from "@/react-app/components/dashboard/ModelDistributionChart";
import { LatencyFeed } from "@/react-app/components/dashboard/LatencyFeed";
import { TokenChart } from "@/react-app/components/dashboard/TokenChart";
import { CostChart } from "@/react-app/components/dashboard/CostChart";
import { EventLog } from "@/react-app/components/dashboard/EventLog";
import { MetricTableWithChart } from "@/react-app/components/dashboard/MetricTableWithChart";
import { useDashboardData } from "@/react-app/hooks/useDashboardData";
import { Button } from "@/react-app/components/ui/button";

type ViewMode = "executive" | "support";

export default function HomePage() {
  const { data: dashboardData, loading, error } = useDashboardData();
  const [isDark, setIsDark] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [viewMode, setViewMode] = useState<ViewMode>("executive");

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(new Date());
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-violet-500" />
          <p className="text-muted-foreground">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  if (error || !dashboardData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-2">Error loading data</p>
          <p className="text-muted-foreground text-sm">{error || "No data available"}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Ambient background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-violet-500/8 rounded-full blur-[100px]" />
        <div className="absolute top-1/3 -left-40 w-[400px] h-[400px] bg-cyan-500/8 rounded-full blur-[100px]" />
        <div className="absolute -bottom-40 right-1/4 w-[450px] h-[450px] bg-emerald-500/6 rounded-full blur-[100px]" />
        <div className="absolute top-2/3 left-1/3 w-[300px] h-[300px] bg-fuchsia-500/5 rounded-full blur-[80px]" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-white/5 backdrop-blur-xl bg-background/60 sticky top-0 z-20">
          <div className="max-w-[1600px] mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {/* Logo */}
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-xl blur opacity-40" />
                  <div className="relative p-2.5 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-600 shadow-lg">
                    <Activity className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-foreground tracking-tight flex items-center gap-2">
                    AI Apps Observability
                    {/* <Sparkles className="w-4 h-4 text-amber-400" /> */}
                  </h1>
                  <p className="text-xs text-muted-foreground">Dynamic Data Stream</p>
                </div>

                {/* Live Status */}
                <div className="ml-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">Live</span>
                </div>

                {/* Last Updated */}
                <div className="flex items-center gap-2 text-xs text-muted-foreground ml-2">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: "3s" }} />
                  <span>Updated: {lastUpdated.toLocaleTimeString()}</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                {/* View Mode Toggle */}
                <div className="flex p-1 rounded-xl bg-white/5 border border-white/10">
                  <button
                    onClick={() => setViewMode("executive")}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                      viewMode === "executive"
                        ? "bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white shadow-lg"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Executive
                  </button>
                  <button
                    onClick={() => setViewMode("support")}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                      viewMode === "support"
                        ? "bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white shadow-lg"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Support
                  </button>
                </div>

                {/* Theme Toggle */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsDark(!isDark)}
                  className="rounded-xl bg-white/5 border border-white/10 hover:bg-white/10"
                >
                  {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-[1600px] mx-auto px-6 py-8">
          {/* KPI Cards */}
          <section className="mb-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {dashboardData.meta.kpis.map((kpi) => (
                <KPICard key={kpi.id} {...kpi} />
              ))}
            </div>
          </section>

          {/* Charts Row - 3 columns */}
          <section className="mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              <TokenChart data={dashboardData.tokenUsage} />
              <ModelDistributionChart data={dashboardData.modelDistribution} />
              <LatencyFeed initialData={dashboardData.latencyFeed} />
            </div>
          </section>

          {/* Cost & Logs Row */}
          <section className="mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <CostChart data={dashboardData.costData} />
              <EventLog />
            </div>
          </section>

          {/* Detailed Metrics Section */}
          {viewMode === "support" && (
            <section>
              <div className="flex items-center gap-3 mb-6">
                <h2 className="text-xl font-bold text-foreground">Detailed Metrics</h2>
                <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
              </div>
              <div className="grid grid-cols-1 gap-5">
                {dashboardData.metricTables.map((table, index) => (
                  <MetricTableWithChart key={index} table={table} index={index} />
                ))}
              </div>
            </section>
          )}

          {/* Quick Stats for Executive View */}
          {viewMode === "executive" && (
            <section>
              <div className="flex items-center gap-3 mb-6">
                <h2 className="text-xl font-bold text-foreground">Provider Overview</h2>
                <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {/* LLM Provider Metrics */}
                {dashboardData.metricTables
                  .filter(t => t.title === "LLM Provider Metrics" || t.title === "Error Metrics")
                  .map((table, index) => (
                    <MetricTableWithChart key={index} table={table} index={index} />
                  ))}
              </div>
            </section>
          )}
        </main>

        {/* Footer */}
        <footer className="border-t border-white/5 mt-12">
          <div className="max-w-[1600px] mx-auto px-6 py-6">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>© 2025 AI Apps Observability Dashboard</span>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>All systems operational</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
