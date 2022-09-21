import { FaRegTrashAlt, FaRegEdit } from 'react-icons/fa';
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
  import Editcustomers from './editcustomers';
  import DeleteConfirm from '../../global/delete'
  import {useDispatch} from 'react-redux'
  import {deletecustomers} from '../../api/customers'
  import moment from 'moment';

  
  export default function CustomersTable({data,intialdata,loading, user}) {

  
    const [current_customers, setcustomers] = useState(null);
    const [setModel, setEditModal] = useState(null);
  const dispatch = useDispatch()

  const confirm = (e, id, user) => {
    const data={user:user._id}
      dispatch(deletecustomers(id._id, data, id.company?._id))
     
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
        width: 100,
        render:(t, k, i)=>{
          return <p class="m-0 ">{(page - 1) * 10 + (i+1)}</p>
        }
        
      },

      {
        title: ' Customer Name ',
        dataIndex: 'customers_name',
        key: 'customers_name',
        ellipsis: true,
      },
     

      {
        title: 'Phone Number',
        dataIndex: 'phone_number',
        key: 'phone_number',
        ellipsis: true,
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        ellipsis: true,
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
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
        ellipsis: true,

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


           

            <DeleteConfirm confirm={(e)=>confirm(e, id, user)} title="customers" cancel={cancel} >
               <Tooltip placement="topLeft" title="Delete existing customer" arrowPointAtCenter>
                <FaRegTrashAlt style={{cursor:"pointer"}}className="text-secondary mt-2"  />
                 </Tooltip> 
            </DeleteConfirm>


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
               
                  </>
                }
              >
                <div className="table-responsive">
                  <Table
                  loading={loading}
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
          title="Update an existing customer" placement="right" onClose={onClose} visible={visible} width={720}
        >
          <Editcustomers current_customers={current_customers} cancel={onClose}/>
        </Drawer>
       
      </>
    );
  }
  