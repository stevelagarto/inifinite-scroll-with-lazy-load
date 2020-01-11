import React, {useEffect, useRef} from 'react';

function LazyLoadItem({ observer, Children, itemData, isVisible }) {
  const itemReference = useRef( null );
  useEffect(()=> {
      
      observer.observe( itemReference.current );

    return () => observer.unobserve( itemReference.current );
  },[]);
  
  const print = isVisible ? <Children data={itemData}/> :  <div ref={itemReference} id={itemData._id} className={isVisible ? "children" : "placeholder"}>
  </div>

  return (
    <>
    {print}
    </>
  )
}

export default LazyLoadItem;