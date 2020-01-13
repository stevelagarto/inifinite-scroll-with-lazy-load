import React, {useRef, useEffect, useState} from 'react';
import LazyLoadItem from './lazyLoadItem';
import uuid from 'uuid';
import DefaultInfiniteScrollLoader from '../config/defaultInfiniteScrollLoader'

//let countIdItems = 0;
IntersectionObserver.prototype.POLL_INTERVAL = 100;

const InfiniteScroll = ({ 
  Loader = DefaultInfiniteScrollLoader,
  Children, 
  transformer, 
  request, 
  iSrootVal = null, 
  iSrootMargin = '0px', 
  iSthreshold = 1.0,
  itemHeight,
  itemWidth

  }) => {
  
  const [ requestedData, setRequestedData ] = useState([]);
  const [ isFetching, setIsFetching ] = useState( true );
  const [ lazyItemsObserver, setLazyItemsObserver] = useState([])
  const [ pages, setPages ] =  useState(1);
  const [ visibilityControl, setVisibilityControl ] = useState({});
  const intersectingElement = useRef( null );

  useEffect(() => { 
    const templazyItemsObserver = new IntersectionObserver(( entries ) => {
      entries.forEach( entry => {
        if (entry.isIntersecting) {
          console.log('View')
          setVisibilityControl((visibilityControl) => ({
            ...visibilityControl, 
            [entry.target.id]: true
          }))
          templazyItemsObserver.unobserve(entry.target)   
        }
      })
    },
    { 
      rootVal: null,
      rootMargin: '0px',
      threshold: 0.2
    });

    setLazyItemsObserver(templazyItemsObserver);
    setPages((pages) => pages+1 );

    const infiniteScrollObserver = new IntersectionObserver(( entries ) => {
          async function asyncFunction () {
            try {
              if ( entries[0].isIntersecting ) {       
              setIsFetching(true); 
              const results = await request( pages )
                if ( results ) {                 
                  const transformedData = transformer( results );
                  setRequestedData(( requestedData ) => [...requestedData, ...transformedData.map((element) => {
                    const id = uuid();                    
                    setVisibilityControl(( visibilityControl ) => ({
                      ...visibilityControl, 
                      [id]: false
                    }));
    
                    return {...element,  _id:id}                  
                  }
                  )]);
                }
                
                setIsFetching( false ); 
            } 
          } catch (error) {
            console.error.bind(error);
            setIsFetching( false );
          }
        } asyncFunction();
    }, {
      root: iSrootVal,
      rootMargin: iSrootMargin,
      threshold: iSthreshold
    });
    
    infiniteScrollObserver.observe( intersectingElement.current );
    
    return () => { 
      infiniteScrollObserver.disconnect();
    };
  },[ requestedData ]);

  useEffect (()=>{
    return () => {
      lazyItemsObserver.disconnect();
    }
  },[])

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
      itemHeight={itemHeight}
      itemWidth= {itemWidth}
    />
    }
  });

  return (
    <>
      { printItem } 
      <div ref={intersectingElement} className="scrollLoader" style={{width: itemWidth}}>
      <div>{isFetching && <Loader /> }</div></div>
    </>
  )
 }

export default InfiniteScroll;