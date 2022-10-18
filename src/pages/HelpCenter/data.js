import {Image } from 'antd';
import Img11 from '../../assets/images/helpCenter/new3.png';
import Img12 from '../../assets/images/helpCenter/new4.png';
import Img13 from '../../assets/images/helpCenter/new5.png';

import Img21 from '../../assets/images/helpCenter/new6.png';
import Img22 from '../../assets/images/helpCenter/new7.png';
import Img23 from '../../assets/images/helpCenter/new8.png';

import Img31 from '../../assets/images/helpCenter/new9.png';
import Img32 from '../../assets/images/helpCenter/new10.png';
import Img33 from '../../assets/images/helpCenter/new11.png';
import Img34 from '../../assets/images/helpCenter/new12.png';


import Img41 from '../../assets/images/helpCenter/new12.png';
import Img42 from '../../assets/images/helpCenter/new13.png';
import Img43 from '../../assets/images/helpCenter/new14.png';
import Img44 from '../../assets/images/helpCenter/new15.png';
import Img45 from '../../assets/images/helpCenter/new16.png';
import Img46 from '../../assets/images/helpCenter/new17.png';

import Img51 from '../../assets/images/helpCenter/new23.png';

import Img61 from '../../assets/images/helpCenter/new17.png';
import Img62 from '../../assets/images/helpCenter/new19.png';
import Img63 from '../../assets/images/helpCenter/new20.png';

import Img71 from '../../assets/images/helpCenter/new33.png';
import Img72 from '../../assets/images/helpCenter/new34.png';
import Img73 from '../../assets/images/helpCenter/new35.png';
import Img74 from '../../assets/images/helpCenter/new36.png';

import Img81 from '../../assets/images/helpCenter/pritam48.png';
import Img82 from '../../assets/images/helpCenter/pritam49.png';

import Img91 from '../../assets/images/helpCenter/new21.png';
import Img92 from '../../assets/images/helpCenter/new39.png';

import Img101 from '../../assets/images/helpCenter/new20.png';

import Img111 from '../../assets/images/helpCenter/new40.png';
import Img112 from '../../assets/images/helpCenter/new26.png';
import Img113 from '../../assets/images/helpCenter/new27.png';

import Img121 from '../../assets/images/helpCenter/image_DWG1.png';
import Img122 from '../../assets/images/helpCenter/image_DWG2.png';


const data = [
    {
        id:1,
        title:"How to Create New Customers ?",
        content:  <div >
            <p className='helpDesc'><b>Step 1 : </b>Click on Create option in the customers tab.</p>
                    <div className='helpImg'>
                        <img src={Img11}  preview={false}  />
                        <p ></p>
                    </div>
                    <p className='helpDesc'><b>Step 2 : </b>Fill necessary details in the fields and submit.</p>
                    <div className='helpImg'>
                        <img src={Img12}  preview={false} />
                        <p></p>
                    </div>
                    <p className='helpDesc'><b>Step 3 : </b>New customer created will be reflected in the table.</p>
                    <div className='helpImg'>
                        <img src={Img13}  preview={false} />
                        <p></p>
                    </div>
                  </div>
     },
    {
        id:2,
         title:"How to Create New Project ?",
         content:  <div>
                        <p className='helpDesc'><b>Step 1 : </b>Click on Create option in the Project section.</p>
                    <div className='helpImg'>
                        <img src={Img21}  preview={false}  />
                        <p></p>
                    </div>
                    <p className='helpDesc'><b>Step 2 : </b>Fill necessary details in the fields and submit.</p>
                    <div className='helpImg'>
                        <img src={Img22}  preview={false} />
                        <p></p>
                    </div>
                    <p className='helpDesc'><b>Step 3 : </b>New Project created will be reflected in the table.</p>
                    <div className='helpImg'>
                        <img src={Img23}  preview={false} />
                        <p></p>
                    </div>
                </div>
    },
    {
        id:3,
         title:"How to Create New Panel ?",
         content:  <div>
                         <p className='helpDesc'><b>Step 1 : </b>Click on particular project you want to create panel for.</p>
                    <div className='helpImg'>
                        <img src={Img23}  preview={false} />
                        <p></p>
                    </div>
                     <p className='helpDesc'><b>Step 2 : </b>Select the product MODDIS.</p>
                    <div className='helpImg'>
                        <img src={Img31}  preview={false}  />
                        <p></p>
                    </div>
                    <p className='helpDesc'><b>Step 3 : </b>Click on Create button.</p>
                    <div className='helpImg'>
                        <img src={Img32}  preview={false} />
                        <p></p>
                    </div>
                    <p className='helpDesc'><b>Step 4 : </b>Fill necessary details in the fields and submit.</p>
                    <div className='helpImg'>
                        <img src={Img33}  preview={false}  />
                        <p></p>
                    </div>
                    <p className='helpDesc'><b>Step 5 : </b>New Panel created will be reflected on the table.</p>
                    <div className='helpImg'>
                        <img src={Img34}  preview={false} />
                        <p></p>
                    </div>
                </div>
    },
    {
        id:11,
         title:"How to Duplicate Panel ?",
         content:  <div>
                    <p className='helpDesc'><b>Step 1 : </b>Goto Project -> Product -> Panel, On a particular project find duplicate icon at the end of the Panel row.</p>
                    <div className='helpImg'>
                        <img src={Img111}  preview={false}  />
                        <p></p>
                    </div>
                    <p className='helpDesc'><b>Step 2 : </b>Rename Panel and duplicate.</p>
                    <div className='helpImg'>
                        <img src={Img112}  preview={false} />
                        <p></p>
                    </div>
                    <p className='helpDesc'><b>Step 3 : </b>Duplicated Panel with new name will be reflected on the panel table.</p>
                    <div className='helpImg'>
                        <img src={Img113}  preview={false}  />
                        <p></p>
                    </div>
                </div>
    },

    {
        id:4,
         title:"How to Design Panel ?",
         content:  <div>
                <p className='helpDesc'><b>Step 1 : </b>Goto Project -> Product -> Click on respective Panel.</p>
                    <div className='helpImg'>
                        <img src={Img41}  preview={false}  />
                        <p></p>
                    </div>
                    <p className='helpDesc'><b>Step 2 : </b>Fill necessary details in the fields and Save.</p>
                    <div className='helpImg'>
                        <img src={Img42}  preview={false} />
                        <p></p>
                    </div>
                    <p className='helpDesc'><b>Step 3 : </b> Click on Configure Now.</p>
                    <div className='helpImg'>
                        <img src={Img43}  preview={false}  />
                        <p></p>
                    </div>
                    <p className='helpDesc'><b>Step 4 : </b>Click on Add Structure.</p>
                    <div className='helpImg'>
                        <img src={Img44}  preview={false} />
                        <p></p>
                    </div>
                    <p className='helpDesc'><b>Step 5 : </b>Design Panel as per requirement.</p>
                    <div className='helpImg'>
                        <img src={Img45}  preview={false}  />
                        <p></p>
                    </div>
                    <p className=''></p>
                    <div className='helpImg'>
                        <img src={Img46}  preview={false} />
                        <p></p>
                    </div>
                </div>
    },

    {
        id:5,
         title:"How to Download bill of material ?",
         content:  <div>
                    <p className='helpDesc'><b>Step 1 : </b>Goto Project -> Product -> Click BOM link for respective panel.</p>
                    <div className='helpImg'>
                    <img src={Img91}  preview={false}  />
                        <p></p>
                    </div>
                    <p className='helpDesc'><b>Step 2 : </b>Click on Download -> Bill of material file will be downloaded.</p>
                    <div className='helpImg'>
                        <img src={Img51}  preview={false}  />
                        <p></p>
                    </div>
                </div>
    },

    {
        id:9,
         title:"How to Download 2D Drawing ?",
         content:  <div>
                    <p className='helpDesc'><b>Step 1 : </b>Goto Project -> Product -> Click 2D link for respective panel.</p>                    <div className='helpImg'>
                        <img src={Img91}  preview={false}  />
                        <p></p>
                    </div>
                    <p className='helpDesc'><b>Step 2 : </b>2D Drawing file will be downloaded to your system.</p>
                    <div className='helpImg'>
                        <img src={Img92}  preview={false} />
                        <p></p>
                    </div>
                </div>
    },


    {
        id:7,
         title:"How to Download Quotation ?",
         content:  <div>
                    <p className='helpDesc'><b>Step 1 : </b>Goto Projects Section, Click on Generate button for respective Project.</p>
                    <div className='helpImg'>
                        <img src={Img71}  preview={false}  />
                        <p></p>
                    </div>
                    <p className='helpDesc'><b>Step 2 : </b>Fill the details specific to the project and submit.</p>
                    <div className='helpImg'>
                        <img src={Img72}  preview={false} />
                        <p></p>
                    </div>
                    <div className='helpImg'>
                        <img src={Img73}  preview={false}  />
                        <p></p>
                    </div>
                    <p className='helpDesc'><b>Step 3 : </b>Quotation file will be downloaded to your system.</p>
                    <div className='helpImg'>
                        <img src={Img74}  preview={false} />
                        <p></p>
                    </div>
                </div>
    },


    {
        id:8,
         title:"How to generate Detailed BOM ?",
         content:  <div>
                    <p className='helpDesc'><b>Step 1 : </b>Goto Projects -> Products -> Panel Line item -> Click on BOM Icon for the respective Panel.</p>
                    <div className='helpImg'>
                        <img src={Img81}  preview={false}  />
                        <p></p>
                    </div>
                    <p className='helpDesc'><b>Step 2 : </b>A request will be sent to the admin. Admin will download the Detailed Bill of Material based on the request and share to respective mail address.</p>
                    <div className='helpImg'>
                        <img src={Img82}  preview={false} />
                        <p></p>
                    </div>
                </div>
    }, 


    {
        id:6,
        title:"How to generate Manufacturing Drawing ?",
        content:  <div>
                    <p className='helpDesc'><b>Step 1 : </b>Goto Projects -> Products -> Panel Line item -> Click on drawing icon for requesting manufacturing drawing.</p>
                    <div className='helpImg'>
                        <img src={Img121}  preview={false}  />
                        <p></p>
                    </div>
                    <p className='helpDesc'><b>Step 2 : </b>A request will be sent to the admin. Admin will download the manufacturing drawing based on the request and share to the respective mail address.</p>
                    <div className='helpImg'>
                        <img src={Img122}  preview={false} />
                        <p></p>
                    </div>
                </div>
    },

   

]

export default data