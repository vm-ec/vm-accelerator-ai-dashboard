import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import type { ModelDistribution } from "@/react-app/data/dashboardData";
import { Layers } from "lucide-react";

interface ModelDistributionChartProps {
  data: ModelDistribution[];
}

const COLORS: Record<string, string> = {
  gemini: "#06B6D4",
  openai: "#10B981",
  anthropic: "#F59E0B",
  claude: "#EC4899",
  mistral: "#8B5CF6",
};

const GRADIENTS: Record<string, [string, string]> = {
  gemini: ["#22D3EE", "#0891B2"],
  openai: ["#34D399", "#059669"],
  anthropic: ["#FCD34D", "#D97706"],
  claude: ["#F472B6", "#DB2777"],
  mistral: ["#A78BFA", "#7C3AED"],
};

export function ModelDistributionChart({ data }: ModelDistributionChartProps) {
  const chartData = data.map((item) => ({
    name: item.model.charAt(0).toUpperCase() + item.model.slice(1),
    value: item.percentage,
    color: COLORS[item.model.toLowerCase()] || "#8B5CF6",
  }));

  const totalRequests = data.reduce((sum, item) => sum + item.percentage, 0);

  return (
    <div className="relative group h-full">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-2xl blur opacity-10 group-hover:opacity-20 transition duration-300" />
      <div className="relative bg-gradient-to-br from-violet-500/5 to-fuchsia-500/5 border border-white/10 rounded-2xl p-6 h-full backdrop-blur-xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Model Distribution</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Request share by provider</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-violet-500/10 border border-violet-500/20">
            <Layers className="w-4 h-4 text-violet-400" />
            <span className="text-sm font-bold text-violet-400">{totalRequests}%</span>
          </div>
        </div>
        
        <div className="flex items-center gap-8">
          <div className="w-44 h-44 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <defs>
                  {Object.entries(GRADIENTS).map(([key, [start, end]]) => (
                    <linearGradient key={key} id={`gradient-${key}`} x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor={start} />
                      <stop offset="100%" stopColor={end} />
                    </linearGradient>
                  ))}
                </defs>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="value"
                  strokeWidth={0}
                >
                  {chartData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={`url(#gradient-${data[index].model.toLowerCase()})`}
                      className="drop-shadow-lg"
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "12px",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
                  }}
                  labelStyle={{ color: "hsl(var(--foreground))" }}
                  formatter={(value) => [`${value}%`, "Share"]}
                />
              </PieChart>
            </ResponsiveContainer>
            {/* Center text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold text-foreground">{data.length}</span>
              <span className="text-xs text-muted-foreground">Models</span>
            </div>
          </div>
          
          <div className="flex flex-col gap-3 flex-1">
            {chartData.map((item, index) => (
              <div key={item.name} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-colors">
                <div className="flex items-center gap-3">
                  <div
                    className="w-3 h-3 rounded-full shadow-lg"
                    style={{
                      background: `linear-gradient(135deg, ${GRADIENTS[data[index].model.toLowerCase()]?.[0] || "#8B5CF6"}, ${GRADIENTS[data[index].model.toLowerCase()]?.[1] || "#7C3AED"})`,
                    }}
                  />
                  <span className="text-sm text-foreground font-medium">{item.name}</span>
                </div>
                <span className="text-sm font-bold text-foreground">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
