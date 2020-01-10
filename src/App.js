import React from 'react';
import './App.css';
import InfiniteScroll from './components/infiniteScroll.js';

const request = async (pages) => {  
  const response = await fetch('https://pixabay.com/api/?key=12607862-fd9c4e5d2ce0e316e5fe18d32&image_type=photo&per_page=24&page=' + pages);
  return await response.json();
  // console.log('FETCHED', json);
  
  // return(json);
}


function App() {
  return (
    <div className="App">
      <header className="App-header">
       
        <p>
          INIFINITE SCROLL
        </p>
        
        <InfiniteScroll 
          request={request}
          transformer={(res) => res.hits.map((element) => ({
            webformatURL: element.webformatURL
          }))}
        />
        
      </header>
    </div>
  );
}

export default App;
