import React, {useState,useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Drawer, Form, Button, Col, Row, Input, Select, DatePicker, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Divider } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import {updatecustomers, fetchOneCustomers, customersSelector,} from '../../api/customers'
import {authenticateSelector} from '../../api/authSlice';
import { fetchAllCustomers } from '../../api/customers';
import {createCustomers} from '../../api/customers'
import { Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';


const { Option } = Select;

export default function EditCustomers({current_customers,cancel}) {
  

    const dispatch = useDispatch();
    const { user } = useSelector(authenticateSelector) 
    console.log(user);

    useEffect(()=>{
  
        form.setFieldsValue({
          customers_name:current_customers &&  current_customers. customers_name,
          email:current_customers && current_customers.email,
          address:current_customers&& current_customers.address,
          phone_number:current_customers && current_customers.phone_number,
   
          });
          }, [current_customers])
                  
  
          const onFinish = (values) => {
  
            const customersdata = {
      
            phone_number:values.phone_number,
            email:values.email,
             customers_name:values.customers_name,
             address:values.address,
                 
              }
              dispatch(updatecustomers(current_customers._id, customersdata,user?.company?._id))
              form.resetFields()
              cancel()
             };
           const [form] = Form.useForm();

           const onChange = (value)=> {
             console.log(`selected ${value}`)
         
           }
        

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const { TextArea } = Input;
    const [visible, setVisible] = useState(false);

    const showDrawer = () => {
      setVisible(true);
    };
  
    const onClose = () => {
      setVisible(false);
    };

    return (
      <>
      
          <Form layout="vertical" hideRequiredMark
           form={form}
           name="basic"
           initialValues={{ remember: false }}
           onFinish={onFinish}
           onFinishFailed={onFinishFailed}
           autoComplete={false}
          >
            <Row gutter={16}>
              <Col span={12}>
              <Form.Item
          label={<p className="  w-36 text-left m-0"> Customer Name</p>}
          name="customers_name"
          rules={[{ required: true, message: 'Please Input Customer Name!' }]}
        >
          <Input/>

        </Form.Item>
              </Col>
              <Col span={12}>
              <Form.Item
          label={<p className="w-36 text-left m-0">Phone number</p>}
          name="phone_number"
          rules={[{ required: true, message: 'Please Input Phone Number!' }]}
        >
           <Input/>

</Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
              <Form.Item
          label={<p className="  w-36 text-left m-0">Email</p>}
          name="email"
          rules={[{ required: true, message: 'Please Input Email!' }]}
        >
           <Input/>

</Form.Item>
              </Col>
          

            
              <Col span={12}>
              <Form.Item
          label={<p className="  w-36 text-left m-0">Address</p>}
          name="address"
          rules={[{ required: true, message: 'Please Input Address!' }]}
        >
           <Input/>

</Form.Item>
              </Col>
            </Row>

        
            <Divider />
<Button type="primary" htmlType="submit"
onClick={() => setVisible(false)}
block style={{ fontSize: '14px' }}>
      Submit
    </Button>
          </Form>
        
        
      </>
    );
  }

