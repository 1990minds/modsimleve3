import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios'
import { message } from 'antd';
import { keyUri, config } from '../key'

const initialState = {

    all_log:[],
    loading:false,
    hasError:false,
    current_log:[]

}


export const logSlice = createSlice({
  name: 'log',
  initialState,
  reducers: {

    getlog: state => {
      state.loading = true;
    },

    getAll_log_success: (state, {payload})  =>{
        state.loading = false
        state.all_log = payload
     

    },

    getCurrentSuccess: (state, {payload}) =>{
       
        state.loading = false
        state.current_log = payload
    
    },

    get_log_Failure: (state) => {

      state.loading = false
      state.hasError = true
    },

  },
})


export const { getlog ,getAll_log_success, getCurrentSuccess, get_log_Failure } = logSlice.actions;



export const logSelector = state => state.log;

export const  fetchAllCustomerLog = (id) => async dispatch => {

  dispatch(getlog())
 
  try {
 
   const {data} = await axios.get(keyUri.BACKEND_URI +`/customer-log/${id}` , config)
   
   
   dispatch(getAll_log_success(data));
    
  } catch (error) {
 
 dispatch(get_log_Failure())
 
    
  }
 };



export default logSlice.reducer;

