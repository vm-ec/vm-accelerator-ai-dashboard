# AI Apps Observability Dashboard

## Project Description

A real-time observability dashboard for monitoring AI/LLM applications with live metrics tracking. The dashboard provides comprehensive insights into AI model performance, costs, latency, errors, and token usage across multiple LLM providers (Gemini, OpenAI). It features dynamic data visualization with interactive charts and supports both Executive and Support view modes.

## Features

- **Real-time Metrics Monitoring** - Live data updates every 10 seconds from backend API
- **Dual View Modes** - Executive view for high-level insights and Support view for detailed metrics
- **Interactive KPI Cards** - Track total requests, average latency, error rates, and token usage with trend indicators
- **Multiple Chart Types** - Bar charts, line charts, pie charts, and area charts for different metric visualizations
- **LLM Provider Tracking** - Monitor performance across Gemini and OpenAI providers
- **Cost Analytics** - Track and visualize AI model costs over time
- **Token Usage Monitoring** - Input/output token tracking per provider
- **Latency Feed** - Real-time latency monitoring with visual indicators
- **Event Logging** - Live event stream with color-coded severity levels
- **Agent Metrics** - Track AI agent performance and error rates
- **Kafka Metrics** - Monitor message queue health and lag
- **Dark/Light Theme** - Toggle between dark and light modes
- **Responsive Design** - Fully responsive layout with glassmorphism UI effects

## Tech Stack

### Frontend
- **React 19** - UI framework
- **TypeScript** - Type-safe development
- **Vite** - Build tool and dev server
- **React Router 7** - Client-side routing
- **Recharts** - Data visualization library
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library
- **Radix UI** - Headless UI components
- **Class Variance Authority** - Component variant management

### Backend
- **Hono** - Lightweight web framework
- **Cloudflare Workers** - Serverless runtime (via Wrangler)

### Database & Storage
- **Cloudflare D1** - SQLite database
- **Cloudflare R2** - Object storage

### Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing
- **Mocha Vite Plugins** - Custom build plugins

## Project Structure

```
├── public/                          # Static assets
│   └── robots.txt
├── src/
│   ├── react-app/                   # Frontend React application
│   │   ├── components/
│   │   │   ├── dashboard/           # Dashboard-specific components
│   │   │   │   ├── KPICard.tsx      # Key Performance Indicator cards
│   │   │   │   ├── MetricTable.tsx  # Metric data tables
│   │   │   │   ├── MetricTableWithChart.tsx  # Combined table + chart view
│   │   │   │   ├── ModelDistributionChart.tsx  # Model usage pie chart
│   │   │   │   ├── LatencyFeed.tsx  # Real-time latency monitoring
│   │   │   │   ├── TokenChart.tsx   # Token usage visualization
│   │   │   │   ├── CostChart.tsx    # Cost tracking over time
│   │   │   │   └── EventLog.tsx     # Live event stream
│   │   │   └── ui/                  # Reusable UI components (Radix-based)
│   │   ├── data/
│   │   │   └── dashboardData.ts     # Mock/fallback data and types
│   │   ├── hooks/
│   │   │   └── useDashboardData.ts  # Custom hook for fetching metrics
│   │   ├── lib/
│   │   │   └── utils.ts             # Utility functions
│   │   ├── pages/
│   │   │   └── Home.tsx             # Main dashboard page
│   │   ├── App.tsx                  # Root application component
│   │   ├── main.tsx                 # Application entry point
│   │   └── index.css                # Global styles
│   ├── shared/
│   │   └── types.ts                 # Shared TypeScript types
│   └── worker/
│       └── index.ts                 # Cloudflare Worker backend
├── package.json                     # Dependencies and scripts
├── vite.config.ts                   # Vite configuration
├── wrangler.json                    # Cloudflare Workers configuration
├── tailwind.config.js               # Tailwind CSS configuration
├── tsconfig.json                    # TypeScript configuration
└── README.md                        # Project documentation
```

### Important Files Explanation

- **Home.tsx** - Main dashboard page with layout, view mode switching, and component orchestration
- **useDashboardData.ts** - Fetches metrics from `http://localhost:8082/internal/metrics` every 10 seconds
- **dashboardData.ts** - Contains TypeScript interfaces and fallback data structure
- **MetricTableWithChart.tsx** - Renders different chart types based on metric category (pie, bar, line, area)
- **wrangler.json** - Configures Cloudflare Workers with D1 database, R2 storage, and email service bindings

## Prerequisites

- **Node.js** - Version 18 or higher
- **npm** - Version 9 or higher
- **Backend API** - Metrics endpoint running on `http://localhost:8082/internal/metrics`

## Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd "_AI Apps- Observability Dashboard"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Verify configuration**
   - Ensure `wrangler.json` has correct database and bucket IDs
   - Check that Tailwind CSS and PostCSS configs are in place

## How to Run the Project

### Development Mode

```bash
npm run dev
```

The application will start on `http://localhost:5173` (default Vite port)

### Build for Production

```bash
npm run build
```

Builds the app for production to the `dist/` folder

### Preview Production Build

```bash
npm run preview
```

### Lint Code

```bash
npm run lint
```

## API Endpoints

The dashboard expects a backend API running on `http://localhost:8082` with the following endpoint:

### GET `/internal/metrics`

**Response Structure:**
```json
{
  "meta": {
    "kpis": [
      {
        "id": "total_requests",
        "title": "Total Requests",
        "value": 3,
        "trend": { "direction": "up", "value": "+12%" }
      }
    ]
  },
  "modelDistribution": [
    { "model": "gemini", "percentage": 67 },
    { "model": "openai", "percentage": 33 }
  ],
  "metricTables": [
    {
      "title": "Token Metrics",
      "rows": [
        { "name": "Gemini Input", "type": "LLM", "value": 4, "labels": "provider:gemini" }
      ]
    }
  ],
  "latencyFeed": [2499.0, 1206.0, 1448.0],
  "tokenUsage": [
    { "name": "Gemini", "input": 4, "output": 64 }
  ],
  "costData": [
    { "day": "Mon", "cost": 0.12 }
  ]
}
```

**Polling Interval:** 10 seconds

## Configuration

### Environment Variables

No environment variables are required for the frontend. The API endpoint is hardcoded in `useDashboardData.ts`:

```typescript
const response = await fetch("http://localhost:8082/internal/metrics");
```

To change the API endpoint, modify this URL in `src/react-app/hooks/useDashboardData.ts`.

### Ports

- **Frontend Dev Server:** `5173` (Vite default)
- **Backend API:** `8082` (expected)

### Cloudflare Configuration

The `wrangler.json` file configures:
- **D1 Database:** `019c893a-4bba-78ef-8343-f81e8bc01df0`
- **R2 Bucket:** `019c893a-4bba-78ef-8343-f81e8bc01df0`
- **Email Service:** `emails-service` binding
- **Observability:** Enabled with source maps

### Theme Configuration

The app uses CSS variables for theming (defined in `index.css`):
- Dark mode is enabled by default
- Toggle between light/dark using the sun/moon icon in the header
- Theme is controlled via the `dark` class on `document.documentElement`

## Screenshots or UI Description

### Main Dashboard Layout

1. **Header Section**
   - Logo with gradient glow effect
   - Live status indicator (green pulsing dot)
   - Last updated timestamp with spinning refresh icon
   - View mode toggle (Executive / Support)
   - Theme toggle button (Dark / Light)

2. **KPI Cards Row** (4 cards)
   - Total Requests (blue gradient)
   - Average Latency (amber gradient)
   - Error Rate (rose gradient)
   - Total Tokens (violet gradient)
   - Each card shows trend indicators (up/down arrows with percentages)

3. **Charts Row** (3 columns)
   - Token Usage Chart (bar chart with input/output tokens)
   - Model Distribution Chart (pie chart showing provider split)
   - Latency Feed (real-time line chart)

4. **Cost & Logs Row** (2 columns)
   - Cost Chart (area chart showing daily costs)
   - Event Log (scrollable list with color-coded events)

5. **Detailed Metrics Section** (Support View Only)
   - LLM Provider Metrics (table + line chart)
   - Token Metrics (table + bar chart)
   - Request Metrics (table + pie chart)
   - Cost Metrics (table + bar chart)
   - Error Metrics (table + area chart)
   - Latency Metrics (table + area chart)
   - Kafka Metrics (table + area chart)
   - Agent Metrics (table + line chart)

### Design Features
- Glassmorphism effects with backdrop blur
- Gradient borders and glow effects
- Smooth hover transitions
- Responsive grid layouts
- Ambient background gradients (violet, cyan, emerald, fuchsia)

## Future Enhancements

- **Historical Data Analysis** - Add date range selectors and historical trend analysis
- **Alert Configuration** - Set up custom alerts for threshold breaches
- **Export Functionality** - Export metrics data to CSV/PDF
- **User Authentication** - Add role-based access control
- **Custom Dashboards** - Allow users to create custom dashboard layouts
- **WebSocket Integration** - Replace polling with WebSocket for real-time updates
- **Multi-tenant Support** - Support multiple organizations/projects
- **Advanced Filtering** - Filter metrics by time range, provider, or agent
- **Anomaly Detection** - AI-powered anomaly detection in metrics
- **Cost Optimization Recommendations** - Suggest ways to reduce LLM costs
- **API Documentation** - Interactive API documentation with Swagger/OpenAPI
- **Mobile App** - Native mobile application for on-the-go monitoring

---


