import React from 'react';
import './App.css';
import request from './testing/request'
import Children from './testing/children';
import InfiniteScrollLoader from './testing/infiniteScrollLoader';
import InfiniteScrollWithLazyLoad from './components/main';

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
          itemHeight = {'300px'}
          itemWidth = {'15vw'}
          iSrootVal = {null}
          iSrootMargin = '0px'
          iSthreshold = {1}
          lazyRootVal = {null}
          lazyRootMargin = '0px'
          lazyThreshold = {0.1}
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
