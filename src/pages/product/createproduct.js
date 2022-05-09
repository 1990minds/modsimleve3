import React, {useState,useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Drawer, Form, Button, Col, Row, Input, Select, TextArea , Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Divider } from 'antd';
import {fetchAllproduct, productSelector,fetchProjectProducts } from '../../api/product'
import { fetchAllcompanycustomers,customersSelector } from '../../api/customers';
import {authenticateSelector} from '../../api/authSlice';
import createproduct from '../../api/product'
import { Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { Option } = Select;

 
export default function CreateProduct({cancel,current_project,project_products}) {
  
    const [loading, setLoading] = useState(false)
    const { user } = useSelector(authenticateSelector) 
    console.log(user);
    const { all_customers} = useSelector(customersSelector) 
    
    const dispatch = useDispatch();

    console.log(current_project);
    
    useEffect(()=>{

      dispatch(fetchAllcompanycustomers(user?.company))

     }, [dispatch])

    //  useEffect(()=>{

    //   dispatch(fetchProjectProducts (user?.product))

    //  }, [dispatch])
        
  
  const onFinish = (values) => {
    
  
  console.log(values);
      const data = {

         product_name:values.product_name,
         projectId:current_project?._id
      }

 
      dispatch(createproduct(data,current_project?._id))
      form.resetFields()
      cancel()
     
     };
  

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

 

  const handleChangeSelect = (value) =>{

    // console.log(value);
    // setLoading(value)

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
    };

    return (
      <>
        <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />} style={{fontSize: "14px"}}>
          Create
        </Button>
        
        <Drawer
          title="Create a new Product" placement="right" onClose={onClose} visible={visible} width={720}
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
          label={<p className="  w-36 text-left m-0"> Product Name</p>}
          name="product_name"
          rules={[{ required: true, message: 'Please Input Product Name!' }]}
        >
         <Select
          placeholder="Select license type"
          onChange={onChange}
          allowClear
        >
          <Option value="MODSIM">MODSIM</Option>
          
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

           

            {/* <Row gutter={16}>
              <Col span={20}>
              <Upload>
            <Button icon={<UploadOutlined />}>Upload Product Image</Button>
            </Upload>
              </Col>
              
            </Row> */}
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

