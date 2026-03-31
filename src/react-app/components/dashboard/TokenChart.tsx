import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface TokenChartProps {
  data: { name: string; input: number; output: number }[];
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: '8px',
        padding: '10px',
        color: 'white'
      }}>
        <p style={{ margin: 0, fontWeight: 'bold', marginBottom: '5px' }}>{payload[0].payload.name}</p>
        <p style={{ margin: 0, color: '#22D3EE' }}>Input: {payload[0].payload.Input}</p>
        <p style={{ margin: 0, color: '#A78BFA' }}>Output: {payload[0].payload.Output}</p>
      </div>
    );
  }
  return null;
};

export function TokenChart({ data }: TokenChartProps) {
  const chartData = data.map((item) => ({
    name: item.name,
    Input: item.input,
    Output: item.output,
  }));

  return (
    <div className="relative group h-full">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-violet-500 rounded-2xl blur opacity-10 group-hover:opacity-20 transition duration-300" />
      <div className="relative bg-gradient-to-br from-cyan-500/5 to-violet-500/5 border border-white/10 rounded-2xl p-6 h-full backdrop-blur-xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Token Consumption</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Input vs Output by Provider</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-cyan-400 to-cyan-500" />
              <span className="text-xs text-muted-foreground">Input</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-violet-400 to-purple-500" />
              <span className="text-xs text-muted-foreground">Output</span>
            </div>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={chartData} key={JSON.stringify(chartData)}>
            <defs>
              <linearGradient id="inputGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#22D3EE" />
                <stop offset="100%" stopColor="#06B6D4" />
              </linearGradient>
              <linearGradient id="outputGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#A78BFA" />
                <stop offset="100%" stopColor="#8B5CF6" />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="name" stroke="rgba(255,255,255,0.3)" />
            <YAxis stroke="rgba(255,255,255,0.3)" />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="Input" fill="url(#inputGradient)" />
            <Bar dataKey="Output" fill="url(#outputGradient)" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
