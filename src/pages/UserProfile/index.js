import React, { useEffect, useState } from 'react'
import {
    Card,
    Form,
    Input,
    Button,
    Radio,
    Divider,

    Upload ,Image,
  } from 'antd';
import Layout from '../../components/layout/Main'
import { authenticateSelector} from '../../api/authSlice'
import { AntDesignOutlined } from '@ant-design/icons';
import Loader from '../../pages/shared/loader';
import storage from '../../pages/shared/storage'
import {updateUser} from '../../api/user'
import { Avatar } from 'antd';
import {MdClose, MdDelete} from 'react-icons/md'
import { LoadingOutlined,} from '@ant-design/icons';
import {useDispatch, useSelector} from 'react-redux'
import { PlusOutlined } from '@ant-design/icons';

export default function Edituser() {

   
    const {user} = useSelector(authenticateSelector)
    const [imgurl, setImgurl] = useState([])
    const [loading1, setLoading1] = useState(false)
    const [fileList, setFileList] = useState([])
    console.log(user)
    


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

  const [form] = Form.useForm();
  const dispatch = useDispatch();

useEffect(() =>{
  user && setImgurl([user?.profile_image])
  form.setFieldsValue({
    full_name:user && user.full_name,
    email:user && user.email,
    phone_number:user && user.phone_number,
    department:user && user.department,
    // profile_image: imgurl[0],
    });
  }, [user])


  const onFinish = (values) => {

    const userdata = {

      department:values.department,
      // profile_image: imgurl.length>=1 ? imgurl[0] : null,

    }
  dispatch(updateUser(user?._id, userdata))
   };

   const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };



  return (
    <Layout>

<Card style={{ width: '100%' }}>
 <Form layout="vertical" hideRequiredMark
           form={form}
           name="basic"
           initialValues={{ remember: false }}
           onFinish={onFinish}
           onFinishFailed={onFinishFailed}
           autoComplete={false}
           style={{ textAlign: 'center', display: 'flex', justifyContent: 'center' }}

          >

      
  
      <div style={{ width: '30%' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: '700'}}> Update Information</h1>
 
<Form.Item>
  <Avatar


        alt="example"
        src={user?.company?.profile_image} 
        size={{  xxl: 100 }}
/>

</Form.Item>


      <Form.Item label="User Name" name="full_name" >
        <Input disabled />
      </Form.Item>
      <Form.Item label="Email" name="email">
        <Input disabled />
      </Form.Item>
      <Form.Item label="Phone Number" name="phone_number">
        <Input disabled />
      </Form.Item>
      <Form.Item label="Department" name='department'>
        <Input />
      </Form.Item>
    
      <Form.Item>
      <Divider />
<Button type="primary" htmlType="submit"
block style={{ fontSize: '14px' }}>
      Update Profile
    </Button>
      </Form.Item>
      </div>
    
  
    </Form>

    </Card>
    </Layout>
  )
}
