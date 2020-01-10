import React, {useRef, useEffect, useState} from 'react';
import Item from './lazyLoadItem';
import Children from './children';
import styled from 'styled-components';
IntersectionObserver.prototype.POLL_INTERVAL = 100;
let pages = 1
const request = async () => {
  
  const response = await fetch('https://pixabay.com/api/?key=12607862-fd9c4e5d2ce0e316e5fe18d32&image_type=photo&per_page=40&page=' + pages);
  const json = await response.json();
  console.log('FETCHED', json);
  
  return(json);
}

const ScrollLoader = styled.div` 
`;


//const initialData = Array(50).fill('mock');


const InfiniteScroll = ( { rootVal = null, rootMargin = '0px', threshold= 0 }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
  const [lazyObserver, setLazyObserver] = useState(null)
  const loader = useRef(1);
  let lazyLoadId = 0;
  useEffect(() => {
    const options2 = { // options on props
      root: rootVal,
      rootMargin: '0px',
      threshold: 1.0
    }    
    const lzyobs = new IntersectionObserver((entries)=> {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.target.className !== "orange") {
          lzyobs.unobserve(entry.target)
          entry.target.className = "children"
        }
      })
    }, options2);
    setLazyObserver(lzyobs)
    const options = { // options on props
      root: rootVal,
      rootMargin: rootMargin,
      threshold: threshold
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {       
          setIsLoading(true);
          request()
          .then(res =>  {     
            setData((data) => [...data, ...res.hits
              .map((e) => { 
                lazyLoadId++;
                return {...e, visible: false, lazy_id: lazyLoadId} ;
              })]);
            pages = pages + 1;
            observer.unobserve(loader.current);
          })
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
  },[data])

  useEffect(() => {
    return () => { 
      lazyObserver.disconnect();
    };
  }, [])

  const print = (!data || !lazyObserver) ? null : data.map ( itemData => { //change !data for isLoading, problems with the las request
  lazyLoadId++;
  return <Item 
    style={{display:"none"}}
    data = {itemData}
    observer={lazyObserver} 
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