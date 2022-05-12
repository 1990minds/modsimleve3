
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
import { Tabs, Button, Input,Upload } from 'antd';
import { Row, Col } from 'antd';
import {useParams} from 'react-router-dom'
import {fetchOneproduct, productSelector} from '../../api/product'


// import './index.css'


const { Search } = Input;

export default function Panel() {

  
    const dispatch = useDispatch()
    const {product_panels } = useSelector(panelSelector) 
    const { current_product,} = useSelector(productSelector) 
 
    const {all_panel} = useSelector(panelSelector) 
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(false)
    const [filter,setFilter]=useState([])
    const [debouncedText] = useDebounce(search, 2000);
   
    const { user} = useSelector(authenticateSelector) 
  
    const { panel_id } = useSelector(authenticateSelector) 
  const {id}= useParams()

  const [panelAddVisible, SetPanelAddVisible] = useState(false)
  // const [searchvalue, setSearchvalue] = useState('')

console.log({all_panel});
  
  

  useEffect(()=>{

    dispatch(fetchOneproduct(id))
    dispatch(fetchAllpanel()) 
   
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
      <Createpanel/>
      </Col>
      <Col span={3} offset={10} >
      <SearchWrap>

<Input value={search}  className="px-4 py-2 focus:outline-none"
prefix ={  <SearchOutlined  style={{color:'#3e79f7', fontWeight:'bold' ,padding:'0px'}} />
}
placeholder="Search" onChange={onSearch}  />
</SearchWrap>
 
        </Col>
        <Col span={3} className='' style={{ display: 'flex', justifyContent: 'end' }}>
        <ExcelBtn data={all_panel} />
      </Col>
      </Row>
        <PanelTable data={all_panel}/>
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