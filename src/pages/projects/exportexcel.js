import { Button } from 'antd';
import React from 'react'
import ReactExport from "react-export-excel";
import { DownloadOutlined  } from '@ant-design/icons';
import moment from 'moment'
import { render } from '@testing-library/react';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;


export default function ExportExcel({data}) {
    console.log(data);

 
    return (

       
        <ExcelFile filename="Project" element={<Button icon={<DownloadOutlined  style={{transform:"translateY(2px)",fontWeight: "700",  fontSize: '20px' }}/>} className="mx-2" type="primary" style={{fontSize: '14px'}}>Download</Button>}>
                
        <ExcelSheet data={data} name="Project" >


         {/* <ExcelColumn label="sl_no" value={col => col?.sl_no ? col.sl_no: "null"}/>  */}
            <ExcelColumn label="project_location" value={col => col?.project_location ? col.project_location: "null"}/> 
            <ExcelColumn label="project_id" value={col => col?.project_id ? col.project_id: "null"}/> 
            <ExcelColumn label="phone_number" value={col => col?.phone_number ? col.phone_number: "null"}/> 
            <ExcelColumn label="project_name" value={col => col?.project_name ? col.project_name: "null"}/> 
            <ExcelColumn label="email" value={col => col?.email ? col.email: "null"}/> 
            <ExcelColumn label="project_coordiantor" value={col => col?.project_coordiantor ? col.project_coordiantor: "null"}/> 
            <ExcelColumn label="customer_name" value={col => col?.customers?.customers_name ? col.customers?.customers_name: "null"}/> 
        </ExcelSheet>
    </ExcelFile>
    )
}


