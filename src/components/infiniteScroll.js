import React, {useRef, useEffect, useState} from 'react';
import Item from './lazyLoadItem';
import Children from './children';

let counter = 0;
const initialData = Array(50).fill();
IntersectionObserver.prototype.POLL_INTERVAL = 100;

const InfiniteScroll = ( { rootVal = null, rootMargin = '50px', threshold= 1.0 }) => {
  const [data, setData] = useState(initialData);
  const loader = useRef(null);
  
  useEffect(() => {
  
  const options = { // options on props
    root: rootVal,
    rootMargin: rootMargin,
    threshold: threshold
  }
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { 
        console.log('IN VIEW');
        counter = 0;
        setData([...data, ...initialData]);
        observer.unobserve(entry.target)
      } 
    })
  }, options);
  
  if (loader && loader.current) {
  observer.observe(loader.current);
  
  //return () => observer.unobserve(loader.current);
  }
});
const options2 = { // options on props
    root: rootVal,
    rootMargin: '50px',
    threshold: 0.2
  }
const lazyobserver = new IntersectionObserver((entries)=> {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
        lazyobserver.unobserve(entry.target)
        entry.target.className = "square"
    }
})
}, options2)

 return (
  <div className="flex">
    { data.map ( square => {
        counter = counter +1;
        return <Item 
          observer={lazyobserver} 
          key={counter} 
        counter={counter}
        Children={Children}
        />
  })}
  <div ref={loader}></div>
 </div>)
 }

export default InfiniteScroll;