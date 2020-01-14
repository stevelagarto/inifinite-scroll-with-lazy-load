import React from "react";

function Children({ data }) {
  return (
    <div className="children">
      <div
        className="img"
        style={{ backgroundImage: `url(${data.small})` }}
      ></div>
      {
        <div>asddsdsadsdasdasddsasdfads
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
