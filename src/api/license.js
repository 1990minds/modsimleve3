import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios'
import { message } from 'antd';
import { keyUri, config } from '../key'

const initialState = {

    all_license:[],
    all_active_license:[],
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


      console.log(payload)
        state.loading = false
        state.all_license = payload.license


    },

    getAllcompanyLicense: (state, {payload})  =>{

        state.loading = false
        state.all_license = payload.license

    },
    getAllcompanyactiveLicense: (state, {payload})  =>{

      state.loading = false
      state.all_active_license = payload.license

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


export const { getlicense ,getAll_license_success, getCurrentSuccess,getAllcompanyLicense,getAllcompanyactiveLicense, get_license_Failure } = licenseSlice.actions;



export const licenseSelector = state => state.license;



export const fetchAllcompanyLicense = (id) => async dispatch => {
  dispatch(getlicense())
 
  try {
 
   const {data} = await axios.get(keyUri.BACKEND_URI +`/company-license/${id}`)
   
   dispatch(getAllcompanyLicense(data));
    
  } catch (error) {
 
 dispatch(get_license_Failure())

  }
 };


 export const fetchAllcompanyactiveLicense = (id) => async dispatch => {
  dispatch(getlicense())



  try {
 
   const {data} = await axios.get(keyUri.BACKEND_URI +`/company-license-active/${id}`)
   
   dispatch(getAllcompanyactiveLicense(data));
    
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






export default licenseSlice.reducer;
