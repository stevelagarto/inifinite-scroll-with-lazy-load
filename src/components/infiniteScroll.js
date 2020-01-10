import React, {useRef, useEffect, useState} from 'react';
import Item from './lazyLoadItem';
import Children from './children';
import styled from 'styled-components';
IntersectionObserver.prototype.POLL_INTERVAL = 100;


const ScrollLoader = styled.div` 
`;


//const initialData = Array(50).fill('mock');


const InfiniteScroll = ( { transformer, request, rootVal = null, rootMargin = '0px', threshold= 0 }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
  const [lazyObserver, setLazyObserver] = useState(null)
  const loader = useRef(null);
  let lazyLoadId = 0;
  let pages = 1

  useEffect(() => {   
    const options = { // options on props
      root: rootVal,
      rootMargin: rootMargin,
      threshold: threshold
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entries[0].isIntersecting) {       
          setIsLoading(true);
          request(pages)
          .then(res =>  {    
            const transformedData = transformer(res)
            setData((data) => [...data, ...transformedData]);
            
           // observer.unobserve(loader.current);
          })
          .then(() => { pages = pages + 1 })
          .then(() => setIsLoading( false ))
          .then(() => lazyLoadId  = 0);
        } 
      })
    }, options);
    
    if (loader && loader.current) {
      observer.observe(loader.current);

    }
  
    return () => { 
      observer.disconnect();
    };
  },[])

  useEffect(() => {
    return () => { 
      lazyObserver.disconnect();
    };
  }, [])

  const print = (!data) ? null : data.map ( itemData => { //change !data for isLoading, problems with the las request
  lazyLoadId++;
  return <Item 
    style={{display:"none"}}
    data = {itemData}
    key={lazyLoadId} 
    Children={Children}
  />
})

 return (
  <div className="flex-container">
    <div className="flex">
    { print }
    </div>
  <ScrollLoader className="scrollLoader" ref={loader}></ScrollLoader>
 </div>)
 }

export default InfiniteScroll;