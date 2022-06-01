import React from 'react'
import Layout from '../../components/layout/Main'
import {fetchOneTickets,ticketsSelector} from '../../api/tickets'
import { useDispatch,useSelector} from 'react-redux'
import {useParams} from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Col, Divider, Row, Card , Form , Button, Input , Image} from 'antd';
import { Comment, Tooltip } from 'antd';
import moment from 'moment'
import Closemodel from './confirmclose'
import { updatetickets } from '../../api/tickets';


const { TextArea } = Input;


const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <>
    <Form.Item>
      <TextArea placeholder="Reply here" rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button  align="middle" justify="space-around"
      htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
        Send Comment
      </Button>
    </Form.Item>
  </>
);

const Ticketviewer = () => {

const onFinish = (values) => {
  
  const ticketdata = {
      comment:values.comment,
  }
       dispatch(updatetickets(current_tickets._id,ticketdata))
       form.resetFields()
      // console.log(ticketdata);
      // console.log(current_tickets._id);
      };

  const [form] = Form.useForm();
  const {id}= useParams()
  const dispatch = useDispatch();
  const {all_tickets, current_tickets}=useSelector(ticketsSelector)
 
  console.log(current_tickets)



  useEffect(()=>{
    dispatch(fetchOneTickets(id))
},[dispatch])

const [submitting, setSubmitting] = useState(false);
const [value, setValue] = useState('');


const handleChange = (e) => {
  setValue(e.target.value);

};

const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

  return (
    <Layout>
      <div style={{ display:'flex', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center' }}>
        <div>
          <h1  style={{ fontSize: '24px'}}> Ticket ID :<b> #{current_tickets?.ticket_id}</b></h1>
        </div>
        <div>
          <Closemodel data={current_tickets} />
        </div>
    
    </div>
       <Divider orientation="left"/>
    <Row style={{ width: '100%'}}>
      <Col style={{ width: '100%'}}>
    {/* <Col flex="1 1 200px" value={100}> */}
      <Card style={{ width: "100%"}} >
        <Comment
        style={{ padding: "20px"}}
      author={<h2>
              Company Name : <b>{current_tickets?.company?.company_name}</b> <br/><br/>
              User : <b>{current_tickets?.company?.contact_person}</b><br/><br/>
              Email : <b>{current_tickets?.company?.email_ID}</b><br/><br/>
      </h2>}
      // avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
      content={
        <h2><b>Issue Title :</b> {current_tickets?.title}</h2>}
        children={
        <p style={{ lineHeight: '30px', paddingLeft: '20px', paddingRight: '30px', fontSize:'16px', textAlign: 'justify'}}>
        <b>Issue Description :</b>  {current_tickets?.description}
        <br/><br/>
        <b>Issue Screenshot:</b>
        <br/><br/>
        <Image
          width={400}
          src={current_tickets?.issue_image}/>
        <br/><br/>
        <Card>
        <b>Comment :</b> {current_tickets?.comment}
        <br/><br/>
        <b>Remark :</b> {current_tickets?.remark}
        <br/><br/>
        </Card>
        </p>
        
      }
      // datetime={
      //   <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
      //     <span>{moment().fromNow()}</span>
      //   </Tooltip>
      // }
    />
    <div  justify="space-around" align="end" style={{ paddingLeft:'10%', paddingRight: '10%', paddingTop:'5%', width: '100%' }}>
    <Form layout="vertical" hideRequiredMark
            
            form={form}
      
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          
          >
        <Form.Item
                  name="comment"
                  label="Submit Your Feedback"
                  rules={[{ required: true, message: 'Please enter Company name' }]}
                >
    <Editor
            onChange={handleChange}
            submitting={submitting}
            value={value}
          />
          </Form.Item>
          </Form>
          </div>
    </Card>
    </Col>
    {/* <Col flex="0 1 300px" justify="space-around" align="middle">
    <Button  
      htmlType="submit" style={{ backgroundColor: 'red', border: '1px solid red', color: 'white' }}>
        Close Ticket
      </Button>
    </Col> */}
    </Row>

    </Layout>
  )
}

export default Ticketviewer