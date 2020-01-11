import React from 'react';
import './App.css';
import InfiniteScrollwithLazyLoad from './components/infiniteScroll.js';
import request from './config/request'
import Children from './config/children';
//import props from './config/infiniteScrollProps'



function App() {
  return (
    <div className="App">
      <header className="App-header">
       
        <p>
          INIFINITE SCROLL
        </p>
        
        <InfiniteScrollwithLazyLoad 
          iSrootVal = {null}
          iSrootMargin = {'0px'}
          iSthreshold = {0.5}
          Children={Children}
          request={request}
          transformer={(res) => res.results.map((element) => ({
            small: element.urls.thumb,
            description: element.alt_description
          }))}
        />
      </header>
    </div>
  );
}

export default App;
