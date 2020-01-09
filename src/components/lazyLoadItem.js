import React, {useEffect, useRef} from 'react';
import styled from 'styled-components';

const Loader = styled.div` 
`;
function LazyLoadItem({ counter, observer, Children }) {
 const loader = useRef(null);
 useEffect(()=> {
   if (loader && loader.current) {
    observer.observe(loader.current);
   }
 })
 return (<Loader ref={loader} className="orange"><Children/></Loader>)

 }


export default LazyLoadItem;