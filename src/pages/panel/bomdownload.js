
import React, {useState, useEffect} from 'react';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import styled from 'styled-components'
import { Button } from 'antd';
import { DownloadOutlined  } from '@ant-design/icons';
import _ from 'lodash'
import moment from 'moment'

export default function ExportExcel({data, panel}) {

    const [bom, setBom] = useState([])
    const [total, setTotal] = useState(null)
    

        console.log({panel})
        console.log({data});

        useEffect(() => {

        setBom(data) 

        const total = data.reduce((previousValue, currentValue) => {
            return previousValue + currentValue.Qty * 200
            },0);
        setTotal(total)
        }, [data])


            return (
            <TableWrap>

                <div className=' flex  justify-end mx-24'> 
                <Buttonwrap>
                <ReactHTMLTableToExcel
                 id="test-table-xls-button"
                 className=""
                 table="table-to-xls"
                 filename={panel?.project?.project_id.concat(panel?.project?.project_serialID).concat(panel?.panel_id)}
                 sheet="tablexls" 
                 buttonText="Download"  />
                    
                    </Buttonwrap>
                </div>
                        <div className='tableview pb-5 mt-4 w-full flex justify-center' 
                         style={{overflowY:'auto', height:'60vh', overflowX:'hidden',display:'none' }}> 

                        <table id="table-to-xls" style={{width:'90%'}}>
                            <tr className=" text-2xl">
                                <th colspan="9">{panel?.company?.company_name}</th>
                            </tr>
                            <tr className=" text-lg">
                                <th colspan="9">Bill of material</th>
                            </tr>
                            <tr>
                                <th colspan="2">Customer Name</th>
                                <td colspan="2" >{panel?.customers?.customers_name}</td>
                                <th colspan="2" rowSpan="5"></th>
                                <th colspan="2">Date Created </th>
                                <td >{moment().format('DD/MM/YYYY')}</td>
                            </tr>
                            <tr>
                                <th colspan="2">Project Name</th>
                                <td colspan="2">{panel?.project?.project_name}</td>
                                {/* <th colspan="2">Rev No.</th>
                                <td colspan="1"></td> */}

                                <th colspan="2">Panel Type</th>
                                <td colspan="1">{panel?.panel_type}</td> 


                             
                            </tr>
                            <tr>
                                <th colspan="2">Project ID</th>
                                <td colspan="2">{panel?.project?.project_id}</td>
                                {/* <th colspan="2">Panel Quantity</th>
                                <td colspan="1">{panel?.panel_quntity}</td> */}
                                 <th colspan="2">Panel Quantity</th>
                                <td colspan="1">{panel?.panel_quntity}</td>
                          
                            </tr>

                            <tr>
                                <th colspan="2">Project serialID</th>
                                <td colspan="2">{panel?.project?.project_serialID}</td>
                                {/* <th colspan="2">Panel Quantity</th>
                                <td colspan="1">{panel?.panel_quntity}</td> */}
                                
                            </tr>
                            <tr>
                                <th colspan="2">Panel Name</th>
                                <td colspan="2">{panel?.panel_name}</td>
                            </tr>
                         

                            <tr>
                                <th>Sl.No</th>
                                <th>CatalogueNo</th>
                                <th>Catalogue Description</th>
                                <th>Nature of component</th>
                                <th>Compartment Width</th>
                                <th>Compartment Height</th>
                                <th>Quantity</th>
                                <th>UOM</th>
                                <th>Total Quantity</th>
                            </tr>
                                {
                                  bom.map((item, i)=>{
                                        return <tr key={i}>
                                            <td>{i+1}</td>
                                            <td className='text'>{item.Ordering_Code}</td>
                                            <td className='text'>{item.Item_Description}</td>
                                            <td className='text'>{item.Nature_of_Component}</td>
                                            <td>{item.Width ? (item.code ==='TRI' || item.code=='SAK' || item.code == 'SAC') ? 'NA':item.Width : 'NA'}</td>
                                            <td>{item.Height ? (item.code ==='TRI' || item.code=='SAK' || item.code == 'SAC') ? 'NA':item.Height : 'NA'}</td>
                                            <td>{item.Qty}</td>
                                            <td className='text'>{item.UOM}</td>
                                            <td>{item.Qty*panel?.panel_quntity}</td>
                                        </tr>
                                    })
                                }
                          
                        </table>
                        </div>
 
            </TableWrap>
        );
}



const TableWrap = styled.div`

/* height: 70vh ; */

table, th, td {
  /* border: 1px solid black; */
  border-collapse: collapse;
  table {border: none;}
}
th,td {
  text-align: center;
  text-transform: capitalize;
}

.text{
    text-align: left;
    padding: 0 10px;
}

.test-table-xls-button{
    background-color: transparent !important;
    border: 0px !important;
    transform: translateY(7px) !important;
}

`
const Buttonwrap = styled.div`
#test-table-xls-button{
    background-color: transparent !important;
    border: 0px !important;
    cursor: pointer;
}
`