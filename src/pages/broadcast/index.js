import React, {useEffect, useState, useLayoutEffect} from 'react'
import Layout  from '../../components/layout/Main'
import BroadcastTabel from './broadcastetable'
 import { Tabs, Button, Input,Upload, Card,Tooltip } from 'antd';
import {fetchAllbroadcastUser,broadcastSelector} from '../../api/broadcast'
import {useDispatch, useSelector} from 'react-redux'
import {authenticateSelector} from '../../api/authSlice'
import { PlusOutlined } from '@ant-design/icons';
// import ExcelBtn from './exportexcel'
import axios from 'axios'
import {SearchOutlined,SyncOutlined} from '@ant-design/icons'
import { useDebounce } from "use-debounce";
import { keyUri, config } from '../../key'
import styled from 'styled-components'
import { Row, Col, Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import './index.css'
const { Search } = Input;

   export default function Database() {

    
    const dispatch = useDispatch()
    const {all_broadcast, loading:load} = useSelector(broadcastSelector) 
    const { broadcast } = useSelector(authenticateSelector) 
    const [broadcastAddVisible, SetBroadcastAddVisible] = useState(false)
    const { user } = useSelector(authenticateSelector) 

console.log(user)


    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(false)
    const [filter,setFilter]=useState([])
    const [debouncedText] = useDebounce(search, 2000);
    

    console.log(all_broadcast);

  

  useEffect(()=>{

    axios.get(keyUri.BACKEND_URI +`/broadcast?search=${debouncedText}`).then(({data})=>{
      console.log(
        'text'
      );
      console.log({data})

      setFilter(data?.filterbroadcast)
       })
  setLoading(false)
   }, [dispatch, debouncedText])

console.log(filter);


console.log(user?._id)

  useEffect(()=>{
    dispatch(fetchAllbroadcastUser(user?._id))
        }, [user])

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
    Broadcast 
    </Breadcrumb.Item>
    </Breadcrumb>

    <h1 style={{ fontSize:'1.5rem', fontWeight: '700' , paddingBottom: '10px' }}>Broadcast </h1>


      <Row>
      <Col span={8}>

      </Col>
      <Col span={3} offset={10} >
      <Tooltip placement="top" title="Search by Title">
      <SearchWrap className="mx-4 " style={{borderRadius:"20px"}}>
      <Input value={search}  className="px-4 py-2 focus:outline-none"
        prefix ={  <SearchOutlined  style={{color:'#3e79f7', fontWeight:'bold'}} />
        }
        placeholder="Search" onChange={onSearch}  />
        </SearchWrap>
        </Tooltip>
        </Col>
        <Col span={3} className='' style={{ display: 'flex', justifyContent: 'end' }}>
        {/* <ExcelBtn data={all_broadcast}  /> */}
      </Col>
      </Row>

        <BroadcastTabel data={(filter?.length > 0) ? filter :all_broadcast} loading={loading || load} />
        
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