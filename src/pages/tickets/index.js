import React from 'react'
import { useState, useEffect } from 'react';
import Layout from '../../components/layout/Main'
import Createtickets from './createtickets'
import {  Input, Tooltip } from 'antd';
import {fetchAllUserTickets,ticketsSelector} from '../../api/tickets'
import {useDispatch, useSelector} from 'react-redux'
import {authenticateSelector} from '../../api/authSlice'
import axios from 'axios'
import {SearchOutlined,SyncOutlined} from '@ant-design/icons'
import { useDebounce } from "use-debounce";
import { keyUri, config } from '../../key'
import styled from 'styled-components'
import { Row, Col, Breadcrumb } from 'antd';
import {useParams} from 'react-router-dom'
import Tickettabel from './tickettabel'
import { Link } from 'react-router-dom';
const { Search } = Input;

  export default function Database() {

    
    const {id}= useParams()
    const dispatch=useDispatch()    
    const {all_tickets, loading:load}=useSelector(ticketsSelector)
   
    const { user } = useSelector(authenticateSelector) 
    
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(false)
    const [filter,setFilter]=useState([])
    const [debouncedText] = useDebounce(search, 2000);
   


  useEffect(()=>{

    axios.get(keyUri.BACKEND_URI +`/usertickets/${user?._id}?search=${debouncedText}`).then(({data})=>{
      setFilter(data?.filtertickets)
       })
     setLoading(false)
     }, [debouncedText])

console.log(filter);
 


useEffect(()=>{
  dispatch(fetchAllUserTickets(user?._id))
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

<Breadcrumb>
    <Breadcrumb.Item>
    <Link to="/"> Home </Link>
    </Breadcrumb.Item>
    <Breadcrumb.Item>
    Tickets 
    </Breadcrumb.Item>
    </Breadcrumb>

      <h1 style={{ fontSize:'1.5rem', fontWeight: '700' , paddingBottom: '10px' }}>Tickets</h1>
 


      <Row>
      <Col  flex="1 1 200px">
      < Createtickets  />
     
      </Col>
      <Col flex="0 1 300px" >
      <Tooltip placement="top" title="Search by Ticket ID">
      <SearchWrap className="mx-4 " style={{borderRadius:"20px"}}>
      <Input value={search}  className="px-4 py-2 focus:outline-none"
        prefix ={  <SearchOutlined  style={{color:'#3e79f7', fontWeight:'bold'}} />
        }
        placeholder="Search" onChange={onSearch}  />
        </SearchWrap>
        </Tooltip>
        </Col> 
       
      </Row>

       
        < Tickettabel data={(filter?.length > 0) ? filter :all_tickets} loading={loading || load}  />
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