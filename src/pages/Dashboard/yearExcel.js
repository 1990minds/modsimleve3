import { Button } from 'antd';
import React from 'react'
import ReactExport from "react-export-excel";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;
export default function ExportExcel({data}) {

 
    return (
        <ExcelFile element={<div style={{paddingLeft:'250px'}}><Button className="ml-40" type="primary"> Export </Button></div>}>
        <ExcelSheet data={data} name="Total Year Customers" >          
        <ExcelColumn label="Month" value="_id"/>
        <ExcelColumn label="customers" value="customers"/>
        </ExcelSheet>
   
        </ExcelFile>
    )
}
