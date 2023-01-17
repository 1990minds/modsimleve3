import { FaRegTrashAlt, FaRegEdit } from 'react-icons/fa';
import ModalForm from '../../global/model'
import {
    Row,
    Col,
    Card,
    Radio,
    Table,
    Space,
    Drawer,
  } from "antd";
  import { useState } from "react";
  import { ToTopOutlined } from "@ant-design/icons";
  import { Link } from "react-router-dom";
  import { PlusOutlined } from '@ant-design/icons';
  import DeleteConfirm from '../../global/delete'
// import Createcustomer from "./createcustomer";
  import { FileAddOutlined  } from '@ant-design/icons'
  // Images
  import face6 from "../../assets/images/face-6.jpeg";
  import pencil from "../../assets/images/pencil.svg";
  import {useDispatch} from 'react-redux'
  import {deletebroadcast} from '../../api/broadcast'
  import moment from 'moment';
  import Loader from '../shared/tableloader'

  
  function BroadcasteTable({data,loading}) {

    
    const [visibleEdit, setEditModal] = useState(false);

    const [current_broadcaste, setBroadcaste] = useState(null); 

      const handleClickEdit = (e, isvisible, id) =>{
        e.preventDefault()
        setBroadcaste(id)
        setVisible(true);
        }

    
  const [visibleLicense, setVisibleModal] = useState(false);
  const [curr_company, setCompany] = useState(null);

  const [page, setPage] = useState(1);


  const [visible, setVisible] = useState(false);

  const cancel = (e) =>{
    return null
  }


  const dispatch = useDispatch()

  const confirm = (e, id) => {
    dispatch(deletebroadcast(id._id, id.broadcaste))
   
  }
 
  const onClose = () => {
    setVisible(false);
    setBroadcaste(null)
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
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
       
      }, 
         

        {
          title: 'Date',
          dataIndex: 'createdAt',
          key: 'createdAt',
          width: 200,
          render:(createdAt)=>{
            return <small style={{fontSize:'14px'}} className="my-0 mr-3">{moment(createdAt).format('DD/MM/YYYY')}</small>
        }
        },

        {
          title: 'Description',
          dataIndex: 'description',
          key: 'description',
          ellipsis: true,
        },
      ];
 
      const [selectionKey, setSelectionKey] = useState([]);

      const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
  
  
          setSelectionKey(selectedRowKeys)
        },
        getCheckboxProps: (record) => ({
          disabled: record.name === 'Disabled Company',
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
                 <div className="table-responsive">
                 <Table
                  scroll={{ x  : 800, y:'calc(100vh - 30em)' }}

                  loading={{spinning: loading, indicator: <Loader/>}} 
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
                 title="Update Broadcaste" placement="right" onClose={onClose} visible={visible} width={720}
                 >
                {/* <Editbroadcaste current_broadcaste={current_broadcaste} cancel={onClose}/> */}
                </Drawer>
      </>
    );
  }
  
  export default BroadcasteTable;
  

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