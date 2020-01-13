import React from 'react';
import './App.css';
import InfiniteScrollwithLazyLoad from './components/infiniteScroll.js';
import request from './config/request'
import Children from './config/children';
import InfiniteScrollLoader from './config/infiniteScrollLoader';


function App() {
  return (
    <div className="App">
      <header className="App-header">
       
        <p>
          INIFINITE SCROLL
        </p>
        <div className="flex">
        <InfiniteScrollwithLazyLoad 
          Loader= {InfiniteScrollLoader}
          itemHeight = {'320px'}
          itemWidth = {'300px'}
          iSrootVal = {null}
          iSrootMargin = '0px'
          iSthreshold = {1}
          Children={Children}
          request={request}
          transformer={(res) => res.results.map((element) => ({
            small: element.urls.thumb,
            description: element.alt_description
          }))}
        />
        </div>
      </header>
    </div>
  );
}

export default App;
