import React, {useState,useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Drawer, Form, Button, Col, Row, Input, Select, Tooltip , Checkbox,InputNumber, message } from 'antd';
import { PercentageOutlined } from '@ant-design/icons';
import { getCurrencyList } from 'currency-map-country';
import {updateproject} from '../../api/project'


const { TextArea } = Input;
const { Option } = Select;




export default function Quotation({current_project,cancel}) {
  
  const [isMenuOpen, setIsMenuOpen] = useState('first');
  const [check, setCheck] = useState(true)

  const [firstData, setFirstDeta] = useState(null);
  const [secontData, setSecondDeta] = useState(null);


  const dispatch = useDispatch();

  const [form1] = Form.useForm();
  const [form2] = Form.useForm();

  const [ country , setCountry ] = useState([])

  const onChange = (value)=> {
    console.log(`selected ${value}`)
  }


    const onFinishFirst = (values) => {
        const data = {
            scope_supply:values.scope_supply,
            customer_currency:values.customer_currency,
            customer_value:values.customer_value,
            terms_conditions:values.terms_conditions,
            note:values.note,
          }
          setFirstDeta(data)
          setIsMenuOpen('second')
      };


    const onFinishSecond = (values) => {
        const data = {
              packing_forwarding:values.packing_forwarding,
              freight:values.freight,
              insurance:values.insurance,
              electrical_components:values.electrical_components,
              discount:values.discount
        }
        setSecondDeta(data)
        setIsMenuOpen('third')
      };

      

    const onFinish = () => {
   
        const quotationdata = {
            scope_supply:firstData.scope_supply,
            customer_currency:firstData.customer_currency,
            customer_value:firstData.customer_value,
            terms_conditions:firstData.terms_conditions,
            note:firstData.note,
            packing_forwarding:secontData.packing_forwarding,
            freight:secontData.freight,
            insurance:secontData.insurance,
            electrical_components:secontData.electrical_components,
            discount:secontData.discount,
       }
        console.log({quotationdata});
        dispatch(updateproject(current_project._id ,quotationdata ,current_project.company?._id,current_project.project_id))
        form1.resetFields()
        form2.resetFields()
        setIsMenuOpen('first')
        setCheck(true)
        cancel()
    
        };





        

      const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };


    useEffect(()=>{
      setCountry( getCurrencyList() )        
      }, [])


    const onSearch = (value) => {
      console.log('search:', value);
    };



    const onChangeCheckBox = (e) => {
      setCheck(!e.target.checked)
    };
  
  

    return (
      <>
 <div style={{display:isMenuOpen === 'first' ? 'block' : 'none'}}>
 
  <Form layout="vertical" hideRequiredMark
  form={form1}
           name="first"
           initialValues={{ remember: false }}
           onFinish={onFinishFirst}
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

                <Col span={12}>

              <Form.Item label="Customer's Currency & Value">
              <div style={{'display':'flex', 'align-items': 'flex-start' }}>
              <div style={{width:'100%'}} >
              <Form.Item
               name='customer_currency'
               noStyle
               rules={[
               {
               required: true,
               message: 'Customers Currency required',
               },
               ]}
                
                >
                  <Select
                    optionFilterProp="children"
                    onSearch={onSearch}                 
                    showSearch 
                    style={{ width: '100%', }}
                    prefix={<PercentageOutlined className="site-form-item-icon" />}     
                    placeholder="Select Your Currency">
                    { 
                    country?.map( (item, i)=>(
                    <option key={i} value={item?.name}> {item?.name}</option>
                      ))
                  }
                  </Select> 
                  </Form.Item>
                  </div>

                  

                    <Tooltip placement="topLeft" title="Mention Currency Value w.r.t 1INR, eg : (1INR = 0.031$)">
                    <div style={{width:'60%'}}>
                    <Form.Item
                    name='customer_value'
                    noStyle                      
                    prefix={<PercentageOutlined className="site-form-item-icon" />} 
                    >
                    <Input
                    style={{ width: '100%', padding:'7px'}}
                    placeholder="Input Value"
                    />                  
                    </Form.Item>                                     
                    </div>
                    </Tooltip> 
                    </div>
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
                  {/* <ReactQuill theme="snow"  rows={4} value={terms} onChange={setTerms}/> */}

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
                  {/* <ReactQuill theme="snow"  rows={4} value={notes} onChange={setNotes}/> */}

                    </Form.Item>
                  </Col>

                  </Row>

  


      <div style={{ display:'flex', justifyContent:'right', alignItems:'right', paddingTop: '20px'}}>
      <Button type="primary" block style={{ fontSize: '14px', width:'17rem' }}  htmlType="submit">Next</Button>
      </div>
          </Form>
    </div>


{/* ////////22222222////// */}

    <div style={{display:isMenuOpen === 'second'?'block':'none'}}>

      <Form layout="vertical" hideRequiredMark
        form={form2}
           name="second"
           initialValues={{ remember: false }}
           onFinish={onFinishSecond}
           onFinishFailed={onFinishFailed}
          >
          
<p style={{marginBottom:'25px'}}> Customer's Currency &nbsp;:&nbsp; <span style={{}}>{firstData?.customer_currency}</span></p>



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
      <Button type="secondary" block style={{ fontSize: '14px', width:'17rem' }}
      onClick={() => setIsMenuOpen('first')}
       >Back</Button>
      </div>
      <div>

    <Button type="primary" block style={{ fontSize: '14px', width:'17rem' }}  htmlType="submit">Next</Button>
      </div>
      </div>

          </Form>


    </div>


    
{/* ////33333333/// */}

    <div style={{display:isMenuOpen === 'third'?'block':'none'}} className="grid y">


    <Row gutter={1}>
      <Col span={8}>
        <p><b>Scope Of Supply&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;</b> {firstData?.scope_supply}</p>
      </Col>

      <Col span={16}>
        <p><b>Customer's Currency&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;</b> {firstData?.customer_currency} </p>
      </Col>

      <Col span={8}>
        <p><b>Currency Value &nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;</b>{firstData?.customer_value}</p>
      </Col>


      <Col span={8}>
        <p><b>Packing & Forwarding &nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;</b> {secontData?.packing_forwarding}</p>
      </Col>

      <Col span={8}>
        <p><b>Freight &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;</b> {secontData?.freight}</p>
      </Col>

      <Col span={8}>
        <p><b>Insurance &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;</b> {secontData?.insurance} % </p>
      </Col>


{/* // */}
      <Col span={8}>
      <p><b>Electrical Components &nbsp;&nbsp;:&nbsp;&nbsp;</b> {secontData?.electrical_components}</p>
      </Col>

      <Col span={8}>
      <p><b>Discount &nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;</b> {secontData?.discount} %</p>
      </Col>

    </Row>

    <p style={{margin:'5px 0 0 0'}}><b>Terms & Conditions &nbsp;:&nbsp;</b></p>
    <div style={{ height:'100px', overflowY: 'auto', margin:'0',padding:'3px 5px', border:'0.01rem solid grey', borderRadius:'5px'}}>
      {
        firstData?.terms_conditions?.split("\n").map((item,i)=>{
          return <p key={i} style={{padding:'0px', margin:'0px', fontSize:'12px'}}><>{item}<br/></></p>
        })
      }
    </div>


    <p style={{margin:'10px 0 0 0'}}><b>Note &nbsp;:&nbsp;</b></p>
    <div style={{ height:'100px', overflowY: 'auto', margin:'0',padding:'3px 5px', border:'0.01rem solid grey', borderRadius:'5px'}}>
      {
        firstData?.note?.split("\n").map((item,i)=>{
          return <p key={i} style={{padding:'0px', margin:'0px', fontSize:'12px'}}><>{item}<br/></></p>
        })
      }
    </div>
    

      <Checkbox onChange={onChangeCheckBox} style={{marginTop:'25px', fontSize:'15px', fontWeight:'bold'}}>I hereby declare that the information provided is true and correct</Checkbox>

      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', paddingTop: '20px'}}>
      <div>
      <Button type="secondary" block style={{ fontSize: '14px', width:'17rem' }}
      onClick={() => setIsMenuOpen('second')}
       >Back</Button>
      </div>


      <div>

      {/* <Tooltip placement="top" title={check?"Download Files":''}> */}
      <Button type="primary" htmlType="submit" block style={{ fontSize: '14px', width:'17rem' }} disabled={check} onClick={onFinish} >
      Download Files
      </Button>
     {/* </Tooltip> */}

      </div>
      </div>

    </div>



        
      </>
    );
  }


