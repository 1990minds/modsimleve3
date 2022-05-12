import React, {useEffect, useState, useLayoutEffect} from 'react'
import Layout  from '../../components/layout/Main'
import {useDispatch, useSelector} from 'react-redux'
import CustomersTable from './datatable'
import ExcelBtn from './expoertexcel'
import axios from 'axios'
import {SearchOutlined,SyncOutlined} from '@ant-design/icons'
import { useDebounce } from "use-debounce";
import { keyUri, config } from '../../key'
import styled from 'styled-components'
import { Tabs, Button, Input,Upload } from 'antd';
import { Row, Col } from 'antd';
// import './index.css'
import {fetchAllcompanycustomers,customersSelector} from '../../api/customers'
import Createcustomers from './createcustomers'
import {authenticateSelector} from '../../api/authSlice'




const { Search } = Input;

  export default function Database() {

    const dispatch = useDispatch()
    const { all_customers} = useSelector(customersSelector) 
    const { user} = useSelector(authenticateSelector) 
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(false)
    const [filter,setFilter]=useState([])
    const [debouncedText] = useDebounce(search, 2000);
   
  
    const [customersAddVisible, SetCustomersAddVisible] = useState(false)

    console.log(user);
    useEffect(()=>{

        dispatch(fetchAllcompanycustomers(user?.company))

     }, [user])

    


  const handleCancel = () => {
    SetCustomersAddVisible(false)
  };
  useEffect(()=>{

    axios.get(keyUri.BACKEND_URI +`/customers?search=${debouncedText}`).then(({data})=>{
      console.log(
        'text'
      );
      console.log({data})

      setFilter(data?.filtercustomers)
       })
  setLoading(false)
   }, [dispatch, debouncedText])

console.log(filter);

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

<Row>
      <Col span={8}>
      <Createcustomers />
      </Col>
      <Col span={3} offset={10} >
      <SearchWrap className="mx-4 " style={{borderRadius:"4px"}}>

<Input value={search}  className="px-4 py-2 focus:outline-none"
prefix ={  <SearchOutlined  style={{color:'#3e79f7', fontWeight:'bold'}} />
}
placeholder="Search" onChange={onSearch}  />
</SearchWrap>
        </Col>
        <Col span={3} className='' style={{ display: 'flex', justifyContent: 'end' }}>
       <ExcelBtn data={all_customers} />
      </Col>
      </Row>
        <CustomersTable data={all_customers} />
        
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