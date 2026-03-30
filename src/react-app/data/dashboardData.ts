export interface KPI {
  id: string;
  title: string;
  value: number | string;
}

export interface ModelDistribution {
  model: string;
  percentage: number;
}

export interface MetricRow {
  name: string;
  type: string;
  labels: string;
  value: string | number;
}

export interface ProviderMetric {
  name: string;
  requests: number;
  latency: number;
  errors: number;
  tokens: number;
}

export interface AgentMetric {
  name: string;
  requests: number;
  errors: number;
}

export interface MetricTable {
  title: string;
  rows?: MetricRow[];
  isCustomTable?: boolean;
  providers?: ProviderMetric[];
  agents?: AgentMetric[];
}

export interface TokenUsage {
  name: string;
  input: number;
  output: number;
}

export interface CostData {
  day: string;
  cost: number;
}

export interface KPITrend {
  direction: "up" | "down" | "stable";
  value: string;
}

export interface DashboardData {
  meta: {
    kpis: (KPI & { trend?: KPITrend })[];
  };
  modelDistribution: ModelDistribution[];
  metricTables: MetricTable[];
  latencyFeed: number[];
  tokenUsage: TokenUsage[];
  costData: CostData[];
}

export const dashboardData: DashboardData = {
  meta: {
    kpis: [
      { value: 3, id: "total_requests", title: "Total Requests", trend: { direction: "up", value: "+12%" } },
      { value: 1590, id: "avg_latency", title: "Avg Latency", trend: { direction: "stable", value: "Stable" } },
      { value: "33.0%", id: "error_rate", title: "Error Rate", trend: { direction: "down", value: "-5.2%" } },
      { value: 512, id: "total_tokens", title: "Total Tokens", trend: { direction: "up", value: "+28%" } },
    ],
  },
  modelDistribution: [
    { percentage: 67, model: "gemini" },
    { percentage: 33, model: "openai" },
  ],
  metricTables: [
    {
      rows: [
        { labels: "provider:gemini", name: "Gemini Input", type: "LLM", value: 4 },
        { labels: "provider:gemini", name: "Gemini Output", type: "LLM", value: 64 },
        { labels: "provider:openai", name: "Openai Input", type: "LLM", value: 16 },
        { labels: "provider:openai", name: "Openai Output", type: "LLM", value: 428 },
      ],
      title: "Token Metrics",
    }, 
    {
      rows: [
        { labels: "provider:gemini", name: "Gemini Requests", type: "LLM", value: 2 },
        { labels: "provider:openai", name: "Openai Requests", type: "LLM", value: 1 },
      ],
      title: "Request Metrics",
    },
    {
      title: "LLM Provider Metrics",
      isCustomTable: true,
      providers: [
        { name: "Gemini", requests: 2, latency: 1974, errors: 0, tokens: 68 },
        { name: "Openai", requests: 1, latency: 1206, errors: 1, tokens: 444 },
      ],
    },
    {
      rows: [
        { labels: "-", name: "Total Wrapper Requests", type: "Generic", value: 3 },
        { labels: "provider:gemini", name: "Gemini Routed Requests", type: "LLM", value: 2 },
        { labels: "provider:openai", name: "Openai Routed Requests", type: "LLM", value: 1 },
        { labels: "-", name: "Wrapper Failures", type: "Generic", value: 1 },
      ],
      title: "Wrapper Metrics",
    },
    {
      rows: [
        { labels: "provider:gemini", name: "Gemini Cost", type: "LLM", value: "$0.075" },
        { labels: "provider:openai", name: "Openai Cost", type: "LLM", value: "$0.076" },
        { labels: "-", name: "Total LLM Cost", type: "Generic", value: "$0.038" },
        { labels: "-", name: "Avg Cost / Request", type: "Generic", value: "$0.004" },
      ],
      title: "Cost Metrics",
    },
    {
      rows: [
        { labels: "-", name: "Total Errors", type: "Generic", value: 1 },
        { labels: "-", name: "Wrapper Errors", type: "Generic", value: 1 },
        { labels: "provider:gemini", name: "Gemini Errors", type: "LLM", value: 0 },
        { labels: "provider:openai", name: "Openai Errors", type: "LLM", value: 1 },
      ],
      title: "Error Metrics",
    },
    {
      rows: [
        { labels: "-", name: "Wrapper Latency", type: "Generic", value: "1590 ms" },
        { labels: "provider:gemini", name: "Gemini Avg Latency", type: "LLM", value: "1974 ms" },
        { labels: "provider:openai", name: "Openai Avg Latency", type: "LLM", value: "1206 ms" },
        { labels: "-", name: "P95 Latency", type: "Generic", value: "0 ms" },
        { labels: "-", name: "Max Latency", type: "Generic", value: "0 ms" },
      ],
      title: "Latency Metrics",
    },
    {
      rows: [
        { labels: "-", name: "Metrics Produced", type: "Generic", value: 221 },
        { labels: "-", name: "Metrics Consumed", type: "Generic", value: 221 },
        { labels: "-", name: "Kafka Lag", type: "Generic", value: 0 },
        { labels: "-", name: "Failed Messages", type: "Generic", value: 0 },
      ],
      title: "Kafka Metrics",
    },
    {
      title: "Agent Metrics",
      isCustomTable: true,
      agents: [
        { name: "AI Assistant Agent", requests: 1, errors: 0 },
        { name: "PII Masking Agent", requests: 1, errors: 1 },
      ],
    },
  ],
  latencyFeed: [2499.0, 1206.0, 1448.0, 1823.0, 1567.0, 1890.0, 1345.0, 1678.0],
  tokenUsage: [
    { name: "Gemini", input: 4, output: 64 },
    { name: "OpenAI", input: 16, output: 428 },
  ],
  costData: [
    { day: "Mon", cost: 0.12 },
    { day: "Tue", cost: 0.08 },
    { day: "Wed", cost: 0.15 },
    { day: "Thu", cost: 0.11 },
    { day: "Fri", cost: 0.09 },
  ],
};
