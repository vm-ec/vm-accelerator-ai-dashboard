import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import { useEffect, useState } from "react";
import { Activity } from "lucide-react";

interface LatencyFeedProps {
  initialData: number[];
}

export function LatencyFeed({ initialData }: LatencyFeedProps) {
  const [data, setData] = useState(
    initialData.map((value, index) => ({
      time: `T-${initialData.length - index}`,
      latency: value,
    }))
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => {
        const newLatency = Math.floor(Math.random() * 1500) + 800;
        const newData = [...prev.slice(1), { time: "Now", latency: newLatency }];
        return newData.map((item, index) => ({
          ...item,
          time: index === newData.length - 1 ? "Now" : `T-${newData.length - index - 1}`,
        }));
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const maxLatency = Math.max(...data.map((d) => d.latency));
  const minLatency = Math.min(...data.map((d) => d.latency));
  const avgLatency = Math.round(data.reduce((sum, d) => sum + d.latency, 0) / data.length);

  return (
    <div className="relative group h-full">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl blur opacity-10 group-hover:opacity-20 transition duration-300" />
      <div className="relative bg-gradient-to-br from-cyan-500/5 to-blue-600/5 border border-white/10 rounded-2xl p-6 h-full backdrop-blur-xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Live Latency Feed</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Real-time response times (ms)</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
              <Activity className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-sm font-bold text-cyan-400 font-mono">{avgLatency}ms</span>
            </div>
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-[10px] font-medium text-cyan-400 uppercase">Streaming</span>
            </div>
          </div>
        </div>

        <div className="h-40">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="latencyGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#22D3EE" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#22D3EE" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="time"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }}
                domain={[minLatency * 0.8, maxLatency * 1.1]}
                tickFormatter={(value) => `${value}`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "12px",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
                }}
                labelStyle={{ color: "hsl(var(--foreground))" }}
                formatter={(value) => [`${value} ms`, "Latency"]}
              />
              <Area
                type="monotone"
                dataKey="latency"
                stroke="#22D3EE"
                strokeWidth={2.5}
                fill="url(#latencyGradient)"
                dot={false}
                activeDot={{ r: 5, fill: "#22D3EE", strokeWidth: 2, stroke: "#fff" }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
