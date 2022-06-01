

import React from 'react'
import { Spin } from 'antd';
import styled from 'styled-components'

export default function Loader({p="10px 0px 10rem 0px"}) {
    return (
        <SpinWrap className="flex items-center justify-center" >
        <Spin className="example "  tip="Loading..." />
      </SpinWrap>
    )
}

const SpinWrap  = styled.div`
width:100%;
.example {
   
    display: block;
  text-align: center;
  border-radius: 4px;
  margin-bottom: 20px;
  margin: 20px 0;
}


`