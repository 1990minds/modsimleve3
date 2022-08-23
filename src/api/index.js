import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import customersReducer from './customers'
import  projectReducer  from './project';
import productReducer from './product'
import panelReducer from './panel'
import ticketReducer from './tickets';
import companyReducer from './company'
import broadcastReducer from './broadcast';


export default configureStore({
  reducer: {

    auth:authReducer,
     
     customers:customersReducer,
     project:projectReducer,
     product:productReducer,
     broadcast:broadcastReducer,
     panel:panelReducer,
    tickets:ticketReducer,
    company:companyReducer,
  },
});