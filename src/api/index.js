import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import customersReducer from './customers'
import  projectReducer  from './project';
import productReducer from './product'
import panelReducer from './panel'
import ticketReducer from './tickets';
import companyReducer from './company'


export default configureStore({
  reducer: {

    auth:authReducer,
     
     customers:customersReducer,
     project:projectReducer,
     product:productReducer,
     panel:panelReducer,
    tickets:ticketReducer,
    company:companyReducer,
  },
});