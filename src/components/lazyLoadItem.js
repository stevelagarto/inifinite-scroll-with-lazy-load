import React, {useEffect, useRef} from 'react';

function LazyLoadItem({ 
  observer, 
  Children, 
  itemData, 
  isVisible,
  itemHeight = '300px',
  itemWidth = '300px' 
}) {
  const itemReference = useRef( null );
  useEffect(()=> {
      
      observer.observe( itemReference.current );

    return () => observer.unobserve( itemReference.current );
  },[]);
  
  const fadeIn = isVisible ? "item fade-in" : "item hidden";
  
  const wrapperStyle = {
    minHeight: itemHeight,
    minWidth: itemWidth,
    maxHeight: itemHeight,
    maxWidth: itemWidth,
  };

  const print = isVisible 
  ? <Children data={itemData}/> 
  : <div ref={itemReference} id={itemData._id} style={{height: itemHeight,
  width: itemWidth}}></div>

  return (
  <div style={wrapperStyle} className={fadeIn}>{print}</div>
  )
}

export default LazyLoadItem;