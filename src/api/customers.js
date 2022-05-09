import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios'
import { message } from 'antd';
import { keyUri, config } from '../key'


const initialState = {

    all_customers:[],
    loading:false,
    hasError:false,
    current_customers:[],
}


export const customersSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {

    getcustomers: state => {
      state.loading = true;
    },

    getAll_customers_success: (state, {payload})  =>{

        state.loading = false
        state.all_customers = payload.customers

    },

  


    getCurrentSuccess: (state, {payload}) =>{
        state.loading = false
        state.current_customers = payload.customers
    
    },

    get_customers_Failure: (state) => {

      state.loading = false
      state.hasError = true
    },

  },
})


export const { getcustomers ,getAll_customers_success, getCurrentSuccess,getAllcompanyCustomers, get_customers_Failure } = customersSlice.actions;



export const customersSelector = state => state.customers;




 
export const fetchAllcompanycustomers = (id) => async dispatch => {
  dispatch(getcustomers())
 console.log({id});
  try {
 
   const {data} = await axios.get(keyUri.BACKEND_URI +`/companycustomers/${id}`)
   console.log(data);
   
   dispatch(getAll_customers_success(data));
    
  } catch (error) {
 
 dispatch(get_customers_Failure())

  }
 };


  

 export const deletecustomers = (id, customers,company) => async dispatch => {

  dispatch(getcustomers())
  const key = 'create';
  message.loading({ content: 'loading...', key })
  try {
 
   const {data} = await axios.delete(keyUri.BACKEND_URI +`/customers/${id} `, customers, config)
  data && message.success({ content: data.msg, key, duration: 2 });
   dispatch(fetchAllcompanycustomers(company));
    
  } catch (error) {

 dispatch(get_customers_Failure())
 
  }
 };


 export const createcustomers = ( values,company) => async dispatch => {

  dispatch(getcustomers())
  const key = 'create';
  message.loading({ content: 'loading...', key })
  try {
 
   const {data} = await axios.post(keyUri.BACKEND_URI +`/customers`, values, config)

   data && message.success({ content: data.msg, key, duration: 2 });
   dispatch(fetchAllcompanycustomers(company));

  } 
  catch ({response}) {
response.data && message.error({ content: response.data.msg, key, duration: 2 })
 dispatch(get_customers_Failure())

  }
 };



 export const fetchOnecustomers = (id) => async dispatch => {

  dispatch(getcustomers())
 console.log(id);
  try {
 
   const {data} = await axios.get(keyUri.BACKEND_URI +`/customers/${id}`)
  console.log(data);
   dispatch(getCurrentSuccess(data));
  } catch (error) {

 dispatch(get_customers_Failure())
  }
 };


 export const  updatecustomers = (id, values,company) => async dispatch =>{
  const key = "customers"
  dispatch(getcustomers())
  message.loading({ content: 'loading...', key })

try {
    const {data} = await axios.put(keyUri.BACKEND_URI +`/customers/${id}`, values, config);

    data && message.success({ content: data.msg, key, duration: 2 });
    dispatch(fetchAllcompanycustomers(company));


} catch ({response}) {
console.log(response.data);
    dispatch(get_customers_Failure())
   

}
}


export default customersSlice.reducer;
