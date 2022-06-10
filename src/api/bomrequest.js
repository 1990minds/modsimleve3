import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios'
import { message, notification } from 'antd';
import { keyUri, config } from '../key'
import { fetchProductPanels} from '../api/panel'


const initialState = {

    all_bomrequest:[],
    loading:false,
    hasError:false,
    current_bomrequest:null,
}


export const bomrequestSlice = createSlice({
    name: 'bomrequest',
    initialState,
    reducers: {
  
      getbomrequest: state => {
        state.loading = true;
      },
  
      getAll_bomrequest_success: (state, {payload})  =>{
  
          state.loading = false
          state.all_bomrequest = payload.bomrequest
  
      },
  
  
      getCurrentSuccess: (state, {payload}) =>{
          state.loading = false
          state.current_bomrequest = payload.bomrequest
      
      },
  
      get_bomrequest_Failure: (state) => {
  
        state.loading = false
        state.hasError = true
      },
  
    },
  })
  
  export const { getbomrequest ,getAll_bomrequest_success, getCurrentSuccess, get_bomrequest_Failure } = bomrequestSlice.actions;



export const bomrequestSelector = state => state.bomrequest;

export const fetchAllbomrequest = () => async dispatch => {
  dispatch(getbomrequest())
 
  try {
 
   const {data} = await axios.get(keyUri.BACKEND_URI +`/bomrequest`)
   console.log(data);
   
   dispatch(getAll_bomrequest_success(data));
    
  } catch (error) {
 
 dispatch(get_bomrequest_Failure())

  }
 };

 
 export const deletebomrequest = (id, bomrequest) => async dispatch => {

  dispatch(getbomrequest())
  const key = 'create';
  message.loading({ content: 'loading...', key })
  try {
 
   const {data} = await axios.delete(keyUri.BACKEND_URI +`/bomrequest/${id} `, bomrequest, config)
  data && message.success({ content: data.msg, key, duration: 2 });
   dispatch(fetchAllbomrequest());
    
  } catch (error) {


 dispatch(get_bomrequest_Failure())
 
  }
 };


 export const createbomrequest = ( values,id) => async dispatch => {

  dispatch(getbomrequest())
  const key = 'create';
  // message.loading({ content: 'loading...', key })
  try {
 
   const {data} = await axios.post(keyUri.BACKEND_URI +`/bomrequest`, values, config)

  //  data && message.success({ content: data.msg, key, duration: 2 });
  data && notification.open(
    {
        message: `BOM Request ID : #${data?.bomrequest?.request_id}`,
        description:
          `We have received your request and a BOM Request ID ${data?.bomrequest?.request_id} has been created.
Our Team will share the details with you to your official Email.
Thank you for contacting Modutec.
          `
          ,
        duration: 0,
      }
  );
   dispatch(fetchProductPanels(id));

  } 
  catch ({response}) {
response.data && message.error({ content: response.data.msg, key, duration: 2 })
 dispatch(get_bomrequest_Failure())

  }
 };



 export const fetchOnebomrequest = (id) => async dispatch => {

  dispatch(getbomrequest())
 console.log(id);
  try {
 
   const {data} = await axios.get(keyUri.BACKEND_URI +`/bomrequest/${id}`)
  console.log(data);
   dispatch(getCurrentSuccess(data));
  } catch (error) {

 dispatch(get_bomrequest_Failure())
  }
 };


 export const  updatebomrequest = (id, values) => async dispatch =>{
  const key = "bomrequest"
  dispatch(getbomrequest())
  message.loading({ content: 'loading...', key })

try {
    const {data} = await axios.put(keyUri.BACKEND_URI +`/bomrequest/${id}`, values, config);
    console.log(data);
    
    data && message.success({ content: data.msg, key, duration: 2 });
    dispatch(fetchAllbomrequest());
    // window.location.reload()

} catch ({response}) {
console.log(response.data);
    dispatch(get_bomrequest_Failure())
   

}
}


export default bomrequestSlice.reducer;