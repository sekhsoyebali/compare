"use client"

import React from 'react';
import { Bar, BarChart as RechartsBarChart, XAxis, YAxis, Cell, TooltipProps } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

// Add this custom type
type CustomChartConfig = ChartConfig & {
  [key: string]: {
    tokenName?: string;
    label?: React.ReactNode;
    color?: string;
    icon?: React.ComponentType<{}>;
    theme?: Record<"light" | "dark", string>;
  };
};

type BarChartProps = {
  data: Array<{
    name: string;
    [key: string]: string | number;
    color: string;
  }>;
  title: string;
  description: string;
  dataKey: string;
  config: CustomChartConfig;  // Use CustomChartConfig instead of ChartConfig
}

const BarChart: React.FC<BarChartProps> = ({ data, title, description, dataKey, config }) => {
  const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      const color = config[label]?.color || '#000000';
      return (
        <div className="rounded-lg border bg-background p-2 shadow-sm">
          <div className="flex items-center">
            <div className="mr-2 h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
            <span className="font-medium">{config[label]?.label || label}</span>
          </div>
          <div className="mt-1">
            <span className="text-muted-foreground">{payload[0].name}: </span>
            <span className="font-medium">{payload[0].value}</span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className='bg-gray-800 border shadow border-gray-700'>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={config}>
          <RechartsBarChart
            data={data}
            layout="vertical"
            margin={{
              left: 0,
            }}
          >
            <YAxis
              dataKey="name"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              width={100}
              tickFormatter={(value) =>
                config[value]?.tokenName || value
              }
            />
            <XAxis type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<CustomTooltip />}
            />
            <Bar 
              dataKey={dataKey}
              radius={5}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </RechartsBarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export default BarChart;