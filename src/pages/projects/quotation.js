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

import {useParams} from 'react-router-dom'
import Item from 'antd/lib/list/Item';

const { TextArea } = Input;
const { Option } = Select;

export default function Quotation({current_project,cancel}) {
  

  console.log(current_project)

  const [loading, setLoading] = useState(false)   
  
  const { panel } = useSelector(authenticateSelector) 
  const dispatch = useDispatch();
  const [validityYear, setYear]=useState(null)
  const [validityMonth, setMonth]=useState(null)
  

  console.log(current_project);

  const {id} = useParams()
     

  const onFinish = (values) => {
    
    console.log(values);
    const data = {
        scope_supply:values.scope_supply,
        packing_forwarding:values.packing_forwarding,
        freight:values.freight,
     insurance:values.insurance,
     terms_conditions:values.terms_conditions,
     note:values.note,
    //  companyId:user?.company?._id,
    //  user:user?._id,
      
   }


    // dispatch(createproject(data,user?.company?._id))
    // form.resetFields()
    // cancel()

    };

           const [form] = Form.useForm();

           const onChange = (value)=> {
             console.log(`selected ${value}`)
             setVisible(false);
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
            label={<p className="  w-36 text-left m-0">Scope Of Supply</p>}
            name="scope_supply"
            rules={[{ required: true, message: 'Please Select Scope Of Supply!' }]}
            
          >
          <Select
            placeholder="Select Scope Of Supply"
            onChange={onChange}
            style={{ width: '100%' }}
           
          >
            <Option value="Assembled" >Assembled</Option>
            <Option value="Flat Pack">Flat Pack</Option>
            
          </Select>
   
          </Form.Item>
  
                </Col>
                </Row>

  <Row gutter={16}>

  <Col span={8}>
        <Form.Item
        label={<p className="  w-36 text-left m-0">Packing & Forwarding</p>}
        name="packing_forwarding"
        rules={[{ required: true, message: 'Please Input Packing & Forwarding!' }]}
        >
        <Input />

        </Form.Item>
        
        </Col>

        <Col span={8}>
        <Form.Item
        label={<p className="  w-36 text-left m-0">Freight</p>}
        name="freight"
        rules={[{ required: true, message: 'Please Input Freight!' }]}
        >
        <Input />

        </Form.Item>
        
        </Col>

        <Col span={8}>
        <Form.Item
        label={<p className="  w-36 text-left m-0">Insurance</p>}
        name="insurance"
        rules={[{ required: true, message: 'Please Input Insurance!' }]}
        >
        <Input />

        </Form.Item>
        
      </Col>

      </Row>

       
      <Row>

            <Col span={24}>
                <Form.Item
                  name="terms_conditions"
                  label="Terms & Conditions"
                  rules={[{ required: true, message: 'Please enter Terms & Conditions' }]}
                >
                  <TextArea   showCount
    maxLength={600}
    rows={4}
    style={{
      height: 40,
    }}
    onChange={onChange} />
                </Form.Item>
              </Col>

              </Row>



              <Row>


<Col span={24}>
    <Form.Item
      name="note"
      label="Note"
      rules={[{ required: true, message: 'Please enter Note' }]}
    >
      <TextArea   showCount
maxLength={600}
rows={4}
style={{
height: 40,
}}
onChange={onChange} />
    </Form.Item>
  </Col>

  </Row>




        <div style={{ display:'flex', justifyContent:'center', alignItems:'center'}}>
<Button type="primary" htmlType="submit"
onClick={() => setVisible(false)}
block style={{ fontSize: '14px', width:'20rem' }}>
      Download Files
    </Button>
    </div>
          </Form>
        
      </>
    );
  }


