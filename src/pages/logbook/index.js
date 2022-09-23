import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Row, Button, Input, Col } from 'antd';
import LogTabel from './logtable'
import {PlusOutlined, SearchOutlined} from '@ant-design/icons'
import {fetchAllCustomerLog, logSelector} from '../../api/log'
import{authenticateSelector,fethFilter} from '../../api/authSlice'
import styled from 'styled-components'
import Layout1 from '../../components/layout/Main';
import { useDebounce } from "use-debounce";
import { keyUri, config } from '../../key'
import axios from 'axios'
import './index.css'
import {Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';


const { Search } = Input;

export default function Database() {

  const dispatch = useDispatch()
  const {all_log, loading:load} = useSelector(logSelector) 
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)
  const [filter,setFilter]=useState([])
  const [debouncedText] = useDebounce(search, 2000);
  const [reload, setReload] = useState(false)
  const { user} = useSelector(authenticateSelector) 




  useEffect(()=>{

  dispatch(fetchAllCustomerLog(user?._id))

     }, [user])
 



  useEffect(()=>{

      axios.get(keyUri.BACKEND_URI +`/customer-log/${user?._id}?search=${debouncedText}`).then(({data})=>{
        console.log(
          'text'
        );
        console.log({data})

        setFilter(data?.filterlogs)
        })
    setLoading(false)
   }, [dispatch, debouncedText])





  useEffect(()=>{
    dispatch(fetchAllCustomerLog())
        }, [dispatch])

        useEffect(()=>{     
          if(filter?.length < 1) {
            setSearch('')
          }
           }, [filter])

           const onSearch = (e) => {
            setSearch(e.target.value)
          
        
          }

     return (
       <Layout1>

<Breadcrumb>
    <Breadcrumb.Item>
    <Link to="/"> Home </Link>
    </Breadcrumb.Item>
    <Breadcrumb.Item>
    Tickets 
    </Breadcrumb.Item>
    </Breadcrumb>

      <h1 style={{ fontSize:'1.5rem', fontWeight: '700' , paddingBottom: '10px' }}>Logbook</h1>
     

      <Row   >
      <Col span={8} >
      {/* < CreateParts   /> */}
      </Col>
      <Col span={3} offset={10} >
      <SearchWrap className=" shadow" style={{borderRadius:"4px"}}>
      <Input value={search}  className="px-4 py-2 focus:outline-none"
       prefix ={  <SearchOutlined style={{color:'#3498DB', fontWeight:'bold'}}/>
            }
             placeholder=" Search" onChange={onSearch}  />
            </SearchWrap>
        </Col>
        {/* <Col span={3} className='' style={{ display: 'flex', justifyContent: 'end' }}> */}
        {/* <ExcelBtn data={all_parts}  /> */}
      {/* </Col> */}

      </Row>

      <LogTabel data={(filter?.length > 0) ? filter :all_log} loading={loading || load} />
        
      </Layout1>
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