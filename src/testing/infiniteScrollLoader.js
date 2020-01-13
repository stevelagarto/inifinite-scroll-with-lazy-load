import React from "react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import ReactLoaderSpinner from 'react-loader-spinner';

function infiniteScrollLoader() {
  return (
   <ReactLoaderSpinner
         type="ThreeDots"
         color="#FFFFFF"
         height={50}
         width={50}
         timeout={500} //3 secs
      />
  );
}

export default infiniteScrollLoader;
