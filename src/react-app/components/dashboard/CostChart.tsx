import { XAxis, YAxis, ResponsiveContainer, Tooltip, Area, AreaChart } from "recharts";
import { DollarSign } from "lucide-react";

interface CostChartProps {
  data: { day: string; cost: number }[];
}

export function CostChart({ data }: CostChartProps) {
  const totalCost = data.reduce((sum, item) => sum + item.cost, 0);

  return (
    <div className="relative group h-full">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl blur opacity-10 group-hover:opacity-20 transition duration-300" />
      <div className="relative bg-gradient-to-br from-emerald-500/5 to-teal-500/5 border border-white/10 rounded-2xl p-6 h-full backdrop-blur-xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Daily Cost Analysis</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Last 5 days spending</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
            <DollarSign className="w-4 h-4 text-emerald-400" />
            <span className="text-sm font-bold text-emerald-400">${totalCost.toFixed(2)}</span>
          </div>
        </div>

        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="costGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10B981" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#10B981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "12px",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
                }}
                formatter={(value) => [`$${value}`, "Cost"]}
              />
              <Area
                type="monotone"
                dataKey="cost"
                stroke="#10B981"
                strokeWidth={3}
                fill="url(#costGradient)"
                dot={{ r: 4, fill: "#10B981", strokeWidth: 0 }}
                activeDot={{ r: 6, fill: "#10B981", strokeWidth: 2, stroke: "#fff" }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
