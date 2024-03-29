import React, {useState,useEffect,useLayoutEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Form, Button, Col, Row, Input, Select, Tooltip, Checkbox } from 'antd';
import {updatePanel,} from '../../api/panel'
import {SiHeadspace} from 'react-icons/si'
import {useParams} from 'react-router-dom'
import ExportExcel from './bomdownload';
import Modal from '../../global/model';
import {authenticateSelector} from '../../api/authSlice';
import Anttable from '../panel/antTable';


const { Option } = Select;


export default function CreatePanelsettings({current_panel,scroolUp}) {
   
 
  const { user } = useSelector(authenticateSelector) 

  console.log(user)

  const dispatch = useDispatch();
  const [visible, setVisible]=useState(false)
  const [frameMaterial, setframeMaterial] = useState(null);
  const [userColor, setuserColor] = useState(false)

  const [saveBtn, setSaveBtn] = useState(true)


  const [check, setCheck] = useState(true)



  


console.log(current_panel)




  const {id} = useParams()

     
  const onChangeCheckBox = (e) => {
    // console.log(e.target.checked)
    setCheck(!e.target.checked)
  };





  useEffect(()=>{

                form.setFieldsValue({
                panel_name: current_panel?. panel_name,
                panel_category:current_panel?.panel_category,
                ambient_temperature:current_panel?. ambient_temperature,
                busbar_material:current_panel?.busbar_material,
                rated_voltage:current_panel?.rated_voltage,

                    panel_type: 'single front',
                    compliance_with_IEC61439: current_panel?.compliance_with_IEC61439,
                    ingress_protection: current_panel?.ingress_protection,
                    form_of_construction: current_panel?.form_of_construction,
                    panel_colour: current_panel?.panel_colour,
                    powder_coating_finish: current_panel?.powder_coating_finish,
                    panel_short_circuit_rating: current_panel?.panel_short_circuit_rating,
                    nature_of_ventilation: current_panel?.nature_of_ventilation,
                    required_busbar_support: current_panel?.required_busbar_support,
                    required_base_plinth: current_panel?.required_base_plinth,
                    // frame_material: current_panel?.frame_material,
                    // frame_powdercoating: current_panel?.frame_powdercoating,
                    // cover_material: current_panel?.cover_material,
                    cover_powdercoating:true,       
                    // partition_material: current_panel?.partition_material,
                    // partition_powdercoating: current_panel?.partition_powdercoating,
                    user_define:current_panel?.user_define,

                });



                form.setFieldsValue({
                    frame_material: current_panel?.frame_material ? current_panel?.frame_material : 'Z',
                });

               form.setFieldsValue({
                  frame_powdercoating:   current_panel?.frame_powdercoating ? current_panel?.frame_powdercoating : false,
                });

                 form.setFieldsValue({
                partition_material: current_panel?.partition_material ? current_panel?.partition_material :'G',
                });

                form.setFieldsValue({
                partition_powdercoating:current_panel?.partition_powdercoating ? current_panel?.partition_powdercoating :false,
                });

                form.setFieldsValue({
                cover_material:current_panel?.cover_material ? current_panel?.cover_material : 'C',
                });



              }, [current_panel])
                  
  

            
              const onFinish = (values) => {   
                
                console.log(values)
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
                      partition_material:values.partition_material,
                      partition_powdercoating:values.partition_powdercoating,
                      user_define:values.user_define,
                      updateUser:user?._id,
                      panel : [],
                      parts : [],
                      bom : [],
                  }
                
                  dispatch(updatePanel(current_panel._id, panelsettingsdata))
                  form.resetFields()

                  setSaveBtn(true)



                  setTimeout(() => {
                    scroolUp()
                  }, 2000);
            
                
            };

            

           const [form] = Form.useForm();

           const onChange = (value)=> {
             console.log(`selected ${value}`)
             setSaveBtn(false)
         
           }



           const onChangeColor = (value)=> {
            console.log(`selected ${value}`)    
            setSaveBtn(false)  
            if(value === 'U'){
             setuserColor(true)
            }
            else{
              setuserColor(false)
            }
          }


          
          const handleClickFrame = (value) =>{
            setSaveBtn(false)
            form.setFieldsValue({
            frame_powdercoating:(value==='G' || value=== 'Z') ? false:true
          });   
            setframeMaterial(value)
            
          }
 

        

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
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

          <div>
          <div>

           <Col>
            <Row gutter={24}>

                <Col xs={2} sm={4} md={6} lg={8} xl={5}  >
                <Form.Item
                 label={<p className="  text-left m-0">Panel Type</p>}
                 name= "panel_type"
                 rules={[{ required: true, message: 'required!'}]}
                  >
                 <Select
                placeholder="Select Panel Type"
                disabled={ current_panel?.request !== "null" }
                onChange={onChange}
                style={{ width: '100%' }}
                allowClear
              >
                <Option value="single front">Single Front</Option>
                {/* <Option value="double front">Double Front</Option> */}
              </Select>

                  </Form.Item>
              </Col>


              <Col xs={2} sm={4} md={6} lg={8} xl={5}>
              <Form.Item
              label={<p className=" text-left m-0">Standard Design</p>}
              name= "compliance_with_IEC61439"
              rules={[{ required: true, message: 'required!'}]}
              >
              <Select
          placeholder="Select Compliance With IEC61439"
          onChange={onChange}
          disabled={ current_panel?.request !== "null" || current_panel?.duplicate  }
          style={{ width: '100%' }}
          allowClear
        >
          <Option value={true}>Yes </Option>
          <Option value={false}>No </Option>
          </Select>

                  </Form.Item>
              </Col>

         

              <Col xs={2} sm={4} md={6} lg={8} xl={5}>
              <Form.Item
              label={<p className="  text-left m-0">Ingress Protection</p>}
              name="ingress_protection"
              rules={[{ required: true, message: 'required!'}]}
              >
              <Select
              placeholder="Select Ingress Protection"
              onChange={onChange}
              disabled={ current_panel?.request !== "null" }
              style={{ width: '100%' }}
              allowClear
        >
          <Option value="IP4x/43">IP4x/43</Option>
          <Option value="IP54/55">IP54/55</Option>
          </Select>

                  </Form.Item>
              </Col>
              

                  <Col xs={2} sm={4} md={6} lg={8} xl={5}>
              <Form.Item
                    label={<p className="  text-left m-0">Form of Construction</p>}
                    name ="form_of_construction"
                    rules={[{ required: true, message: 'required!'}]}
                  >
                     <Select
                      placeholder="Select Form of Construction"
                      onChange={onChange}
                      disabled={ current_panel?.request !== "null" }
                      style={{ width: '100%' }}
                      allowClear
                    >
                      <Option value="Form 3">Form 3</Option>
                      <Option value="Form 4">Form 4</Option>
                    </Select>

                  </Form.Item>

              </Col>
        
              <Col xs={2} sm={4} md={6} lg={8} xl={5}>
            <Form.Item
                    label={<p className="  text-left m-0">Panel Short Circuit Rating</p>}
                    name= "panel_short_circuit_rating"
                    rules={[{ required: true, message: 'required!'}]}
                  >
                     <Select
          placeholder="Select Panel short Circuit Rating"
          onChange={onChange}
          style={{ width: '100%' }}
          disabled={ current_panel?.request !== "null" }
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

              
          <Col xs={2} sm={4} md={6} lg={8} xl={5}>
          <Form.Item
                    label={<p className="  text-left m-0">Powder Coating Finish</p>}
                    name= "powder_coating_finish"
                    rules={[{ required: true, message: 'required!'}]}
                  >
                     <Select
          placeholder="Select Powder Coating Finish"
          onChange={onChange}
          disabled={ current_panel?.request !== "null" }
          style={{ width: '100%' }}
          allowClear
        >
          <Option value="S">Structure</Option>
          <Option value="I">Semiglossy</Option>
          <Option value="G">Glossy</Option>
        </Select>

                  </Form.Item>
              </Col>
             


              <Col xs={2} sm={4} md={6} lg={8} xl={5}>
            <Form.Item
                    label={<p className="  text-left m-0">Required Busbar Support</p>}
                    name= "required_busbar_support"
                    rules={[{ required: true, message: 'required!'}]}
                  >
                     <Select
          placeholder="Select Required Busbar Support"
          onChange={onChange}
          disabled={ current_panel?.request !== "null" }
          style={{ width: '100%' }}
          allowClear
        >
          <Option value="Yes">Yes</Option>
          <Option value="No">No</Option>
          </Select>

                  </Form.Item>   
              </Col>
              <Col xs={2} sm={4} md={6} lg={8} xl={5}>
             <Form.Item
                    label={<p className="  text-left m-0">Required Base Plinth</p>}
                    name="required_base_plinth"
                    rules={[{ required: true, message: 'required!'}]}
                  >
                     <Select
          placeholder="Select Required Base Plinth"
          onChange={onChange}
          disabled={ current_panel?.request !== "null" }
          style={{ width: '100%' }}
          allowClear
        >
          <Option value="yes">Yes</Option>
          <Option value="no">No</Option>
        </Select>

        </Form.Item>            
            
         </Col>




           <Col xs={2} sm={4} md={6} lg={8} xl={5}>
           <Form.Item
                    
           label={<p className="  text-left m-0">Panel Color</p>}
           name="panel_colour"
           rules={[{ required: true, message: 'required!'}]}
           >
          <Select
          placeholder="Select panel color"
          onChange={onChangeColor}
          disabled={ current_panel?.request !== "null" }
          style={{ width: '100%' }}
          allowClear
        >
          <Option value="0"><span  style={{color:'#B5B0A1', paddingRight:'1rem', display:'inline-block', fontSize:'10px' }} >< SiHeadspace/> </span>RAL7032  </Option>
          <Option value="1"><span  style={{color:'#C5C7C4', paddingRight:'1rem', display:'inline-block', fontSize:'10px' }} >< SiHeadspace/> </span>RAL7035</Option>
          <Option value="2"><span  style={{color:'#DA6E00', paddingRight:'1rem', display:'inline-block', fontSize:'10px' }} >< SiHeadspace/> </span>RAL2000</Option>
          <Option value="3"><span  style={{color:'#ECECE7', paddingRight:'1rem', display:'inline-block', fontSize:'10px' }} >< SiHeadspace/> </span>RAL9003</Option>
          <Option value="U"><span  style={{color:'transparent',paddingRight:'1rem', display:'inline-block',fontSize:'10px' }} >< SiHeadspace/> </span>User Defined</Option>
          </Select>

              </Form.Item>
              </Col>

          { userColor && <Col xs={2} sm={4} md={6} lg={8} xl={5}>
          <Form.Item
                
                label={<p className=" text-left m-0" > User Defined Panel Color</p>}
                name="user_define"
                rules={[{ required: true, message: 'required!'}]}
              >
          <Input style={{backgroundColor:'#fff', }}/>

          </Form.Item>
          </Col>}
          </Row>

            <Row >
            <Col span={10}>

            <b><p style={{ marginTop:'1rem'}}>Frame Bar | Cross Bar</p></b>
            </Col>
            <Col span={10} >
            <b><p style={{ marginTop:'1rem', paddingLeft:'10px' }}> Partitions</p></b>
            </Col>
            </Row>






            <Row gutter={24}>
            <Col xs={2} sm={4} md={6} lg={8} xl={5}>
            <Form.Item
            rules={[{ required: true, message: 'required!'}]}
            label={<p className="  text-left m-0">Material</p>}
            name= "frame_material"  
             >
            <Select
              onChange={handleClickFrame}
              disabled={ current_panel?.request !== "null" }
              placeholder="Frame Material" 
              // defaultValue="Z" 
            >
              <Option value="Z">Aluzn</Option>
              {/* <Option value="G">GI</Option>
              <Option value="C">CRCA</Option> */}        
          </Select>
          </Form.Item> 
           </Col>



            <Col xs={2} sm={4} md={6} lg={8} xl={5}>
            <Form.Item
            label={<p className="  text-left m-0">Powdercoating</p>}
            name= "frame_powdercoating"
            rules={[{ required: true, message: 'required!'}]}
            >
            <Select
            onChange={onChange}
            placeholder="Frame Powdercoating"
            disabled={ current_panel?.request !== "null" }
             >
            <Option value={true}>Yes</Option>
            { frameMaterial !=='C' &&  <Option value={false}>No</Option>  }

            </Select>
            </Form.Item>
            </Col>

                 

            <Col xs={2} sm={4} md={6} lg={8} xl={5}>
            <Form.Item
            rules={[{ required: true, message: 'required!'}]}
            label={<p className="  text-left m-0">Material</p>}
            name= "partition_material"  
                  >

            <Select
            onChange={onChange}
            placeholder="Partition Material"  
            disabled={ current_panel?.request !== "null" }         
        >
          {/* <Option value="Z">Aluzn</Option> */}
          <Option value="G">GI</Option>
          {/* <Option value="C">CRCA</Option> */}


         
          

          </Select>
          </Form.Item> 
           </Col>

                  <Col xs={2} sm={4} md={6} lg={8} xl={5}>
                  <Form.Item
                    label={<p className="  text-left m-0">Powdercoating</p>}
                    name= "partition_powdercoating"
                    rules={[{ required: true, message: 'required!'}]}
                  >
                  <Select
                  onChange={onChange}
                   placeholder="Partition Powdercoating"
                   disabled={ current_panel?.request !== "null" }
                   
          
                  >
            <Option value={true}>Yes</Option>
            <Option value={false}>No</Option>  

                  </Select>
                 </Form.Item>
                  </Col>
                  </Row>



         <b><p style={{ marginTop:'1rem'}}> Doors |  Covers (Powdercoated) </p></b> 
         <Row gutter={24}>

         <Col xs={2} sm={4} md={6} lg={8} xl={5}>

         <Form.Item
         rules={[{ required: true, message: 'required!'}]}
         label={<p className="  text-left m-0">Material</p>}
         name= "cover_material"
  
          >
          <Select
          onChange={onChange}
           placeholder="Cover Material"
           disabled={ current_panel?.request !== "null" }
            

            >
          {/* <Option value="Z">Aluzn</Option> */}
          <Option value="G">GI</Option>
          <Option value="C">CRCA</Option>

          </Select>
          </Form.Item>
           </Col>


           <Col xs={2} sm={4} md={6} lg={8} xl={5}>
           <Form.Item
            rules={[{ required: true, message: 'required!'}]}
           label={ <p className="  text-left m-0">Powdercoating</p>}
            name= "cover_powdercoating"  
            >
         <Select disabled
         onChange={onChange}
         placeholder="Cover Powdercoating"
          >
          <Option  value={true}>Yes</Option>
        {/* <Option value={false}>No</Option>   */}
          </Select>
          </Form.Item>

           </Col>
           </Row>

          
          {!saveBtn  && current_panel?.panel.length > 0 && <Checkbox style={{ marginTop:'2rem'}} onChange={onChangeCheckBox}><b>Existing Structures will be deleted on saving the new panel setting changes. </b> </Checkbox> }

     

            <Row  gutter={22} id='addlis' style={{ marginTop:'3rem', }}>
            <Col>
            <Button type="primary" htmlType="submit"
             disabled={ current_panel?.duplicate === true && check == true ? true :false }
             onClick={()=>{setVisible(false)}}
             block style={{ fontSize: '14px', width:'10rem'  }}>
               Save
             </Button>
             </Col>




    


            <Col>

            <Tooltip  placement="topLeft" title= {current_panel?.panel_type === null  ?'Save Panel Settings to Enable Configure Now': current_panel?.request == "null" ? "To design The Panel" : "Disabled as Panel has been Submitted" }  arrowPointAtCenter>
            <Button type="primary" htmlType="submit"
            disabled={current_panel?.panel_type === null || current_panel?.request !== "null" }
            block style={{ fontSize: '14px', width:'10rem' , }}>
            <a href={`https://canvas.modsim.app/panel/${current_panel?._id}`}> Configure Now</a>
            {/* <a href={`https://modsimcanvas.web.app/panel/${current_panel?._id}`}> Configure Now</a> */}
            </Button>
            </Tooltip>

    
            </Col>

            </Row>
            </Col>
           </div>
              </div>

 
      <Row>
      
      <Col xs={2} sm={4} md={6} lg={8} xl={5}>
  <Form.Item >



  {/* <Anttable data={current_panel?.detailedBom} panel={current_panel} /> */}

    {/* <Button type="primary" 
    block style={{ fontSize: '14px', width:'10rem' , }}
      onClick={() => setVisible(true)}
      disabled={current_panel?.request === "null" ? true : false }>
      <span className='px-5 '> 
      View BOM
      </span>
    </Button> */}




    <Form.Item  >
   
    </Form.Item>
    </Form.Item>

{/* 
                    <Modal 
                    isVisible={visible} 
                    title="BOM DETAILS"
                    footer={false}
                    className=""
                    width="70%"
                    cancel={()=>setVisible(!visible)}>                      
                    <ExportExcel cancel={()=>setVisible(!visible)} data={current_panel?.bom} panel={current_panel} />                      
                    </Modal> */}


</Col>
{/* <Col xs={2} sm={4} md={6} lg={8} xl={5}>
  <Form.Item >
    <Button type="primary" htmlType="submit"
    block style={{ fontSize: '14px', width:'10rem' ,  }}>
      <span className='px-5 '> Download BOM</span>
    </Button>
  </Form.Item>
  </Col> */}
 
  <Col xs={2} sm={4} md={6} lg={8} xl={5}>
  {/* <Form.Item  >
    <Button type="primary" htmlType="submit"
   disabled={current_panel?.panel_type === null}
    block style={{ fontSize: '14px', width:'10rem' , }}>

    <a   href={`https://modsimcanvas.web.app/panel/${current_panel?._id}`}> Configure Now</a>
    </Button>
  </Form.Item> */}
  </Col>
  {/* <Col xs={2} sm={4} md={6} lg={8} xl={5}>
  <Form.Item  >
    <Button disabled type="primary" htmlType="submit">
      <span className='px-5 '> Request Drawing</span>
    </Button >
  </Form.Item  >
  </Col> */}
{/* 
</Descriptions>

</div> */}
</Row>
          </Form>
        
      </>
    );
  }

