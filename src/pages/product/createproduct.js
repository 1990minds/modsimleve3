
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
import { Tabs,Skeleton, Button , Input,Upload } from 'antd';
import { Row, Col } from 'antd';
import {  fetchAllproduct,productSelector} from '../../api/product'
import { fetchProjectProducts } from '../../api/product'
import {useParams} from 'react-router-dom'
import {useLocation, Link} from 'react-router-dom'
import { Card, Avatar } from 'antd';
// import './index.css'

const { Meta } = Card;


const { Search } = Input;


// state = {
//   loading: false,
// };

// showSkeleton = () => {
//   this.setState({ loading: true });
//   setTimeout(() => {
//     this.setState({ loading: false });
//   }, 3000);
// };

export default function Product(item) {



    const dispatch = useDispatch()
    const { loading ,current_project    , } = useSelector(projectSelector) 
    const { all_product } = useSelector(productSelector) 
    const {id}= useParams()
    const [filter,setFilter]=useState([])
    const [search, setSearch] = useState('')
  
    console.log(all_product)
  
  console.log(id)
    const [productAddVisible, SetProductAddVisible] = useState(false)
  

    useEffect(()=>{

        dispatch(fetchAllproduct()) 
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

<Row>

{
 all_product.map((item)=>{ 
   return<Col span={6}> 
    {/* <Skeleton  loading={this.state.loading} > */}
    <Link to={`/auth/panel/${item?._id}?project=${id}`}  >
   <Card
   
    hoverable
    style={{ width: 100, paddingTop: '30px', marginTop: '20px', }}
    cover={
      <div  style={{ height: "40px"}}>
      {/* <img
        alt="example"
        src={item?.product_image}  
       
      /> */}
      </div>
    }
   
  >
    <Meta
     
      title={item?.product_name}
      description={item?.product_description}
      
    />
  </Card>
  </Link>
  {/* </Skeleton> */}
   </Col>
})}


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