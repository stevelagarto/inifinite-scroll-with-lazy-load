import React from 'react';
import './App.css';
import InfiniteScroll from './components/infiniteScroll.js';
import request from './config/request'
import Children from './components/children';



function App() {
  return (
    <div className="App">
      <header className="App-header">
       
        <p>
          INIFINITE SCROLL
        </p>
        
        <InfiniteScroll 
          Children={Children}
          request={request}
          transformer={(res) => res.hits.map((element) => ({
            webformatURL: element.webformatURL,
            user: element.user,
            type: element.type
          }))}
        />
        
      </header>
    </div>
  );
}

export default App;
