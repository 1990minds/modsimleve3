import React, {useState,useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Drawer, Form, Button, Col, Row, Input, Select, DatePicker, Space,InputNumber } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Divider } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import {updatePanel, fetchOnePanel, panelSelector,} from '../../api/panel'
import {authenticateSelector} from '../../api/authSlice';
import { fetchAllPanel } from '../../api/panel';
import {createPanel} from '../../api/panel'
import moment from 'moment';
import {FaPanelAlt, FaLock} from 'react-icons/fa'
import Editpanel from './editpanel';
import {useParams} from 'react-router-dom'


const { Option } = Select;

export default function EditPanel({cancel,current_panel,project_id,product_id}) {
 
  const [loading, setLoading] = useState(false)    
  const { panel } = useSelector(authenticateSelector) 
  const dispatch = useDispatch();
  const [validityYear, setYear]=useState(null)
  const [validityMonth, setMonth]=useState(null)
  const [Others, setOthers] = useState(false)
  const {id} = useParams()
     

         useEffect(()=>{
          if(current_panel?.panel_category === 'O'){
            setOthers(true)
          }
          else{
            setOthers(false)
          }
          form.setFieldsValue({
                panel_name:current_panel &&  current_panel.panel_name,
                panel_category:current_panel && current_panel.panel_category,
                ambient_temperature:current_panel&& current_panel. ambient_temperature,
                category_type:current_panel && current_panel.category_type,
                busbar_material:current_panel && current_panel.busbar_material,
                rated_voltage:current_panel && current_panel.rated_voltage,
                panel_quntity:current_panel && current_panel.panel_quntity,
                });
          }, [current_panel])
                  
  
          const onFinish = (values) => {
          const paneldata = {

                 panel_category:values.panel_category,
                 rated_voltage:values.rated_voltage,
                 ambient_temperature:values.ambient_temperature,
                 panel_name:values.panel_name,
                 busbar_material:values.busbar_material,
                 panel_quntity:values.panel_quntity,
                 category_type:values.category_type,
                
              }

          setOthers('')
          dispatch(updatePanel(current_panel._id, paneldata,{id:product_id,project:project_id}))
          form.resetFields()
          cancel()
           };

           const [form] = Form.useForm();
           const onChange = (value)=> {
             console.log(`selected ${value}`)
         
           }
           const onChangeOthers = (value)=> {
            console.log(`selected ${value}`)
        
            if(value === 'O'){
              setOthers(true)
            }
            else{
              setOthers(false)
            }
          }
        

          const onFinishFailed = (errorInfo) => {
          console.log('Failed:', errorInfo);
          };


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
          >
            <Row gutter={16}>
           <Col span={12}>
              <Form.Item
          label={<p className="  w-36 text-left m-0"> Panel Name</p>}
          name="panel_name"
          rules={[{ required: true, message: 'Please Input Panel Name!' }]}
        >
          <Input/>
        </Form.Item>              
              </Col>





              <Col span={12}>                
              <Form.Item
                label={<p className="  w-36 text-left m-0">Panel Category</p>}
                name="panel_category"
                rules={[{ required: true, message: 'Please Select Panel category!' }]}
              >
                <Select
                placeholder="Select Panel category"
                onChange={onChangeOthers}
                style={{ width: '100%' }}
                allowClear
                // onChange={onChangeOthers}
              >
                <Option value="Power Control Center">Power Control Center</Option>
                <Option value="Motor Control Center">Motor Control Center</Option>
                <Option value="Main Distribution Boards">Main Distribution Boards</Option>
                <Option value="Sub Distribution Boards">Sub Distribution Boards</Option>
                <Option value="Power Factor control Panel">Power Factor control Panel</Option>
                <Option value="Synchronising Panel">Synchronising Panel</Option>
                <Option value="O">Others</Option>
              </Select>     
              </Form.Item>
              </Col>

               { Others && <Row xs={2} sm={4} md={6} lg={8} xl={5}>
              <Form.Item
                
                label={<p  style={{width:'100%',marginLeft:'10px'}}> Panel Category Type</p>}
                name="category_type"
                rules={[{ required: true, message: 'required!'}]}
              >
              <Input style={{width:'330px',marginLeft:'10px'}} />

              </Form.Item>
              </Row>}

              </Row>

           

            <Row gutter={16}>
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
            </Row>

            <Row gutter={16}>
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
            <InputNumber min={1} max={25}  onChange={onChange} />
            </Form.Item>

              </Col>
            </Row>

        
             <Button type="primary" htmlType="submit"
              onClick={() => setVisible(false)}
              block style={{ fontSize: '14px' }}>
              Update
              </Button>
              </Form>
        
      </>
    );
  }

