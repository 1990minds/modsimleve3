import React, {useState,useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Drawer, Form, Button, Col, Row, Input, Select, Tooltip , Space,InputNumber, message, Steps } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Divider } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import {updateproject} from '../../api/project'
import {authenticateSelector} from '../../api/authSlice';
import {useParams} from 'react-router-dom'
import Item from 'antd/lib/list/Item';
import { PercentageOutlined } from '@ant-design/icons';
const { TextArea } = Input;
const { Option } = Select;


export default function Quotation({current_project,cancel}) {
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [value, setValue] = useState('');

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
    const quotationdata = {
        scope_supply:values.scope_supply,
        packing_forwarding:values.packing_forwarding,
        freight:values.freight,
        insurance:values.insurance,
        terms_conditions:values.terms_conditions,
        note:values.note,
        electrical_components:values.electrical_components,
        discount:values.discount,
    //  companyId:user?.company?._id,
    //  user:user?._id,
      
   }


    dispatch(updateproject(current_project._id ,quotationdata ,current_project.company?._id))
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


    const [visible, setVisible] = useState(false);

    const showDrawer = () => {
      setVisible(true);
    };
  
    const onClose = () => {
      setVisible(false);
    };


    const [loadings, setLoadings] = useState([]);

    const enterLoading = (index) => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = true;
        return newLoadings;
      });
      setTimeout(() => {
        setLoadings((prevLoadings) => {
          const newLoadings = [...prevLoadings];
          newLoadings[index] = false;
          return newLoadings;
        });
      }, 6000);
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
          

          {isMenuOpen === false ?   <div>

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

  


        <div style={{ display:'flex', justifyContent:'right', alignItems:'right', paddingTop: '20px'}}>
{/* <Button type="primary" htmlType="submit"
onClick={() => setVisible(false)}
block style={{ fontSize: '14px', width:'20rem' }}>
      Download Files
    </Button>  */}
    <Button type="primary" block style={{ fontSize: '14px', width:'20rem' }}
    onClick={() => setIsMenuOpen(true)}
    >Next</Button>
    </div>
    </div>
    :<div>

<Row gutter={16}>

  <Col span={8}>
        <Form.Item
        label={<p className="  w-36 text-left m-0">Packing & Forwarding</p>}
        name="packing_forwarding"
        rules={[{ required: true, message: 'Please Input Packing & Forwarding!' }]}
        >
        <Input
        prefix={<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-cash" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <rect x="7" y="9" width="14" height="10" rx="2" />
        <circle cx="14" cy="14" r="2" />
        <path d="M17 9v-2a2 2 0 0 0 -2 -2h-10a2 2 0 0 0 -2 2v6a2 2 0 0 0 2 2h2" />
      </svg> }
      style={{ borderRadius: "8px" }}
      type="number"
        />

        </Form.Item>
        
        </Col>

        <Col span={8}>
        <Form.Item
        label={<p className="  w-36 text-left m-0">Freight</p>}
        name="freight"
        rules={[{ required: true, message: 'Please Input Freight!' }]}
        >
        <Input 
        prefix={<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-cash" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <rect x="7" y="9" width="14" height="10" rx="2" />
        <circle cx="14" cy="14" r="2" />
        <path d="M17 9v-2a2 2 0 0 0 -2 -2h-10a2 2 0 0 0 -2 2v6a2 2 0 0 0 2 2h2" />
      </svg> }
      style={{ borderRadius: "8px" }}
      type="number"
        />

        </Form.Item>
        
        </Col>

        <Col span={8}>
        <Form.Item
        
        label={<p className="  w-36 text-left m-0">Insurance</p>}
        name="insurance"
        rules={[{ required: true, message: 'Please Input Insurance!' },
        { max: 2, message: 'Insurance is max 2 digits' }
      ]}
        >
        <Input
        style={{ borderRadius: "8px" }}
        type="number"
        prefix={<PercentageOutlined className="site-form-item-icon" />}
        />
        
        </Form.Item>
        
      </Col>

      </Row>
      <Row gutter={16}>

  <Col span={8}>
        <Form.Item
        label={<p className="  w-36 text-left m-0">Electrical Components</p>}
        name="electrical_components"
        rules={[{ required: false, message: 'Please Input Electrical Components!' }]}
        >
        <Input
        
        prefix={<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-cash" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <rect x="7" y="9" width="14" height="10" rx="2" />
        <circle cx="14" cy="14" r="2" />
        <path d="M17 9v-2a2 2 0 0 0 -2 -2h-10a2 2 0 0 0 -2 2v6a2 2 0 0 0 2 2h2" />
      </svg> }
      style={{ borderRadius: "8px" }}
      type="number"
        />

        </Form.Item>
        
        </Col>


        <Col span={8}>
        <Form.Item
        
        label={<p className="  w-36 text-left m-0">Discount</p>}
        name="discount"
        rules={[{ required: false, message: 'Please Input Discount!' },
        { max: 2, message: 'Discount is max 2 digits' }
      ]}
        >
        <Input
        style={{ borderRadius: "8px" }}
        type="number"
        prefix={<PercentageOutlined className="site-form-item-icon" />}
        />
        
        </Form.Item>
        
      </Col>

      </Row>

      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', paddingTop: '20px'}}>
      <div>
      <Button type="secondary" block style={{ fontSize: '14px', width:'20rem' }}
    onClick={() => setIsMenuOpen(false)}
    >Back</Button>
</div>
<div>
<Button type="primary" htmlType="submit"
onClick={() => {setVisible(false); enterLoading(0);}}
block style={{ fontSize: '14px', width:'20rem' }}
loading={loadings[0]} 
>
      Download Files
    </Button>
</div>
    </div>
    </div>
    }
          </Form>

        
      </>
    );
  }


