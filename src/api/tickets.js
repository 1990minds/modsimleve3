import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { message } from "antd";
import { config, keyUri } from '../key'


const initialState = {

    all_tickets:[],
    loading: false,
    hasError: false,
    current_tickets: null,
}

export const ticketsSlice = createSlice ({
    name: 'ticket',
    initialState,
    reducers: {
        gettickets: state =>{
            state.loading= true;
        },

        getAll_tickets_success: (state, {payload}) =>{
            state.loading = false
            state.all_tickets = payload.tickets
        },

        getCurrentSuccess: (state, {payload}) =>{
            state.loading = false
            state.current_tickets = payload.tickets
        },

        get_tickets_failure: (state) =>{
            state.loading = false
            state.hasError = true

        },
    }
})

export const {gettickets , getAll_tickets_success, getCurrentSuccess, get_tickets_failure} = ticketsSlice.actions;

export const ticketsSelector = state => state.tickets;

export const fetchAllCompanyTickets = (id) => async dispatch => {
    dispatch(gettickets())
   
    console.log({id});
    try {
   
     const {data} = await axios.get(keyUri.BACKEND_URI +`/companytickets/${id}`)
  
  
     console.log(data);
     
     dispatch(getAll_tickets_success(data));
      
    } catch (error) {
   
   dispatch(get_tickets_failure())
  
    }
   };





export const fetchOneTickets = (id) => async dispatch => {
    dispatch(gettickets())
    
    try{
        const {data} = await axios.get(keyUri.BACKEND_URI+`/tickets/${id}`)
        dispatch(getCurrentSuccess (data));
    } catch(error) {
        dispatch(get_tickets_failure())
    }
}

export const updatetickets = (id, valuse) => async dispatch =>{
    const key= "tickets"
    dispatch(gettickets())
    message.loading({ content: 'loading...', key })

    try{
        const {data} = await axios.put(keyUri.BACKEND_URI +`/tickets/${id}`, valuse, config);

        data && message.success({ content: data.msg, key, duration: 2});

        window.location.reload()
    } catch ({response}){
        dispatch(get_tickets_failure())

    }
}

export const createtickets = ( values,id) => async dispatch => {

    dispatch(gettickets())
    const key = 'create';
    message.loading({ content: 'loading...', key })
    try {
   
     const {data} = await axios.post(keyUri.BACKEND_URI +`/tickets`, values, config)
     data && message.success({ content: data.msg, key, duration: 2 });
     dispatch(fetchAllCompanyTickets(id));
  
    } 
    catch ({response}) {
  response.data && message.error({ content: response.data.msg, key, duration: 2 })
   dispatch(get_tickets_failure())
  
    }
   };
  
   

export default ticketsSlice.reducer;