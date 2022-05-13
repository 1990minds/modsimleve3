import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios'
import { message } from 'antd';
import { keyUri, config } from '../key'


const initialState = {

    all_product:[],
    loading:false,
    hasError:false,
    current_product:null,
}


export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {

    getproduct: state => {
      state.loading = true;
    },

    getAll_product_success: (state, {payload})  =>{

        state.loading = false
        state.all_product = payload.product

    },


    getCurrentSuccess: (state, {payload}) =>{
        state.loading = false
        state.current_product = payload.product
    
    },

    get_product_Failure: (state) => {

      state.loading = false
      state.hasError = true
    },

  },
})


export const { getproduct ,getAll_product_success, getCurrentSuccess, get_product_Failure } = productSlice.actions;



export const productSelector = state => state.product;



export const fetchAllproduct = () => async dispatch => {
  dispatch(getproduct())
 console.log('get');
  try {
 
   const {data} = await axios.get(keyUri.BACKEND_URI +`/product`)
   console.log(data);
   
   dispatch(getAll_product_success(data));
    
  } catch (error) {
 
 dispatch(get_product_Failure())

  }
 };



 export const deleteproduct = (id, product) => async dispatch => {

  dispatch(getproduct())
  const key = 'create';
  message.loading({ content: 'loading...', key })
  try {
 
   const {data} = await axios.delete(keyUri.BACKEND_URI +`/product/${id} `, product, config)
  data && message.success({ content: data.msg, key, duration: 2 });
   dispatch(fetchAllproduct());
    
  } catch (error) {


 dispatch(get_product_Failure())
 
  }
 };





 export const createProduct = ( values,id) => async dispatch => {
console.log( "values");

  dispatch(getproduct())
  const key = 'create';
  message.loading({ content: 'loading...', key })
  try {
 
   const {data} = await axios.post(keyUri.BACKEND_URI +`/product`, values, config)

   dispatch(fetchAllproduct());
   data && message.success({ content: data.msg, key, duration: 2 });

  } 
  catch ({response}) {
response.data && message.error({ content: response.data.msg, key, duration: 2 })
 dispatch(get_product_Failure())

  }
 };





 export const fetchOneproduct = (id) => async dispatch => {

  dispatch(getproduct())
 console.log(id);
  try {
 
   const {data} = await axios.get(keyUri.BACKEND_URI +`/product/${id}`)
  console.log(data);
   dispatch(getCurrentSuccess(data));
  } catch (error) {

 dispatch(get_product_Failure())
  }
 };


 export const  updateProduct = (id, values) => async dispatch =>{
  const key = "product"
  dispatch(getproduct())
  message.loading({ content: 'loading...', key })

try {
    const {data} = await axios.put(keyUri.BACKEND_URI +`/product/${id}`, values, config);
    console.log(data);
    
    data && message.success({ content: data.msg, key, duration: 2 });
    // dispatch(fetchAllproduct())
    window.location.reload()

} catch ({response}) {
console.log(response.data);
    dispatch(get_product_Failure())
   

}
}


export const deleteProduct = (id, product) => async dispatch => {

  dispatch(getproduct())
  const key = 'create';
  message.loading({ content: 'loading...', key })
  try {
 
   const {data} = await axios.delete(keyUri.BACKEND_URI +`/product/${id}`)
  data && message.success({ content: data.msg, key, duration: 2 });
   dispatch(fetchAllproduct());
    
  } catch (error) {


 dispatch(get_product_Failure())

      
  }

}
export default productSlice.reducer;
