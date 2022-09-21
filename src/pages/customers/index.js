import React, {useEffect, useState,} from 'react'
import Layout  from '../../components/layout/Main'
import {useDispatch, useSelector} from 'react-redux'
import CustomersTable from './datatable'
import ExcelBtn from './expoertexcel'
import axios from 'axios'
import {SearchOutlined,} from '@ant-design/icons'
import { useDebounce } from "use-debounce";
import { keyUri, } from '../../key'
import styled from 'styled-components'
import {  Breadcrumb, Input,Tooltip } from 'antd';
import { Row, Col } from 'antd';
import './index.css'
import {fetchAllcompanycustomers,customersSelector} from '../../api/customers'
import Createcustomers from './createcustomers'
import {authenticateSelector} from '../../api/authSlice'
import { Link } from 'react-router-dom'

const { Search } = Input;

  export default function Database() {

    const dispatch = useDispatch()
    const { all_customers, loading:load} = useSelector(customersSelector) 
    const { user} = useSelector(authenticateSelector) 
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(false)
    const [filter,setFilter]=useState([])
    const [debouncedText] = useDebounce(search, 2000);
   
  
    const [customersAddVisible, SetCustomersAddVisible] = useState(false)


    
    useEffect(()=>{

        dispatch(fetchAllcompanycustomers(user?.company?._id))

     }, [user])

  



  const handleCancel = () => {
    SetCustomersAddVisible(false)
  };
  useEffect(()=>{

    axios.get(keyUri.BACKEND_URI +`/companycustomers/${user?.company?._id}?search=${debouncedText}`).then(({data})=>{

      setFilter(data?.filtercustomers)
       })
  setLoading(false)
   }, [dispatch, debouncedText])


useEffect(()=>{     
  if(filter?.length < 1) {
    setSearch('')
  }
   }, [filter])


const onSearch = (e) => {
  setLoading(true)
  setSearch(e.target.value)

}


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

<h1 style={{ fontSize:'1.5rem', fontWeight: '700' , paddingBottom: '10px' }}>Customers</h1>
<Row>
      <Col  flex="1 1 200px">
      <Createcustomers />
      </Col>
      <Col flex="0 1 300px" >
        <SearchWrap >
      <Tooltip placement="topLeft" title="Search for Name, Email, Phone No" arrowPointAtCenter>
      

<Input value={search}  className="px-4 py-2 focus:outline-none"
prefix ={  <SearchOutlined  style={{color:'#3e79f7', fontWeight:'bold',}} />
}
placeholder="Search" onChange={onSearch}  />
</Tooltip>
</SearchWrap>

        </Col>
        <Col  style={{ display: 'flex', justifyContent: 'end' }}>
       <ExcelBtn data={all_customers} />
       </Col>
       </Row>
        <CustomersTable data={(filter?.length > 0) ? filter :all_customers} loading={loading || load}  user={user}/>
        
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
  width: 70% !important  
  }
`