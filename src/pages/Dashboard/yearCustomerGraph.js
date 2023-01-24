import React, { PureComponent } from 'react';
import styled from 'styled-components'
import { BarChart, Bar, XAxis, YAxis,Tooltip,ResponsiveContainer, Legend,CartesianGrid } from 'recharts';






export default function Graph(data) {


  console.log(data)




    return (
        <GraphWrap width="50%" style={{height:'40vh'}}> 
        <ResponsiveContainer width="70%" height={320}>
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
          <Bar dataKey="customers"  title="Created customers" barSize={40}  domain={[3.3, 5.6]} fill="#1890FF" />
          {/* <Bar dataKey="orders" fill="#82ca9d" /> */}
        </BarChart>
        </ResponsiveContainer>
        </GraphWrap>
    )
}


const GraphWrap = styled.div`


`