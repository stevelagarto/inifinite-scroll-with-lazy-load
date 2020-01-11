import React, {useEffect, useRef, useState} from 'react';

function LazyLoadItem({ Children, itemData }) {
  const [ isVisible, setIsVisible ] = useState( false );
  const itemReference = useRef( null );
  useEffect(()=> {
      const itemObserver = new IntersectionObserver(( entries ) => {
        if (!entries[0].isIntersecting) {
          setIsVisible( false );
        }
        
        if ( entries[0].isIntersecting ) {
          //itemObserver.unobserve( itemReference.current )
          setIsVisible( true );
        }
      }, { // options on props
        root: null,
        rootMargin: '0px',
        threshold: 0.5
      });
      itemObserver.observe( itemReference.current );

    return () => itemObserver.disconnect();
  },[]);

  const loadedItem = isVisible 
    ? <Children data={itemData}/> 
    : <div className="placeholder"></div>;
  
  return (
    <div ref={itemReference}>{loadedItem}</div>
  )
}

export default LazyLoadItem;