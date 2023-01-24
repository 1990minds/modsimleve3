import React, { PureComponent } from 'react';
import styled from 'styled-components'
import { BarChart, Bar, XAxis, YAxis,Tooltip,ResponsiveContainer, Legend,CartesianGrid } from 'recharts';






export default function Graph(data) {


  console.log(data)

// const CustomTooltip = ({ payload, label, active }) => {
//   if (active && payload) {

//     return (
//       <div className=" bg-light shadow-sm px-3  rounded">
//         {/* <p style={{color:"#8884D8"}} className="label mb-1">total sales : <b> ₹{payload[0].value}</b></p> */}
//         {/* <p className="intro">{label}</p> */}
//         <p   style={{color:"#82CA9D"}}>total Customers : <b>{payload[0].payload.customers}</b> </p>
//       </div>
//     );
//   }

//   return null;
// }


    return (
        <GraphWrap width="50%" style={{height:'40vh'}}> 
        <ResponsiveContainer width="80%" height={320}>
        <BarChart
          data={data?.data}
          margin={{
          top: 5, right: 1, left: 0, bottom: 5,
          }}
          >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="_id" />
          <YAxis />
          <Tooltip  />
          <Legend />
          <Bar dataKey="project" barSize={40} fill="#1890FF"  />
          <Bar dataKey="status"  barSize={40} fill="#82ca9d" />
        </BarChart>
        </ResponsiveContainer>
        </GraphWrap>
    )
}


const GraphWrap = styled.div`


`