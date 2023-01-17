import React, {useState, useEffect} from 'react';
import { Table, Button } from "antd";
import { Excel } from "antd-table-saveas-excel";
import _ from 'lodash'
import styled from 'styled-components'
import moment from 'moment'
// import "./vars.less";
import 'antd/dist/antd.css';

// layout-header-background: red;


export default function Anttable({data, panel}) {
  

  console.log(panel)

  console.log(data)

const [page, setPage] = useState(1);
const [bom, setBom] = useState([])
const [total, setTotal] = useState(null)
const [current_panel] = useState(null); 

console.log(bom)


console.log(total)

const columns = [

{
  title:  `${panel?.company?.company_name}`,
  width: 250,
  fixed: "center",
  children: [


{
  title: "Bill of Material",  
  width: 250,
  fixed: "center",
  children: [
 

    {    
        title: "Customer Name",
        width: 100,
        fixed: "center", 
        children: [
      
        {
      
        title: "Project Name",
        dataIndex: 'project_name',
        key:'project_name',         
        children: [  
        {

        title: "Panel Name",
        width: 100,
        fixed: "left",    
        children: [

        {
        title: "SI No." ,
        width: 50,
        dataIndex: 'sl_no',
        key: 'sl_no',
        // render:(t, k, i)=>{
        // return <p class="m-0 " >{(page - 1) * 40 + (i+1)}</p>
        // }                
        },
        

        {
        title: "CatalogueNo.",
        width: 130,
        fixed: "left",  
        key:'Ordering_Code',
        dataIndex:'Ordering_Code',
        // render:(record)=>{
        //   return<p class="m-0 ">{record.Ordering_Code}</p>
        // }
        }
        
        ]
        },]

        },]


        },


        {
          title :`${panel?.customers?.customers_name}`,
          width: 100,
          fixed: "center",


          
  
        children: [

          {
      
            title: `${panel?.project?.project_name}`,
            width: 100,
            fixed: "center",
      
          
            children: [

            {
            title: `${panel?.panel_name}`,
            width: 100,
            fixed: "center",
      


    
            children: [
              {
              title: "Catalogue Description",
              width: 140,
              fixed: "center", 
              key:'Item_Description',
              dataIndex:'Item_Description'
                        
              },

              {
              title: "Nature of component.",
              width: 140,
              fixed: "center",
              key:'Nature_of_Component',
              dataIndex:'Nature_of_Component' ,
              // __style__: {
              //   color: '1890FF',
              //   h: 'center',
              //   v: 'center',
              //   // 单位是CM
              //   height: 2,
              // },

              }        
              
              ]
              },]

              },]

              },


  
              {
                title: "",
                width: 100,
                fixed: "center",

              children: [

              {
            
              title: "project ID",
              width: 100,
              fixed: "center",

            
              children: [

              {
              title: "Panel ID",
              width: 100,
              fixed: "center",



            children: [

              {
                title: "Compartment Width",
                width: 120,
                fixed: "center",
                key:'Width',
                dataIndex:'Width'
                  // render:(record)=>{
                  //   return<p class="m-0 ">{record.Width ? (record.code ==='TRI' || record.code=='SAK' || record.code == 'SAC') ? 'NA':record.Width : 'NA'}</p>
                  // }   , 
                
                },]  
        },]
        },  
        ]
        },

        {
  

          title: "",
          width: 100,
          fixed: "center",          
          children: [       
            {
        
          title: `${panel?.project?.project_id}`,
          width: 100,
          fixed: "center",           
          children: [
        
              {
            
            title: `${panel?.panel_id}`,
            width: 100,
            fixed: "center",
                children: [

                {
                title: "Compartment Height",
                width: 120,
                fixed: "center",  
                key:'Height',
                dataIndex:'Height'


     
          },]
          },]

          },

          ]
          },

          {
            title: "Date Created",
            width: 100,
            fixed: "center",
 
       
        children: [

          {
   
            title: "Project Serial Id",
            width: 100,
            fixed: "center",
    
       
       
         children: [
       
           {
             title: "Panel Quantity",
              width: 100,
              fixed: "center",
    

      children: [

        {
              title: "Quantity",
              width: 100,
              fixed: "center",
              key:'Qty',
              dataIndex:'Qty'
      
            },
            
              {
                title: "UOM",
                width: 100,
                fixed: "center",
                key:'UOM',
                dataIndex:'UOM'
        
                }  
            
            ]
            },]

            },

            ]
            },
            {
              title: `${moment().format('DD/MM/YYYY')}`,
              width: 50,
              fixed: "center",

   
       
        children: [
       
          {
          title:  `${panel?.project?.project_serialID}`,
          width: 100,
          fixed: "center",
      
       
         children: [
       
           {
            title: `${panel?.panel_quntity}`,
            width: 50,
            fixed: "center",
 

          children: [
            {
            title: "Total Quantity",
            width: 100,
            fixed: "center",
            key:'total_quantity',
            dataIndex:'total_quantity',
          
    
          }

          ]
      },]

      },

      ]
      },

          
      ],      

      },    
      ],  

      }


      ];




 
  const datanew = data.map((item, i)=>{
    return {
                 sl_no: i+1,
                 Ordering_Code:item.Ordering_Code,
                 Item_Description:item.Item_Description,
                 Nature_of_Component:item.Nature_of_Component,
                 Width:item.Width,
                 Height:item.Height,
                 Qty:item.Qty,
                 UOM:item.UOM,
                 total_quantity:item?.Qty*panel?.panel_quntity
                
    }
  });

      return (
      <div>
      <p
        style={{
          marginBottom: 20,      
          
        }}
  
        onClick={() => {
          const excel = new Excel();
          
          excel
           
            .addSheet('test')
            .addColumns(columns)
            .addDataSource(datanew)
            .saveAs(`${panel?.project?.project_id.concat(panel?.project?.project_serialID).concat(panel?.panel_id)}.xlsx`)
            excel.setTHeadStyle({
            background: '85bdf0',
            });
           
        }}





      >

BOM
      
      </p>

      {/* <Header style={{backgroundColor: "red"}}>...</Header> */}
      <TableWrap>
      {/* <Table  pagination={false} bordered  columns={columns}  dataSource={datanew}  current_panel={current_panel} /> */}
      </TableWrap>
    </div>
  );
};

const TableWrap = styled.div`

.ant-table-tbody > tr > td, .ant-table-thead > tr > th
{
    padding:4px; 
    
       
}




thead[class*="ant-table-thead"] th{
    background-color:blue !important;
    color: white;
    font-weight: bold;
    border-color: #000;
    text-align: center;
  }


tr:nth-child(6){ 
    background: #f1e6ff;
}


tr:nth-child(odd){
    background: white;
}



.table_btn
{
    margin:0 !important;
}


.ant-btn
{
    margin:0;
}

`

  

