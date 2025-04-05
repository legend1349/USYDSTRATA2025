"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Jan",
    total: 1500,
  },
  {
    name: "Feb",
    total: 1200,
  },
  {
    name: "Mar",
    total: 1800,
  },
  {
    name: "Apr",
    total: 2200,
  },
  {
    name: "May",
    total: 900,
  },
  {
    name: "Jun",
    total: 1500,
  },
  {
    name: "Jul",
    total: 2000,
  },
  {
    name: "Aug",
    total: 1800,
  },
  {
    name: "Sep",
    total: 2200,
  },
  {
    name: "Oct",
    total: 1200,
  },
  {
    name: "Nov",
    total: 900,
  },
  {
    name: "Dec",
    total: 1700,
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Bar dataKey="total" fill="#adfa1d" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}

