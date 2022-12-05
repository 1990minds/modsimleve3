
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
  import DeleteConfirm from '../../global/delete'
  import {useDispatch, useSelector} from 'react-redux'
  import { FaRegTrashAlt, FaRegEdit } from 'react-icons/fa';
  import {authenticateSelector} from '../../api/authSlice';
  import Editproject from './editproject';
  import { useHistory} from 'react-router-dom'
  import {deleteproject,createQuotationPdf} from '../../api/project'
  import moment from 'moment';
  import ModalForm from '../../global/model.js'
  import Quotation from './quotation';
  import { fetchAllpanel, panelSelector } from "../../api/panel";
  import Loader from '../shared/tableloader'
  
  
   function ProjectTable({data,loading}) {

   

  
    const [current_project, setproject] = useState(null);
    const [page, setPage] = useState(1);
    const { user } = useSelector(authenticateSelector) 
    const [item,setItem] =useState(null)
    const [downloadLoading,setDownloadLoading] =useState(false)
    const [visibleQuotation, setQuotationModal] = useState(false);
    const {all_panel}=useSelector(panelSelector)



     let history = useHistory() 
     console.log(all_panel);



     
  useEffect(()=>{
    dispatch(fetchAllpanel(user?.company?._id)) 
 }, [user])

     const confirm = (e, id) => {
     dispatch(deleteproject(id._id, id.project,user?.company?._id))     
        }


        const handleClickEdit = (e, isvisible, id) =>{
          e.preventDefault()
          setproject(id)
          setVisible(true);
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
        title: 'Project Sequence ID',
        key: 'createdAt',
        render:(item)=>{
          return <p style={{fontSize:'14px', color:'black'}} className="my-0 mr-3">{item.project_serialID?item.project_serialID:null}</p>
      }
      },



      {
        title: ' Project Name ',
        dataIndex: 'project_name',
        key: 'project_name',
        ellipsis: true,
        
      },
          
      {
        title: ' Project Location',
        dataIndex: 'project_location',
        key: 'project_location',
        ellipsis: true,
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
        render:(createdAt)=>{
          return <small style={{fontSize:'14px'}} className="my-0 mr-3">{moment(createdAt).format('DD/MM/YYYY')}</small>
      }
      },

      {
        title: 'Updated Date',
        dataIndex: 'updatedAt',
        key: 'updatedAt',
        ellipsis: true,
        render:(updatedAt)=>{
          return <small style={{fontSize:'14px'}} className="my-0 mr-3">{moment(updatedAt).format('DD/MM/YYYY')}</small>
      }
      },

      {
            title:'Generate Quotation',
            key: 'download', 
            ellipsis: true,     
            render: (project) => (           
            <a href="#" className="" style={{  margin:'0px', padding:'0px', width:'100%'}} onClick={(e) => { 
            e.stopPropagation();      
            }}>                    
            <Space size="middle">    

            {/* <Tooltip placement="topLeft" title="Generate Quotation" arrowPointAtCenter> */}
            <h5 className="text-danger"  > 
            <Button disabled={(all_panel.filter(item=>{return item.project === project._id && item.request !== "null"})).length>0 ? false:true} type='link' style={{ fontSize:'14px'}}  onClick={(e)=>handleClickQuotation(e, true, project)}> Generate </Button>
            </h5>
            {/* </Tooltip> */}
            </Space>
             </a>

              ),
            },

        {
          title: 'Project Status',
          dataIndex: 'project_status',
          key: 'project_status',
      
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
          <FaRegEdit  onClick={(e)=>handleClickEdit(e, true, id)} className="text-secondary  text-lg mt-2"  />                                           
           </h5>
            <Tooltip placement="topLeft" title="Delete Project" arrowPointAtCenter>
            <h5 className="text-danger">
            {/* <DeleteConfirm confirm={(e)=>confirm(e, id)} title="panel" cancel={cancel} >
            <FaRegTrashAlt style={{cursor:"pointer"}} className="text-secondary text-lg  mt-2"  />
            </DeleteConfirm> */}
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
                  loading={{spinning: loading, indicator: <Loader/>}} 
                 scroll={{ x: true }}
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
          title="Update an Existing Project" placement="right" onClose={onClose} visible={visible} width={720}
        >
          <Editproject current_project={current_project} cancel={onClose}/>
        </Drawer>  

            <ModalForm 
            isVisible={visibleQuotation} 
            title="Quotation Details"
            footer={false}
            // onOk={handleQuotationOk}
            className=""
            width="55%"
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