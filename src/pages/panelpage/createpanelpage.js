import React, {useState,useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Drawer, Form, Button, Col, Row, Input, Select, DatePicker, Space } from 'antd';
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
export default function CreatePanelsettings({current_panel}) {
  

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
                panel_name:current_panel &&  current_panel. panel_name,
                panel_category:current_panel && current_panel.panel_category,
                ambient_temperature:current_panel&& current_panel. ambient_temperature,
                busbar_material:current_panel && current_panel.busbar_material,
                rated_voltage:current_panel && current_panel.rated_voltage,
        
        
        
                    panel_type:current_panel &&  current_panel.panel_type,
                    compliance_with_IEC61439:current_panel &&  current_panel.compliance_with_IEC61439,
                    ingress_protection:current_panel &&  current_panel.ingress_protection,
                    form_of_construction:current_panel &&  current_panel.form_of_construction,
                    panel_colour:current_panel &&  current_panel.panel_colour,
                    powder_coating_finish:current_panel &&  current_panel.powder_coating_finish,
                    panel_short_circuit_rating:current_panel &&  current_panel.panel_short_circuit_rating,
                    nature_of_ventilation:current_panel &&  current_panel.nature_of_ventilation,
                    required_busbar_support:current_panel &&  current_panel.required_busbar_support,
                    required_base_plinth:current_panel &&  current_panel.required_base_plinth,
                    frame_material:current_panel &&  current_panel.frame_material,
                    frame_powdercoating:current_panel &&  current_panel.frame_powdercoating,
                    cover_material:current_panel &&  current_panel.cover_material,
                    cover_powdercoating:current_panel &&  current_panel.cover_powdercoating,
        
                
                
                
            
                });
              }, [current_panel])
                  
  
            
              const onFinish = (values) => {
                console.log(values.panelsettings);
          
                  const panelsettingsdata = {
          
                      panel_type:values.panel_type,
                      compliance_with_IEC61439:values.compliance_with_IEC61439,
                      ingress_protection:values.ingress_protection,
                      form_of_construction:values.form_of_construction,
                      panel_colour:values.panel_colour,
                      powder_coating_finish:values.powder_coating_finish,
                      panel_short_circuit_rating:values.panel_short_circuit_rating,
                      nature_of_ventilation:values.nature_of_ventilation,
                      required_busbar_support:values.required_busbar_support,
                      required_base_plinth:values.required_base_plinth,
                      frame_material:values.frame_material,
                      frame_powdercoating:values.frame_powdercoating,
                      cover_material:values.cover_material,
                      cover_powdercoating:values.cover_powdercoating,
                     
                    
                  }
                  
                
                  dispatch(updatePanel(current_panel._id, panelsettingsdata))
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

<div className='grid grid-cols-2 gap-1 mx-auto'>
<div>

            <Row gutter={16}>
              <Col span={12}>
              <Form.Item
                    label={<p className="  text-left m-0">Panel Type</p>}
                    name= "panel_type"
                    rules={[{ required: true, message: 'required!'}]}
                  >
                     <Select
          placeholder="Select panel_type"
          onChange={onChange}
          style={{ width: '100%' }}
          allowClear
        >
          <Option value="single front">Single Front</Option>
          <Option value="double front">Double Front</Option>
        </Select>

                  </Form.Item>
              </Col>
              <Col span={12}>
              <Form.Item
                    label={<p className=" text-left m-0">Compliance With IEC61439</p>}
                    name= "compliance_with_IEC61439"
                    rules={[{ required: true, message: 'required!'}]}
                  >
                     <Select
          placeholder="Select compliance_with_IEC61439"
          onChange={onChange}
          style={{ width: '100%' }}
          allowClear
        >
          <Option value="true">Yes </Option>
          <Option value="false">No </Option>
        </Select>

                  </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={10}>
              <Form.Item
                    label={<p className="  text-left m-0">Ingress Protection</p>}
                    name="ingress_protection"
                    rules={[{ required: true, message: 'required!'}]}
                  >
                     <Select
          placeholder="Select ingress_protection"
          onChange={onChange}
          style={{ width: '100%' }}
          allowClear
        >
          <Option value="IP4x/43">IP4x/43</Option>
          <Option value="IP54/55">IP54/55</Option>
        </Select>

                  </Form.Item>
              </Col>
            </Row>

            <Divider />

            <Row gutter={16}>
              <Col span={10}>
              <Form.Item
                    label={<p className="  text-left m-0">Form of Construction</p>}
                    name ="form_of_construction"
                    rules={[{ required: true, message: 'required!'}]}
                  >
                     <Select
                      placeholder="Select Form of Construction"
                      onChange={onChange}
                      style={{ width: '100%' }}
                      allowClear
                    >
                      <Option value="Form 3">Form 3</Option>
                      <Option value="Form 4">Form 4</Option>
                    </Select>

                  </Form.Item>

              </Col>
              
            </Row>

<Row gutter={16}>
<Col span={10}>


<Form.Item
                    
                    label={<p className="  text-left m-0">Panel Colour</p>}
                    name="panel_colour"
                    rules={[{ required: true, message: 'required!'}]}
                  >
                     <Select
          placeholder="Select panel colour"
          onChange={onChange}
          style={{ width: '100%' }}
          allowClear
        >
          <Option value="RAL7032">RAL7032</Option>
          <Option value="RAL7035">RAL7035</Option>
          <Option value="RAL2000">RAL2000</Option>
          <Option value="RAL9003">RAL9003</Option>
          <Option value="Others">Others</Option>

        </Select>

                  </Form.Item>
              </Col>
            
</Row>

<Row gutter={16}>
<Col span={10}>


<Form.Item
                    label={<p className="  text-left m-0">Powder Coating Finish</p>}
                    name= "powder_coating_finish"
                    rules={[{ required: true, message: 'required!'}]}
                  >
                     <Select
          placeholder="Select powder coating finish"
          onChange={onChange}
          style={{ width: '100%' }}
          allowClear
        >
          <Option value="Structure">Structure</Option>
          <Option value="Semiglossy">Semiglossy</Option>
          <Option value="Glossy">Glossy</Option>
        </Select>

                  </Form.Item>
              </Col>
            
</Row>

<Row gutter={16}>
<Col span={10}>


<Form.Item
                    label={<p className="  text-left m-0">Panel Short Circuit Rating</p>}
                    name= "panel_short_circuit_rating"
                    rules={[{ required: true, message: 'required!'}]}
                  >
                     <Select
          placeholder="Select Panel short circuit rating"
          onChange={onChange}
          style={{ width: '100%' }}
          allowClear
        >
          <Option value="25kA for 1 Sec">25kA for 1 Sec</Option>
          <Option value="36kA for 1 Sec">36kA for 1 Sec</Option>
          <Option value="50kA for 1 Sec">50kA for 1 Sec</Option>
          <Option value="50kA for 3 Sec">50kA for 3 Sec</Option>
          <Option value="65kA for 1 Sec">65kA for 1 Sec</Option>
          <Option value="100kA for 1 Sec">100kA for 1 Sec</Option>
          


        </Select>

                  </Form.Item>
              </Col>
            
</Row>


<Row gutter={16}>
<Col span={10}>


<Form.Item
                    label={<p className="  text-left m-0">Required Busbar Support</p>}
                    name= "required_busbar_support"
                    rules={[{ required: true, message: 'required!'}]}
                  >
                     <Select
          placeholder="Select required_busbar_support"
          onChange={onChange}
          style={{ width: '100%' }}
          allowClear
        >
          <Option value="Yes">Yes</Option>
          <Option value="No">No</Option>
        </Select>

                  </Form.Item>   
              </Col>
            
</Row>

<Row gutter={16}>
<Col span={10}>


<Form.Item
                    label={<p className="  text-left m-0">Required Base Plinth</p>}
                    name="required_base_plinth"
                    rules={[{ required: true, message: 'required!'}]}
                  >
                     <Select
          placeholder="Select required_base_plinth"
          onChange={onChange}
          style={{ width: '100%' }}
          allowClear
        >
          <Option value="yes">Yes</Option>
          <Option value="no">No</Option>
        </Select>

                  </Form.Item>            
            
              </Col>
            
</Row>
</div>

<div>

<Row gutter={16}>
<Col span={10}>


<p className='flex justify-center'>Frame Bar | Cross Bar</p>
                  <Form.Item
                
                    label={<p className="  text-left m-0">Material</p>}
                    name= "frame_material"
                    
                  >
  <Select
          placeholder="frame material"
          
        >
          <Option value="Aluzn">Aluzn</Option>
          <Option value="GI">GI</Option>
         
          
        </Select>
  </Form.Item>
              </Col>
            
</Row>

<Row gutter={16}>
<Col span={10}>


<Form.Item
                    label={<p className="  text-left m-0">Powdercoating</p>}
                    name= "frame_powdercoating"

                   
                  >
   <Select
          placeholder="frame powdercoating"
          
        >
          <Option value="Yes">Yes</Option>
          <Option value="No">No</Option>
         
          
        </Select>
  </Form.Item>
              </Col>
            
</Row>

<Row gutter={16}>
<Col span={10}>


<p className='flex justify-center'>Doors |  Covers | Partitions</p>
                  <Form.Item
                
                    label={<p className="  text-left m-0">Material</p>}
                    name= "cover_material"
                    
                  >
  <Select
          placeholder="cover material"
          
        >
          <Option value="Aluzn">Aluzn</Option>
          <Option value="GI">GI</Option>
         
          
        </Select>
  </Form.Item>
              </Col>
            
</Row>

<Row gutter={16}>
<Col span={10}>


<Form.Item
                    label={<p className="  text-left m-0">Powdercoating</p>}
                    name= "cover_powdercoating"
                    
                  >
   <Select
          placeholder="cover powdercoating"
          
        >
          <Option value="Yes">Yes</Option>
          <Option value="No">No</Option>
         
          
        </Select>
  </Form.Item>

              </Col>
            
</Row>


<div id='addlis' className='flex justify-center mt-20 '>
<Button type="primary" htmlType="submit"
onClick={() => setVisible(false)}
block style={{ fontSize: '14px' }}>
     Save
    </Button>
         
          </div>
          </div>

  </div>
  <div id='addlis' className='grid grid-cols-4 gap-4 mt-12'  >



  <Form.Item  wrapperCol={{ span: 12, offset: 9}}>
    <Button type="primary" htmlType="submit">
      <span className='px-5 customspan'> View BOM</span>
    </Button>
  </Form.Item>

  <Form.Item  wrapperCol={{ span: 12, offset: 9}}>
    <Button type="primary" htmlType="submit">
      <span className='px-5 customspan'> Download BOM</span>
    </Button>
  </Form.Item>

  <Form.Item  wrapperCol={{ span: 12, offset: 9}}>
    <Button disabled type="primary" htmlType="submit">
      <span className='px-5 customspan'> Request Drawing</span>
    </Button >
  </Form.Item  >

  <Form.Item  wrapperCol={{ span: 12, offset: 9}}>
    <Button type="primary" htmlType="submit">

    <a  target='_blank' href={`https://modsimcanvas.web.app/panel/${current_panel?._id}`}> Configure Now</a>
    </Button>
  </Form.Item>


</div>


          </Form>
        
      </>
    );
  }

