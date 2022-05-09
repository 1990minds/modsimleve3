
import React, { useState, useLayoutEffect} from 'react'
import Layout from '../../components/layout/Main'
import {fetchAllproject, projectSelector} from '../../api/project'
import {useDispatch, useSelector} from 'react-redux'
import { useEffect } from 'react'
import Createproduct from './createproduct'
// import ExcelBtn from './exportexcel'
import axios from 'axios'
import {authenticateSelector} from '../../api/authSlice';
import {SearchOutlined,SyncOutlined} from '@ant-design/icons'
import { useDebounce } from "use-debounce";
import { keyUri, config } from '../../key'
import styled from 'styled-components'
import { Tabs, Button, Input,Upload } from 'antd';
import { Row, Col } from 'antd';
import { fetchOneproduct, fetchProjectProducts } from '../../api/product'
import {useParams} from 'react-router-dom'
import {useLocation, Link} from 'react-router-dom'
import { Card, Avatar } from 'antd';
// import './index.css'

const { Meta } = Card;


const { Search } = Input;

export default function Product() {

    const dispatch = useDispatch()
    const { loading ,all_product,current_project    , } = useSelector(projectSelector) 
    const { project_products } = useSelector(projectSelector) 
    const { product_id } = useSelector(authenticateSelector) 
    const {id}= useParams()
    const [filter,setFilter]=useState([])
    const [search, setSearch] = useState('')
  
    console.log(project_products)
  
  console.log(id)
    const [productAddVisible, SetProductAddVisible] = useState(false)
  

    useEffect(()=>{

        dispatch(fetchOneproduct(id))
        dispatch(fetchProjectProducts(id)) 
      }, [dispatch])
  
  
 
  
  
     const handleCancel = () => {
       SetProductAddVisible(false)
     };
   

console.log(filter);
  
 

        useEffect(()=>{     
          if(filter?.length < 1) {
            setSearch('')
          }
           }, [filter])
        
        
        const onSearch = (e) => {
          
          setSearch(e.target.value)
        
        }


  return (
    <Layout>

<div className='grid grid-cols-4 gap-x-28'>

{
 project_products.map((item)=>{
   return  <Link to={`/dashboard/panel/${item._id}`}  >

   <Card
    style={{}}
    cover={
      <img
        alt="example"
        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
      />
    }
   
  >
    <Meta
     
      title="MODSIM"
      
    />
  </Card>
  </Link> 
})}
</div>


<Row>
      <Col span={8}>
      <Createproduct cancel={()=>SetProductAddVisible(!productAddVisible)} current_project={current_project}/>
      </Col>
      <Col span={3} offset={10} >
      {/* <SearchWrap>

<Input value={search}  className="px-4 py-2 focus:outline-none"
prefix ={  <SearchOutlined  style={{color:'#3e79f7', fontWeight:'bold' ,padding:'0px'}} />
}
placeholder="Search" onChange={onSearch}  />
</SearchWrap> */}
 
        </Col>
        <Col span={3} className='' style={{ display: 'flex', justifyContent: 'end' }}>
        {/* <ExcelBtn data={all_product} /> */}
      </Col>
      </Row>
       
    </Layout>
  )


}

 const SearchWrap = styled.div`
  

  .ant-input-affix-wrapper{
  padding: 0px !important;
  padding-left: 12px !important;
  padding-right: 8px !important;
  border-radius: 10px !important;
  border-color: transparent !important;
  box-shadow: 6px 6px 5px #F1F1F1;  
  }
`