import React, { PureComponent } from 'react';
import styled from 'styled-components'
import {LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend} from 'recharts';






export default function Graph(data) {


const CustomTooltip = ({ payload, label, active }) => {
  if (active && payload) {

    return (
      <div className=" bg-light shadow-sm px-3  rounded">
        {/* <p style={{color:"#8884D8"}} className="label mb-1">total sales : <b> ₹{payload[0].value}</b></p> */}
        {/* <p className="intro">{label}</p> */}
        <p   style={{color:"#82CA9D"}}>total Customers : <b>{payload[0].payload.orders}</b> </p>
      </div>
    );
  }

  return null;
}


    return (
        <GraphWrap width="100%" style={{height:'40vh'}}> 
        <ResponsiveContainer>
        <LineChart
        // width={600}
        // height={320}
        data={data.data}
        margin={{
          top: 15, right: 1, left: 5, bottom: 5,
        }}
        >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="_id" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
                <Legend />
        {/* <Line type="monotone" style={{marginTop:"20px"}} dataKey="totalSale" stroke="#8884d8" activeDot={{ r: 6 }} /> */}
        <Line type="monotone" style={{marginTop:"20px"}} dataKey="Customers" stroke="#1bc943" activeDot={{ r: 6 }}/>

       </LineChart>
       </ResponsiveContainer> 
       </GraphWrap>
    )
}


const GraphWrap = styled.div`


`