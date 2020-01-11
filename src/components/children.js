import React from 'react';

function Children({ data }) {
  // return (<div className="children"><img width="150px" height="100px" src={data.userImageURL} /></div>)
  return <div className="children">
    <div>User: {data.user}</div>
    <div className="img" style={{backgroundImage: `url(${data.webformatURL})`}}></div>
  
    <div>Type: {data.type}</div>
  
  </div>

 }

export default Children;
