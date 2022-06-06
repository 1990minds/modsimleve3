
import { Pagination } from 'antd';
import styled from 'styled-components'

import {
    Row,
    Col,
    Card,
    Tooltip,
    Table,
    Space,
    Drawer,
  } from "antd";
  import { useState } from "react";
  import { ToTopOutlined } from "@ant-design/icons";
  import { Link } from "react-router-dom";
  import { PlusOutlined } from '@ant-design/icons';
  import DeleteConfirm from '../../global/delete'
  import { FileAddOutlined  } from '@ant-design/icons'
  import face6 from "../../assets/images/face-6.jpeg";
  import pencil from "../../assets/images/pencil.svg";
  import {useDispatch, useSelector} from 'react-redux'
  import { FaRegTrashAlt, FaRegEdit } from 'react-icons/fa';
  import {deleteProduct} from '../../api/product'
  import {authenticateSelector} from '../../api/authSlice';
  //   import Editproject from './editproject';
  import { useHistory} from 'react-router-dom'
  import {deleteproject,deleteManyproject} from '../../api/project'
  
   function ProjectTable({data}) {

    
    const [visibleEdit, setEditModal] = useState(false);
    const [current_project, setproject] = useState(null);
    const [selectionType, setSelectionType] = useState('checkbox');
    const [page, setPage] = useState(1);
    const { user } = useSelector(authenticateSelector) 
  

     let history = useHistory() 
     const confirm = (e, id) => {
     dispatch(deleteproject(id._id, id.project,user?.company?._id))     
        }
        
     const cancel = (e) =>{
      return null
      }
  
       const handleClickEdit = (e, isvisible, id) =>{
       e.preventDefault()
       setproject(id)
       setEditModal(isvisible)
       }
  
       const closeModal = () => {
       setEditModal(false)
       setproject(null)
       }
   

      const [visible, setVisible] = useState(false);
      const dispatch = useDispatch()


       const onClose = () => {
       setVisible(false);
       setproject(null)
       };



  const columns = [
      
    {
        title: ' Sl No.',
        dataIndex: 'sl_no',
        key: 'sl_no',
        render:(t, k, i)=>{
          return <p class="m-0 ">{(page - 1) * 10 + (i+1)}</p>
        }
        
      },

      {
        title: ' Customer name ',
        key: 'customer_name',
        render:(item)=>{
          return <p class="m-0 ">{item?.customers?.customers_name} </p>
        }
        
      },

      {
        title: ' Project ID ',
        dataIndex: 'project_id',
        key: 'project_id',
        
      },

      {
        title: ' Project Name ',
        dataIndex: 'project_name',
        key: 'project_name',
        
      },
          
      {
        title: ' Project Location',
        dataIndex: 'project_location',
        key: 'project_location',
        
      },

      {
        title: 'Project Coordinator',
        dataIndex: 'project_coordiantor',
        key: 'project_coordiantor',
        
      },
      {
        title: 'Phone',
        dataIndex: 'phone_number',
        key: 'phone_number',
        
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        
      },


        // {
        //   title: 'Product Image ',
        //   dataIndex: 'product_image',
        //   key: 'product_image',
         
        // }, 
        {
          title: 'Action',
          key: 'action',      
          render: (id) => (           
          <a href="#" className="" style={{  margin:'0px', padding:'0px', width:'100%'}} onClick={(e) => { 
           e.stopPropagation();      
           }}>                    
           <Space size="middle">    
          <h5 className="text-secondary" >                 
          {/* <FaRegEdit  onClick={(e)=>handleClickEdit(e, true, id)} className="text-secondary  text-lg mt-2"  />  */}                                          
           </h5>
            <Tooltip placement="topLeft" title="Delete Project" arrowPointAtCenter>
            <h5 className="text-danger">
            <DeleteConfirm confirm={(e)=>confirm(e, id)} title="panel" cancel={cancel} >
            <FaRegTrashAlt style={{cursor:"pointer"}} className="text-secondary text-lg  mt-2"  />
            </DeleteConfirm>
            </h5>
            </Tooltip>
            </Space>
              </a>
            ),
          },
    
          ];

             const [selectionKey, setSelectionKey] = useState([]);
             const rowSelection = {
              onChange: (selectedRowKeys, selectedRows) => {
              setSelectionKey(selectedRowKeys)
              },
              getCheckboxProps: (record) => ({
              disabled: record.name === 'Disabled project',       
              name: record.name,
               }),
             };
  
    return (
               <>
               <div className="tabled" >
               <Row gutter={[24, 0]}>
               <Col xs="24" xl={24}>
               <Card
                bordered={false}
                className="criclebox tablespace mb-24"
                // title="Customer Table"
                extra={
                  <>
                    {/* <Createcustomer /> */}
                    {/* <Radio.Group onChange={onChange} defaultValue="a">
                      <Radio.Button value="a">All</Radio.Button>
                      <Radio.Button value="b">ONLINE</Radio.Button>
                    </Radio.Group> */}
                  </>
                 }
                 >
                <div className="table-responsive" >
               
                 <Table
                 pagination={{
                 onChange(current) {
                 setPage(current)
                    }
                  }}
                  rowKey={record => record._id}
                  columns={columns}
                  dataSource={data} 

                 style={{ cursor: 'pointer' }}
                 onRow={(record, rowIndex) => {
                 return {
                 onClick: event => {  history.push(`/auth/projects/product/${record._id}`) }, // click row
                 };
                 }}
  
                  >
                 </Table>                   
                 </div>
                 </Card>
                 </Col>
                 </Row>
                 </div>
                 <Drawer
                  title="Update a existing user" placement="right" onClose={onClose} visible={visible} width={720}
                  >          
                 </Drawer>       
                 </>
    );
  }
  
  export default ProjectTable;
  
  const SearchWrap = styled.div`

  .ant-table-row ant-table-row-level-0{
    cursor: pointer !important;
  }
  `