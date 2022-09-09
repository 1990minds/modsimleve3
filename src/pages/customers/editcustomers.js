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
import countries from '../../global/data'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

const { Option } = Select;

export default function EditCustomers({current_customers,cancel}) {
  
  const [ states , setStates ] = useState([])
  const [ statesnumber , setStatesnumber ] = useState('')
  const dispatch = useDispatch();
  const { user } = useSelector(authenticateSelector) 
  

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
          contact_person:current_customers && current_customers.contact_person,
   
          });
          }, [current_customers])
               
          const onChange = (value)=> {
            console.log(`selected ${value}`)
        
          }
    
    
          const onChangeCountry = (value)=> {
            console.log(`selected ${value}`)
           let country = countries?.countries.find( item => item.country === value)
        setStates(country.states)

        let contnumber = countries?.countries.find( item => item.country === value)
    setStatesnumber(contnumber.code)
          }
    
              
          const onSearch = (value) => {
            console.log('search:', value);
          };
  
          const onFinish = (values) => {
  
            const customersdata = {
      
              phone_number:`${statesnumber} ${values.phone_number}`,
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
                 
              }
              setStatesnumber('')
              dispatch(updatecustomers(current_customers._id, customersdata,user?.company?._id))
              form.resetFields()
              cancel()
             };
           const [form] = Form.useForm();

        

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
                  name="contact_person"
                  label="Contact Person"
                  rules={[{ required: true, message: 'Please enter Contact Person name' }]}
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
              <Col span={12}>
                <Form.Item
                  name="customer_tax_number"
                  label="Tax Number/GST"
                  rules={[{ required: true, message: 'Please enter Tax Number' }]}
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
                 
                 <Select
                  optionFilterProp="children"
                  onChange={onChangeCountry}
                  onSearch={onSearch}
                 
                  showSearch      
                  placeholder="Please select your country">
                  { 
                   countries?.countries?.map( (item, i)=>(
                   <option key={i} value={item?.country}> { item?.country}</option>
                     ))
                }
                  </Select> 
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="state"
                  label="State"
                  rules={[{ required: true, message: 'Please choose a State' }]}
                >
                
                <Select
                  optionFilterProp="children"
                  onChange={onChange}
                  onSearch={onSearch}
                 disabled={ states.length===0}
                  showSearch      
                  placeholder="Please select your state">
                  { 
                  states?.map( (item, i)=>(
                   <option key={i} value={item}
                   
                   > { item}</option>
                     ))
                }
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
            <Col span={12}>
             < Form.Item
             label="Phone Number"
             name="phone_number"
             >
              <Input style={{ padding: '0px 2px 0px 12px', borderRadius: '8px' }} />
    </Form.Item>
              </Col>
        
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
         </Row>

           

           <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="address"
                  label="Address Line 1"
                  rules={[{ required: true, message: 'Please enter Address' }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="address2"
                  label="Address Line 2"
                  rules={[{ required: true, message: 'Please enter Address' }]}
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
                 name="website"
                  label="Website"
                  
                >
                  <Input
                    style={{ width: '100%' }}
                    addonBefore="https://"
                    
                  />
                </Form.Item>
              </Col>
              
            </Row>
            <Row>
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

