import React, {useState,useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Drawer, Form, Button, Col, Row, Input, Select, DatePicker, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Divider } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import {updateproject, editProject, fetchOneProject, projectSelector,} from '../../api/project'
import { fetchAllcompanycustomers,customersSelector } from '../../api/customers';
import {authenticateSelector} from '../../api/authSlice';
import { fetchAllProject } from '../../api/project';
import {createProject} from '../../api/project'
import { Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import countries from '../../global/data'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

const { Option } = Select;

export default function EditProject({current_project,cancel}) {
  
  const [ states , setStates ] = useState([])
  const [ statesnumber , setStatesnumber ] = useState('')
  const { all_customers} = useSelector(customersSelector)  
    const dispatch = useDispatch();
    const { user } = useSelector(authenticateSelector) 
    console.log(user);
    const [ status , setStatus ] = useState(null)


    useEffect(()=>{

        setStatus(current_project?.project_status)
        form.setFieldsValue({
          project_location:current_project &&  current_project. project_location,
          email:current_project && current_project.email,
          phone_number:current_project&& current_project.phone_number,
          project_status:current_project&& current_project.project_status,
          project_name:current_project && current_project.project_name,
          project_coordiantor:current_project && current_project.project_coordiantor,
          customerId:current_project && current_project.customerId,
          customers_name:current_project && current_project.customers_name
   
          });
          }, [current_project])
               
          const [value, setValue] = useState()
          const onChange = (value)=> {
            console.log(`selected ${value}`)
        
          }

          const handleChangeSelect = (value) =>{
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
  
            const projectdata = {
      
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
              setStatesnumber('')
              dispatch(editProject(current_project._id, projectdata,user?.company?._id))
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
              label={<p className="  w-36 text-left m-0">Customer Name</p>}
              name="customerId"
            //   rules={[{ required: true, message: 'Please Input Customer Name!' }]}
              >
              <Select 
              showSearch
              placeholder="Customer Name"  
              disabled           
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
             <Input disabled/>
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
             <Input disabled/>
             </Form.Item>
             </Col>

             <Col span={12}>
             <Form.Item 
             label={<p className="  w-36 text-left m-0">Project Location</p>}
             name="project_location"
            //  rules={[{ required: true, message: 'Please select Project Location!' }]}
             >
             <Input disabled/>
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
           <Input disabled/>

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
            {( status === "New" || status === "In-Progress") && <Option value="In-Progress">In-Progress</Option>}
            {( status === "New" || status === "In-Progress"  ||  status === "Order Won") && <Option value="Order Won">Order Won</Option>}
            {( status === "New" || status === "In-Progress" || status === "Order Lost") && <Option value="Order Lost">Order Lost</Option>}
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
        
        
      </>
    );
  }

