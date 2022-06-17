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
          address2:current_customers&& current_customers.address2,
          phone_number:current_customers && current_customers.phone_number,
          country:current_customers && current_customers.country,
          designation:current_customers && current_customers.designation,
          state:current_customers && current_customers.state,
          city:current_customers && current_customers.city,
          pincode:current_customers && current_customers.pincode,
          customer_tax_number:current_customers && current_customers.customer_tax_number,
          website:current_customers && current_customers.website,
   
          });
          }, [current_customers])
                  
  
          const onFinish = (values) => {
  
            const customersdata = {
      
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
                  label="Address"
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

