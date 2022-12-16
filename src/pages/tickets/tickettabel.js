import {
  Row,
  Col,
  Card,
  Table,
} from "antd";
import { useState } from "react";
import { useHistory} from 'react-router-dom'
import { Input } from "antd";
import {useDispatch} from 'react-redux'
import styled from 'styled-components'
import moment from "moment";
import Loader from '../shared/tableloader'


function Tables({data ,loading}) {

const Search = Input.Search; 
const [visibleLicense, setVisibleModal] = useState(false);
const [current_parts, setParts] = useState(null);

  const handleClickVisible = (e, isvisible, id) =>{
    e.preventDefault()
    setParts(id)
    setVisibleModal(isvisible)
    }

    let history = useHistory()

    const onClose = () => {
      setVisible(false);
      setParts(null)
    };

    const cancel = (e) =>{
      return null
    }

    const dispatch = useDispatch()

    const [visible, setVisible] = useState(false);

    const handleClickEdit = (e, isvisible, id) =>{
      e.preventDefault()
      setParts(id)
      setVisible(true);
      }


const [page, setPage] = useState(1);


const columns = [
    
  {
    title: ' Sl No.',
    dataIndex: 'sl_no',
    width: 100,
    key: 'sl_no',
    render:(t, k, i)=>{
      return <p class="m-0 ">{(page - 1) * 10 + (i+1)}</p>
    }
    
  },

    {
      width: 200,
      title: 'Ticket ID',
      dataIndex: 'ticket_id',
      key: 'ticket_id',
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
      title: 'Ticket Status',
      dataIndex: 'ticket_status',
      key: 'ticket_status',
      width: 200,
      render:(ticket_status)=>{ return <> { ticket_status === true ? " Closed" : " Open" } </> }
      
    },


    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      width: 200,
      ellipsis: true,
    },
    
    


  
  ];

  const onChange = (e) => console.log(`radio checked:${e.target.value}`);

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
                     loading={{spinning: loading, indicator: <Loader/>}} 
                      columns={columns}
                      dataSource={data}
                      scroll={{ x  : 1500, y:500, }}
                      pagination={{
                        onChange(current) {
                          setPage(current)
                        }
                    
                  }}
                  style={{ cursor:"pointer" }}
                  onRow={(record, rowIndex) => {
                    return {
                      
                      onClick: event => {  history.push(`/auth/ticketviewer/${record._id}`) } , // click row
                    };
                  }}
                  />
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Tables;



const SearchWrap = styled.div`

.text-danger{
  zindex: '100'
}

`