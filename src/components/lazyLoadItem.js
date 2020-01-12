import React, {useEffect, useRef} from 'react';

function LazyLoadItem({ observer, Children, itemData, isVisible }) {
  const itemReference = useRef( null );
  useEffect(()=> {
      
      observer.observe( itemReference.current );

    return () => observer.unobserve( itemReference.current );
  },[]);
  
  const fadeIn = isVisible ? "item fade-in" : "item hidden";

  const print = isVisible ? <div className="fade-in" ><Children data={itemData}/> </div>:  <div ref={itemReference} id={itemData._id} className="placeholder fade-in">
  </div>

  return (
<div className={fadeIn}>{print}</div>
  )
}

export default LazyLoadItem;