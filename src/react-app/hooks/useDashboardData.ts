import { useState, useEffect } from "react";
import { DashboardData } from "@/react-app/data/dashboardData";

export function useDashboardData() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8082/internal/metrics");
        if (!response.ok) throw new Error("Failed to fetch metrics");
        const result = await response.json();
        
        // Extract cost data from Cost Metrics table
        const costTable = result.metricTables?.find((t: any) => t.title === "Cost Metrics");
        const totalCost = costTable?.rows?.find((r: any) => r.name === "Total LLM Cost")?.value || "$0.00";
        const costValue = parseFloat(totalCost.replace("$", ""));
        
        // Generate cost data for the last 5 days
        const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
        const costData = days.map((day, i) => ({
          day,
          cost: costValue > 0 ? costValue * (0.8 + Math.random() * 0.4) / 5 : 0
        }));
        
        // Extract token usage from Token Metrics table
        const tokenTable = result.metricTables?.find((t: any) => t.title === "Token Metrics");
        const tokenUsage = [];
        if (tokenTable?.rows) {
          const geminiInput = tokenTable.rows.find((r: any) => r.name === "Gemini Input")?.value || 0;
          const geminiOutput = tokenTable.rows.find((r: any) => r.name === "Gemini Output")?.value || 0;
          const openaiInput = tokenTable.rows.find((r: any) => r.name === "Openai Input")?.value || 0;
          const openaiOutput = tokenTable.rows.find((r: any) => r.name === "Openai Output")?.value || 0;
          
          tokenUsage.push(
            { name: "Gemini", input: geminiInput, output: geminiOutput },
            { name: "OpenAI", input: openaiInput, output: openaiOutput }
          );
        }
        
        const completeData = {
          ...result,
          tokenUsage: tokenUsage.length > 0 ? tokenUsage : result.tokenUsage,
          costData,
        };
        
        setData(completeData);
        setError(null);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, []);

  return { data, loading, error };
}
