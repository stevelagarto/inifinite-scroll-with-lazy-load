import React from "react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from 'react-loader-spinner';
import '../style/style.css'

function infiniteScrollLoader() {
  return (
   <Loader
         type="ThreeDots"
         color="#FFFFFF"
         height={50}
         width={50}
         timeout={500} //3 secs
      />
  );
}

export default infiniteScrollLoader;
