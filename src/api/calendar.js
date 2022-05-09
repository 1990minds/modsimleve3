// import { createSlice } from '@reduxjs/toolkit';
// import axios from 'axios'
// import { message } from 'antd';
// import keyUri from '../key'

// const initialState = {

//     all_calendar_events:[],
//     loading:false,
//     hasError:false,
//     current_calendar:null,
// }


// export const calendarSlice = createSlice({
//   name: 'calendar',
//   initialState,
//   reducers: {

//     getcalendar: state => {
//       state.loading = true;
//     },

// getAll_calendar_success: (state, {payload})  =>{

//     state.loading = false
//     state.all_calendar_events = payload

// },


//   getCurrentSuccess: (state, {payload}) =>{
//     console.log(payload);
//       state.loading = false
//       state.current_calendar = payload.calendar 
//     },

//     get_calendar_Failure: (state) => {

//       state.loading = false
//       state.hasError = true
//     },

//   },
// })


// export const { getcalendar, getAll_calendar_success, getCurrentSuccess, get_calendar_Failure } = calendarSlice.actions;



// export const calendarSelector = state => state.calendar;


// const config = {
//   headers: {
//       Accept: "application/json",
//   }
// };



// export const fetchAllcalendarEvents = (id) => async dispatch => {

//   dispatch(getcalendar())
 
//   try {
 
//    const {data} = await axios.get(keyUri.BACKEND_URI +`/calendar/${id}`)
//    console.log(data);
   
//    dispatch(getAll_calendar_success(data));
    
//   } catch (error) {
 
//  dispatch(get_calendar_Failure())
 
    
//   }
//  };




// //  export const deletecalendar = (id) => async dispatch => {

// //   dispatch(getcalendar())
// //   const key = 'create';
// //   message.loading({ content: 'loading...', key })
// //   try {
 
// //    const {data} = await axios.delete(keyUri.BACKEND_URI +`/calendar/${id}`)
// //   data && message.success({ content: data.msg, key, duration: 2 });
// //    dispatch(fetchAllcalendarEvents());
    
// //   } catch (error) {

// //  dispatch(get_calendar_Failure())
 
// //   }
// //  };





//  export const createcalendar = (id, values, user) => async dispatch => {

//   dispatch(getcalendar())
//   const key = 'create';
//   message.loading({ content: 'loading...', key })

//   console.log(values);

  
//   let caledarData = {

//     date: values.date.date(),
//     month:values.date.month(),
//     year:values.date.year(),
//     ctype:values.calender_type,
//     event:values.event_content,
//     user:user
//   }

//   try {
 
//    const {data} = await axios.post(keyUri.BACKEND_URI +`/calendar/${id}`, caledarData, config)
//    data && message.success({ content: data.msg, key, duration: 2 });
//    dispatch(fetchAllcalendarEvents(id));
    
//   } catch (error) {
//     error && message.error({ content: error.response.data.msg, key, duration: 2 });

//  dispatch(get_calendar_Failure())
 
//   }
//  };


 

// export default calendarSlice.reducer;
