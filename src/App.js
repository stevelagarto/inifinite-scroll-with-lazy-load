import React from 'react';
import './App.css';
import request from './testing/request'
import Children from './testing/children';
import InfiniteScrollLoader from './testing/infiniteScrollLoader';
import InfiniteScrollWithLazyLoad from 'react-infscrolllazyload1';

function App() {
  return (
    <div className="App">
      <header className="App-header">
       
        <p>
          INIFINITE SCROLL
        </p>
        <div className="flex">
        <InfiniteScrollWithLazyLoad 
          Loader= {InfiniteScrollLoader}
          itemHeight = {'320px'}
          itemWidth = {'300px'}
          iSrootVal = {null}
          iSrootMargin = '0px'
          iSthreshold = {1}
          Children={Children}
          request={request}
          transformer= {(res) => res.results.map((element) => ({
              small: element.urls.thumb,
              description: element.alt_description
            })
          )}
        />
        </div>
      </header>
    </div>
  );
}

export default App;
