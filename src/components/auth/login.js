import React, {useEffect} from 'react'
import {Form, Input, Button,Checkbox } from 'antd'
import {fetchlogin, authenticateSelector} from '../../api/authSlice'
import {useDispatch, useSelector} from 'react-redux'  
import Logo from '../../images/MODSIM.png'
import Banner from '../../images/perspective_matte.jpg'
import './auth.css'
// const tailLayout = {
//   wrapperCol: {
//     offset: 12,
//     span: 8,
//   },
// };





export default function Login({history}) {

    const dispatch = useDispatch()
const { isAuthenticate , faculty  } = useSelector(authenticateSelector)
console.log(faculty);

    const onFinish = (values) => {
        console.log('Success:', values);

        dispatch(fetchlogin(values))

      };
    

      useEffect(()=>{

if(isAuthenticate) {

history.push('/dashboard') 

} else {

    history.push('/')
}


      }, [isAuthenticate])
      

      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };


      const forgotPass = ()=>{
        return alert('forgot password')
      }

    return (
      <div className=' bg-white '>
<section className="relative flex flex-wrap lg:h-screen lg:items-center ">

<div className="relative w-full h-64 sm:h-96 lg:w-1/2 lg:h-full ">
    <img
      className="absolute inset-0 object-cover w-1/2 h-1/2 mx-auto my-auto"
      src={Banner}
      alt=""
    />
  </div>


  <div className="w-full px-4 lg:w-1/2 sm:px-6 lg:px-8">
    <div className="max-w-lg mx-auto text-center px-20">
        <img src={Logo} />
      {/* <h1 className="text-2xl font-bold sm:text-3xl text-black ">MODU<span className=' text-black'>TEC</span>  </h1> */}
     
    </div>


    <section className="text-blue-700">

    <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >

            <div className="container items-center px-5 lg:px-20">
              <div className="
            flex flex-col
            w-full
            max-w-md
            p-10
            mx-auto
            my-6
            transition
            duration-500
            ease-in-out
            transform
            bg-white
            rounded-lg
            md:mt-0
          ">
                
                    
                      <div>
                      <Form.Item for="email"
                        label="Username"
                        name="email"
                        rules={[
                        {
                        required: true,
                        message: 'Please input your username!',
                        },
                        ]}
                        
                        className="Usernamenew"> 
                        <div className="mt-1">
                          <Input id="email" name="email" type="email" autocomplete="email" required="" placeholder="Your Email" className="
                        Userinput
                      "/> </div>
                      </Form.Item>
                      </div>


                      <div className="space-y-1">
                        <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
        for="password" className="Usernamenew"> 
                        <div className="mt-1">
                          <Input.Password id="password" name="password" type="password" autocomplete="current-password" required="" placeholder="Password" className="
                       Userinput1
                      "/>
                        </div>
                        </Form.Item>
                      </div>
                      <div className="flex items-center justify-between py-5">
                        <div className="flex items-center">
                          <input id="remember-me" name="remember-me" type="checkbox" placeholder="" className="
                        w-4
                        h-4
                        text-blue-600
                        border-gray-200
                        rounded
                        focus:ring-blue-500
                      "/>
                          <label for="remember-me" className="block ml-2 text-sm text-neutral-600"> Remember me </label>
                        </div>
                        <div className="text-sm">
                          <a href="#" className="font-medium text-blue-500 hover:text-blue-600"> Forgot your password? </a>
                        </div>
                      </div>
                      <Form.Item>
                        <button 
                        value="Login"
                        className=" newbtn
                        
                    "> 
                    Login in 
                    </button>
                      </Form.Item>
                  
              </div>
            </div>
            </Form>
          </section>
        

  </div>
  
</section>
    
    </div>
  
    )
}
