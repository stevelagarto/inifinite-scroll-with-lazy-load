import React, {useEffect, useRef} from 'react';
import styled from 'styled-components';

const Loader = styled.div` 
`;
function LazyLoadItem({ observer, Children, data }) {
 const loader = useRef(null);
 useEffect(()=> {
   if (loader && loader.current) {
    observer.observe(loader.current);
   }
 })
 return (<Loader ref={loader} className="orange"><Children data={data}/></Loader>)

 }


export default LazyLoadItem;