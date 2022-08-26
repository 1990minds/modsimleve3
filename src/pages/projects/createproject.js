import React, {useState,useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Drawer, Form, Button, Col, Row, Input, Select, Tooltip , Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Divider } from 'antd';
import {fetchAllproduct, productSelector, } from '../../api/product'
import { fetchAllcompanycustomers,customersSelector } from '../../api/customers';
import {authenticateSelector} from '../../api/authSlice';
import {createproject} from '../../api/project'
import { Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import {useParams} from 'react-router-dom'

const { Option } = Select;

 
export default function CreateProject({cancel}) {
  
       const [loading, setLoading] = useState(false)
       const { user } = useSelector(authenticateSelector) 
       console.log(user);
       const { all_customers} = useSelector(customersSelector)  
       const dispatch = useDispatch();
       console.log({K:all_customers});
      
      
       useEffect(()=>{
       dispatch(fetchAllcompanycustomers(user?.company?._id))           
       }, [user])
        
  
       const onFinish = (values) => {
    
       console.log(values);
       const data = {
        project_location:values.project_location,
        phone_number:values.phone_number,
        email:values.email,
        project_status:values.project_status,
        // project_id:values.project_id,
        project_name:values.project_name,
        project_coordiantor:values.project_coordiantor,
        customerId:values.customerId,
        companyId:user?.company?._id,
        user:user?._id,
         
      }


       dispatch(createproject(data, user?.company?._id))
      
       };
  
       const onFinishFailed = (errorInfo) => {
       console.log('Failed:', errorInfo);
       setVisible(true);
       };

        const handleChangeSelect = (value) =>{
       }
 
       const [form] = Form.useForm();

       const onChange = (value)=> {
       console.log(`selected ${value}`)
       
       }


        const { TextArea } = Input;
        const [visible, setVisible] = useState(false);
        const showDrawer = () => {
        setVisible(true);
        };
  
        const onClose = () => {
        setVisible(false);
        form.resetFields()
        };

    return (
           <>
           <Tooltip placement="topLeft" title="Create Project" arrowPointAtCenter>
           <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />} style={{fontSize: "14px"}}>
            Create
            </Button></Tooltip>
        
            <Drawer
             title="Create A New Project" placement="right" onClose={onClose} visible={visible} width={720}
             >
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
              label={<p className="  w-36 text-left m-0">Customer Name</p>}
              name="customerId"
              rules={[{ required: true, message: 'Please Input Customer Name!' }]}
              >
              <Select 
              showSearch
              placeholder="Customer Name"  
                           
             optionFilterProp="children"
             filterOption={(input, option) =>
               option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
                          
              onChange={handleChangeSelect}>
                    {
              all_customers.map((item, i)=>{     
                                                
              return <option key={i} value={item._id} >{item.customers_name}</option>
              })
                    }                           
              </Select>       
              </Form.Item>
              </Col>

             <Col span={12}>                
             <Form.Item
             label={<p className="  w-36 text-left m-0"> Project Name</p>}
             name="project_name"
             rules={[{ required: true, message: 'Please Input Project Name!' }]}
             >
             <Input/>
             </Form.Item>
             </Col>
             </Row>




             <Row gutter={16}>
             <Col span={12}>
             <Form.Item
             label={<p className="  w-36 text-left m-0">Project Coordinator</p>}
             name="project_coordiantor"
            //  rules={[{ required: true, message: 'Please select Project Coordinator!' }]}
             >
             <Input/>            
             </Form.Item>
             </Col>

             <Col span={12}>
             <Form.Item
             label={<p className="  w-36 text-left m-0">Project Location</p>}
             name="project_location"
            //  rules={[{ required: true, message: 'Please select Project Location!' }]}
             >
             <Input/>
             </Form.Item>
             </Col>
             </Row>


        
           <Row gutter={16}>
           {/* <Col span={12}>
           <Form.Item
            label={<p className="w-36 text-left m-0">Phone Number</p>}
            name="phone_number"
            rules={[{ message: 'required!' },
            {min: 10},
            {max:10},
            {pattern:"[0-9]", message:"Only Numbers"}
            ]}
           >
           <Input/>
           </Form.Item>
           </Col> */}
             
              <Col span={12}>
              <Form.Item
              label={<p className="  w-36 text-left m-0">Email</p>}
            name="email"
            rules={[{
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
             
              message: 'Please input your E-mail!',
            },]}
           >
           <Input/>

           </Form.Item>
             </Col>

             <Col span={12}>

            <Form.Item 
            label={<p className="  w-36 text-left m-0">Project Status</p>}
            name="project_status"
            rules={[{ required: true, message: 'Please Select Project Status!' }]}
            >
                        <Select
            placeholder="Select Project Status"
            onChange={onChange}
            style={{ width: '100%' }}
            allowClear
            >
            <Option value="In-Progress">In-Progress</Option>
            <Option value="Order Won">Order Won</Option>
            <Option value="Order Lost">Order Lost</Option>
            </Select>

            </Form.Item>
            </Col>

            </Row>
 
            <br/>
            <br/>
            <Divider />

            
            <Button type="primary" htmlType="submit"
             onClick={() => setVisible(false)}
             block style={{ fontSize: '14px' }}>
             Submit
             </Button>
             </Form>
             </Drawer>
             </>
             );
  }

