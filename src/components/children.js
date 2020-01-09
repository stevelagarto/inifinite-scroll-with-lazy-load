import React from 'react';

function Children({ data }) {
  // return (<div className="children"><img width="150px" height="100px" src={data.userImageURL} /></div>)
  return (<div>{data.likes}</div>)

 }

export default Children;
