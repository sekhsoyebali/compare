"use client"

import React from 'react';
import { CryptoData, allCryptos } from "@/app/blockchains"
import BarChart from './charts/BarChart'
import PieChart from './charts/PieChart'
import RadarChart from './charts/RadarChart'
import { ChartConfig } from "@/components/ui/chart"
import BarChartVertical from './charts/BarChart-Vertical';

// Use this custom type definition
type CustomChartConfig = ChartConfig & {
  [key: string]: {
    tokenName?: string;
    label?: React.ReactNode;
    color?: string;
    icon?: React.ComponentType<{}>;
    theme?: Record<"light" | "dark", string>;
  };
};

type ComparisonChartsProps = {
  comparisons: CryptoData[]
}

const ComparisonCharts: React.FC<ComparisonChartsProps> = ({ comparisons }) => {
  const chartColors = [
    'hsl(var(--chart-1))',
    'hsl(var(--chart-2))',
    'hsl(var(--chart-3))',
    'hsl(var(--chart-4))',
    'hsl(var(--chart-5))',
  ];

  const chartData = comparisons.map((crypto, index) => ({
    name: crypto.name,
    marketCap: crypto.metrics.market_cap,
    transactions: crypto.metrics.total_transactions,
    users: crypto.metrics.daily_active_users,
    color: chartColors[index % chartColors.length]
  }));

  const pieChartData = comparisons.map((crypto, index) => ({
    name: crypto.name,
    value: crypto.metrics.market_cap,
    fill: chartColors[index % chartColors.length]
  }));

  const radarChartData = [
    { attribute: 'TVL', ...comparisons.reduce((acc, crypto) => ({ ...acc, [crypto.name]: crypto.metrics.tvl }), {}) },
    { attribute: 'Daily Active Users', ...comparisons.reduce((acc, crypto) => ({ ...acc, [crypto.name]: crypto.metrics.daily_active_users }), {}) },
    { attribute: 'Market Cap', ...comparisons.reduce((acc, crypto) => ({ ...acc, [crypto.name]: crypto.metrics.market_cap }), {}) },
    { attribute: 'Token Price', ...comparisons.reduce((acc, crypto) => ({ ...acc, [crypto.name]: crypto.metrics.token_price }), {}) },
  ];

  const chartConfig: CustomChartConfig = {
    ...comparisons.reduce((acc, crypto, index) => {
      const cryptoInfo = Object.values(allCryptos).find(c => c.name === crypto.name);
      return {
        ...acc,
        [crypto.name]: {
          label: crypto.name,
          tokenName: cryptoInfo?.token || crypto.name,
          color: chartColors[index % chartColors.length],
        }
      };
    }, {}),
    attribute: { label: "Attribute" },
  };

  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 *:min-h-[200px]">
        <BarChartVertical
          data={chartData}
          title="Total Transactions Comparison"
          description="Comparison of total transactions"
          dataKey="transactions"
          config={chartConfig}  // Remove the type assertion
        />
        <BarChartVertical
          data={chartData}
          title="Daily Active Users Comparison"
          description="Comparison of daily active users"
          dataKey="users"
          config={chartConfig}  // Remove the type assertion
        />
        <PieChart
          data={pieChartData}
          title="Market Cap Distribution"
          description="Distribution of market capitalization"
          config={chartConfig}
        />
        <RadarChart
          data={radarChartData}
          title="Crypto Metrics Comparison"
          description="Comparison of TVL, Daily Active Users, Market Cap, and Token Price"
          config={chartConfig}
        />
    </div>
  )
}

export default ComparisonCharts;