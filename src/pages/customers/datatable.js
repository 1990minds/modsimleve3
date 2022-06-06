import { FaRegTrashAlt, FaRegEdit } from 'react-icons/fa';
import ModalForm from '../../global/model'
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
  import Editcustomers from './editcustomers';
  import { PlusOutlined } from '@ant-design/icons';
  import DeleteConfirm from '../../global/delete'
//   import Createcustomer from "./createcustomer";
  import { FileAddOutlined  } from '@ant-design/icons'
  // Images
  import face6 from "../../assets/images/face-6.jpeg";
  import pencil from "../../assets/images/pencil.svg";
  import {useDispatch} from 'react-redux'
  import {deletecustomers} from '../../api/customers'
  import styled from 'styled-components'
  import moment from 'moment';

  
  export default function CustomersTable({data,intialdata}) {

    const [visibleEdit, setEditModal] = useState(false);
    const [current_customers, setcustomers] = useState(null);
    
    const [selectionType, setSelectionType] = useState('checkbox');

  
  
  const [visibleLicense, setVisibleModal] = useState(false);
  const [curr_company, setCompany] = useState(null);

  
console.log(current_customers);

  const dispatch = useDispatch()

  const confirm = (e, id) => {
    console.log(id)
      dispatch(deletecustomers(id._id, id.customers,id.company?._id))
     
    }

  

      const handleClickEdit = (e, isvisible, id) =>{
        e.preventDefault()
        setcustomers(id)
        setVisible(true);
        }

   
  const [page, setPage] = useState(1);


  const [visible, setVisible] = useState(false);

  const cancel = (e) =>{
    return null
  }


        const closeModal = () => {
          setEditModal(false)
          setcustomers(null)
        }

        const onClose = () => {
            setVisible(false);
            setcustomers(null)
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
        title: ' Customer Name ',
        dataIndex: 'customers_name',
        key: 'customers_name',
        
      },
     

      {
        title: 'Phone Number',
        dataIndex: 'phone_number',
        key: 'phone_number',
        
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        
      },

      {
        title: 'Created Date',
        dataIndex: 'createdAt',
        key: 'createdAt',
        render:(createdAt)=>{
          return <small className="my-0 mr-3">{moment(createdAt).format('DD/MM/YYYY')}</small>
      }
      },

      {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
        
      },
        
      {
        title: 'Action',
        key: 'action',
        render: (id) => (
          <Space size="middle">
             <Tooltip placement="topLeft" title="Edit existing customer" arrowPointAtCenter>
          <h5 className="text-secondary" >
            <FaRegEdit style={{cursor:"pointer"}} onClick={(e)=>handleClickEdit(e, true, id)} className="text-secondary mt-2"  /> 
            </h5>
            </Tooltip>

            <Tooltip placement="topLeft" title="Delete existing customer" arrowPointAtCenter>

            
            <DeleteConfirm confirm={(e)=>confirm(e, id)} title="customers" cancel={cancel} >
                <FaRegTrashAlt style={{cursor:"pointer"}}className="text-secondary mt-2"  />
            </DeleteConfirm>
       
        </Tooltip> 
        </Space>
        ),
      },
      ];
 
      const [selectionKey, setSelectionKey] = useState([]);

      const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {


          setSelectionKey(selectedRowKeys)
        },
        getCheckboxProps: (record) => ({
          disabled: record.name === 'Disabled customers',
          // Column configuration not to be checked
          name: record.name,
        }),
      };

      const variants = {
        open: { opacity: 1, y: 0 },
        closed: { opacity: 0, y: "3.5rem" },
      }

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
                <div className="table-responsive">
                  <Table
                  pagination={{
                    onChange(current) {
                      setPage(current)
                    }
                  }}
                    columns={columns}
                    dataSource={data}
                    className="ant-border-space"
                  />
                </div>
              </Card>
            </Col>
          </Row>
        </div>
       
                   <Drawer
          title="Update a existing customer" placement="right" onClose={onClose} visible={visible} width={720}
        >
          <Editcustomers current_customers={current_customers} cancel={onClose}/>
        </Drawer>
       
      </>
    );
  }
  

  // <div className="uploadfile pb-15 shadow-none">
  //                 <Upload {...formProps}>
  //                   <Button
  //                     type="dashed"
  //                     className="ant-full-box"
  //                     icon={<ToTopOutlined />}
  //                   >
  //                     Click to Upload
  //                   </Button>
  //                 </Upload>
  //               </div>