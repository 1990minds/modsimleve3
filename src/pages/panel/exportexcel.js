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
   

 
    return (

       
        <ExcelFile filename="Panel" element={<Button icon={<DownloadOutlined  style={{transform:"translateY(2px)",fontWeight: "700",  fontSize: '20px' }}/>} className="mx-2" type="primary" style={{fontSize: '14px'}}>Download List</Button>}>
                
        <ExcelSheet data={data} name="Panel" >


         {/* <ExcelColumn label="sl_no" value={col => col?.sl_no ? col.sl_no: "null"}/>  */}
            <ExcelColumn label="panel_name" value={col => col?.panel_name ? col.panel_name: "null"}/> 
            <ExcelColumn label="panel_id" value={col => col?.panel_id ? col.panel_id: "null"}/> 
            <ExcelColumn label="panel_category" value={col => col?.panel_category ? col.panel_category: "null"}/> 
            <ExcelColumn label="rated_voltage" value={col => col?.rated_voltage ? col.rated_voltage: "null"}/> 
            <ExcelColumn label="ambient_temperature" value={col => col?.ambient_temperature ? col.ambient_temperature: "null"}/> 
            <ExcelColumn label="busbar_material" value={col => col?.busbar_material ? col.busbar_material: "null"}/> 
            
        </ExcelSheet>
    </ExcelFile>
    )
}


