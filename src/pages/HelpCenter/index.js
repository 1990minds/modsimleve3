import React from 'react'
import Layout from '../../components/layout/Main'
import '../../index.css'
import { Collapse } from 'antd';
import {PlusOutlined, MinusOutlined } from '@ant-design/icons'
import questions from './data'
import {  Breadcrumb, Input,Tooltip } from 'antd';
import { Link } from 'react-router-dom'

const { Panel } = Collapse;



function Index() {



  return (
    <Layout>    
          <Breadcrumb>
              <Breadcrumb.Item>
              <Link to="/"> Home </Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
              Customers 
              </Breadcrumb.Item>
            </Breadcrumb>

          <h1 style={{ fontSize:'1.5rem', fontWeight: '700' , paddingBottom: '10px' }}>Help Center</h1>


      <div style={{padding:'0 50px'}}>
        <Collapse
        ghost
        accordion 
        bordered={false}
        expandIconPosition="right"
        expandIcon={({ isActive }) => isActive ? <MinusOutlined />: <PlusOutlined />}
        className="collapse"
        >
            {
            questions.map((item, i)=>{
            return  <Panel header={item.title} key={i} className="panel" >
                  {item.content}
                  </Panel>
            })
            }

        </Collapse>
        </div>   
    </Layout>
  )
}

export default Index