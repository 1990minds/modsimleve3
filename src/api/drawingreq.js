import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios'
import { message, notification } from 'antd';
import { keyUri, config } from '../key'
import { fetchProductPanels} from '../api/panel'

const initialState = {

    all_drawingreq:[],
    loading:false,
    hasError:false,
    current_drawingreq:null,
}


export const drawingreqSlice = createSlice({
    name: 'drawingreq',
    initialState,
    reducers: {
  
      getdrawingreq: state => {
        state.loading = true;
      },
  
      getAll_drawingreq_success: (state, {payload})  =>{
  
          state.loading = false
          state.all_drawingreq = payload.drawingreq
  
      },
  
  
      getCurrentSuccess: (state, {payload}) =>{
          state.loading = false
          state.current_drawingreq = payload.drawingreq
      
      },
  
      get_drawingreq_Failure: (state) => {
  
        state.loading = false
        state.hasError = true
      },
  
    },
  })
  
  export const { getdrawingreq ,getAll_drawingreq_success, getCurrentSuccess, get_drawingreq_Failure } = drawingreqSlice.actions;



export const drawingreqSelector = state => state.drawingreq;

export const fetchAlldrawingreq = () => async dispatch => {
  dispatch(getdrawingreq())
 
  try {
 
   const {data} = await axios.get(keyUri.BACKEND_URI +`/drawingreq`)
   console.log(data);
   
   dispatch(getAll_drawingreq_success(data));
    
  } catch (error) {
 
 dispatch(get_drawingreq_Failure())

  }
 };

 
 export const deletedrawingreq = (id, drawingreq) => async dispatch => {

  dispatch(getdrawingreq())
  const key = 'create';
  message.loading({ content: 'loading...', key })
  try {
 
   const {data} = await axios.delete(keyUri.BACKEND_URI +`/drawingreq/${id} `, drawingreq, config)
  data && message.success({ content: data.msg, key, duration: 2 });
   dispatch(fetchAlldrawingreq());
    
  } catch (error) {


 dispatch(get_drawingreq_Failure())
 
  }
 };





 export const createdrawingreq = ( values, id) => async dispatch => {

  dispatch(getdrawingreq())
  const key = 'create';
  // message.loading({ content: 'loading...', key })
  try {
 
   const {data} = await axios.post(keyUri.BACKEND_URI +`/drawingreq`, values, config)

  //  data && message.success({ content: data.msg, key, duration: 2 });

  data && notification.open(
    {
        message: `Drawing Request ID : #${data?.drawingreq?.request_id}`,
        description:
          `We have received your request and a Drawing Request ID ${data?.drawingreq?.request_id} has been created.
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
 dispatch(get_drawingreq_Failure())

  }
 };



 

 export const fetchOnedrawingreq = (id) => async dispatch => {

  dispatch(getdrawingreq())
 console.log(id);
  try {
 
   const {data} = await axios.get(keyUri.BACKEND_URI +`/drawingreq/${id}`)
  console.log(data);
   dispatch(getCurrentSuccess(data));
  } catch (error) {

 dispatch(get_drawingreq_Failure())
  }
 };


 export const  updatedrawingreq = (id, values) => async dispatch =>{
  const key = "drawingreq"
  dispatch(getdrawingreq())
  message.loading({ content: 'loading...', key })

try {
    const {data} = await axios.put(keyUri.BACKEND_URI +`/drawingreq/${id}`, values, config);
    console.log(data);
    
    data && message.success({ content: data.msg, key, duration: 2 });
    dispatch(fetchAlldrawingreq());
    // window.location.reload()

} catch ({response}) {
console.log(response.data);
    dispatch(get_drawingreq_Failure())
   

}
}



export default drawingreqSlice.reducer;