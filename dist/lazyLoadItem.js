import React, { useEffect, useRef } from 'react';

function LazyLoadItem({
  observer,
  Children,
  itemData,
  isVisible,
  itemHeight = '100%',
  itemWidth = '100vw'
}) {
  const itemReference = useRef(null);
  useEffect(() => {
    observer.observe(itemReference.current);
    return () => observer.unobserve(itemReference.current);
  }, []);
  const fadeIn = isVisible ? "item fade-in" : "item hidden";
  const wrapperStyle = {
    height: itemHeight,
    width: itemWidth
  };
  const print = isVisible ? React.createElement(Children, {
    data: itemData
  }) : React.createElement("div", {
    ref: itemReference,
    id: itemData._id,
    style: {
      height: itemHeight
    }
  });
  return React.createElement("div", {
    style: wrapperStyle,
    className: fadeIn
  }, "      ", print);
}

export default LazyLoadItem;