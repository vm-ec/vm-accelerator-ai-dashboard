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
} from "lucide-react";

interface MetricTableProps {
  table: MetricTableType;
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
};

const tableColors: Record<string, string> = {
  "Token Metrics": "from-violet-500 to-purple-600",
  "Request Metrics": "from-blue-500 to-indigo-600",
  "LLM Provider Metrics": "from-emerald-500 to-teal-600",
  "Wrapper Metrics": "from-amber-500 to-orange-600",
  "Cost Metrics": "from-green-500 to-emerald-600",
  "Error Metrics": "from-rose-500 to-red-600",
  "Latency Metrics": "from-cyan-500 to-blue-600",
  "Kafka Metrics": "from-fuchsia-500 to-pink-600",
};

export function MetricTable({ table }: MetricTableProps) {
  const gradientClass = tableColors[table.title] || "from-violet-500 to-purple-600";

  if (table.isCustomTable && table.providers) {
    return (
      <div className="relative group">
        <div className={`absolute -inset-0.5 bg-gradient-to-r ${gradientClass} rounded-xl blur opacity-10 group-hover:opacity-20 transition duration-300`} />
        <div className="relative bg-card border border-border/50 rounded-xl overflow-hidden backdrop-blur-sm">
          <div className="px-4 py-3 border-b border-border/50 flex items-center gap-2">
            <div className={`p-1.5 rounded-md bg-gradient-to-br ${gradientClass}`}>
              <span className="text-white">{tableIcons[table.title]}</span>
            </div>
            <h3 className="font-semibold text-foreground">{table.title}</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/30">
                  <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Provider
                  </th>
                  <th className="px-4 py-2.5 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Requests
                  </th>
                  <th className="px-4 py-2.5 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Latency
                  </th>
                  <th className="px-4 py-2.5 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Errors
                  </th>
                  <th className="px-4 py-2.5 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Tokens
                  </th>
                </tr>
              </thead>
              <tbody>
                {table.providers.map((provider, idx) => (
                  <tr
                    key={provider.name}
                    className={`${idx !== table.providers!.length - 1 ? "border-b border-border/20" : ""} hover:bg-muted/30 transition-colors`}
                  >
                    <td className="px-4 py-3 font-medium text-foreground">{provider.name}</td>
                    <td className="px-4 py-3 text-right font-mono text-foreground">{provider.requests}</td>
                    <td className="px-4 py-3 text-right font-mono text-amber-400">{provider.latency} ms</td>
                    <td className="px-4 py-3 text-right">
                      <span className={`font-mono ${provider.errors > 0 ? "text-rose-400" : "text-emerald-400"}`}>
                        {provider.errors}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right font-mono text-foreground">{provider.tokens}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative group">
      <div className={`absolute -inset-0.5 bg-gradient-to-r ${gradientClass} rounded-xl blur opacity-10 group-hover:opacity-20 transition duration-300`} />
      <div className="relative bg-card border border-border/50 rounded-xl overflow-hidden backdrop-blur-sm">
        <div className="px-4 py-3 border-b border-border/50 flex items-center gap-2">
          <div className={`p-1.5 rounded-md bg-gradient-to-br ${gradientClass}`}>
            <span className="text-white">{tableIcons[table.title]}</span>
          </div>
          <h3 className="font-semibold text-foreground">{table.title}</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/30">
                <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Metric
                </th>
                <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Type
                </th>
                <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Labels
                </th>
                <th className="px-4 py-2.5 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Value
                </th>
              </tr>
            </thead>
            <tbody>
              {table.rows?.map((row, idx) => (
                <tr
                  key={`${row.name}-${idx}`}
                  className={`${idx !== (table.rows?.length ?? 0) - 1 ? "border-b border-border/20" : ""} hover:bg-muted/30 transition-colors`}
                >
                  <td className="px-4 py-3 font-medium text-foreground">{row.name}</td>
                  <td className="px-4 py-3">
                    <Badge
                      variant={row.type === "LLM" ? "default" : "secondary"}
                      className={row.type === "LLM" ? "bg-violet-500/20 text-violet-300 border-violet-500/30" : ""}
                    >
                      {row.type}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    {row.labels !== "-" ? (
                      <code className="text-xs bg-muted/50 px-2 py-1 rounded text-cyan-400">
                        {row.labels}
                      </code>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-foreground">{row.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
