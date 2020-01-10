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
 },[]);

const comp = !data.visible ? <Children data={data}/> : <div>not visible</div>;

 return (
  <Loader ref={loader} className="orange">{comp}</Loader>)

 }


export default LazyLoadItem;