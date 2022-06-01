import React, {useState,useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Form, Input, Tooltip,Upload ,Image, Button, Col, Row, Select, Drawer } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import {useParams} from 'react-router-dom'
import Loader from '../../pages/shared/loader';
import storage from '../../pages/shared/storage'
import { LoadingOutlined,} from '@ant-design/icons';
import {MdClose, MdDelete} from 'react-icons/md'

import {createtickets} from '../../api/tickets'
import {authenticateSelector} from '../../api/authSlice';

import { fetchAlltickets, ticketsSelector} from '../../api/tickets';
import { fetchAllCompany } from '../../api/company';


const { TextArea } = Input;
const { Option } = Select;

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 12 },
  };
  
  
export default function Createtickets({cancel}) {
  
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  const [loading, setLoading] = useState(false)
  const { user } = useSelector(authenticateSelector) 
  
console.log(user);

    const dispatch = useDispatch();
     
  const [imgurl, setImgurl] = useState([])
  const [loading1, setLoading1] = useState(false)
  const [fileList, setFileList] = useState([])
    const [validityYear, setYear]=useState(null)
    const [validityMonth, setMonth]=useState(null)
      
    const {id} = useParams()

    useEffect(()=>{

      dispatch(fetchAllCompany(user?._id))
      
 }, [dispatch])
   

        
  
  const onFinish = (values) => {
  console.log(values);
      const data = {
        tickets:values.tickets,
        title:values.title,
        description:values.description,
        company_id:user?._id,
        issue_image: imgurl[0],
        // ticket_id:values.ticket_id,
         
      }

   dispatch(createtickets(data,user?._id))
   form.resetFields()
   cancel()
  
  };

  const handleChange = info => {
    setLoading1(true)
       
        storage
        .ref("images/" + info.file.name)
        .put(info.file.originFileObj)
        .then(snapshot => {
          return snapshot.ref.getDownloadURL();
        })
        .then(url => {
          console.log(url);
          setImgurl([...imgurl, url])
          setLoading1(false)
    
        })
        .catch(error => {
          console.log(error);
        });
    
      };

  const remove = (e, url) =>{

    setImgurl(prev => prev.filter(item => item !== url))
    
    }

  const uploadButton = (
    <div>
      { loading1 ? <LoadingOutlined  /> : <PlusOutlined />}
      <div style={{ marginTop: 8, fontSize:"14px" }}>{loading1 ? "uploading" :""}</div>
    </div>
  );
  

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const [form] = Form.useForm();

  const onChange = (value)=> {
    console.log(`selected ${value}`)

  }






    return (
      <>
      <Tooltip placement="top" title="Raise a new ticket">
        <Button type="primary" onClick={showDrawer} style={{fontSize: "14px"}}>
        Raise Ticket 
        </Button>
        </Tooltip>
        <Drawer
          title="Raise a ticket" placement="right" onClose={onClose} visible={visible} width={720}
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
              <Col span={24}>
             
                <Form.Item
                  name="title"
                  label="Title"
                  rules={[{ required: true, message: 'Please enterTitle' }]}
                >
                  <Input />
                </Form.Item>

            
              </Col>
              </Row>
              <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name="description"
                  label="Description"
                  rules={[{ required: true, message: 'Please enter Description' }]}
                >
                  <TextArea   showCount
    maxLength={1000}
    rows={8}
    style={{
      height: 120,
    }}
    onChange={onChange} />
                </Form.Item>
              </Col>
            </Row>




            <Row gutter={16}>
              <Col span={24}>
              <Form.Item
            label={<p className="text-left m-0 ml-2 ">Upload Issue Image</p>}
            name="issue_image"
            rules={[{ required: true, message: 'required!' }]}
          >
                <div 
                    className=" grid grid-cols-4 gap-5">
                {

                imgurl.map((img, i)=>{

                  return <div className=" imglist  bg-gray-50 text-center" style={{height:"100px"}}>
                   
                  <Image    
                   preview={false}               
                   key={i}
                   className="  rounded col-span-1  block  object-cover"
                   style={{height:"100px", width:"100px"}}
                   src={img}
                   placeholder={<Loader/> }              
                 />   
                  <h2 onClick={(e)=>remove(e, img)} className="p-1 text-white  text-xl "> <MdDelete/></h2> 

                    </div>
                })
                }

                <Upload       
                        listType="picture-card"
                        fileList={fileList}
                        onChange={handleChange}
                        multiple={true}
                        className="ml-2"
                        >
                        {imgurl.length >= 1 ? null : uploadButton}
                        </Upload>
                </div> 


        </Form.Item>

              </Col>
            </Row>










          
        
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

