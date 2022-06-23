import React, {useState,useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Drawer, Form, Button, Col, Row, Input, Select, Tooltip , Space,InputNumber } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Divider } from 'antd';
import {fetchAllproduct, productSelector, } from '../../api/product'
import { fetchAllcompanycustomers,customersSelector } from '../../api/customers';
import {authenticateSelector} from '../../api/authSlice';
import {createpanel} from '../../api/panel'
import { Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import {useParams} from 'react-router-dom'
import moment from 'moment';

const { Option } = Select;

export default function CreatePanel({cancel,project_id,product_id}) {
  
 
    const [loading, setLoading] = useState(false)
    const { user } = useSelector(authenticateSelector) 
    console.log(user);
    const { all_customers} = useSelector(customersSelector) 
    const dispatch = useDispatch();
    console.log({K:all_customers});
     
    
      useEffect(()=>{
        dispatch(fetchAllcompanycustomers(user?.company?._id))           
      }, [dispatch])

      const onFinish = (values) => {
 
    

      console.log(values);
      const data = {
        panel_category:values.panel_category,
        rated_voltage:values.rated_voltage,
        ambient_temperature:values.ambient_temperature,
        panel_name:values.panel_name,
        busbar_material:values.busbar_material,
        panel_quntity:values.panel_quntity,
        project_id:project_id,
        product_id:product_id,
        user:user?._id,
      }

        dispatch(createpanel(data, {id:product_id,project:project_id}))
        form.resetFields()
        cancel()
      
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
             <Tooltip placement="topLeft" title="Create New Pannel" arrowPointAtCenter>
             <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />} style={{fontSize: "14px"}}>
              Create
             </Button>
             </Tooltip>
             <Drawer
              title="Create New Pannel" placement="right" onClose={onClose} visible={visible} width={720}
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
                onChange={onChange}
                style={{ width: '100%' }}
                allowClear
              >
                <Option value="Power Control Center">Power Control Center</Option>
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
                            <InputNumber min={1} max={25} onChange={onChange} />
                        </Form.Item>

                            </Col>
                          </Row>
              

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

