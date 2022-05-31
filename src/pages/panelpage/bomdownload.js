
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

    // console.log({data});
    // console.log({panel});
    // console.log({bom});
    

    useEffect(() => {
         let bomArray = _.flatten(data?.map(item =>{
            return item.data
        }))
        setBom(bomArray) 

        const total = bomArray.reduce((previousValue, currentValue) => {
            return previousValue + currentValue.Qty * 200
            },0);
        setTotal(total)
    }, [data])


        return (
            <TableWrap>

                <div className=' flex  justify-end mx-24'> 
                <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className=""
                    table="table-to-xls"
                    filename="BOM"
                    sheet="tablexls" 
                    buttonText={<Button type="primary ">Download BOM</Button>} 
                    />
                </div>
                        <div className='tableview pb-5 mt-4 w-full flex justify-center' 
                              style={{overflowY:'auto', height:'60vh', overflowX:'hidden' }}> 

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
                                 <th colspan="2">Panel Quantity</th>
                                <td colspan="1">{panel?.panel_quntity}</td>
                            </tr>
                            <tr>
                                <th colspan="2">Project ID</th>
                                <td colspan="2"></td>
                                {/* <th colspan="2">Panel Quantity</th>
                                <td colspan="1">{panel?.panel_quntity}</td> */}
                                <th colspan="3" rowSpan="3"></th>
                            </tr>
                            <tr>
                                <th colspan="2">Panel Name</th>
                                <td colspan="2">{panel?.panel_name}</td>
                            </tr>
                            <tr>
                                <th colspan="2">Panel Type</th>
                                <td colspan="2">{panel?.panel_type}</td>
                            </tr>

                            <tr>
                                <th>Sl.No</th>
                                <th>Catalogue No.</th>
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
                                            <td className='text'>Signature</td>
                                            <td>{item.Width ? item.Width : 'NA'}</td>
                                            <td>{item.Height ? item.Height : 'NA'}</td>
                                            <td>{item.Qty}</td>
                                            <td className='text'>{item.Unit}</td>
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
  border: 1px solid black;
  border-collapse: collapse;
}
th,td {
  text-align: center;
  text-transform: capitalize;
}

.text{
    text-align: left;
    padding: 0 10px;
}
`