import React, {useRef, useEffect, useState} from 'react';
import LazyLoadItem from './lazyLoadItem';
import uuid from 'uuid/v1';
//let countIdItems = 0;
IntersectionObserver.prototype.POLL_INTERVAL = 100;

const InfiniteScroll = ({ 
  Children, 
  transformer, 
  request, 
  iSrootVal = null, 
  iSrootMargin = '0px', 
  iSthreshold = 1.0 }) => {
  
  const [ requestedData, setRequestedData ] = useState([]);
  const [ isFetching, setIsFetching ] = useState( true );
  const [ lazyItemsObserver, setLazyItemsObserver] = useState([])
  const [ pages, setPages ] =  useState(1);
  const [ visibilityControl, setVisibilityControl ] = useState({});
  const intersectingElement = useRef( null );


  
  useEffect(() => { 
    console.log('control', visibilityControl) 

    const templazyItemsObserver = new IntersectionObserver(( entries ) => {
      console.log(entries.length)
      entries.forEach( entry => {
        if (entry.isIntersecting) {
          setVisibilityControl((visibilityControl) => ({
            ...visibilityControl, 
            [entry.target.id]: true
          }))
          templazyItemsObserver.unobserve(entry.target)
          console.log('ID', entry.target.id)   
        }
      })
    },
    { // options on props
      rootMargin: '0px',
      threshold: 1.0
    })
    setLazyItemsObserver(templazyItemsObserver);
    
    const observer = new IntersectionObserver(( entries ) => {
          if ( entries[0].isIntersecting ) {       
            setIsFetching(true); 
            request( pages )
            .then( res =>  {  
              if ( res ) {                 
                const transformedData = transformer( res );
                setRequestedData(( requestedData ) => [...requestedData, ...transformedData.map((element)=> {
                  const id = uuid();                    
                  setVisibilityControl((visibilityControl) => ({
                    ...visibilityControl, 
                    [id]: false
                  })) 
              
                  return {...element,  _id:id}                  
                })]);
                
              }
            })
            .catch(console.error.bind(console))
            .then(() => { 
              console.log('data', requestedData);
              setPages(pages +1);
              setIsFetching(false);
              
            })
          } 
    }, { // options on props
      root: iSrootVal,
      rootMargin: iSrootMargin,
      threshold: iSthreshold
    });
    observer.observe( intersectingElement.current );
    
    return () => { 
      observer.disconnect();
    };
  },[  requestedData]) //change for didmount


  
  const printItem = requestedData.map ( itemData => {  
  
  if (itemData.isVisible) {
  return <Children 
    itemData = {itemData}
    key={itemData.id} 
    Children={Children}
    observer={lazyItemsObserver}
  />
  } else {
    return <LazyLoadItem 
    itemData = {itemData}
    key={itemData._id} 
    Children={Children}
    observer={lazyItemsObserver}
    isVisible={visibilityControl[itemData._id]}
  />

  }
  })

 return (
  <div className="flex-container"> 
    <div className="flex">
    { printItem }
    </div>
  <div className="scrollLoader" ref={intersectingElement}>{isFetching && <div className="spinner">Loading Placeholder...</div>}</div>
 </div>)
 }

export default InfiniteScroll;