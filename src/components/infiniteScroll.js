import React, {useRef, useEffect, useState} from 'react';
import Item from './item';
import styled from 'styled-components';

let counter = 0;
const initialData = Array(50).fill();
const Loader = styled.div` 
`;// look how to handle the loader component

const InfiniteScroll = ( { rootVal = null, rootMargin = '0px', threshold= 1.0}) => {
  const [data, setData] = useState(initialData);
  const loader = useRef(null);
  
  useEffect(() => {
  
  const options = { // options on props
    root: rootVal,
    rootMargin: rootMargin,
    threshold: threshold
  }
  
  const observer = new IntersectionObserver((entries) => {
      const target = entries[0];
      if (target.isIntersecting) { 
        console.log('IN VIEW');
        counter = 0;
        setData([...data, ...initialData]);
      } 
  }, options);
  
  if (loader && loader.current) {
  observer.observe(loader.current);

  return () => observer.unobserve(loader.current);
  }
});

 return (
  <div className="flex">
    { data.map ( square => {
        counter = counter +1;
        return <Item key={counter} counter={counter}/>
  })}
  <Loader ref={loader}></Loader>
 </div>)
 }

export default InfiniteScroll;