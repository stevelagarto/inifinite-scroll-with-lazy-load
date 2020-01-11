import React from "react";

function Children({ data }) {
  // return (<div className="children"><img width="150px" height="100px" src={data.userImageURL} /></div>)
  return (
    <div className="children">
      <div
        className="img"
        style={{ backgroundImage: `url(${data.small})` }}
      ></div>
      {
        <div>
          {data.description
            ? data.description.charAt(0).toUpperCase() +
              data.description.slice(1)
            : "No description"}
        </div>
      }
    </div>
  );
}

export default Children;
