import React, {useRef, useEffect, useState} from 'react';
import Item from './lazyLoadItem';
import Children from './children';

const request = async () => {
  const response = await fetch('https://pixabay.com/api/?key=12607862-fd9c4e5d2ce0e316e5fe18d32&q=yellow+flowers&image_type=photo');
  const json = await response.json();
  console.log(json);
}




let counter = 0;
const initialData = Array(50).fill();
IntersectionObserver.prototype.POLL_INTERVAL = 100;

const InfiniteScroll = ( { rootVal = null, rootMargin = '50px', threshold= 1.0 }) => {
  const [data, setData] = useState(initialData);
  const loader = useRef(null);
  
  useEffect(() => {
  
  request(); 
  const options = { // options on props
    root: rootVal,
    rootMargin: rootMargin,
    threshold: threshold
  }
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { 
        counter = 0;
        setData([...data, ...initialData]);
        observer.unobserve(entry.target)
      } 
    })
  }, options);
  
  if (loader && loader.current) {
    observer.observe(loader.current);
    return () => {
      observer.disconnect();
      lazyobserver.disconnect()
    };
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
}, options2);

 return (
  <div className="flex">
    { data.map ( square => {
        counter = counter +1;
        return <Item 
          observer={lazyobserver} 
          key={counter} 
          Children={Children}
        />
  })}
  <div ref={loader}></div>
 </div>)
 }

export default InfiniteScroll;



// import React, {useRef, useEffect, useState} from 'react';
// import Item from './lazyLoadItem';
// import Children from './children';

// let pages = 1
// const request = async () => {
//   const response = await fetch('https://pixabay.com/api/?key=12607862-fd9c4e5d2ce0e316e5fe18d32&per_page=50&page=' + pages);
//   const json = await response.json();
//   console.log('FETCHED', json);
  
//   return(json);
// }




// let counter = 0;
// const initialData = Array(50).fill('mock');
// IntersectionObserver.prototype.POLL_INTERVAL = 100;

// const InfiniteScroll = ( { rootVal = null, rootMargin = '50px', threshold= 1.0 }) => {
//   const [data, setData] = useState(initialData);
//   const loader = useRef(null);
  
//   useEffect(() => {
  
//   async function fetching () {
//    // request().then(res =>  setData(res.hits));
//      console.log('entered fetching');
     
//   }
//   console.log('data', data);
  
  
  
//   const options = { // options on props
//     root: rootVal,
//     rootMargin: rootMargin,
//     threshold: threshold
//   }
  
//   const observer = new IntersectionObserver((entries) => {
//     entries.forEach(entry => {
//       if (entry.isIntersecting) { 
        
//         console.log('Entered in view');
//         counter = 0;
//         pages = pages + 1;
//         setData([...data, fetching()]);
//         observer.unobserve(entry.target)
//       } 
//     })
//   }, options);
  
//   if (loader && loader.current) {
//     observer.observe(loader.current);
//     return () => {
//       observer.disconnect();
//       lazyobserver.disconnect()
//     };
//   }
// }, []);
// const options2 = { // options on props
//     root: rootVal,
//     rootMargin: '50px',
//     threshold: 0.2
//   }
// const lazyobserver = new IntersectionObserver((entries)=> {
//   entries.forEach(entry => {
//     if (entry.isIntersecting) {
//         lazyobserver.unobserve(entry.target)
//         entry.target.className = "square"
//     }
// })
// }, options2);
//  if (!data ) return <h1>Loading</h1>
//  return (
//   <div className="flex">
//     { data.map ( data => {
//         counter = counter +1;
//         return <Item 
//           data = {data}
//           observer={lazyobserver} 
//           key={counter} 
//           Children={Children}
//         />
//   })}
//   <div ref={loader}></div>
//  </div>)
//  }

// export default InfiniteScroll;