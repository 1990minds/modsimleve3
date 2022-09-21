import React,{useState} from 'react'
import { Table, Col, Row, Card, } from 'antd';
import {useDispatch,useSelector} from 'react-redux'
import {companySelector} from '../../api/company'
import styled from 'styled-components'
import moment from 'moment'

import {PlusOutlined} from '@ant-design/icons'

export default function LogTable({data, intialdata, loading}) {

  const [page, setPage] = useState(1);

    const dispatch = useDispatch()
      
      const cancel = (e) =>{
        return null
      }

      
    const columns = [
        {
            title: 'Sl. No.',
            key: 'Sl.No.',
            width: 100,
            render:(t, k, i)=>{
              return <p class="m-0 ">{(page - 1) * 10 + (i+1)}</p>
            }
          },
    
        {
          title: 'Event',
          dataIndex: 'event',
          key: 'event',
          width: 200,
          render: (item) => {
            return <p className="m-0 capitalize">{item}</p>
             }
        },
        {
          title: 'Date',
          dataIndex: 'createdAt',
          key: 'createdAt',
          width: 200,
          render:(createdAt)=>{
            return <small style={{fontSize:'14px'}} className="my-0 mr-3">{moment(createdAt).format('DD/MM/YYYY')}</small>
        }
        },
        {
          title: 'Time',
          dataIndex: 'updatedAt',
          key: 'updatedAt',
          width: 200,
          render:(updatedAt)=>{
            return <p className="m-0">{ moment(updatedAt).format('LT')}</p>
        }
         
        },
        {
          title: 'Updated By',
          dataIndex: 'updated_by',
          key: 'updated_by',
          width: 200,
        },
            
      ];

      return (  
      <>
      <div className="tabled">
      <Row gutter={[24, 0]}>
        <Col xs="24" xl={24}>
          <Card
            bordered={false}
            className="criclebox tablespace mb-24"
            // title="Customer Table"
            extra={
              <>

              </>
            }
          >
            <div className="table-responsive">
              <Table
     
        // rowSelection={{
        //   type: selectionType,
        //   ...rowSelection,
        // }}  
        loading={loading} 
        pagination={{
          onChange(current) {
            setPage(current)
          }
        }}
        className="ant-border-space "
           rowKey={record => record._id}
            columns={columns}
            dataSource={data} /> 
               </div>
            </Card>
          </Col>
        </Row>
      </div>
    </>
    )
}
  

const Tabelwrap = styled.div`

.text-danger{
  zindex: '100'
}
.Tabelwrap{
  
  box-shadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.6)"
}
`