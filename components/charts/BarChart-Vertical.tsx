"use client"

import React from 'react';
import { Bar, BarChart as RechartsBarChart, CartesianGrid, XAxis, YAxis, Cell, TooltipProps, Rectangle } from "recharts"
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

type BarChartVerticalProps = {
  data: Array<{
    name: string;
    [key: string]: string | number;
  }>;
  title: string;
  description: string;
  dataKey: string;
  config: CustomChartConfig;  // Use CustomChartConfig instead of ChartConfig
}

const BarChartVertical: React.FC<BarChartVerticalProps> = ({ 
  data, 
  title, 
  description, 
  dataKey, 
  config,
}) => {
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

  const CustomBar = (props: any) => {
    const { x, y, width, height, fill } = props;
    const radius = 5;
    return (
      <Rectangle 
        x={x} 
        y={y} 
        width={width} 
        height={height} 
        fill={fill} 
        radius={radius}
      />
    );
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
            margin={{
              top: 5,
              right: 10,
              left: 10,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => config[value]?.tokenName || value}
            />
            <YAxis hide />
            <ChartTooltip
              cursor={false}
              content={<CustomTooltip />}
            />
            <Bar dataKey={dataKey} shape={<CustomBar />}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={config[entry.name]?.color || '#000000'} />
              ))}
            </Bar>
          </RechartsBarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export default BarChartVertical;