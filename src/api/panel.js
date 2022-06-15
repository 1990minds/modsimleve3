import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios'
import { message } from 'antd';
import { keyUri, config } from '../key'


const initialState = {

    all_panel:[],
    product_panels:[],
    loading:false,
    hasError:false,
    current_panel:null,
}


export const panelSlice = createSlice({
  name: 'panel',
  initialState,
  reducers: {

    getpanel: state => {
      state.loading = true;
    },

    getAll_panel_success: (state, {payload})  =>{

      console.log(payload)

        state.loading = false
        state.all_panel = payload.panel

    },
    get_product_panels_success: (state, {payload})  =>{

      state.loading = false
      state.product_panels = payload.panel

  },


    getCurrentSuccess: (state, {payload}) =>{
        state.loading = false
        state.current_panel = payload.panel
    
    },

    get_panel_Failure: (state) => {

      state.loading = false
      state.hasError = true
    },

  },
})


export const { getpanel ,getAll_panel_success,get_product_panels_success, getCurrentSuccess, get_panel_Failure } = panelSlice.actions;



export const panelSelector = state => state.panel;



export const fetchAllpanel = (id) => async dispatch => {
  dispatch(getpanel())
  console.log(id)
  try {
 
   const {data} = await axios.get(keyUri.BACKEND_URI +`/panel/${id}`)
   console.log(data);
   
   dispatch(getAll_panel_success(data));
    
  } catch (error) {
 
 dispatch(get_panel_Failure())

  }
 };

 export const deletepanel = (id, product) => async dispatch => {

  dispatch(getpanel())
  const key = 'create';
  message.loading({ content: 'loading...', key })
  try {
 
   const {data} = await axios.delete(keyUri.BACKEND_URI +`/panel/${id} `, config)
  data && message.success({ content: data.msg, key, duration: 2 });
   dispatch(fetchProductPanels(product));
    
  } catch (error) {


 dispatch(get_panel_Failure())
 
  }
 };

 export const createpanel = ( values,id) => async dispatch => {
console.log( values);
console.log( {id});


  dispatch(getpanel())
  const key = 'create';
  message.loading({ content: 'loading...', key })
  try {
 
   const {data} = await axios.post(keyUri.BACKEND_URI +`/panel`, values, config)

   data && message.success({ content: data.msg, key, duration: 2 });
   dispatch(fetchProductPanels(id));

  } 
    catch ({response}) {
    response.data && message.error({ content: response.data.msg, key, duration: 2 })
    dispatch(get_panel_Failure())

  }
 };

 export const duplicatepanel = (values,product) => async dispatch => {
  console.log( values);
  
  
    dispatch(getpanel())
    const key = 'create';
    message.loading({ content: 'loading...', key })
    try {
   
     const {data} = await axios.post(keyUri.BACKEND_URI +`/duplicatepanel`, values, config)
  
     data && message.success({ content: data.msg, key, duration: 2 });
     dispatch(fetchProductPanels(product));
  
    } 
      catch ({response}) {
      response.data && message.error({ content: response.data.msg, key, duration: 2 })
      dispatch(get_panel_Failure())
  
    }
   };




 export const fetchProductPanels = (values) => async dispatch => {
  dispatch(getpanel())
  console.log(values);
  try {
 
   const {data} = await axios.post(keyUri.BACKEND_URI +`/product-panels`, values, config)
   console.log(data);
   
   dispatch(get_product_panels_success(data));
    
  } catch (error) {
 
 dispatch(get_panel_Failure())

  }
 };

 export const fetchAllRequestPanels = (values) => async dispatch => {
  dispatch(getpanel())
  console.log(values);
  try {
 
   const {data} = await axios.post(keyUri.BACKEND_URI +`/request-panel`, values, config)
   console.log(data);
   
   dispatch(get_product_panels_success(data));
    
  } catch (error) {
 
 dispatch(get_panel_Failure())

  }
 };


 export const fetchOnepanel = (id) => async dispatch => {

  dispatch(getpanel())
 console.log(id);
  try {
 
   const {data} = await axios.get(keyUri.BACKEND_URI +`/panel/${id}`)
  console.log(data);
   dispatch(getCurrentSuccess(data));
  } catch (error) {

 dispatch(get_panel_Failure())
  }
 };


 export const  updatePanel = (id, values, product) => async dispatch =>{

  console.log(id);
  console.log(values);

  const key = "panel"
  dispatch(getpanel())
  message.loading({ content: 'loading...', key })

try {
    const {data} = await axios.put(keyUri.BACKEND_URI +`/panel/${id}`, values, config);
    console.log(data);
    
    data && message.success({ content: data.msg, key, duration: 2 });
    dispatch(fetchProductPanels(product));
    dispatch(fetchOnepanel(id));


} catch ({response}) {

  console.log("error");
    dispatch(get_panel_Failure())

}
}


export default panelSlice.reducer;
