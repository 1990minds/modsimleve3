import React, {useState,useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Form, Button, Col, Row, Input, Select, InputNumber } from 'antd';
import { duplicatepanel,} from '../../api/panel'
import {authenticateSelector} from '../../api/authSlice';
import {useParams} from 'react-router-dom'
import { projectSelector,fetchAllcompanyProject} from '../../api/project'


const { Option } = Select;

export default function DuplicatePanel({current_panel,project_id,product_id,cancel}) {
  
     console.log(project_id)
  const [visible, setVisible]=useState(false)
  const dispatch = useDispatch();
  const {id} = useParams()
  const { user} = useSelector(authenticateSelector) 
  const {all_project} = useSelector(projectSelector) 


  console.log(all_project)

  useEffect(()=>{
    dispatch(fetchAllcompanyProject(user.company?._id))            
    }, [user]) 

     

            useEffect(()=>{
            form.setFieldsValue({
                panel_name:current_panel &&  current_panel.panel_name,
                panel_category:current_panel && current_panel.panel_category,
                ambient_temperature:current_panel&& current_panel. ambient_temperature,
                busbar_material:current_panel && current_panel.busbar_material,
                rated_voltage:current_panel && current_panel.rated_voltage,
                panel_quntity:current_panel && current_panel.panel_quntity,
                });
            }, [current_panel])
                  
  
   const onFinish = (values) => {
            
    console.log(values)

    
                
             const data = {
                  panel_name : values.repanel_name,
                  rated_voltage : values.rated_voltage,
                  ambient_temperature : values.ambient_temperature,
                  busbar_material : values.busbar_material,
                  panel_quntity : values.panel_quntity,
                  _id : null,
                  updatedAt : null,
                  createdAt : null,
                  request : "null",
                  requestdwg : "null",
                  old_PanelId : current_panel._id,
                  newproject_id:values.newproject_id


                  
              }

              
  
              dispatch(duplicatepanel( data,{id:product_id,project:project_id}))
              form.resetFields()
              cancel()          
              };

           const [form] = Form.useForm();

           const onChange = (value)=> {
             console.log(`selected ${value}`)
             setVisible(false);
           }
        

            const onFinishFailed = (errorInfo) => {
              console.log('Failed:', errorInfo);
            };

            const handleChangeSelect = (value) =>{


            }
            



    return (
      <>
 
          <Form layout="vertical" hideRequiredMark
           form={form}
           name="basic"
           initialValues={{ remember: false }}
           onFinish={onFinish}
           onFinishFailed={onFinishFailed}
          >
            <Row gutter={16}>
              <Col span={12}>
              <Form.Item
          label={<p className="  w-36 text-left m-0"> Panel Name</p>}
          name="panel_name"
          rules={[{ required: true, message: 'Please Input Panel Name!' }]}
          >
          <Input disabled={true} />

        </Form.Item>
               
              </Col>

          <Col span={12}>
          <Form.Item
          label={<p className="  w-36 text-left m-0">Rename Panel</p>}
          name="repanel_name"
          rules={[{ required: true, message: 'Please Input Panel Name!' }]}
          >
          <Input/>
          </Form.Item>              
          </Col>
          </Row>           

            <Row gutter={16}>
            <Col span={12}>               
            <Form.Item
            label={<p className="  w-36 text-left m-0">Panel Category</p>}
            name="panel_category"
            rules={[{ required: true, message: 'Please Select Panel category!' }]}
            
          >
          <Select
            placeholder="Select Panel category"
            onChange={onChange}
            style={{ width: '100%' }}
            disabled
          >
            <Option value="Power Control Center" >Power Control Center</Option>
            <Option value="Motor Control Center">Motor Control Center</Option>
            <Option value="Main Distribution Boards">Main Distribution Boards</Option>
            <Option value="Sub Distribution Boards">Sub Distribution Boards</Option>
            <Option value="Power Factor control Panel">Power Factor control Panel</Option>
            <Option value="Synchronising Panel">Synchronising Panel</Option>
            <Option value="Others">Others</Option>
          </Select>
   
          </Form.Item>
  
            </Col>

          <Col span={12}>

          <Form.Item
          label={<p className="  w-36 text-left m-0">Rated voltage</p>}
          name="rated_voltage"
          rules={[{ required: true, message: 'Please Select Rated Voltage!' }]}
          >
          <Select                         
          placeholder="Select Rated Voltage"
          onChange={onChange}
          style={{ width: '100%' }}      
          allowClear         
          >
          <Option value="415V">415V</Option>
          <Option value="440V">440V</Option>
          </Select>
          </Form.Item>
        </Col>



          <Col span={12}>
          <Form.Item
          label={<p className="w-36 text-left m-0">Ambient Temperature</p>}
          name="ambient_temperature"
          rules={[{ required: true, message: 'Please Input Ambient Temperature!' }]}
          >
          <Select
          placeholder="Select Ambient Temperature"
          onChange={onChange}
          style={{ width: '100%' }}
          allowClear
          >
          <Option value="35°C">35℃ </Option>
          <Option value="40°C">40℃</Option>
          <Option value="45°C">45℃</Option>
          <Option value="50°C">50℃</Option>
          </Select>
          </Form.Item>
        </Col>

              <Col span={12}>
              <Form.Item
          
          label={<p className="  w-36 text-left m-0">Busbar Material</p>}
          name="busbar_material"
          rules={[{ required: true, message: 'Please Input Busbar Material!' }]}
        >
                              <Select
          placeholder="Select Busbar Material"
          onChange={onChange}
          style={{ width: '100%' }}
          allowClear
          
        >
          <Option value="Copper">Copper</Option>
          <Option value="Aluminium">Aluminium</Option>

        </Select>

        </Form.Item>


        </Col>
        </Row>
       

          <Row gutter={16}>
          <Col span={12}>
          <Form.Item
          label={<p className="  w-36 text-left m-0">Panel Quantity</p>}
          name="panel_quntity"
          rules={[{ required: true, message: 'Please Input Panel Quntity!' }]}
          >
          <InputNumber min={1} max={25}  onChange={onChange}  />
          </Form.Item>

              </Col>

              <Col span={12}>
       <Form.Item
       autoComplete="flase"
       name="newproject_id"
       label="Project ID"
       rules={[{ required: true, message: 'Please enter Project ID' }]}
       >
       <Select 
        showSearch
        placeholder="Project ID"  
        optionFilterProp="children"
        filterOption={(input, option) =>
        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
                          
        onChange={handleChangeSelect}>
        {
         all_project.map((item, i)=>{     
                                                
         return <option key={i} value={item._id} >{item.project_id}</option>

        })
        }                            
        </Select>
        </Form.Item>
        </Col>
        </Row>





        <div style={{ display:'flex', justifyContent:'center', alignItems:'center'}}>
        <Button type="primary" htmlType="submit"
         onClick={() => setVisible(false)}
         block style={{ fontSize: '14px', width:'20rem' }}>
         Duplicate
        </Button>
        </div>
        </Form>
        
        </>
    );
  }