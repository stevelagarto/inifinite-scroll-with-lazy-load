import React, {useRef, useEffect, useState} from 'react';
import LazyLoadItem from './lazyLoadItem';

IntersectionObserver.prototype.POLL_INTERVAL = 100;

let pages = 1;

const InfiniteScroll = ({ 
  Children, 
  transformer, 
  request, 
  rootVal = null, 
  rootMargin = '0px', 
  threshold = 1.0 }) => {
  
  const [ requestedData, setRequestedData ] = useState([]);
  const [ isFetching, setIsFetching ] = useState( true )
  const intersectingElement = useRef( null );
  
  let lazyLoadItemId = 0;

  useEffect(() => {  
    
    const observer = new IntersectionObserver(( entries ) => {
          if ( entries[0].isIntersecting ) {       
            setIsFetching(true); 
            request( pages )
            .then( res =>  {  
              if ( res ) { 
                const transformedData = transformer( res )
                setRequestedData(( requestedData ) => [...requestedData, ...transformedData]);
              }
            })
            .then(() => { 
              pages++;
              setIsFetching(false);
            })
          } 
    }, { // options on props
      root: rootVal,
      rootMargin: rootMargin,
      threshold: threshold
    });
    observer.observe( intersectingElement.current );
    
    return () => { 
      observer.disconnect();
    };
  },[ rootVal, request, transformer, threshold, rootMargin]) //change for didmount

  const printItem = requestedData.map ( itemData => {  
  lazyLoadItemId++; 
  return <LazyLoadItem 
    itemData = {itemData}
    key={lazyLoadItemId} 
    Children={Children}
  />
  })
//look to remove de flex divs
 return (
  <div className="flex-container"> 
    <div className="flex">
    { printItem }
    </div>
  <div className="scrollLoader" ref={intersectingElement}>{isFetching && <div>Loading Placeholder...</div>}</div>
 </div>)
 }

export default InfiniteScroll;