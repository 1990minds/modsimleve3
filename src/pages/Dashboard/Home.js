
import {useEffect, useState, useLayoutEffect} from "react";

import {
  Card,
  Col,
  Row,
  Typography,

} from "antd";


import {useDispatch, useSelector} from 'react-redux'
import YearCustomerGraph from './yearCustomerGraph'
import YearProjectGraph from './yearprojectGraph'
import {useParams,  useLocation} from 'react-router-dom'
import customers, {fetchAllcompanycustomers,customersSelector, fetchAllcustomers} from '../../api/customers'
import {authenticateSelector} from '../../api/authSlice'
import {fetchAllcompanyProject, fetchAllproject, projectSelector} from '../../api/project'
import {fetchAllUserTickets,ticketsSelector} from '../../api/tickets'
import { fetchAllpanel, panelSelector } from "../../api/panel";
import { Link } from "react-router-dom";
import styled from 'styled-components'
import axios from 'axios'
import ExportYearExcel from './yearExcel'
import ExportProjectExcel from './projectExcel'
import {keyUri} from '../../key'
import { fetchAllcompanyLicense, licenseSelector} from '../../api/license';
function Home(color) {

  const dispatch = useDispatch()
  const { all_customers} = useSelector(customersSelector)
  const { user} = useSelector(authenticateSelector)
  const {all_project} = useSelector(projectSelector) 
  const {all_tickets}=useSelector(ticketsSelector)
  const {all_panel}=useSelector(panelSelector)
  // const {current_license} = useSelector(licenseSelector) 


  // console.log(current_license)
  console.log(user)
  const project =   new URLSearchParams(useLocation().search).get(`project`)
  const {id}= useParams()
  const [yearChart, setYearChartData] = useState([])
  const [projectChart, setProjectChartData] = useState([])

  console.log(user?.company?._id)


console.log(projectChart)

  useEffect(()=>{
    dispatch(fetchAllcompanycustomers(user?.company?._id))
    dispatch(fetchAllcompanyProject(user?.company?._id)) 
    dispatch(fetchAllUserTickets(user?._id)) 
    dispatch(fetchAllpanel(user?.company?._id)) 
    dispatch(fetchAllcompanyLicense(user?._id))

 }, [user])




 useEffect(() => {
 dispatch(fetchAllcustomers(user?.company?._id))

  axios.get(keyUri.BACKEND_URI + `/fetch-yearchart/${user?.company?._id}`).then((data=>{
      setYearChartData(data.data)

  })) 


}, [user])


useEffect(() => {
  dispatch(fetchAllproject(user?.company?._id))
 

 axios.get(keyUri.BACKEND_URI + `/fetch-projectchart/${user?.company?._id}`).then((data=>{
  setProjectChartData(data.data)
 
 })) 
 
 }, [user])





  const { Title, Text } = Typography;


  const dollor = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
<path d="M-121.94,9.8c0,1.44-0.03,2.88,0.01,4.31c0.04,1.39-1.16,2.31-2.48,1.85c-1.24-0.43-2.52-0.75-3.78-1.14
	c-0.27-0.08-0.42-0.07-0.6,0.21c-0.75,1.19-2.14,1.72-3.48,1.35c-1.3-0.36-2.25-1.55-2.29-2.96c-0.01-0.39-0.13-0.56-0.5-0.64
	c-0.48-0.11-0.95-0.27-1.42-0.42c-0.77-0.25-1.23-0.85-1.27-1.65c-0.02-0.61-0.03-1.22,0-1.83c0.04-0.81,0.48-1.41,1.27-1.64
	c4.08-1.23,8.17-2.45,12.26-3.65c1.22-0.36,2.26,0.48,2.28,1.75C-121.93,6.82-121.94,8.31-121.94,9.8z M-133.39,13.29
	c-0.12,0.91,0.47,1.73,1.39,2.01c0.89,0.27,2.03-0.21,2.23-0.94C-130.97,14.01-132.17,13.65-133.39,13.29z"fill={color}></path>
<path d="M34.98,9.48c0-2.25,0-4.49,0-6.74c0-0.92,0.24-1.16,1.18-1.16c0.84,0,1.68,0,2.53,0c0.71,0,1,0.29,1,0.99
	c0,4.61,0,9.22,0,13.82c0,0.73-0.29,1.01-1.03,1.01c-0.86,0-1.72,0-2.58,0c-0.84,0-1.1-0.26-1.1-1.09
	C34.98,14.04,34.98,11.76,34.98,9.48z M35.75,2.35c0,2.41,0,4.77,0,7.13c1.08,0,2.12,0,3.16,0c0-2.4,0-4.75,0-7.13
	C37.85,2.35,36.82,2.35,35.75,2.35z M38.95,15.06c0-0.92-0.69-1.62-1.62-1.62c-0.9,0-1.6,0.69-1.61,1.58
	c-0.01,0.93,0.68,1.64,1.59,1.65C38.24,16.67,38.94,15.98,38.95,15.06z"fill={color}></path>
<path d="M40.53,9.45c0-2.26,0-4.53,0-6.79c0-0.8,0.27-1.07,1.07-1.07c0.89,0,1.78-0.01,2.68,0c0.67,0.01,0.97,0.3,0.97,0.97
	c0,4.62,0,9.25,0,13.87c0,0.67-0.3,0.97-0.97,0.97c-0.92,0.01-1.85,0.01-2.77,0c-0.67,0-0.96-0.3-0.97-0.97
	C40.53,14.11,40.53,11.78,40.53,9.45z M41.31,2.35c0,2.41,0,4.77,0,7.13c1.08,0,2.12,0,3.16,0c0-2.4,0-4.75,0-7.13
	C43.4,2.35,42.37,2.35,41.31,2.35z M42.91,13.44c-0.93,0-1.63,0.69-1.63,1.61c0,0.9,0.68,1.61,1.57,1.62
	c0.93,0.01,1.65-0.67,1.65-1.58C44.51,14.15,43.82,13.44,42.91,13.44z"fill={color}></path>
<path d="M46.09,9.5c0-2.28,0-4.56,0-6.84c0-0.8,0.27-1.08,1.06-1.08c0.89,0,1.78-0.01,2.68,0c0.67,0,0.97,0.3,0.97,0.97
	c0,4.62,0,9.25,0,13.87c0,0.69-0.3,0.97-1.01,0.98c-0.89,0-1.78,0-2.68,0c-0.73,0-1.02-0.29-1.02-1.02
	C46.09,14.09,46.09,11.8,46.09,9.5z M50.02,9.5c0-2.41,0-4.77,0-7.13c-1.08,0-2.12,0-3.16,0c0,2.4,0,4.75,0,7.13
	C47.93,9.5,48.96,9.5,50.02,9.5z M50.06,15.04c0-0.92-0.71-1.61-1.63-1.6c-0.89,0.01-1.59,0.7-1.59,1.6c0,0.92,0.69,1.63,1.61,1.63
	C49.36,16.67,50.06,15.97,50.06,15.04z"fill={color}></path>
<path d="M37.32,14.29c0.38-0.01,0.77,0.37,0.78,0.75c0.01,0.38-0.37,0.77-0.75,0.78c-0.38,0.01-0.77-0.37-0.78-0.75
	C36.56,14.69,36.94,14.3,37.32,14.29z"fill={color}></path>
<path d="M42.88,14.29c0.38-0.01,0.77,0.37,0.78,0.75c0.01,0.38-0.37,0.77-0.75,0.78c-0.38,0.01-0.77-0.37-0.78-0.75
	C42.12,14.69,42.5,14.3,42.88,14.29z"fill={color}></path>
<path d="M49.21,15.04c0.01,0.38-0.37,0.77-0.75,0.78c-0.38,0.01-0.77-0.37-0.78-0.75c-0.01-0.38,0.37-0.77,0.75-0.78
	C48.81,14.28,49.2,14.66,49.21,15.04z"fill={color}></path>
<path d="M0.49,15.67c0.06-0.22,0.12-0.44,0.17-0.66c0.53-2.06,2.29-3.48,4.47-3.57c0.69-0.03,1.38,0,2.17,0
	c-1.55,1.59-2.42,3.35-1.93,5.59c-1.32,0-2.66,0.01-3.99-0.01c-0.47-0.01-0.7-0.38-0.89-0.75C0.49,16.07,0.49,15.87,0.49,15.67z"fill={color}></path>
<path d="M12.86,17.04c-1.78,0-3.57,0-5.35,0c-0.9,0-1.26-0.37-1.25-1.26c0.04-2.51,2.15-4.62,4.84-4.77
	c1.27-0.07,2.55-0.05,3.81,0.02c2.47,0.14,4.57,2.4,4.59,4.87c0.01,0.72-0.42,1.13-1.2,1.13C16.49,17.04,14.68,17.04,12.86,17.04z"
	fill={color}></path>
<path d="M9.12,5.76c0-2.06,1.68-3.75,3.75-3.75c2.06,0,3.77,1.69,3.77,3.74c0,2.05-1.69,3.74-3.76,3.75
	C10.82,9.51,9.12,7.82,9.12,5.76z"fill={color}></path>
<path d="M8.59,3.61c-0.8,1.7-0.67,3.33,0.35,4.88C8.08,9.65,6.07,9.81,4.73,8.85C3.27,7.79,2.95,5.79,4.01,4.33
	C5.06,2.88,7.08,2.54,8.59,3.61z"fill={color}></path>
<path d="M-27.78,17.91c0-1.1,0-2.09,0-3.16c-0.47,0-0.93,0-1.38,0c-1.14-0.01-1.78-0.64-1.78-1.78c0-1.97,0-3.93,0-5.9
	c0-1.14,0.64-1.79,1.77-1.79c3.04,0,6.08,0,9.12,0c1.1,0,1.74,0.65,1.75,1.77c0,1.98,0,3.97,0,5.95c0,1.1-0.65,1.75-1.76,1.75
	c-1.07,0-2.15-0.02-3.22,0.02c-0.3,0.01-0.65,0.13-0.89,0.31c-1.06,0.81-2.1,1.66-3.14,2.5C-27.44,17.67-27.57,17.75-27.78,17.91z"
	fill={color}></path>
<path d="M-16.67,11.55c0-0.97,0-1.91,0-2.85c0-1.16,0.01-2.31,0-3.47c-0.01-0.91-0.69-1.59-1.6-1.59c-2.97-0.01-5.95,0-8.92,0
	c-0.18,0-0.36,0-0.54,0c0.07-0.92,0.65-1.52,1.53-1.53c3.17-0.02,6.35-0.02,9.52,0c0.88,0.01,1.54,0.67,1.55,1.55
	c0.02,2.11,0.02,4.23,0,6.35C-15.15,10.85-15.68,11.38-16.67,11.55z"fill={color}></path>
<path d="M-60.45,10.58c0,2.26,0,4.53,0,6.79c0,0.8-0.27,1.07-1.07,1.07c-0.89,0-1.78,0.01-2.68,0c-0.67-0.01-0.97-0.3-0.97-0.97
	c0-4.62,0-9.25,0-13.87c0-0.67,0.3-0.97,0.97-0.97c0.92-0.01,1.85-0.01,2.77,0c0.67,0,0.96,0.3,0.97,0.97
	C-60.44,5.93-60.45,8.25-60.45,10.58z M-61.22,10.53c0-2.41,0-4.77,0-7.13c-1.08,0-2.12,0-3.16,0c0,2.4,0,4.75,0,7.13
	C-63.32,10.53-62.29,10.53-61.22,10.53z M-62.82,14.47c-0.91,0-1.6,0.71-1.6,1.64c0.01,0.89,0.71,1.58,1.61,1.58
	c0.92,0,1.62-0.7,1.62-1.62C-61.19,15.16-61.89,14.47-62.82,14.47z"fill={color}></path>
<path d="M-54.92,9.69c-1.28,0-2.53,0-3.83,0c0-2.34,0-4.67,0-7.04c1.27,0,2.54,0,3.83,0C-54.92,4.99-54.92,7.31-54.92,9.69z"fill={color}></path>
<path d="M-53.23,2.65c1.31,0,2.57,0,3.86,0c0,2.35,0,4.67,0,7.03c-1.28,0-2.56,0-3.86,0C-53.23,7.34-53.23,5.02-53.23,2.65z"fill={color}></path>
<path d="M-58.76,18.4c0-2.35,0-4.67,0-7.02c1.29,0,2.55,0,3.85,0c0,2.34,0,4.66,0,7.02C-56.18,18.4-57.45,18.4-58.76,18.4z"fill={color}></path>
<path d="M-49.36,11.38c0,2.37,0,4.69,0,7.04c-1.29,0-2.56,0-3.86,0c0-2.34,0-4.68,0-7.04C-51.93,11.38-50.67,11.38-49.36,11.38z"fill={color}></path>
<path d="M-62.77,16.85c-0.39,0.01-0.77-0.35-0.78-0.74c-0.01-0.39,0.35-0.77,0.74-0.78c0.39-0.01,0.77,0.35,0.78,0.74
	C-62.02,16.47-62.38,16.84-62.77,16.85z"fill={color}></path>
<path d="M-171.81,16.35c0.11-0.34,0.19-0.7,0.33-1.02c0.63-1.41,1.71-2.27,3.27-2.34c1.1-0.05,2.23-0.07,3.29,0.14
	c1.61,0.32,2.73,1.86,2.8,3.49c0.02,0.61-0.36,1.08-0.97,1.09c-2.57,0.02-5.15,0.01-7.73,0c-0.51,0-0.78-0.36-1-0.76
	C-171.81,16.75-171.81,16.55-171.81,16.35z"fill={color}></path>
<path d="M-162.8,12.95c0.73,0,1.42-0.02,2.1,0.01c0.44,0.02,0.67-0.1,0.59-0.58c-0.01-0.03,0-0.07,0-0.1c0-1.37-0.09-1.27,1.25-1.27
	c0.64,0,1.29,0.01,1.93,0c0.43-0.01,0.6,0.18,0.59,0.6c-0.01,0.33-0.02,0.66,0.01,0.99c0.01,0.12,0.15,0.32,0.25,0.33
	c0.57,0.03,1.15,0.02,1.77,0.02c0-0.24,0-0.42,0-0.6c0-2.53-0.02-5.06,0.01-7.59c0.01-0.53-0.16-0.62-0.65-0.62
	c-3.16,0.02-6.32,0.01-9.47,0.01c-0.66,0-0.66,0-0.66,0.69c0,0.23,0,0.46,0,0.7c-0.61-0.17-1.19-0.32-1.82-0.5
	c0-0.45-0.06-0.96,0.01-1.46c0.12-0.84,0.71-1.28,1.62-1.28c2.99,0,5.98,0,8.98,0c0.76,0,1.52-0.02,2.28,0.01
	c0.29,0.01,0.61,0.06,0.85,0.2c0.18,0.11,0.36,0.4,0.36,0.61c0.02,3.62,0.01,7.24,0.03,10.86c0,0.51-0.32,0.65-0.68,0.76
	c-0.2,0.06-0.43,0.05-0.64,0.05c-2.3,0-4.6-0.01-6.89,0.01c-0.36,0-0.55-0.1-0.74-0.42C-162.03,13.91-162.4,13.48-162.8,12.95z"fill={color}></path>
<path d="M-167,11.88c-1.63-0.01-2.83-1.26-2.82-2.92c0.02-1.55,1.31-2.81,2.87-2.79c1.59,0.02,2.86,1.32,2.85,2.93
	C-164.1,10.67-165.38,11.89-167,11.88z"fill={color}></path>
<path d="M-89.94,9.5c-1.26,0-2.46,0-3.67,0c-1.71,0-2.97,1.24-2.98,2.96c-0.01,1.52,0,3.03,0,4.63c-0.42,0-0.89,0-1.36,0
	c-0.61,0-1.22,0.01-1.83,0c-0.94-0.02-1.45-0.52-1.45-1.45c-0.01-3.77-0.01-7.54,0-11.31c0-0.89,0.57-1.42,1.48-1.43
	c0.15,0,0.3-0.01,0.45,0c0.53,0.03,1.01,0.05,1.36-0.53c0.14-0.23,0.59-0.37,0.9-0.39c0.97-0.05,1.95-0.02,2.93-0.02
	c0.5,0,0.86,0.25,1.17,0.64c0.12,0.15,0.35,0.26,0.55,0.28c0.39,0.04,0.79,0,1.19,0.02c0.66,0.03,1.26,0.53,1.27,1.16
	C-89.92,5.85-89.94,7.64-89.94,9.5z M-95.61,3.86c0.44,0,0.89,0.01,1.33,0c0.35-0.01,0.62-0.15,0.61-0.55
	c-0.01-0.39-0.29-0.49-0.61-0.5c-0.87-0.01-1.74-0.01-2.62,0c-0.35,0-0.62,0.14-0.61,0.55c0.01,0.38,0.29,0.49,0.61,0.5
	C-96.46,3.87-96.04,3.86-95.61,3.86z"fill={color}></path>
<path d="M-91.31,10.53c0.79,0,1.59-0.01,2.38,0c1.1,0.01,1.86,0.78,1.87,1.88c0.01,1.26,0.01,2.51,0,3.77
	c-0.01,1.09-0.78,1.86-1.88,1.86c-1.55,0.01-3.11,0-4.66,0c-1.12,0-1.92-0.76-1.94-1.88c-0.02-1.26-0.03-2.51,0-3.77
	c0.02-1.11,0.83-1.86,1.96-1.86C-92.84,10.53-92.08,10.53-91.31,10.53z M-91.27,13.39c0.58,0,1.16,0.01,1.74,0
	c0.35-0.01,0.63-0.13,0.63-0.54c0-0.39-0.28-0.51-0.6-0.51c-1.19-0.01-2.38-0.01-3.57,0c-0.34,0-0.65,0.12-0.64,0.53
	c0.01,0.41,0.32,0.51,0.66,0.52C-92.46,13.4-91.86,13.39-91.27,13.39z M-91.29,15.19c-0.59,0-1.19-0.01-1.78,0
	c-0.33,0-0.61,0.13-0.63,0.49c-0.02,0.4,0.26,0.55,0.61,0.55c1.19,0.01,2.38,0.01,3.57,0c0.35,0,0.63-0.13,0.62-0.54
	c-0.01-0.42-0.32-0.5-0.66-0.51C-90.14,15.18-90.72,15.19-91.29,15.19z"fill={color}></path>
</svg>
  ];
  const Profile = [
    <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
    key={0}
  >
  <path d="M11.6 11.125H8.4c-.442 0-.8.364-.8.813v3.25c0 .448.358.812.8.812h3.2c.442 0 .8-.364.8-.813v-3.25a.806.806 0 0 0-.8-.812ZM6.8 3.812A.806.806 0 0 0 6 3H2.8c-.442 0-.8.364-.8.813v3.25c0 .448.358.812.8.812h2.393l1.829 3.251a1.59 1.59 0 0 1 1.378-.813h.007L6.8 7.455V6.25h5.6V4.625H6.8v-.813ZM17.2 3H14c-.442 0-.8.364-.8.813v3.25c0 .448.358.812.8.812h3.2c.442 0 .8-.364.8-.813v-3.25A.806.806 0 0 0 17.2 3Z"fill={color}></path>
  </svg>
  ];
  const heart = [
    <svg
      width="22"
      height="22"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.17157 5.17157C4.73367 3.60948 7.26633 3.60948 8.82843 5.17157L10 6.34315L11.1716 5.17157C12.7337 3.60948 15.2663 3.60948 16.8284 5.17157C18.3905 6.73367 18.3905 9.26633 16.8284 10.8284L10 17.6569L3.17157 10.8284C1.60948 9.26633 1.60948 6.73367 3.17157 5.17157Z"
        fill="#fff"
      ></path>
    </svg>,
  ];
  const cart = [
    <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
    key={0}
  >
<path d="M-88.9,9.8c0,1.44-0.03,2.88,0.01,4.31c0.04,1.39-1.16,2.31-2.48,1.85c-1.24-0.43-2.52-0.75-3.78-1.14
c-0.27-0.08-0.42-0.07-0.6,0.21c-0.75,1.19-2.14,1.72-3.48,1.35c-1.3-0.36-2.25-1.55-2.29-2.96c-0.01-0.39-0.13-0.56-0.5-0.64
c-0.48-0.11-0.95-0.27-1.42-0.42c-0.77-0.25-1.23-0.85-1.27-1.65c-0.02-0.61-0.03-1.22,0-1.83c0.04-0.81,0.48-1.41,1.27-1.64
c4.08-1.23,8.17-2.45,12.26-3.65c1.22-0.36,2.26,0.48,2.28,1.75C-88.89,6.82-88.9,8.31-88.9,9.8z M-100.35,13.29
c-0.12,0.91,0.47,1.73,1.39,2.01c0.89,0.27,2.03-0.21,2.23-0.94C-97.93,14.01-99.14,13.65-100.35,13.29z"fill={color}></path>
<path d="M68.02,9.48c0-2.25,0-4.49,0-6.74c0-0.92,0.24-1.16,1.18-1.16c0.84,0,1.68,0,2.53,0c0.71,0,1,0.29,1,0.99
c0,4.61,0,9.22,0,13.82c0,0.73-0.29,1.01-1.03,1.01c-0.86,0-1.72,0-2.58,0c-0.84,0-1.1-0.26-1.1-1.09
C68.02,14.04,68.02,11.76,68.02,9.48z M68.79,2.35c0,2.41,0,4.77,0,7.13c1.08,0,2.12,0,3.16,0c0-2.4,0-4.75,0-7.13
C70.89,2.35,69.86,2.35,68.79,2.35z M71.98,15.06c0-0.92-0.69-1.62-1.62-1.62c-0.9,0-1.6,0.69-1.61,1.58
c-0.01,0.93,0.68,1.64,1.59,1.65C71.27,16.67,71.98,15.98,71.98,15.06z"fill={color}></path>
<path d="M73.57,9.45c0-2.26,0-4.53,0-6.79c0-0.8,0.27-1.07,1.07-1.07c0.89,0,1.78-0.01,2.68,0c0.67,0.01,0.97,0.3,0.97,0.97
c0,4.62,0,9.25,0,13.87c0,0.67-0.3,0.97-0.97,0.97c-0.92,0.01-1.85,0.01-2.77,0c-0.67,0-0.96-0.3-0.97-0.97
C73.57,14.11,73.57,11.78,73.57,9.45z M74.35,2.35c0,2.41,0,4.77,0,7.13c1.08,0,2.12,0,3.16,0c0-2.4,0-4.75,0-7.13
C76.44,2.35,75.41,2.35,74.35,2.35z M75.94,13.44c-0.93,0-1.63,0.69-1.63,1.61c0,0.9,0.68,1.61,1.57,1.62
c0.93,0.01,1.65-0.67,1.65-1.58C77.55,14.15,76.86,13.44,75.94,13.44z"fill={color}></path>
<path d="M79.13,9.5c0-2.28,0-4.56,0-6.84c0-0.8,0.27-1.08,1.06-1.08c0.89,0,1.78-0.01,2.68,0c0.67,0,0.97,0.3,0.97,0.97
c0,4.62,0,9.25,0,13.87c0,0.69-0.3,0.97-1.01,0.98c-0.89,0-1.78,0-2.68,0c-0.73,0-1.02-0.29-1.02-1.02
C79.12,14.09,79.13,11.8,79.13,9.5z M83.06,9.5c0-2.41,0-4.77,0-7.13c-1.08,0-2.12,0-3.16,0c0,2.4,0,4.75,0,7.13
C80.97,9.5,82,9.5,83.06,9.5z M83.09,15.04c0-0.92-0.71-1.61-1.63-1.6c-0.89,0.01-1.59,0.7-1.59,1.6c0,0.92,0.69,1.63,1.61,1.63
C82.4,16.67,83.1,15.97,83.09,15.04z"fill={color}></path>
<path d="M70.36,14.29c0.38-0.01,0.77,0.37,0.78,0.75c0.01,0.38-0.37,0.77-0.75,0.78c-0.38,0.01-0.77-0.37-0.78-0.75
C69.6,14.69,69.98,14.3,70.36,14.29z"fill={color}></path>
<path d="M75.91,14.29c0.38-0.01,0.77,0.37,0.78,0.75c0.01,0.38-0.37,0.77-0.75,0.78c-0.38,0.01-0.77-0.37-0.78-0.75
C75.16,14.69,75.54,14.3,75.91,14.29z"fill={color}></path>
<path d="M82.24,15.04c0.01,0.38-0.37,0.77-0.75,0.78c-0.38,0.01-0.77-0.37-0.78-0.75c-0.01-0.38,0.37-0.77,0.75-0.78
C81.85,14.28,82.24,14.66,82.24,15.04z"fill={color}></path>
<path d="M33.53,15.67c0.06-0.22,0.12-0.44,0.17-0.66c0.53-2.06,2.29-3.48,4.47-3.57c0.69-0.03,1.38,0,2.17,0
c-1.55,1.59-2.42,3.35-1.93,5.59c-1.32,0-2.66,0.01-3.99-0.01c-0.47-0.01-0.7-0.38-0.89-0.75C33.53,16.07,33.53,15.87,33.53,15.67z"
fill={color}></path>
<path d="M45.9,17.04c-1.78,0-3.57,0-5.35,0c-0.9,0-1.26-0.37-1.25-1.26c0.04-2.51,2.15-4.62,4.84-4.77
c1.27-0.07,2.55-0.05,3.81,0.02c2.47,0.14,4.57,2.4,4.59,4.87c0.01,0.72-0.42,1.13-1.2,1.13C49.53,17.04,47.71,17.04,45.9,17.04z"fill={color}></path>
<path d="M42.16,5.76c0-2.06,1.68-3.75,3.75-3.75c2.06,0,3.77,1.69,3.77,3.74c0,2.05-1.69,3.74-3.76,3.75
C43.85,9.51,42.16,7.82,42.16,5.76z"fill={color}></path>
<path d="M41.63,3.61c-0.8,1.7-0.67,3.33,0.35,4.88c-0.86,1.15-2.88,1.32-4.21,0.36c-1.46-1.06-1.78-3.06-0.72-4.52
C38.1,2.88,40.11,2.54,41.63,3.61z"fill={color}></path>
<path d="M5.25,17.91c0-1.1,0-2.09,0-3.16c-0.47,0-0.93,0-1.38,0c-1.14-0.01-1.78-0.64-1.78-1.78c0-1.97,0-3.93,0-5.9
c0-1.14,0.64-1.79,1.77-1.79c3.04,0,6.08,0,9.12,0c1.1,0,1.74,0.65,1.75,1.77c0,1.98,0,3.97,0,5.95c0,1.1-0.65,1.75-1.76,1.75
c-1.07,0-2.15-0.02-3.22,0.02c-0.3,0.01-0.65,0.13-0.89,0.31c-1.06,0.81-2.1,1.66-3.14,2.5C5.6,17.67,5.46,17.75,5.25,17.91z"fill={color}></path>
<path d="M16.37,11.55c0-0.97,0-1.91,0-2.85c0-1.16,0.01-2.31,0-3.47c-0.01-0.91-0.69-1.59-1.6-1.59c-2.97-0.01-5.95,0-8.92,0
c-0.18,0-0.36,0-0.54,0c0.07-0.92,0.65-1.52,1.53-1.53c3.17-0.02,6.35-0.02,9.52,0c0.88,0.01,1.54,0.67,1.55,1.55
c0.02,2.11,0.02,4.23,0,6.35C17.89,10.85,17.35,11.38,16.37,11.55z"fill={color}></path>
<path d="M-27.41,10.58c0,2.26,0,4.53,0,6.79c0,0.8-0.27,1.07-1.07,1.07c-0.89,0-1.78,0.01-2.68,0c-0.67-0.01-0.97-0.3-0.97-0.97
c0-4.62,0-9.25,0-13.87c0-0.67,0.3-0.97,0.97-0.97c0.92-0.01,1.85-0.01,2.77,0c0.67,0,0.96,0.3,0.97,0.97
C-27.41,5.93-27.41,8.25-27.41,10.58z M-28.18,10.53c0-2.41,0-4.77,0-7.13c-1.08,0-2.12,0-3.16,0c0,2.4,0,4.75,0,7.13
C-30.28,10.53-29.25,10.53-28.18,10.53z M-29.78,14.47c-0.91,0-1.6,0.71-1.6,1.64c0.01,0.89,0.71,1.58,1.61,1.58
c0.92,0,1.62-0.7,1.62-1.62C-28.15,15.16-28.86,14.47-29.78,14.47z"fill={color}></path>
<path d="M-21.88,9.69c-1.28,0-2.53,0-3.83,0c0-2.34,0-4.67,0-7.04c1.27,0,2.54,0,3.83,0C-21.88,4.99-21.88,7.31-21.88,9.69z"fill={color}></path>
<path d="M-20.19,2.65c1.31,0,2.57,0,3.86,0c0,2.35,0,4.67,0,7.03c-1.28,0-2.56,0-3.86,0C-20.19,7.34-20.19,5.02-20.19,2.65z"fill={color}></path>
<path d="M-25.73,18.4c0-2.35,0-4.67,0-7.02c1.29,0,2.55,0,3.85,0c0,2.34,0,4.66,0,7.02C-23.15,18.4-24.41,18.4-25.73,18.4z"fill={color}></path>
<path d="M-16.33,11.38c0,2.37,0,4.69,0,7.04c-1.29,0-2.56,0-3.86,0c0-2.34,0-4.68,0-7.04C-18.9,11.38-17.63,11.38-16.33,11.38z"fill={color}></path>
<path d="M-29.73,16.85c-0.39,0.01-0.77-0.35-0.78-0.74c-0.01-0.39,0.35-0.77,0.74-0.78c0.39-0.01,0.77,0.35,0.78,0.74
C-28.99,16.47-29.34,16.84-29.73,16.85z"fill={color}></path>
<path d="M-138.77,16.35c0.11-0.34,0.19-0.7,0.33-1.02c0.63-1.41,1.71-2.27,3.27-2.34c1.1-0.05,2.23-0.07,3.29,0.14
c1.61,0.32,2.73,1.86,2.8,3.49c0.02,0.61-0.36,1.08-0.97,1.09c-2.57,0.02-5.15,0.01-7.73,0c-0.51,0-0.78-0.36-1-0.76
C-138.77,16.75-138.77,16.55-138.77,16.35z"fill={color}></path>
<path d="M-129.76,12.95c0.73,0,1.42-0.02,2.1,0.01c0.44,0.02,0.67-0.1,0.59-0.58c-0.01-0.03,0-0.07,0-0.1
c0-1.37-0.09-1.27,1.25-1.27c0.64,0,1.29,0.01,1.93,0c0.43-0.01,0.6,0.18,0.59,0.6c-0.01,0.33-0.02,0.66,0.01,0.99
c0.01,0.12,0.15,0.32,0.25,0.33c0.57,0.03,1.15,0.02,1.77,0.02c0-0.24,0-0.42,0-0.6c0-2.53-0.02-5.06,0.01-7.59
c0.01-0.53-0.16-0.62-0.65-0.62c-3.16,0.02-6.32,0.01-9.47,0.01c-0.66,0-0.66,0-0.66,0.69c0,0.23,0,0.46,0,0.7
c-0.61-0.17-1.19-0.32-1.82-0.5c0-0.45-0.06-0.96,0.01-1.46c0.12-0.84,0.71-1.28,1.62-1.28c2.99,0,5.98,0,8.98,0
c0.76,0,1.52-0.02,2.28,0.01c0.29,0.01,0.61,0.06,0.85,0.2c0.18,0.11,0.36,0.4,0.36,0.61c0.02,3.62,0.01,7.24,0.03,10.86
c0,0.51-0.32,0.65-0.68,0.76c-0.2,0.06-0.43,0.05-0.64,0.05c-2.3,0-4.6-0.01-6.89,0.01c-0.36,0-0.55-0.1-0.74-0.42
C-128.99,13.91-129.36,13.48-129.76,12.95z"fill={color}></path>
<path d="M-133.96,11.88c-1.63-0.01-2.83-1.26-2.82-2.92c0.02-1.55,1.31-2.81,2.87-2.79c1.59,0.02,2.86,1.32,2.85,2.93
C-131.06,10.67-132.34,11.89-133.96,11.88z"fill={color}></path>
<path d="M-56.9,9.5c-1.26,0-2.46,0-3.67,0c-1.71,0-2.97,1.24-2.98,2.96c-0.01,1.52,0,3.03,0,4.63c-0.42,0-0.89,0-1.36,0
c-0.61,0-1.22,0.01-1.83,0c-0.94-0.02-1.45-0.52-1.45-1.45c-0.01-3.77-0.01-7.54,0-11.31c0-0.89,0.57-1.42,1.48-1.43
c0.15,0,0.3-0.01,0.45,0c0.53,0.03,1.01,0.05,1.36-0.53c0.14-0.23,0.59-0.37,0.9-0.39c0.97-0.05,1.95-0.02,2.93-0.02
c0.5,0,0.86,0.25,1.17,0.64c0.12,0.15,0.35,0.26,0.55,0.28c0.39,0.04,0.79,0,1.19,0.02c0.66,0.03,1.26,0.53,1.27,1.16
C-56.88,5.85-56.9,7.64-56.9,9.5z M-62.57,3.86c0.44,0,0.89,0.01,1.33,0c0.35-0.01,0.62-0.15,0.61-0.55
c-0.01-0.39-0.29-0.49-0.61-0.5c-0.87-0.01-1.74-0.01-2.62,0c-0.35,0-0.62,0.14-0.61,0.55c0.01,0.38,0.29,0.49,0.61,0.5
C-63.43,3.87-63,3.86-62.57,3.86z"fill={color}></path>
<path d="M-58.28,10.53c0.79,0,1.59-0.01,2.38,0c1.1,0.01,1.86,0.78,1.87,1.88c0.01,1.26,0.01,2.51,0,3.77
c-0.01,1.09-0.78,1.86-1.88,1.86c-1.55,0.01-3.11,0-4.66,0c-1.12,0-1.92-0.76-1.94-1.88c-0.02-1.26-0.03-2.51,0-3.77
c0.02-1.11,0.83-1.86,1.96-1.86C-59.8,10.53-59.04,10.53-58.28,10.53z M-58.23,13.39c0.58,0,1.16,0.01,1.74,0
c0.35-0.01,0.63-0.13,0.63-0.54c0-0.39-0.28-0.51-0.6-0.51c-1.19-0.01-2.38-0.01-3.57,0c-0.34,0-0.65,0.12-0.64,0.53
c0.01,0.41,0.32,0.51,0.66,0.52C-59.42,13.4-58.83,13.39-58.23,13.39z M-58.26,15.19c-0.59,0-1.19-0.01-1.78,0
c-0.33,0-0.61,0.13-0.63,0.49c-0.02,0.4,0.26,0.55,0.61,0.55c1.19,0.01,2.38,0.01,3.57,0c0.35,0,0.63-0.13,0.62-0.54
c-0.01-0.42-0.32-0.5-0.66-0.51C-57.1,15.18-57.68,15.19-58.26,15.19z"fill={color}></path>
</svg>
  ];
  const count = [
    {
      today: "Total Customers",
      title: [all_customers?.length],
      // persent: "+30%",
      icon: dollor,
      bnb: "bnb2",
      link: '/auth/customers'
      
    },
    {
      today: "Total Projects",
      title: [all_project?.length],
      // persent: "+20%",
      icon: Profile,
      bnb: "bnb2",
      link: '/auth/projects'
    },
    {
      today: "Total Panels",
      title: [all_panel?.length],
      // persent: "-20%",
      icon: heart,
      bnb: "redtext",
      // link:'/auth/panel/:id'
    },
    
    {
      today: "Tickets",
      title: [all_tickets?.length],
      // persent: "10%",
      icon: cart,
      bnb: "bnb2",
      link: '/auth/ticket'
    },

  ];

 

  return (
    <>
      <div className="layout-content">
        <Row className="rowgap-vbox" gutter={[24, 0]}>
          {count.map((c, index) => (
            <Col
              key={index}
              xs={24}
              sm={24}
              md={12}
              lg={6}
              xl={6}
              className="mb-24"
            >
              <Link to ={c.link}>
              <Card bordered={false} className="criclebox ">
                <div className="number">
                  <Row align="middle" gutter={[24, 0]}>
                    <Col xs={18}>
                      <span>{c.today}</span>
                      <Title level={3}>
                        {c.title} <small className={c.bnb}>{c.persent}</small>
                      </Title>
                    </Col>
                    <Col xs={6}>
                      <div className="icon-box" style={{fill:"white"}}>{c.icon}</div>
                    </Col>
                  </Row>
                </div>
              </Card>
              </Link>
            </Col>
          ))}
        </Row>

       
      </div>


<div style={{display:'flex' , marginTop:'60px' }}>


    <div  style={{width:'250rem'}}>
    <div className="mr-2 w-100  graph">
    <h3>Customers Details</h3>
    <YearCustomerGraph data={yearChart} />
    </div>
    <div  style={{  marginLeft:'10px', display:'flex', justify:'end' }}>
    <ExportYearExcel data={yearChart}/>
    </div>
    </div>





    <div style={{width:'250rem'}}>
    <div className="mr-2 w-100  graph">
    <h3>Projects Details</h3>
    <YearProjectGraph data={projectChart} />
    </div>
    <div  style={{  marginLeft:'10px', display:'flex', justify:'end' }}>
    <ExportProjectExcel data={projectChart}/>
    </div>
    </div>


    </div>




















    </>
  );
}

export default Home;
