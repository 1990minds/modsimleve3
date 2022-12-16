import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios'
import { message } from 'antd';
import { keyUri, config } from '../key'
import {fetchOneCompany}from './company'
const initialState = {

    all_license:[],
    loading:false,
    hasError:false,
    current_license:[],
}


export const licenseSlice = createSlice({
  name: 'license',
  initialState,
  reducers: {

    getlicense: state => {
      state.loading = true;
    },

    getAll_license_success: (state, {payload})  =>{

        state.loading = false
        state.all_license = payload.license

    },


    getCurrentSuccess: (state, {payload}) =>{
        state.loading = false
        state.current_license = payload. license
    
    },

    get_license_Failure: (state) => {

      state.loading = false
      state.hasError = true
    },

  },
})


export const { getlicense ,getAll_license_success, getCurrentSuccess, get_license_Failure } = licenseSlice.actions;



export const licenseSelector = state => state.license;



export const fetchAllLicense = () => async dispatch => {
  dispatch(getlicense())
 
  try {
 
   const {data} = await axios.get(keyUri.BACKEND_URI +`/license`)
   
   dispatch(getAll_license_success(data));
    
  } catch (error) {
 
 dispatch(get_license_Failure())

  }
 };


  

 export const deleteLicense = (id, license) => async dispatch => {

  dispatch(getlicense())
  const key = 'create';
  message.loading({ content: 'loading...', key })
  try {
 
   const {data} = await axios.delete(keyUri.BACKEND_URI +`/license/${id} `, license, config)
  data && message.success({ content: data.msg, key, duration: 2 });
   dispatch(fetchAllLicense());
    
  } catch (error) {


 dispatch(get_license_Failure())
 
  }
 };

 export const createlicense = (value,company) => async dispatch => {

  dispatch(getlicense())
  const key = 'create';
  message.loading({ content: 'loading...', key })
  try {
 
   const {data} = await axios.post(keyUri.BACKEND_URI +`/license`, value,config)

   data && message.success({ content: data.msg, key, duration: 2 });
   dispatch(fetchOneCompany(company));
    // window.location.reload()

  } 
  catch ({response}) {
response?.data && message.error({ content: response.data.msg, key, duration: 2 })
 dispatch(get_license_Failure())

  }
 };

 export const fetchExpiryNotification = (id) => async dispatch => {

  dispatch(getlicense())

  try {
 
   const {data} = await axios.get(keyUri.BACKEND_URI +`/user-notification/${id}`)
   dispatch(getCurrentSuccess(data));
  } catch (error) {

 dispatch(get_license_Failure())
  }
 };


 export const fetchOnelicense = (id) => async dispatch => {

  dispatch(getlicense())

  try {
 
   const {data} = await axios.get(keyUri.BACKEND_URI +`/license/${id}`)
   dispatch(getCurrentSuccess(data));
  } catch (error) {

 dispatch(get_license_Failure())
  }
 };



 export const   updateLicense = ( values, id) => async dispatch =>{
  const key = "license"
  dispatch(getlicense())
  message.loading({ content: 'loading...', key })

try {
    const {data} = await axios.put(keyUri.BACKEND_URI +`/license/${id}`, values, config);
    
    data && message.success({ content: data.msg, key, duration: 2 });
    dispatch(fetchAllLicense())
    

} catch ({response}) {
    dispatch(get_license_Failure())
   

}
}



export default licenseSlice.reducer;
