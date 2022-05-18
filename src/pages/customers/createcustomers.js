
import { Drawer, Form, Button, Col, Row, Input, Select, DatePicker, Tooltip } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Divider } from 'antd';
import {useDispatch, useSelector} from 'react-redux'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import {authenticateSelector} from '../../api/authSlice'
import React, {useState,useEffect} from 'react'
import { render } from '@testing-library/react';
import { fetchAllcompanycustomers,customersSelector } from '../../api/customers';
import Password from 'antd/lib/input/Password';
import {FaCompanyAlt, FaLock} from 'react-icons/fa'
import {createcustomers} from '../../api/customers'

const { Option } = Select;

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 12 },
  };
 

export default function CreateCustomer({cancel}) {
  
  const [loading, setLoading] = useState(false)
    const { user } = useSelector(authenticateSelector) 
    console.log(user);


  const [visible, setVisible] = useState(false);
    const showDrawer = () => {
      setVisible(true);
    };
    const onClose = () => {
      setVisible(false);
    };
    
  
      const dispatch = useDispatch();
     
        
  
      const onFinish = (values) => {
        const data = {
          phone_number:values.phone_number,
          email:values.email,
          customers_name:values.customers_name,
          address:values.address,
          companyId:user?.company
        }

        dispatch(createcustomers(data, user?.company))
        form.resetFields()
        cancel()
        
      };

   const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const [form] = Form.useForm();


  
    return (
      <>
      <Tooltip placement="topLeft" title="Creating a new user" arrowPointAtCenter>
        <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />} style={{fontSize: "14px" }}>
          Create
        </Button>
        </Tooltip>
          <Drawer
          title="Create Customer" placement="right" onClose={onClose} visible={visible} width={720} style={{ fontWeight: '600'}}
        >

        
          <Form layout="vertical" hideRequiredMark
            
            form={form}
      
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          
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
          label={<p className="w-36 text-left m-0">Phone Number</p>}
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
          rules={[{ required: true, message: 'Please input Address!' }]}
        >
           <Input/>

</Form.Item>
              </Col>
            </Row>



<Button type="primary"  htmlType='submit' block style={{ fontSize: '14px' }}
onClick={() => setVisible(false)}
>
      Submit
    </Button>
          </Form>
          </Drawer>
      </>
    );
  }
