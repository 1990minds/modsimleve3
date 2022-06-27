
import React, { useState, useLayoutEffect} from 'react'
import Layout from '../../components/layout/Main'
import ProjectTable from './datatable'
import { projectSelector,fetchAllcompanyProject} from '../../api/project'
import {useDispatch, useSelector} from 'react-redux'
import { useEffect } from 'react'
import Createproject from './createproject'
import ExcelBtn from './exportexcel'
import axios from 'axios'
import {authenticateSelector} from '../../api/authSlice';
import {SearchOutlined,SyncOutlined} from '@ant-design/icons'
import { useDebounce } from "use-debounce";
import { keyUri, config } from '../../key'
import styled from 'styled-components'
import { Tooltip, Breadcrumb, Input,Upload } from 'antd';
import { Row, Col } from 'antd';
import './index.css'
import { Link } from 'react-router-dom'


const { Search } = Input;

export default function Project() {

    const dispatch = useDispatch()
    const {all_project, loading:load} = useSelector(projectSelector) 
    const [search, setSearch] = useState('')   
    const { user} = useSelector(authenticateSelector)   
    const [projectAddVisible, SetProjectAddVisible] = useState(false)
    const [searchvalue, setSearchvalue] = useState('')   
    const [loading, setLoading] = useState(false)
    const [filter,setFilter]=useState([])
    const [debouncedText] = useDebounce(search, 2000);
  
    console.log(all_project);



     useEffect(()=>{
     dispatch(fetchAllcompanyProject(user?.company?._id))            
     }, [user]) 
     const handleCancel = () => {
       SetProjectAddVisible(false)
     };

     console.log(filter);


     useEffect(()=>{
     axios.get(keyUri.BACKEND_URI +`/company-project/${user?.company?._id}?search=${debouncedText}`).then(({data})=>{


    setFilter(data?.filterproject)
     })
     setLoading(false)
     }, [dispatch, debouncedText])

     console.log(filter);


     useEffect(()=>{
     dispatch(fetchAllcompanyProject())
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

<Breadcrumb>
    <Breadcrumb.Item>
    <Link to="/"> Home </Link>
    </Breadcrumb.Item>
    <Breadcrumb.Item>
     Projects 
    </Breadcrumb.Item>
  </Breadcrumb>


<h1 style={{ fontSize:'1.5rem', fontWeight: '700' , paddingBottom: '10px' }}>Projects</h1>
    <Row>
    <Col  flex="1 1 200px">
        <Createproject />
        </Col>
        <Col flex="0 1 300px" >
        <Tooltip placement="topLeft" title="Search for Project Name, Project ID" arrowPointAtCenter>
        <SearchWrap>

        <Input value={search}  className="px-4 py-2 focus:outline-none"
prefix ={  <SearchOutlined  style={{color:'#3e79f7', fontWeight:'bold' ,padding:'0px'}} />
}
         placeholder="Search" onChange={onSearch}  />
         </SearchWrap>
         </Tooltip>
        </Col>
        <Col className='' style={{ display: 'flex', justifyContent: 'end' }}>
        <ExcelBtn data={all_project} />
        </Col>
        </Row>
        <ProjectTable data={(filter?.length > 0) ? filter :all_project} loading={loading || load}  />
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