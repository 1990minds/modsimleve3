
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
      form.resetFields()
    };
    
  
      const dispatch = useDispatch();
     
        
  
      const onFinish = (values) => {
        const data = {
          phone_number:values.phone_number,
          email:values.email,
          customers_name:values.customers_name,
          country:values.country,
          designation:values.designation,
          address:values.address,
          address2:values.address2,
          state:values.state,
          city:values.city,
          pincode:values.pincode,
          customer_tax_number:values.customer_tax_number,
          website:values.website,
          contact_person:values.contact_person,
          companyId:user?.company?._id
        }

        dispatch(createcustomers(data, user?.company?._id))
        form.resetFields()
        cancel()
      };

   const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    setVisible(true);
  };

  const [form] = Form.useForm();


  
    return (
      <>
      <Tooltip placement="topLeft" title="Creating a new customer" arrowPointAtCenter>
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
          rules={[{ required: true ,message: 'required!' },
          {min: 10},
          {max:10},
          {pattern:"[0-9]", message:"Only Numbers"}
          ]}
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
          rules={[{
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail!',
          },]}
        >
           <Input/>

</Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="designation"
                  label="Designation"
                  rules={[{ required: true, message: 'Please enter Designation' }]}
                >
                  <Input  />
                </Form.Item>
              </Col>
           </Row>

           <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="address"
                  label="Address "
                  rules={[{ required: true, message: 'Please enter Address' }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="address2"
                  label="Address 2"
                  rules={[{ required: true, message: 'Please enter Address' }]}
                >
                  <Input  />
                </Form.Item>
              </Col>
            </Row>



            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="country"
                  label="Country"
                  rules={[{ required: true, message: 'Please select a Country' }]}
                >
                 
                   <Input  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="state"
                  label="State"
                  rules={[{ required: true, message: 'Please choose a State' }]}
                >
                
                   <Input  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
            <Col span={12}>
                <Form.Item
                  name="city"
                  label="City"
                  rules={[{ required: true, message: 'Please enter the City' }]}
                >
                  <Input  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="pincode"
                  label="Pincode"
                  rules={[{ required: true, message: 'Please enter the Pincode' }]}
                >
                  <Input  />
                </Form.Item>
              </Col>
              
            </Row>


            <Row gutter={16}>
            <Col span={12}>
                <Form.Item
                  name="customer_tax_number"
                  label="Tax Number/GST"
                  rules={[{ required: true, message: 'Please enter Tax Number' }]}
                >
                  <Input  />
                </Form.Item>
              </Col>
            <Col span={12}>
                <Form.Item
                 name="website"
                  label="Website"
                  rules={[{ required: true, message: 'Please enter url' }]}
                >
                  <Input
                    style={{ width: '100%' }}
                    addonBefore="https://"
                    
                  />
                </Form.Item>
              </Col>
              
            </Row>
            <Row>

            <Col span={12}>
                <Form.Item
                  name="contact_person"
                  label="Contact Person"
                  rules={[{ required: true, message: 'Please enter Contact Person name' }]}
                >
                  <Input/>
                </Form.Item>
              </Col>

              </Row>








            <Divider />

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
