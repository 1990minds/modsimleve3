import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios'
import { message } from 'antd';
import { keyUri, config } from '../key'

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


 export const createbomrequest = ( values) => async dispatch => {

  dispatch(getbomrequest())
  const key = 'create';
  message.loading({ content: 'loading...', key })
  try {
 
   const {data} = await axios.post(keyUri.BACKEND_URI +`/bomrequest`, values, config)

   data && message.success({ content: data.msg, key, duration: 2 });
   dispatch(fetchAllbomrequest());

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
    // dispatch(fetchAllcompany())
    window.location.reload()

} catch ({response}) {
console.log(response.data);
    dispatch(get_bomrequest_Failure())
   

}
}

// export const BOMPdf = (pdfValues) => async dispatch => {
//   console.log(pdfValues);

//   axios.post(keyUri.BACKEND_URI +`/bomrequest`, values, config)
//   .then(() => axios.get(keyUri.BACKEND_URI +'/fetch-templetpdf', { responseType: 'blob' })) 
//   .then((res) => {  
//       console.log(res.data);      
//       const pdfBlob = new Blob([res.data], 
//           { type: 'application/pdf' });
//    saveAs(pdfBlob, 'payslip.pdf');      
// }   
// )
// }

// export const deleteManyCompany = (values) => async dispatch =>{

//   console.log(values);
//   const key = 'delete';
//   dispatch(getcompany())
//   message.loading({ content: 'loading...', key })

//   try {
      
//       const {data} = await axios.post(keyUri + `/delete-company`, values, config )
  
//       data &&  message.success({ content: data.msg, key, duration: 2 });

//       dispatch(fetchAllCompany())

//   } catch (error) {

// dispatch(get_company_Failure())
// setTimeout(() => {

//   message.error({ content: error.response.data.msg, key, duration: 2 });
// }, 100) 

      
//   }

// }



export default bomrequestSlice.reducer;