import React, {useEffect, useRef} from 'react';
import styled from 'styled-components';

const Loader = styled.div` 
`;

function LazyLoadItem({ observer, Children, data }) {
const loader = useRef(null);
useEffect(()=> {
    const itemObserver = new IntersectionObserver((entries)=>{
      if (entries[0].isIntersecting) {
        console.log('VIEW');
        entries[0].target.src = entries[0].target.name
        itemObserver.unobserve(loader.current)
      }
    })
   if (loader && loader.current) {
    itemObserver.observe(loader.current);
   }
   return () => itemObserver.disconnect();
 },[]);

const comp = !data.visible ? <Children data={data}/> : <div>not visible</div>;

 return (
<img ref={loader} className="img" name={data.webformatURL}  width={400} height={300} />)

 }


export default LazyLoadItem;