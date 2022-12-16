
import {
    Row,
    Col,
    Card,
    Tooltip,
    Table,
    Space,
    Drawer,
    Menu,
    Button 
    } from "antd";
    
    import { useState } from "react";
    import DeleteConfirm from '../../global/delete'
    import {useDispatch, useSelector} from 'react-redux'
    import { FaRegTrashAlt, FaRegEdit, } from 'react-icons/fa';
    import { FiCopy } from 'react-icons/fi';
    import ModalForm from '../../global/model.js'
    import {authenticateSelector} from '../../api/authSlice';
    import { useHistory} from 'react-router-dom'
    import {deletepanel,createDrawingPdf, } from '../../api/panel'
    import { createbomrequest} from '../../api/bomrequest'
    import  {createdrawingreq} from '../../api/drawingreq'
    import Editpanel from './editpanel';
    import Duplicatepanel from './duplicatepanel';
    import moment from 'moment';
    import { Popconfirm, message } from 'antd';
    import ExportExcel from './bomdownload';
    import Loader from '../shared/tableloader'

    function PanelTable({data,project_id, product_id, loading}) {

    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('Content of the modal');
    const {user} = useSelector(authenticateSelector)
    const showModal = () => {
    setVisible(true);
    };
  
    const handleOk = () => {
      setModalText('The modal will be closed after two seconds');
      setConfirmLoading(true);
      setTimeout(() => {
        setVisible(false);
        setConfirmLoading(false);
      }, 2000);
    };


    const [current_panel, setpanel] = useState(null);   
    const [visibleDuplicate, setDuplicatetModal] = useState(false);
    const [visibleBOM, setBOMModal] = useState(false);
    const [item,setItem] =useState(null)
    const [downloadLoading,setDownloadLoading] =useState(false)
    const [visibleDrawing, setDrawingModal] = useState(false);
    const [dwgpanel, setdwgpanel] = useState(null);
    let history = useHistory()
    
       console.log({user})
    
            const confirm = (e, id,user) => {
              const data={user:user._id}
            dispatch(deletepanel(id._id, {id:product_id,project:project_id},data))          
          }


          const handleClickDuplicate = (e, isvisible, id) =>{
            e.preventDefault()
            setpanel(id)
            setDuplicatetModal(isvisible)
            // setDuplicatetModal(false)
            }
    
            const cancelModel = () => {
              setDuplicatetModal(false)
              setpanel(null)
            }


            
          const handleClickBOM = (e, id) =>{
            e.preventDefault()
            setpanel(id)
            setBOMModal(true)
            }
    
            const cancelBOMModel = () => {
              setBOMModal(false)
              setpanel(null)
            }

          const handleClickEdit = (e, isvisible, id) =>{
            e.preventDefault()
            setpanel(id)
            setVisible(true);
            }


            const handleClickDrawing = (e, isvisible, id) =>{
              e.preventDefault()
              setdwgpanel(id)
              setDrawingModal(isvisible);
              }

              const closeModal = () => {
                setDrawingModal(false)
               setpanel(null)
               }

              const drawingPdf= (value)=> {
  
                setDownloadLoading(true)
                setItem(value._id)
                dispatch(createDrawingPdf(value))
                
                setTimeout(()=>{
                  setDownloadLoading(false)
                    setItem(null)
                },3000)

              }  
    
      const [page, setPage] = useState(1);
      const [visible, setVisible] = useState(false);
      const confirmRequest = (values, id) => {
      const data={
      panel:id._id
      }
      dispatch(createbomrequest(data,{id:product_id,project:project_id}))
      }

      const cancel = (e) =>{
        return null
      }
     

      const confirmRequestdwg = (values, id) => {
        const data={
          panel:id._id
        }
        dispatch(createdrawingreq(data,{id:product_id,project:project_id}))       
      }
      const cancelRequest = (e) =>{
        return null
      }
  

  const dispatch = useDispatch()
  const handleMenuClick = e => {
    if (e.key === '3') {
      setVisible(false);
    }
  };



  const menu = (
      <Menu
      onClick={handleMenuClick}
      items={[
        {
          label: 'Clicking me will not close the menu.',
          key: '1',
        },
        {
          label: 'Clicking me will not close the menu also.',
          key: '2',
        },
        {
          label: 'Clicking me will close the menu.',
          key: '3',
        },
        ]}
        />
         );


  const onClose = () => {
    setVisible(false);
    setpanel(null)

  };
 
  const columns = [
      
    {
        title: ' Sl No.',
        dataIndex: 'sl_no',
        key: 'sl_no',width: 100,
        render:(t, k, i)=>{
          return <p class="m-0 ">{(page - 1) * 10 + (i+1)}</p>
        }
        
      },
      {
        title: ' Panel ID ',
        dataIndex: 'panel_id',
        key: 'panel_id',
        width: 150 ,
        ellipsis: true,
      }, 



      {
        title: ' Panel Name ',
        dataIndex: 'panel_name',
        key: 'panel_name',
        ellipsis: true,
      },

      {
        
        title: ' Panel Category',
        key: 'panel_category',
        render:(item)=>{
          return <small style={{fontSize:'14px'}} className="my-0 mr-3">{item.panel_category === 'O' ? item.category_type : item.panel_category}</small>
      }
        
      },

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
        render:(updatedAt)=>{
          return <small style={{fontSize:'14px'}} className="my-0 mr-3">{moment(updatedAt).format('DD/MM/YYYY')}</small>
      }
      },


      {
        title: 'Download',
        key: 'download',

        render: (id) => ( 
          <div style={{  margin:'0px', padding:'0px', width:'100%', display:'flex' ,zIndex:'100'}}>         
          <a href="#" className=""  onClick={(e) => {
          e.stopPropagation();      
          }}>  
            <Button disabled={id?.request === 'null' ? true : false} style={{ padding: '0px'}}
            type="link" onClick={()=>drawingPdf(id)}> 2D </Button> 
          </a>


          <a href="#" className=""  onClick={(e) => { e.stopPropagation(); }}>

         

          <Button disabled={id?.request === 'null' ? true : false} type="link" onClick={(e)=>handleClickBOM(e, id)}> 
            BOM
         </Button>
        </a>
        </div> 

        )
      },


      {
        title: 'Request',
        key: 'request',
        render: (id) => (
          <a href="#" className="" style={{  margin:'0px', padding:'0px', width:'100%'}} onClick={(e) => { 
            e.stopPropagation();      
            }}>
        <Space size="middle">

          <Popconfirm
          title="Are you sure to Request this BOM?"
          onConfirm={(data)=>confirmRequest(data, id)}
          onCancel={cancelRequest}
          okText="Yes"
          cancelText="No"
          disabled={id?.request === 'null' ? true : false}
          >

   
<Tooltip placement="topLeft" title={id?.request === 'null' ? " Enabled only when BOM is generated" : id?.request === 'send' ? " Send Full BOM request": id?.request === 'pending' ? "Request sent please wait till processed": " Request of BOM mailed succesfully"}>
<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-file-analytics" 
style={{cursor: id?.request === "send" ? "pointer" : 'no-drop', stroke: id?.request === 'null' ? "gray" : id?.request === 'send' ? "blue" :id?.request === 'pending' ? "orange":"green"}}
width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2C3E50" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M14 3v4a1 1 0 0 0 1 1h4" />
  <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
  <line x1="9" y1="17" x2="9" y2="12" />
  <line x1="12" y1="17" x2="12" y2="16" />
  <line x1="15" y1="17" x2="15" y2="14" />
  {id?.request}
</svg>
</Tooltip>
            </Popconfirm>


{ user?.license?.license_type === 'Basic' ? <Tooltip placement="topLeft" title=" Upgrade to Premium" >
<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-artboard" 
width="15" height="15" viewBox="0 0 24 24" 
style={{ cursor: 'no-drop'}}
stroke-width="3" stroke="#2C3E50" fill="none" stroke-linecap="round" stroke-linejoin="round">
 
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <rect x="8" y="8" width="8" height="8" rx="1" />
  <line x1="3" y1="8" x2="4" y2="8" />
  <line x1="3" y1="16" x2="4" y2="16" />
  <line x1="8" y1="3" x2="8" y2="4" />
  <line x1="16" y1="3" x2="16" y2="4" />
  <line x1="20" y1="8" x2="21" y2="8" />
  <line x1="20" y1="16" x2="21" y2="16" />
  <line x1="8" y1="20" x2="8" y2="21" />
  <line x1="16" y1="20" x2="16" y2="21" />
</svg>
 
</Tooltip>

:

<Popconfirm
title="Are you sure to Request this Drawing?"
onConfirm={(data)=>confirmRequestdwg(data, id)}
onCancel={cancelRequest}
okText="Yes"
cancelText="No"
disabled={id?.requestdwg === "null"? true : false}
>

<Tooltip placement="topLeft" title={id?.requestdwg === 'null' ? " Enabled only when Drawing is generated" : id?.requestdwg === 'send' ? " Send Full Drawing request": id?.requestdwg === 'pending' ? "Request Drawing please wait till processed": " Request of Drawing mailed succesfully"}>
<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-artboard"
style={{cursor: id?.requestdwg === "send" ? "pointer" : 'no-drop', stroke: id?.requestdwg === 'null' ? "gray" : id?.requestdwg === 'send' ? "blue" :id?.requestdwg === 'pending' ? "orange":"green"}}
width="15" height="15" viewBox="0 0 24 24" stroke-width="3" stroke="#2C3E50" fill="none" stroke-linecap="round" stroke-linejoin="round">

<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
<rect x="8" y="8" width="8" height="8" rx="1" />
<line x1="3" y1="8" x2="4" y2="8" />
<line x1="3" y1="16" x2="4" y2="16" />
<line x1="8" y1="3" x2="8" y2="4" />
<line x1="16" y1="3" x2="16" y2="4" />
<line x1="20" y1="8" x2="21" y2="8" />
<line x1="20" y1="16" x2="21" y2="16" />
<line x1="8" y1="20" x2="8" y2="21" />
<line x1="16" y1="20" x2="16" y2="21" />
</svg>
</Tooltip>
  </Popconfirm>
      }       
      </Space>

      </a>
        ),
      },


     
        {
            title: 'Action',
            key: 'action',
          
            render: (id) => (
              
                    <a href="#" className="" style={{  margin:'0px', padding:'0px', width:'100%'}} onClick={(e) => { 
                    e.stopPropagation();      
                    }}>
                       
                    <Space size="middle">
                    <Tooltip placement="topLeft" title="Edit Panel" arrowPointAtCenter>
                    <h5 className="text-secondary" >
                   
                      <FaRegEdit  onClick={(e)=>handleClickEdit(e, true, id)} className="text-secondary  text-lg mt-2"  /> 
                      </h5>
                    </Tooltip>

                    <Tooltip placement="topLeft" title="Duplicate Panel" arrowPointAtCenter>
                    <h5 className="text-secondary" >
                   
                      <FiCopy onClick={(e)=>handleClickDuplicate(e, true, id)}/> 
                      </h5>
                    </Tooltip>
                    
                    
                    
                    <Tooltip placement="topLeft" title="Delete Panel" arrowPointAtCenter>
                    <h5 className="text-danger">
                        <DeleteConfirm confirm={(e)=>confirm(e, id,user)} title="panel" cancel={cancel} >
                            <FaRegTrashAlt style={{cursor:"pointer"}} className="text-secondary text-lg  mt-2"  />
                        </DeleteConfirm>
                    </h5>
                    </Tooltip>
                    <h5>            
                    </h5>
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
        disabled: record.name === 'Disabled panel',
        name: record.name,
      }),
    };
  
    return (
      <>
              <div className="tabled">
              <Row gutter={[24, 0]}>
              <Col xs="24" xl={24}>
              <Card
               bordered={false}
               className="criclebox tablespace mb-24"
              extra={
                  <>
                  </>
                }
              >
                <div className="table-responsive" >
                  
                
                  <Table
                  scroll={{ x  : 1500, y:500, }}
                  loading={{spinning: loading, indicator: <Loader/>}} 
                  pagination={{
                  onChange(current) {
                  setPage(current)
                    }
                  }}
                    columns={columns}
                    dataSource={data}
                    className="ant-border-space "
                    style={{ cursor: 'pointer' }}
                    onRow={(record, rowIndex) => {
                    return {
                    onClick: event => {  history.push(`/auth/panelpage/${record._id}`) }, // click row
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
          title="Update a existing Panel" placement="right" onClose={onClose} visible={visible} width={720}
        >
          <Editpanel current_panel={current_panel} cancel={onClose} project_id ={project_id} product_id={product_id}/>

        
        </Drawer>
        <ModalForm 
            isVisible={visibleDuplicate} 
            title="Duplicate Panel"
            footer={false}
            onOk={handleOk}
            className=""
            width="50%"
            cancel={()=>setDuplicatetModal(!visibleDuplicate)}>
            <Duplicatepanel current_panel={current_panel} cancel={()=>setDuplicatetModal(!visibleDuplicate)} project_id ={project_id} product_id={product_id} />
            </ModalForm>

            <ModalForm 
            isVisible={visibleBOM} 
            title="Bill Of Material"
            footer={false}
            onOk={handleOk}
            className=""
            width="20%"
            cancel={()=>setBOMModal(!visibleBOM)}>
            <div>
            <p style={{textAlign:"center"}}>
            Click Here To Download The BOM 
             </p>
            <p style={{textAlign:"center"}}>
            <Button type="primary" onClick={()=>setBOMModal(false)} >
            <ExportExcel data={current_panel?.detailedBom} panel={current_panel}  />
            </Button>
            </p>
            </div>
            </ModalForm>
        
      </>
    );
  }
  
  export default PanelTable;
  
 