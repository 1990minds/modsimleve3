import React from 'react';
import ReactLoading from 'react-loading';
 import styled from 'styled-components'
//  import logo from '../images/logo.png'


const Loader = ({type}) => (
    
    <LoaderWrap className="loader">    
        <div className='loaderBlock'>
        <ReactLoading  color="#1890FF" type="spinningBubbles" height={80} width={80} />
        <p className='char'>M</p>
        </div>
    </LoaderWrap>
);


const LoaderWrap = styled.div`

    /* position:absolute;
    top:100px */
    margin-top:100px;


.loaderBlock{
    position:relative;
    display:flex;
    justify-content: center;
}

.char{
    position:absolute;
    top:20px;
    font-size: 1.8rem;
    color: #16388A;
    font-weight: 800;
}
`
 
export default Loader;