import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import customersReducer from './customers'
import  projectReducer  from './project';
import productReducer from './product'
import panelReducer from './panel'

export default configureStore({
  reducer: {

    auth:authReducer,
     
     customers:customersReducer,
     project:projectReducer,
     product:productReducer,
     panel:panelReducer,

  },
});