
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
    Button,
  } from "antd";
  import { useState, useEffect } from "react";
  import { FilePdfOutlined } from "@ant-design/icons";
  import { Link } from "react-router-dom";
  import { PlusOutlined } from '@ant-design/icons';
  import DeleteConfirm from '../../global/delete'
  import { FileAddOutlined  } from '@ant-design/icons'
  import face6 from "../../assets/images/face-6.jpeg";
  import pencil from "../../assets/images/pencil.svg";
  import {useDispatch, useSelector} from 'react-redux'
  import { FaRegTrashAlt, FaRegEdit } from 'react-icons/fa';
  import { DownloadOutlined  } from '@ant-design/icons';
  import {deleteProduct} from '../../api/product'
  import {authenticateSelector} from '../../api/authSlice';
  //   import Editproject from './editproject';
  import { useHistory} from 'react-router-dom'
  import {deleteproject,deleteManyproject,createQuotationPdf} from '../../api/project'
  import moment from 'moment';
  import ModalForm from '../../global/model.js'
  import Quotation from './quotation';
  import { fetchAllpanel, panelSelector } from "../../api/panel";
  
  
   function ProjectTable({data,loading}) {

   

    const [visibleEdit, setEditModal] = useState(false);
    const [current_project, setproject] = useState(null);
    const [current_panel, setpanel] = useState(null);
    const [selectionType, setSelectionType] = useState('checkbox');
    const [page, setPage] = useState(1);
    const { user } = useSelector(authenticateSelector) 
    const [item,setItem] =useState(null)
    const [downloadLoading,setDownloadLoading] =useState(false)
    const [visibleQuotation, setQuotationModal] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('Content of the modal');
    const {all_panel}=useSelector(panelSelector)
  
    console.log(current_project)


     let history = useHistory() 
     console.log(all_panel);



     
  useEffect(()=>{
    dispatch(fetchAllpanel(user?.company?._id)) 
 }, [user])

     const confirm = (e, id) => {
     dispatch(deleteproject(id._id, id.project,user?.company?._id))     
        }
        
     const cancel = (e) =>{
      return null
      }
  
       const handleClickQuotation = (e, isvisible, id) =>{
       e.preventDefault()
       setproject(id)
       setQuotationModal(isvisible)
       }
  
       const closeModal = () => {
        setQuotationModal(false)
       setproject(null)
       }
   

      const [visible, setVisible] = useState(false);
      const dispatch = useDispatch()


       const onClose = () => {
       setVisible(false);
       setproject(null)
       };


       const createPdf= (value)=> {
   
        setDownloadLoading(true)
        setItem(value._id)
        dispatch(createQuotationPdf(value))
        
        setTimeout(()=>{
          setDownloadLoading(false)
            setItem(null)
        },3000)


        const handleClickQuotation = (e, isvisible, id) =>{
          e.preventDefault()
          setproject(id)
          setQuotationModal(isvisible)
          // setDuplicatetModal(false)
          }
  
          const cancelModel = () => {
            setQuotationModal(false)
            setproject(null)
          };

  }
    
  const columns = [
      
    {
        title: ' Sl No.',
        dataIndex: 'sl_no',
        key: 'sl_no',
        width: 100,
        render:(t, k, i)=>{
          return <p class="m-0 ">{(page - 1) * 10 + (i+1)}</p>
        }
        
      },

      {
        title: ' Customer name ',
        key: 'customer_name',
        ellipsis: true,
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
        render:(item)=>{
          return <p class="m-0 ">{item?item:'-'} </p>
        }
      },

      // {
      //   title: 'Project Coordinator',
      //   dataIndex: 'project_coordiantor',
      //   key: 'project_coordiantor',
        
      // },
      {
        title: 'Created Date',
        dataIndex: 'createdAt',
        key: 'createdAt',
        width: 200,
        render:(createdAt)=>{
          return <small style={{fontSize:'14px'}} className="my-0 mr-3">{moment(createdAt).format('DD/MM/YYYY')}</small>
      }
      },

      {
        title: 'Updated Date',
        dataIndex: 'updatedAt',
        key: 'updatedAt',
        render:(updatedAt)=>{
          return <small style={{fontSize:'14px'}} className="my-0 mr-3">{moment(updatedAt).format('DD/MM/YYYY')}</small>
      }
      },

      {


         

            title:'Generate Quotation',
            key: 'download',      
            render: (id) => (           
            <a href="#" className="" style={{  margin:'0px', padding:'0px', width:'100%'}} onClick={(e) => { 
            e.stopPropagation();      
            }}>                    
            <Space size="middle">    
            
            {/* <Tooltip placement="topLeft" title="Generate Quotation" arrowPointAtCenter> */}
            <h5 className="text-danger"  > 
            <Button disabled={(all_panel.filter(item=>{return item.project === id._id && item.request !== "null"})).length>0 ? false:true} type='link' style={{ fontSize:'14px'}}  onClick={(e)=>handleClickQuotation(e, true, id)}> Generate </Button>
            </h5>
            {/* </Tooltip> */}
            </Space>
             </a>

              ),
            },

            {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            render:(item)=>{
              return <p class="m-0 ">{item?item:'-'} </p>
            }
        
      },

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
                  </>
                 }
                 >
                <div className="table-responsive" >
               
                 <Table
                 loading={loading}
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

                   <ModalForm 
            isVisible={visibleQuotation} 
            title="Quotation Details"
            footer={false}
            // onOk={handleQuotationOk}
            className=""
            width="50%"
            cancel={()=>setQuotationModal(!visibleQuotation)}>
                  <Quotation current_project={current_project} cancel={()=>setQuotationModal(!visibleQuotation)} />
            </ModalForm>    
                 </>
    );
  }
  
  export default ProjectTable;
  
  const SearchWrap = styled.div`

  .ant-table-row ant-table-row-level-0{
    cursor: pointer !important;
  }
  `