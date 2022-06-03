import React from 'react'
import { useState, useEffect } from 'react';
import Layout from '../../components/layout/Main'
import Createtickets from './createtickets'
import { Tabs, Button, Input,Upload, Tooltip } from 'antd';
import {fetchAllCompanyTickets,ticketsSelector} from '../../api/tickets'
import {useDispatch, useSelector} from 'react-redux'
import {authenticateSelector} from '../../api/authSlice'
import axios from 'axios'
import { fetchOneCompany,companySelector } from '../../api/company'
import {SearchOutlined,SyncOutlined} from '@ant-design/icons'
import { useDebounce } from "use-debounce";
import { keyUri, config } from '../../key'
import styled from 'styled-components'
import { Row, Col } from 'antd';
import {useParams} from 'react-router-dom'
import Tickettabel from './tickettabel'
const { Search } = Input;

  export default function Database() {

    
    const {id}= useParams()
    const dispatch=useDispatch()    
    const {all_tickets}=useSelector(ticketsSelector)
    const {current_company,loader}=useSelector(companySelector)
    const { user } = useSelector(authenticateSelector) 
    
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(false)
    const [filter,setFilter]=useState([])
    const [debouncedText] = useDebounce(search, 2000);

    console.log(all_tickets);

    console.log({user});
   


  useEffect(()=>{

    axios.get(keyUri.BACKEND_URI +`/companytickets/${user?._id}?search=${debouncedText}`).then(({data})=>{
 


      setFilter(data?.filtertickets)
       })
  setLoading(false)
   }, [debouncedText])

console.log(filter);
 


useEffect(()=>{
  dispatch(fetchAllCompanyTickets(user?._id))
},[user])

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
      < Createtickets  />
     
      </Col>
      <Col span={3} offset={10} >
      <Tooltip placement="top" title="Search by Ticket ID">
      <SearchWrap className="mx-4 " style={{borderRadius:"20px"}}>
      <Input value={search}  className="px-4 py-2 focus:outline-none"
        prefix ={  <SearchOutlined  style={{color:'#3e79f7', fontWeight:'bold'}} />
        }
        placeholder="Search" onChange={onSearch}  />
        </SearchWrap>
        </Tooltip>
        </Col> 
         {/* <Col span={3} className='' style={{ display: 'flex', justifyContent: 'end' }}>
        <ExcelBtn data={all_parts}  />
      </Col> */}
      </Row>

        {/* <PartsTabel data={(filter?.length > 0) ? filter :all_parts} />  */}
        < Tickettabel data={(filter?.length > 0) ? filter :all_tickets} />
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