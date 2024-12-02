"use client"

import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const SalesRecharts = ({data}:{data:any}) => {
  return (
   
<div className="">


<ResponsiveContainer  width="100%" height={300}>

<LineChart  className="w-full h-full" data={data} margin={{top:5, right:20, bottom:5 ,left:0}} >
<Line type="monotone" dataKey="sales" stroke="blue" />

<CartesianGrid stroke="green" strokeDasharray="5 5" />
<XAxis dataKey="name" />
<YAxis />
<Tooltip  />


</LineChart>
</ResponsiveContainer>


</div>
  )
}

export default SalesRecharts