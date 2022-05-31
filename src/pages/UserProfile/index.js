import React, { useEffect, useState } from 'react'
import {
    Card,
    Form,
    Input,
    Button,
    Radio,
    Divider,
    Cascader,
    DatePicker,
    InputNumber,
    TreeSelect,
    Switch,
  } from 'antd';
import Layout from '../../components/layout/Main'
import { authenticateSelector} from '../../api/authSlice'
import {useDispatch, useSelector} from 'react-redux'
import { AntDesignOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
const Index = () => {

    // console.log(user_profile)
    const {user} = useSelector(authenticateSelector)
    console.log(user);
    // const { user} = useSelector(getUserProfile) 


    const [componentSize, setComponentSize] = useState('default');

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const [form] = Form.useForm();


useEffect(() =>{
    form.setFieldsValue({
        user_name:user && user.user_name,
        full_name:user && user.full_name,
        phone_number:user && user.phone_number,
        department:user && user.department
    })
})

  return (
    <Layout>


        <Card style={{ width: '100%' }}>
      <Form layout="vertical" hideRequiredMark
           form={form}
           name="basic"
           style={{ textAlign: 'center', display: 'flex', justifyContent: 'center' }}
           initialValues={{ remember: false }}
        //    onFinish={onFinish}
        //    onFinishFailed={onFinishFailed}
           autoComplete={false}
          >
      <div style={{ width: '30%' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: '700'}}> Update Information</h1>
          <Form.Item label="" name="full_name" >
          <Avatar
    size={{
      xs: 24,
      sm: 32,
      md: 40,
      lg: 64,
      xl: 80,
      xxl: 100,
    }}
    icon={<AntDesignOutlined />}
  />
      </Form.Item>
      <Form.Item label="Name" name="full_name" >
        <Input  />
      </Form.Item>
      <Form.Item label="Email ID" name="user_name">
        <Input disabled />
      </Form.Item>
      <Form.Item label="Phone" name="phone_number">
        <Input disabled />
      </Form.Item>
      <Form.Item label="Department" name='department'>
        <Input />
      </Form.Item>
    
      <Form.Item>
      <Divider />
<Button type="primary" htmlType="submit"
// onClick={() => setVisible(false)}
block style={{ fontSize: '14px' }}>
      Update Profile
    </Button>
      </Form.Item>
      </div>
    </Form>
    </Card>
    </Layout>
  )
}

export default Index