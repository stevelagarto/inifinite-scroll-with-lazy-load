import React, {useEffect, useRef} from 'react';
import styled from 'styled-components';

const Loader = styled.div` 
`;
let loaded = true;
function LazyLoadItem({ observer, Children, data }) {
 const loader = useRef(null);
 useEffect(()=> {
   if (loader && loader.current) {
    observer.observe(loader.current);
   }
 },[]);

 const comp = loaded ? <Children data={data}/> : <div>not visible</div>;

 return (
  <Loader ref={loader} className="orange">{comp}</Loader>)

 }


export default LazyLoadItem;