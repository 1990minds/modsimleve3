import { Button } from 'antd';
import React from 'react'
import ReactExport from "react-export-excel";
import { DownloadOutlined  } from '@ant-design/icons';


const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;


export default function ExportExcel({data}) {
   

 
    return (

       
        <ExcelFile filename="Customer" element={ 
        <Button icon={<DownloadOutlined  style={{transform:"translateY(2px)",fontWeight: "700",  fontSize: '20px' }}/>} 
        className="mx-2" type="primary" style={{fontSize: '14px'}}>Download
        </Button>
    }>
                
        <ExcelSheet data={data} name="Customer" >


            <ExcelColumn label="customers_name" value={col => col?.customers_name ? col.customers_name: "null"}/> 
            <ExcelColumn label="phone_number" value={col => col?.phone_number ? col.phone_number: "null"}/> 
            <ExcelColumn label="address" value={col => col?.address ? col.address: "null"}/> 
            <ExcelColumn label="email" value={col => col?.email ? col.email: "null"}/> 
    
        </ExcelSheet>
    </ExcelFile>
    )
}


