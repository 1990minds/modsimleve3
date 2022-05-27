import React, {useState,useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Drawer, Form, Button, Col, Row, Input, Select, DatePicker, Space,Descriptions } from 'antd';
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
import styled from 'styled-components'

const { Option } = Select;

export default function EditPanel({current_panel,}) {
  

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
            
                });
          }, [current_panel])
                  
  
          const onFinish = (values) => {
            const paneldata = {


                panel_category:values.panel_category,
                rated_voltage:values.rated_voltage,
                ambient_temperature:values.ambient_temperature,
                 panel_name:values.panel_name,
                 busbar_material:values.busbar_material,
                
              }
          dispatch(updatePanel(current_panel._id, paneldata))
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

<DataWrap>
        <Descriptions
       horizontal 
       column={3} 
       size={16}
        >
          <Descriptions.Item label="Created Date "> { moment(current_panel?.createdAt).format('DD/MM/YYYY')}</Descriptions.Item>
          <Descriptions.Item label="Panel Name "> {current_panel?.panel_name}</Descriptions.Item>
          <Descriptions.Item label="Panel Category"> {current_panel?.panel_category}</Descriptions.Item>
          <Descriptions.Item label="Rated Voltage">{current_panel?.rated_voltage}</Descriptions.Item>
          <Descriptions.Item label="Ambient Temperature ">{current_panel?.ambient_temperature}</Descriptions.Item>
          <Descriptions.Item label="Busbar Material">{current_panel?.busbar_material}</Descriptions.Item>
          
        </Descriptions>
      </DataWrap>

      <Divider />

          </Form>
        
      </>
    );
  }


  const DataWrap = styled.div`

.ant-descriptions-item-label{
  font-size: 16px !important;
}

.ant-descriptions-item-content {
  font-size: 16px !important;
}
`