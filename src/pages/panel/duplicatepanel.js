import React, {useState,useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Drawer, Form, Button, Col, Row, Input, Select, DatePicker, Space,InputNumber } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Divider } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import {updatePanel, fetchOnePanel, panelSelector, duplicatepanel,} from '../../api/panel'
import {authenticateSelector} from '../../api/authSlice';
import { fetchAllPanel } from '../../api/panel';
import {createPanel} from '../../api/panel'
import moment from 'moment';
import {FaPanelAlt, FaLock} from 'react-icons/fa'
import Editpanel from './editpanel';
import {useParams} from 'react-router-dom'
import Item from 'antd/lib/list/Item';


const { Option } = Select;

export default function DuplicatePanel({current_panel,project_id,product_id}) {
  

  console.log(current_panel)

  const [loading, setLoading] = useState(false)   
  
  const { panel } = useSelector(authenticateSelector) 
  const dispatch = useDispatch();
  const [validityYear, setYear]=useState(null)
  const [validityMonth, setMonth]=useState(null)
  

  console.log(current_panel);

  const {id} = useParams()
     

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
            
            let data = JSON.parse(JSON.stringify(current_panel))
                data.panel_name=values.repanel_name
                data.rated_voltage=values.rated_voltage
                data.ambient_temperature=values.ambient_temperature
                data.busbar_material=values.busbar_material
                data.panel_quntity=values.panel_quntity
                data._id=null
                data.updatedAt=null
                data.createdAt=null
                data.request="null"
                data.dwgrequest="null"

          dispatch(duplicatepanel( data,{id:product_id,project:project_id}))
          form.resetFields()
           };

           const [form] = Form.useForm();

           const onChange = (value)=> {
             console.log(`selected ${value}`)
         
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
          <Input disabled={true} />

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
            </Row>

           

            <Row gutter={16}>

            <Col span={12}>
              <Form.Item
          label={<p className="  w-36 text-left m-0">Rename Panel</p>}
          name="repanel_name"
          rules={[{ required: true, message: 'Please Input Panel Name!' }]}
        >
          <Input />

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
          <Option value="35">35</Option>
          <Option value="40">40</Option>
          <Option value="35">45</Option>
          <Option value="40">50</Option>

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
              <InputNumber min={1} max={25}  onChange={onChange}  />
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

