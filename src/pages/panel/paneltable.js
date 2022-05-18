
import { Pagination } from 'antd';
import {
    Row,
    Col,
    Card,
    Radio,
    Table,
    Space,
    Drawer,
    Menu, Dropdown, Button 
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
//   import Editpanel from './editpanel';
import { useHistory} from 'react-router-dom'
import {deletepanel,deleteManypanel} from '../../api/panel'
import Editpanel from './editpanel';
import moment from 'moment';
  
  function PanelTable({data,current_product}) {

    
    const [visibleEdit, setEditModal] = useState(false);
    const [current_panel, setpanel] = useState(null);
    
    const [selectionType, setSelectionType] = useState('checkbox');
   
  
   
    let history = useHistory()
    
    console.log(current_panel);
    
        const confirm = (e, id) => {
            dispatch(deletepanel(id._id, current_product))
           
          }
          const handleClickEdit = (e, isvisible, id) =>{
            e.preventDefault()
            setpanel(id)
            setVisible(true);
            }
    
       
      const [page, setPage] = useState(1);
    
    
      const [visible, setVisible] = useState(false);
    
      const cancel = (e) =>{
        return null
      }
    
          const closeModal = () => {
            setEditModal(false)
            setpanel(null)
          }
   

  const dispatch = useDispatch()

  const handleMenuClick = e => {
    if (e.key === '3') {
      setVisible(false);
    }
  };

  const handleVisibleChange = flag => {
    setVisible(flag);
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
        key: 'sl_no',
        render:(t, k, i)=>{
          return <p class="m-0 ">{(page - 1) * 10 + (i+1)}</p>
        }
        
      },

      {
        title: ' Panel Name ',
        dataIndex: 'panel_name',
        key: 'panel_name',
        
      },

    

      {
        
        title: ' Panel Category',
        dataIndex: 'panel_category',
        key: 'panel_category',
        
      },

      {
        title: 'Created Date',
        dataIndex: 'createdDate',
        key: 'createdDate',
        render:(item)=>{
          return <p > {moment(item).format('DD/MM/YYYY')}</p>
        }
        
      },

      {
        title: 'Rated Voltage',
        dataIndex: 'rated_voltage',
        key: 'rated_voltage',
        
      },

      {
        title: 'Ambient Temperature',
        dataIndex: 'ambient_temperature',
        key: 'ambient_temperature',
        
      },
      {
        title: 'Busbar Material',
        dataIndex: 'busbar_material',
        key: 'busbar_material',
        
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
                    <h5 className="text-danger">
                        <DeleteConfirm confirm={(e)=>confirm(e, id)} title="panel" cancel={cancel} >
                            <FaRegTrashAlt style={{cursor:"pointer"}} className="text-secondary text-lg  mt-2"  />
                        </DeleteConfirm>
                    </h5>
                    <h5>
                    <Dropdown overlay={menu} onVisibleChange={handleVisibleChange} visible={visible}>
      <a onClick={e => e.preventDefault()}>
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-dots-vertical" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <circle cx="12" cy="12" r="1" />
  <circle cx="12" cy="19" r="1" />
  <circle cx="12" cy="5" r="1" />
                    </svg>
                    </a>
    </Dropdown>
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
        // Column configuration not to be checked
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
          title="Update a existing user" placement="right" onClose={onClose} visible={visible} width={720}
        >
          <Editpanel current_panel={current_panel} cancel={onClose}/>
        </Drawer>
        
      </>
    );
  }
  
  export default PanelTable;
  
 