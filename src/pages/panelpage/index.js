
import React, { useState, useLayoutEffect} from 'react'
import Layout from '../../components/layout/Main'
import {fetchAllpanel,fetchOnepanel,fetchProductPanels,panelSelector} from '../../api/panel'
import {useDispatch, useSelector} from 'react-redux'
import { useEffect } from 'react'
// import ExcelBtn from './exportexcel'
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
import CreatePanelpage from './createpanelpage';
import EditPanel from './editpanel';
import './index.css'


const { Search } = Input;

export default function Panel() {

  
    const dispatch = useDispatch()
    const { loading ,product_panels } = useSelector(panelSelector) 
    const { current_panel,} = useSelector(panelSelector) 
    const [search, setSearch] = useState('')
    const {all_panel} = useSelector(panelSelector) 
    const [filter,setFilter]=useState([])
   
    const { user} = useSelector(authenticateSelector) 
  
    const { panel_id } = useSelector(authenticateSelector) 
  const {id}= useParams()

  const [panelAddVisible, SetPanelAddVisible] = useState(false)
  // const [searchvalue, setSearchvalue] = useState('')

console.log({current_panel});
  
  

  useEffect(()=>{

    dispatch(fetchOnepanel(id))
   
  }, [dispatch])

  
  

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };
  
     const handleCancel = () => {
       SetPanelAddVisible(false)
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
<h1 style={{ fontSize:'1.5rem', fontWeight: '700' , paddingBottom: '10px' }}>Panel Details</h1>
<Row>
      <Col span={24} >
     
<div className='max-w-xl sm:mx-auto lg:max-w-7xl'>
       <EditPanel current_panel={current_panel}/>
       


    </div>

    <div className='max-w-xl sm:mx-auto lg:max-w-7xl'>
      <h1  style={{marginTop:'3rem', marginBottom:"2rem", fontSize:'20px'}}> Panel Settings  </h1>
       {/* <Editpanel all_panel={all_panel} /> */}
       <CreatePanelpage current_panel={current_panel}/>
       


    </div>
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