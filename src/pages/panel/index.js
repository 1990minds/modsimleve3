
import React, { useState, useLayoutEffect} from 'react'
import Layout from '../../components/layout/Main'
import PanelTable from './paneltable'
import {fetchAllpanel,fetchProductPanels,panelSelector} from '../../api/panel'
import {useDispatch, useSelector} from 'react-redux'
import { useEffect } from 'react'
import Createpanel from './createpanel'
import ExcelBtn from './exportexcel'
import axios from 'axios'
import {authenticateSelector} from '../../api/authSlice';
import {SearchOutlined,SyncOutlined} from '@ant-design/icons'
import { useDebounce } from "use-debounce";
import { keyUri, config } from '../../key'
import styled from 'styled-components'
import { Tabs, Tooltip, Input,Upload } from 'antd';
import { Row, Col } from 'antd';
import {useParams,  useLocation} from 'react-router-dom'

import './index.css'

const { Search } = Input;

export default function Panel() {

  
    const dispatch = useDispatch()

    const {product_panels} = useSelector(panelSelector) 
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(false)
    const [filter,setFilter]=useState([])
    const [debouncedText] = useDebounce(search, 2000);
   
    const { user} = useSelector(authenticateSelector) 
  
    const { panel_id } = useSelector(authenticateSelector) 

    const project =   new URLSearchParams(useLocation().search).get(`project`)
    console.log(project);
    const {id}= useParams()

  const [panelAddVisible, SetPanelAddVisible] = useState(false)
  // const [searchvalue, setSearchvalue] = useState('')

  
  useEffect(()=>{

    dispatch(fetchProductPanels({id,project})) 
   
  }, [dispatch])
  
     const handleCancel = () => {
       SetPanelAddVisible(false)
     };
   

console.log(filter);
  
 
useEffect(()=>{

  axios.get(keyUri.BACKEND_URI +`/panel?search=${debouncedText}`).then(({data})=>{
    
    console.log({data})

    setFilter(data?.filterpanel)
     })
setLoading(false)
 }, [dispatch, debouncedText])

console.log(filter);

useEffect(()=>{
  dispatch(fetchAllpanel())
      }, [dispatch])

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
      <Createpanel project_id ={project} product_id={id}/>
      </Col>
      <Col span={3} offset={10} >
      <Tooltip placement="topLeft" title="Search for Name, Email, Phone No" arrowPointAtCenter>
      <SearchWrap>

<Input value={search}  className="px-4 py-2 focus:outline-none"
prefix ={  <SearchOutlined  style={{color:'#3e79f7', fontWeight:'bold' ,padding:'0px'}} />
}
placeholder="Search" onChange={onSearch}  />
</SearchWrap>
 </Tooltip>
        </Col>
        <Col span={3} className='' style={{ display: 'flex', justifyContent: 'end' }}>
        <ExcelBtn data={product_panels} />
      </Col>
      </Row>
        <PanelTable data={product_panels}/>
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