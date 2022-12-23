
import React, { useState, useLayoutEffect} from 'react'
import Layout from '../../components/layout/Main'
import PanelTable from './paneltable'
import {fetchProductPanels,panelSelector} from '../../api/panel'
import {useDispatch, useSelector} from 'react-redux'
import { useEffect } from 'react'
import Createpanel from './createpanel'
import ExcelBtn from './exportexcel'
import axios from 'axios'
import {SearchOutlined,SyncOutlined} from '@ant-design/icons'
import { useDebounce } from "use-debounce";
import { keyUri, config } from '../../key'
import styled from 'styled-components'
import { Breadcrumb, Tooltip, Input,Spin, Upload, Button } from 'antd';
import { Row, Col } from 'antd';
import {useParams,  useLocation} from 'react-router-dom'
import { Link } from 'react-router-dom'
import './index.css'
import { useHistory } from "react-router-dom";

const { Search } = Input;

export default function Panel() {

  
    const dispatch = useDispatch()

    const {product_panels,loading:load} = useSelector(panelSelector) 
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(false)
    const [filter,setFilter]=useState([])
    const [debouncedText] = useDebounce(search, 2000);   
    const project =   new URLSearchParams(useLocation().search).get(`project`)
    const {id}= useParams()


 console.log(project)


 console.log(id)

    const [panelAddVisible, SetPanelAddVisible] = useState(false)
  // const [searchvalue, setSearchvalue] = useState('')

  let history = useHistory();
  
  useEffect(()=>{

    dispatch(fetchProductPanels({id,project})) 
   
  }, [dispatch])

  
     const handleCancel = () => {
       SetPanelAddVisible(false)
     };
   

      useEffect(()=>{
      axios.post(keyUri.BACKEND_URI +`/product-panels?search=${debouncedText}`,{id,project}).then(({data})=>{
          setFilter(data?.filterpanel)
          })
          setLoading(false)
          }, [dispatch, debouncedText])

    


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
    <Link to="/auth/projects"> Projects </Link>
    </Breadcrumb.Item>
    <Breadcrumb.Item>
     <Link to={`/auth/projects/product/${project}`}> Products </Link> 
    </Breadcrumb.Item>
    <Breadcrumb.Item>
    Panels
    </Breadcrumb.Item>
    </Breadcrumb>


     <h1 style={{ fontSize:'1.5rem', fontWeight: '700' , paddingBottom: '10px' }}>Panels</h1>
     <Row>
     <Col flex="1 1 200px">
     <Createpanel project_id ={project} product_id={id}/>
     </Col>
     <Col flex="0 1 300px" >
     <Tooltip placement="topLeft" title="Search for Panel Name, Panel ID" arrowPointAtCenter>

   <SearchWrap>
     <Input value={search}  className="px-4 py-2 focus:outline-none"
      prefix ={  <SearchOutlined  style={{color:'#3e79f7', fontWeight:'bold' ,padding:'0px'}} />
      }
      placeholder="Search" onChange={onSearch}  />
   </SearchWrap>
 
      </Tooltip>
      </Col>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <Col  className='' style={{ display: 'flex', justifyContent: 'end' }}>
      <ExcelBtn data={product_panels} />
      </Col>
      </Row>

    

      {/* {(loading || load) && <Spin style={{ position:"absolute", top: "10%", left:'30%',  width: "700px",   height: "500px", }} tip="Please Wait, We are loading panels !"> </Spin>} */}

      
       
       <PanelTable  data={(filter?.length > 0) ? filter :product_panels} project_id ={project} product_id={id} loading={loading || load}/>

      
       
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

/* 

.ring
{
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%,-50%);
width: 150px;
height: 150px;
background: transparent;
border: 3px solid #1890ff;
border-radius: 50%;  
text-align: center;
line-height: 150px;
font-family: Poppins;
font-size: 60px;
color: #1890ff;
text-transform: uppercase;
text-shadow: 0 0 1px #1890ff
}
.ring:before
{
content: '';
position: absolute;
top: -3px;
left: -3px;
width: 100%;
height: 100%;
border: 3px solid transparent;
border-top: 3px solid #1890ff;
border-right: 3px solid #1890ff;
border-radius: 50%;
animation: animateCircle 2s linear infinite;
}
span{
display: block;
position: absolute;
top: calc(50% - 2px);
left: 50%;
width: 50%;
height: 4px;
background: transparent;
transform-origin: left;
animation: animate 2s linear infinite;
}
span:before{
content: '';
position: absolute;
width: 16px;
height: 16px;
border-radius: 50%;
background: #1890ff;
top: -6px;
right: -8px;
box-shadow: 0 0 20px #1890ff;
}
@keyframes animate
{
0%
{
transform: rotate(0deg);
}
100%
{
transform: rotate(360deg);
}
}

 */








`