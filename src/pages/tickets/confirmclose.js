import { Button, Modal, Input  } from 'antd';
import { useState,useEffect } from 'react';
import { updatetickets } from '../../api/tickets';
import {useDispatch, useSelector} from 'react-redux'
import { Form  } from 'antd';



const Close = (current_tickets) => {
  const [isModalVisible, setIsModalVisible] = useState(false);


  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const dispatch = useDispatch();
  const { TextArea } = Input;


  const onFinish = (values) => {
  
const ticketdata = {
    remark:values.remark,
}
     dispatch(updatetickets(current_tickets.data._id,ticketdata))
     form.resetFields()
    
    };

const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const [form] = Form.useForm();

  return (
    <>
  

      <Modal title="Confirm Ticket Closure "
       visible={isModalVisible}
        onCancel={handleCancel}
        footer={false}
        >
        <p>Please provide us the Closure comment</p>

        <Form layout="vertical" hideRequiredMark
            
            form={form}
      
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          
          >
        <Form.Item
                  name="remark"
                  label="Company Name"
                  rules={[{ required: true, message: 'Please enter Company name' }]}
                >
                  <TextArea rows={4} />
            </Form.Item>

            <Button type="primary"  htmlType='submit' block style={{ fontSize: '14px' }}>
      Submit
    </Button>
       </Form>
      </Modal>
    </>
  );
};

export default Close;