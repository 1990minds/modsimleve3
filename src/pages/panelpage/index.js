
import React, { useState,} from 'react'
import Layout from '../../components/layout/Main'
import {fetchOnepanel,panelSelector} from '../../api/panel'
import {useDispatch, useSelector} from 'react-redux'
import { useEffect } from 'react'
import styled from 'styled-components'
import {  Breadcrumb, Input, } from 'antd';
import { Row, Col } from 'antd';
import {useParams} from 'react-router-dom'
import CreatePanelpage from './createpanelpage';
import EditPanel from './editpanel';
import './index.css'
import { Link } from 'react-router-dom'
import { useHistory } from "react-router-dom";

const { Search } = Input;

export default function Panel() {

  
    const dispatch = useDispatch()
    const { current_panel,} = useSelector(panelSelector) 
    const [filter,setFilter]=useState([]) 
    const {id}= useParams()
    const [search, setSearch] = useState('')

  const [panelAddVisible, SetPanelAddVisible] = useState(false)



  

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
  

        useEffect(()=>{     
          if(filter?.length < 1) {
            setSearch('')
          }
           }, [filter])
        
        
        const onSearch = (e) => {          
          setSearch(e.target.value)
        
        }
        let history = useHistory();

  return (
    <Layout>

<Breadcrumb>
    <Breadcrumb.Item>
    <Link to="/"> Home </Link>
    </Breadcrumb.Item>
    <Breadcrumb.Item>
    <Link to="/auth/projects"> Projects </Link>
    </Breadcrumb.Item>
    <Breadcrumb.Item>
    <a onClick={history.goBack}>Panels</a> 
    </Breadcrumb.Item>
    <Breadcrumb.Item>
    Panel Page
    </Breadcrumb.Item>
    </Breadcrumb>

<h1 style={{ fontSize:'1.5rem', fontWeight: '700' , paddingBottom: '10px' }}>Panel Details</h1>
<Row>
      <Col span={24} >
     
<div className='max-w-xl sm:mx-auto lg:max-w-7xl'>
       <EditPanel current_panel={current_panel}/>
       


    </div>

    <div className='max-w-xl sm:mx-auto lg:max-w-7xl'>
     <b> <h1  style={{marginTop:'3rem', marginBottom:"2rem", fontSize:'20px', fontWeight:'700'}}> Panel Settings  </h1></b>
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