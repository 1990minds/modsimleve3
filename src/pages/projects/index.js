
import React, { useState, useLayoutEffect} from 'react'
import Layout from '../../components/layout/Main'
import ProjectTable from './datatable'
import {fetchAllproject, projectSelector} from '../../api/project'
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
import { Tooltip, Button, Input,Upload } from 'antd';
import { Row, Col } from 'antd';
import './index.css'


const { Search } = Input;

export default function Project() {

    const dispatch = useDispatch()
    const {all_project} = useSelector(projectSelector) 
    const [search, setSearch] = useState('')
  
   
    const { user} = useSelector(authenticateSelector) 
  
    const [projectAddVisible, SetProjectAddVisible] = useState(false)
    const [searchvalue, setSearchvalue] = useState('')

   
    const [loading, setLoading] = useState(false)
    const [filter,setFilter]=useState([])
    const [debouncedText] = useDebounce(search, 2000);
  
  console.log(all_project);
  

  useEffect(()=>{

    dispatch(fetchAllproject(user?.company))
       
       
        }, [user])
  
     const handleCancel = () => {
       SetProjectAddVisible(false)
     };
   

console.log(filter);
useEffect(()=>{

  axios.get(keyUri.BACKEND_URI +`/parts?search=${debouncedText}`).then(({data})=>{
    console.log(
      'text'
    );
    console.log({data})

    setFilter(data?.filterparts)
     })
setLoading(false)
 }, [dispatch, debouncedText])

console.log(filter);

useEffect(()=>{
  dispatch(fetchAllproject())
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
      <Createproject />
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
        <ExcelBtn data={all_project} />
      </Col>
      </Row>
        <ProjectTable data={all_project}/>
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