import React, {useRef, useEffect, useState} from 'react';
import Item from './lazyLoadItem';
import Children from './children';

let pages = 1
const request = async () => {
  const response = await fetch('https://pixabay.com/api/?key=12607862-fd9c4e5d2ce0e316e5fe18d32&image_type=photo&per_page=50&page=' + pages);
  const json = await response.json();
  console.log('FETCHED', json);
  
  return(json);
}




let counter = 0;
const initialData = Array(50).fill('mock');
IntersectionObserver.prototype.POLL_INTERVAL = 100;

const InfiniteScroll = ( { rootVal = null, rootMargin = '50px', threshold= 1.0 }) => {
  const [data, setData] = useState([]);
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
          console.log('HERE')
          request().then(res =>  {
            console.log('INSIDE REQUEST')

            setData((data) => [...data, ...res.hits])
            pages = pages + 1;
            return () => {
              observer.disconnect();
              lazyobserver.disconnect()
            };
          });
        } 
      })
    }, options);
    
    if (loader && loader.current) {
      observer.observe(loader.current);
     
    }
  },[])

const options2 = { // options on props
    root: rootVal,
    rootMargin: '50px',
    threshold: 0.2
  }
const lazyobserver = new IntersectionObserver((entries)=> {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
        lazyobserver.unobserve(entry.target)
        entry.target.className = "children"
    }
})
}, options2);
 if (!data ) return <h1>Loading</h1>
 return (
  <div className="flex">
    { data.map ( data => {
        counter = counter +1;
        return <Item 
          data = {data}
          observer={lazyobserver} 
          key={counter} 
          Children={Children}
        />
  })}
  <div ref={loader}></div>
 </div>)
 }

export default InfiniteScroll;