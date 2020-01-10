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
<img ref={loader} className="img" name={data.webformatURL}  width={400} height={300} />)

 }


export default LazyLoadItem;