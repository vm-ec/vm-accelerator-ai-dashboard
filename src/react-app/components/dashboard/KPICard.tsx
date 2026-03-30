import { Activity, Clock, AlertTriangle, Coins, TrendingUp, TrendingDown, Minus } from "lucide-react";

interface KPICardProps {
  id: string;
  title: string;
  value: number | string;
  trend?: {
    direction: "up" | "down" | "stable";
    value: string;
  };
}

const iconMap: Record<string, React.ReactNode> = {
  total_requests: <Activity className="w-5 h-5" />,
  avg_latency: <Clock className="w-5 h-5" />,
  error_rate: <AlertTriangle className="w-5 h-5" />,
  total_tokens: <Coins className="w-5 h-5" />,
};

const colorMap: Record<string, string> = {
  total_requests: "from-blue-500 to-cyan-500",
  avg_latency: "from-amber-500 to-orange-500",
  error_rate: "from-rose-500 to-red-600",
  total_tokens: "from-violet-500 to-purple-600",
};

const glowMap: Record<string, string> = {
  total_requests: "shadow-blue-500/30",
  avg_latency: "shadow-amber-500/30",
  error_rate: "shadow-rose-500/30",
  total_tokens: "shadow-violet-500/30",
};

const bgGlowMap: Record<string, string> = {
  total_requests: "from-blue-500/10 to-cyan-500/5",
  avg_latency: "from-amber-500/10 to-orange-500/5",
  error_rate: "from-rose-500/10 to-red-600/5",
  total_tokens: "from-violet-500/10 to-purple-600/5",
};

export function KPICard({ id, title, value, trend }: KPICardProps) {
  const displayValue = id === "avg_latency" ? `${value} ms` : value;
  
  const getTrendColor = () => {
    if (!trend) return "";
    if (id === "error_rate") {
      return trend.direction === "up" ? "text-rose-400" : "text-emerald-400";
    }
    return trend.direction === "up" ? "text-emerald-400" : trend.direction === "down" ? "text-rose-400" : "text-blue-400";
  };

  const getTrendIcon = () => {
    if (!trend) return null;
    if (trend.direction === "up") return <TrendingUp className="w-3.5 h-3.5" />;
    if (trend.direction === "down") return <TrendingDown className="w-3.5 h-3.5" />;
    return <Minus className="w-3.5 h-3.5" />;
  };
  
  return (
    <div className="relative group">
      {/* Outer glow */}
      <div className={`absolute -inset-0.5 bg-gradient-to-r ${colorMap[id] || "from-violet-500 to-purple-600"} rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500`} />
      
      {/* Card */}
      <div className={`relative bg-gradient-to-br ${bgGlowMap[id] || "from-violet-500/10 to-purple-600/5"} border border-white/10 rounded-2xl p-6 backdrop-blur-xl overflow-hidden`}>
        {/* Background decoration */}
        <div className={`absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br ${colorMap[id] || "from-violet-500 to-purple-600"} rounded-full blur-3xl opacity-20`} />
        
        <div className="relative">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-xl bg-gradient-to-br ${colorMap[id] || "from-violet-500 to-purple-600"} shadow-lg ${glowMap[id] || "shadow-violet-500/30"}`}>
              <span className="text-white">{iconMap[id] || <Activity className="w-5 h-5" />}</span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] font-medium text-emerald-400 uppercase tracking-wider">Live</span>
            </div>
          </div>
          
          {/* Value */}
          <p className="text-4xl font-bold text-foreground tracking-tight mb-1">{displayValue}</p>
          
          {/* Title & Trend */}
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground font-medium">{title}</p>
            {trend && (
              <div className={`flex items-center gap-1 text-xs font-semibold ${getTrendColor()}`}>
                {getTrendIcon()}
                <span>{trend.value}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
