import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios'
import { message } from 'antd';
import { keyUri, config } from '../key'
// import {fetchAllcompanyactiveLicense} from './license'

const initialState = {

    all_user:[],
    loading:false,
    hasError:false,
    current_user:[],
}


export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {

    getuser: state => {
      state.loading = true;
    },

    getAll_user_success: (state, {payload})  =>{
console.log(payload);
        state.loading = false
        state.all_user = payload.user

    },


    getCurrentSuccess: (state, {payload}) =>{
        state.loading = false
        state.current_user = payload.user
    
    },

    get_user_Failure: (state) => {

      state.loading = false
      state.hasError = true
    },

  },
})


export const { getuser ,getAll_user_success, getCurrentSuccess, get_user_Failure } = userSlice.actions;



export const userSelector = state => state.user;


export const fetchAllCompanyUser = (id,company) => async dispatch => {
  dispatch(getuser())
 
  console.log({id});
  try {
 
   const {data} = await axios.get(keyUri.BACKEND_URI +`/company-user/${id}`)


   console.log(data);
   
   dispatch(getAll_user_success(data));
    
  } catch (error) {
 
 dispatch(get_user_Failure())

  }
 };

 export const deleteUser = (id, user,company) => async dispatch => {

  dispatch(getuser())
  const key = 'create';
  message.loading({ content: 'loading...', key })
  try {
 
   const {data} = await axios.delete(keyUri.BACKEND_URI +`/user/${id} `, user, config)
  data && message.success({ content: data.msg, key, duration: 2 });
  dispatch(fetchAllCompanyUser(company));
    
  } catch (error) {


 dispatch(get_user_Failure())
 
  }
 };

// export const createuser = ( values,company) => async dispatch => {

//   dispatch(getuser())
//   const key = 'create';
//   message.loading({ content: 'loading...', key })
//   try {
 
//    const {data} = await axios.post(keyUri.BACKEND_URI +`/user`, values, config)
//    data && message.success({ content: data.msg, key, duration: 2 });
//    dispatch(fetchAllCompanyUser(company));
//    dispatch(fetchAllcompanyactiveLicense(company))

//   } 
//   catch ({response}) {
// response.data && message.error({ content: response.data.msg, key, duration: 2 })
//  dispatch(get_user_Failure())

//   }
//  };

 export const fetchOneUser = (id) => async dispatch => {

  dispatch(getuser())
 console.log(id);
  try {
 
   const {data} = await axios.get(keyUri.BACKEND_URI +`/user/${id}`)
  console.log(data);
   dispatch(getCurrentSuccess(data));
  } catch (error) {

 dispatch(get_user_Failure())
  }
 };


 export const  updateUser = (id, values,company) => async dispatch =>{
  const key = "user"
  dispatch(getuser())
  message.loading({ content: 'loading...', key })

try {
    const {data} = await axios.put(keyUri.BACKEND_URI +`/user/${id}`, values, config);
    console.log(data);
    
    data && message.success({ content: data.msg, key, duration: 2 });
    dispatch(fetchAllCompanyUser(company));

} catch ({response}) {
console.log(response.data);
    dispatch(get_user_Failure())
   

}
}

export default userSlice.reducer;
