import { useEffect, useState } from "react";
import { Terminal } from "lucide-react";

interface LogEntry {
  time: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
}

export function EventLog() {
  const [logs, setLogs] = useState<LogEntry[]>([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await fetch("http://localhost:8083/ai/events?limit=20");
        if (response.ok) {
          const data = await response.json();
          console.log("Raw API data:", data);
          console.log("Is array:", Array.isArray(data));
          console.log("Length:", data?.length);
          if (Array.isArray(data) && data.length > 0) {
            const formattedLogs = data.map(event => ({
              time: event.timestamp,
              message: event.message,
              type: event.type
            }));
            console.log("Formatted logs:", formattedLogs);
            setLogs(formattedLogs);
          }
        }
      } catch (err) {
        console.error("Failed to fetch logs:", err);
      }
    };

    fetchLogs();
    const interval = setInterval(fetchLogs, 3000);
    return () => clearInterval(interval);
  }, []);

  const getTypeColor = (type: string) => {
    switch (type) {
      case "success": return "text-emerald-400";
      case "warning": return "text-amber-400";
      case "error": return "text-rose-400";
      default: return "text-blue-400";
    }
  };

  const getTypeDot = (type: string) => {
    switch (type) {
      case "success": return "bg-emerald-400";
      case "warning": return "bg-amber-400";
      case "error": return "bg-rose-400";
      default: return "bg-blue-400";
    }
  };

  return (
    <div className="relative group h-full">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-slate-500 to-slate-600 rounded-2xl blur opacity-10 group-hover:opacity-20 transition duration-300" />
      <div className="relative bg-card border border-white/10 rounded-2xl overflow-hidden h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-white/5 bg-white/[0.02]">
          <div className="p-2 rounded-lg bg-violet-500/10">
            <Terminal className="w-4 h-4 text-violet-400" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">System Event Stream</h3>
            <p className="text-[10px] text-muted-foreground">Real-time activity log</p>
          </div>
          <div className="ml-auto flex items-center gap-1.5 px-2 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] font-medium text-emerald-400">STREAMING</span>
          </div>
        </div>

        {/* Logs */}
        <div className="flex-1 overflow-y-auto p-4 font-mono text-sm space-y-2 max-h-[300px]" style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.1) transparent' }}>
          {logs.length === 0 ? (
            <div className="text-muted-foreground text-xs text-center py-4">Waiting for events...</div>
          ) : (
            logs.map((log, idx) => (
              <div 
                key={idx} 
                className="flex items-start gap-3 py-1 animate-in fade-in slide-in-from-bottom-2 duration-300"
              >
                <span className="text-muted-foreground text-xs min-w-[60px] pt-0.5">{log.time}</span>
                <div className={`w-1.5 h-1.5 rounded-full mt-1.5 ${getTypeDot(log.type)}`} />
                <span className={`${getTypeColor(log.type)} text-xs`}>{log.message}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
