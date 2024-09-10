"use client"

import React from "react"
import { PolarAngleAxis, PolarGrid, Radar, RadarChart as RechartsRadarChart, ResponsiveContainer, TooltipProps } from "recharts"

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

type RadarChartProps = {
  data: Array<{
    attribute: string;
    [key: string]: string | number;
  }>;
  title: string;
  description: string;
  config: ChartConfig;
}

const RadarChart: React.FC<RadarChartProps> = ({ data, title, description, config }) => {
  // Normalize data to percentages
  const normalizedData = data.map(item => {
    const { attribute, ...values } = item;
    const maxValue = Math.max(...Object.values(values).map(Number));
    const normalizedValues = Object.entries(values).reduce((acc, [key, value]) => {
      acc[key] = maxValue > 0 ? (Number(value) / maxValue) * 100 : 0;
      return acc;
    }, {} as Record<string, number>);
    return { attribute, ...normalizedValues };
  });

  const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      const originalData = data.find(item => item.attribute === label);
      return (
        <div className="rounded-lg border bg-background p-2 shadow-sm">
          <p className="font-semibold">{label}</p>
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center">
              <div className="mr-2 h-2 w-2 rounded-full" style={{ backgroundColor: entry.color }} />
              <span className="font-medium">{entry.name}: </span>
              <span className="ml-1">{originalData?.[entry.dataKey as keyof typeof originalData]}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const renderPolarAngleAxis = (props: any) => {
    const { payload, x, y, cx, cy, ...rest } = props;
    const lines = payload.value.split(' ');
    const lineHeight = 10;
    const dy = (lines.length - 1) * lineHeight / 2;

    return (
      <g transform={`translate(${x},${y})`}>
        {lines.map((line: string, index: number) => (
          <text
            key={index}
            x={0}
            y={index * lineHeight - dy}
            textAnchor="middle"
            fill="white"
            fontSize={9}
            style={{ fill: 'white', color: 'white' }}
            {...rest}
          >
            {line}
          </text>
        ))}
      </g>
    );
  };

  return (
    <Card className="w-full h-full bg-gray-800 border shadow border-gray-700">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="w-full aspect-square">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsRadarChart
              data={normalizedData}
              margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
            >
              <PolarGrid gridType="circle" />
              <PolarAngleAxis dataKey="attribute" />
              <ChartTooltip content={<CustomTooltip />} />
              {Object.keys(config).filter(key => key !== 'attribute').map((key) => (
                <Radar
                  key={key}
                  name={String(config[key].label)}
                  dataKey={key}
                  stroke={config[key].color}
                  fill={config[key].color}
                  fillOpacity={0.2}
              strokeWidth={2}
                />
              ))}
            </RechartsRadarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

export default RadarChart;