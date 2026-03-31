import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, ResponsiveContainer, Tooltip, Area, AreaChart, LabelList, LineChart, Line, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from "recharts";
import type { MetricTable as MetricTableType } from "@/react-app/data/dashboardData";
import { Badge } from "@/react-app/components/ui/badge";
import {
  Database,
  Cpu,
  DollarSign,
  AlertCircle,
  Timer,
  MessageSquare,
  Layers,
  Radio,
  Bot,
} from "lucide-react";

interface MetricTableWithChartProps {
  table: MetricTableType;
  index: number;
}

const tableIcons: Record<string, React.ReactNode> = {
  "Token Metrics": <Cpu className="w-4 h-4" />,
  "Request Metrics": <Radio className="w-4 h-4" />,
  "LLM Provider Metrics": <Layers className="w-4 h-4" />,
  "Wrapper Metrics": <Database className="w-4 h-4" />,
  "Cost Metrics": <DollarSign className="w-4 h-4" />,
  "Error Metrics": <AlertCircle className="w-4 h-4" />,
  "Latency Metrics": <Timer className="w-4 h-4" />,
  "Kafka Metrics": <MessageSquare className="w-4 h-4" />,
  "Agent Metrics": <Bot className="w-4 h-4" />,
};

const tableColors: Record<string, { gradient: string; primary: string }> = {
  "Token Metrics": { gradient: "from-violet-500 to-purple-600", primary: "#8B5CF6" },
  "Request Metrics": { gradient: "from-blue-500 to-indigo-600", primary: "#3B82F6" },
  "LLM Provider Metrics": { gradient: "from-emerald-500 to-teal-600", primary: "#10B981" },
  "Wrapper Metrics": { gradient: "from-amber-500 to-orange-600", primary: "#F59E0B" },
  "Cost Metrics": { gradient: "from-cyan-500 to-teal-600", primary: "#22D3EE" },
  "Error Metrics": { gradient: "from-rose-500 to-red-600", primary: "#EF4444" },
  "Latency Metrics": { gradient: "from-indigo-500 to-violet-600", primary: "#6366F1" },
  "Kafka Metrics": { gradient: "from-fuchsia-500 to-pink-600", primary: "#D946EF" },
  "Agent Metrics": { gradient: "from-orange-500 to-red-600", primary: "#F97316" },
};

const CHART_COLORS = ["#4ADE80", "#60A5FA", "#FCD34D", "#FB7185", "#C084FC", "#38BDF8"];

function TableChart({ table, index }: { table: MetricTableType; index: number }) {
  const color = tableColors[table.title]?.primary || "#8B5CF6";
  
  if (table.isCustomTable && table.providers) {
    // LLM Provider Metrics - Multi-dimensional chart
    const chartData = table.providers.map(p => ({
      name: p.name,
      Requests: p.requests,
      Latency: p.latency,
      Errors: p.errors
    }));
    
    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <defs>
            <linearGradient id="requestsGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10B981" stopOpacity={0.9}/>
              <stop offset="95%" stopColor="#10B981" stopOpacity={0.6}/>
            </linearGradient>
            <linearGradient id="latencyGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.9}/>
              <stop offset="95%" stopColor="#F59E0B" stopOpacity={0.6}/>
            </linearGradient>
            <linearGradient id="errorsGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#EF4444" stopOpacity={0.9}/>
              <stop offset="95%" stopColor="#EF4444" stopOpacity={0.6}/>
            </linearGradient>
          </defs>
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} 
          />
          <YAxis 
            yAxisId="left"
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }} 
            label={{ value: 'Requests / Errors', angle: -90, position: 'insideLeft', style: { fill: 'hsl(var(--muted-foreground))', fontSize: 10 } }}
          />
          <YAxis 
            yAxisId="right"
            orientation="right"
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }} 
            label={{ value: 'Latency (ms)', angle: 90, position: 'insideRight', style: { fill: 'hsl(var(--muted-foreground))', fontSize: 10 } }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: "hsl(var(--card))", 
              border: "1px solid hsl(var(--border))", 
              borderRadius: "8px", 
              color: "hsl(var(--foreground))" 
            }}
            formatter={(value: any, name: string) => {
              if (name === 'Latency') return [value + ' ms', name];
              return [value, name];
            }}
          />
          <Bar yAxisId="left" dataKey="Requests" fill="url(#requestsGradient)" radius={[4, 4, 0, 0]} name="Requests" />
          <Bar yAxisId="right" dataKey="Latency" fill="url(#latencyGradient)" radius={[4, 4, 0, 0]} name="Latency" />
          <Bar yAxisId="left" dataKey="Errors" fill="url(#errorsGradient)" radius={[4, 4, 0, 0]} name="Errors" />
        </BarChart>
      </ResponsiveContainer>
    );
  }

  if (table.isCustomTable && table.agents) {
    const data = table.agents.map(a => ({ name: a.name.replace(" Agent", ""), value: a.requests }));
    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 9 }} interval={0} angle={-20} textAnchor="end" height={50} />
          <YAxis axisLine={false} tickLine={false} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }} />
          <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", color: "hsl(var(--foreground))" }} />
          <Line type="monotone" dataKey="value" stroke={color} strokeWidth={3} dot={{ r: 5, fill: color, strokeWidth: 2, stroke: "hsl(var(--background))" }} />
        </LineChart>
      </ResponsiveContainer>
    );
  }

  const rows = table.rows || [];
  
  // Special handling for Token Metrics - group by provider
  if (table.title === "Token Metrics") {
    const providers: Record<string, { name: string; input: number; output: number }> = {};
    
    rows.forEach(row => {
      const value = typeof row.value === "string" ? parseFloat(row.value.replace(/[$,]/g, "")) || 0 : row.value;
      
      if (row.name.includes("Input")) {
        const provider = row.name.replace(" Input", "").replace("Openai", "OpenAI");
        if (!providers[provider]) providers[provider] = { name: provider, input: 0, output: 0 };
        providers[provider].input = value;
      } else if (row.name.includes("Output")) {
        const provider = row.name.replace(" Output", "").replace("Openai", "OpenAI");
        if (!providers[provider]) providers[provider] = { name: provider, input: 0, output: 0 };
        providers[provider].output = value;
      }
    });
    
    const chartData = Object.values(providers);
    
    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }} />
          <YAxis axisLine={false} tickLine={false} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }} />
          <Tooltip 
            contentStyle={{ backgroundColor: "hsl(var(--popover))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }} 
            itemStyle={{ color: "hsl(var(--popover-foreground))" }}
            labelStyle={{ color: "hsl(var(--popover-foreground))" }}
          />
          <Bar dataKey="input" fill="#22D3EE" name="Input" radius={[4, 4, 0, 0]} />
          <Bar dataKey="output" fill="#A78BFA" name="Output" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    );
  }
  
  let chartData = rows.map(r => ({ 
    name: r.name.replace(/^(Gemini |Openai |OpenAI )/, "").slice(0, 12), 
    value: typeof r.value === "string" ? parseFloat(r.value.replace(/[$,]/g, "")) || 0 : r.value,
    fullName: r.name,
    type: r.type,
    originalValue: r.value
  }));

  // For Cost Metrics, apply scaling
  if (table.title === "Cost Metrics") {
    chartData = chartData.map(r => ({ 
      ...r,
      name: r.fullName.replace(" Cost", "").replace(" / Request", "").replace("Openai", "OpenAI"), 
      value: r.value * 1000
    }));
  }

  // Request Metrics - Pie Chart
  if (table.title === "Request Metrics") {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={chartData} cx="50%" cy="50%" innerRadius={40} outerRadius={70} paddingAngle={3} dataKey="value">
            {chartData.map((_, i) => <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />)}
          </Pie>
          <Tooltip 
            contentStyle={{ backgroundColor: "hsl(var(--popover))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }} 
            itemStyle={{ color: "hsl(var(--popover-foreground))" }}
            labelStyle={{ color: "hsl(var(--popover-foreground))" }}
            formatter={(value, name, props) => [value, props.payload.fullName || name]}
          />
        </PieChart>
      </ResponsiveContainer>
    );
  }

  // Error Metrics - Radar Chart
  if (table.title.includes("Error")) {
    const errorChartData = rows.map(r => ({
      name: r.name.replace(" Errors", "").replace("Openai", "OpenAI"),
      value: typeof r.value === "string" ? parseFloat(r.value.replace(/[$,]/g, "")) || 0 : r.value,
      fullName: r.name
    }));
    
    return (
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={errorChartData}>
          <PolarGrid stroke="rgba(255,255,255,0.1)" />
          <PolarAngleAxis 
            dataKey="name" 
            tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }} 
          />
          <PolarRadiusAxis 
            angle={90} 
            tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 9 }} 
          />
          <Radar 
            name="Errors" 
            dataKey="value" 
            stroke="#EF4444" 
            fill="#EF4444" 
            fillOpacity={0.6}
            dot={{ r: 4, fill: "#EF4444", strokeWidth: 2, stroke: "#DC2626" }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: "hsl(var(--card))", 
              border: "1px solid hsl(var(--border))", 
              borderRadius: "8px", 
              color: "hsl(var(--foreground))" 
            }}
            formatter={(value, name, props) => [value + ' errors', props.payload.fullName || name]}
          />
        </RadarChart>
      </ResponsiveContainer>
    );
  }
  
  // Latency/Kafka - Area Chart
  if (table.title.includes("Latency") || table.title.includes("Kafka")) {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id={`gradient-${index}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.3} />
              <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 9 }} interval={0} angle={-20} textAnchor="end" height={50} />
          <YAxis axisLine={false} tickLine={false} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }} />
          <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", color: "hsl(var(--foreground))" }} />
          <Area type="monotone" dataKey="value" stroke={color} strokeWidth={2} fill={`url(#gradient-${index})`} dot={{ r: 3, fill: color }} />
        </AreaChart>
      </ResponsiveContainer>
    );
  }

  // Default - Bar Chart
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={chartData}>
        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 9 }} interval={0} angle={-20} textAnchor="end" height={50} />
        <YAxis axisLine={false} tickLine={false} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }} />
        <Tooltip 
          contentStyle={{ backgroundColor: "hsl(var(--popover))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }} 
          itemStyle={{ color: "hsl(var(--popover-foreground))" }}
          labelStyle={{ color: "hsl(var(--popover-foreground))" }}
          formatter={(value, name, props) => [value, props.payload.fullName || name]}
        />
        <Bar dataKey="value" radius={[4, 4, 0, 0]}>
          {chartData.map((_, i) => <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />)}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export function MetricTableWithChart({ table, index }: MetricTableWithChartProps) {
  const colors = tableColors[table.title] || { gradient: "from-violet-500 to-purple-600", primary: "#8B5CF6" };

  return (
    <div className="relative group">
      <div className={`absolute -inset-0.5 bg-gradient-to-r ${colors.gradient} rounded-2xl blur opacity-10 group-hover:opacity-20 transition duration-300`} />
      <div className="relative bg-gradient-to-br from-white/[0.03] to-transparent border border-white/10 rounded-2xl overflow-hidden backdrop-blur-xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-white/5">
          {/* Table Side */}
          <div className="flex flex-col">
            <div className="px-5 py-4 border-b border-white/5 flex items-center gap-3 bg-white/[0.02]">
              <div className={`p-2 rounded-lg bg-gradient-to-br ${colors.gradient}`}>
                <span className="text-white">{tableIcons[table.title]}</span>
              </div>
              <h3 className="font-semibold text-foreground">{table.title}</h3>
            </div>
            <div className="overflow-x-auto flex-1">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/5 bg-white/[0.01]">
                    {table.isCustomTable && table.providers ? (
                      <>
                        <th className="px-5 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Provider</th>
                        <th className="px-5 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">Requests</th>
                        <th className="px-5 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">Latency</th>
                        <th className="px-5 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">Errors</th>
                      </>
                    ) : table.isCustomTable && table.agents ? (
                      <>
                        <th className="px-5 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Agent</th>
                        <th className="px-5 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">Requests</th>
                        <th className="px-5 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">Errors</th>
                      </>
                    ) : (
                      <>
                        <th className="px-5 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Metric</th>
                        <th className="px-5 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Type</th>
                        <th className="px-5 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">Value</th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {table.isCustomTable && table.providers ? (
                    table.providers.map((provider, idx) => (
                      <tr key={idx} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                        <td className="px-5 py-3.5 font-medium text-foreground">{provider.name}</td>
                        <td className="px-5 py-3.5 text-right font-mono text-foreground">{provider.requests}</td>
                        <td className="px-5 py-3.5 text-right font-mono text-amber-400">{provider.latency} ms</td>
                        <td className="px-5 py-3.5 text-right">
                          <span className={`font-mono ${provider.errors > 0 ? "text-rose-400" : "text-emerald-400"}`}>
                            {provider.errors}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : table.isCustomTable && table.agents ? (
                    table.agents.map((agent, idx) => (
                      <tr key={idx} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                        <td className="px-5 py-3.5 font-medium text-foreground">{agent.name}</td>
                        <td className="px-5 py-3.5 text-right font-mono text-foreground">{agent.requests}</td>
                        <td className="px-5 py-3.5 text-right">
                          <span className={`font-mono ${agent.errors > 0 ? "text-rose-400" : "text-emerald-400"}`}>
                            {agent.errors}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    table.rows?.map((row, idx) => (
                      <tr key={idx} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                        <td className="px-5 py-3.5 font-medium text-foreground">{row.name}</td>
                        <td className="px-5 py-3.5">
                          <Badge
                            variant={row.type === "LLM" ? "default" : "secondary"}
                            className={row.type === "LLM" ? "bg-violet-500/20 text-violet-300 border-violet-500/30 text-[10px]" : "text-[10px]"}
                          >
                            {row.type}
                          </Badge>
                        </td>
                        <td className="px-5 py-3.5 text-right font-mono text-foreground">{row.value}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Chart Side */}
          <div className="p-5 flex flex-col">
            <h4 className="text-sm font-medium text-muted-foreground mb-4">{table.title} Visualization</h4>
            <div className="flex-1 min-h-[200px]">
              <TableChart table={table} index={index} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
