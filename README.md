The react-infscroll-lazyload package is a component library for React, where you can easy configurate it and pass an Item component and a request to get a list with infinite scroll and lazy loading Items.

## Getting started

```bash
npm install react-infscroll-lazyload
```

### Example

```jsx
import InfiniteScrollWithLazyLoad from 'react-infscroll-lazyload';
import ListItem from './components/listItem'
import Loader from './components/loader'

  const MyComponent = () => {      
    const request = async (pages) => {  
    try {
      const response = await fetch(`https://URL&page=${pages}`);
      return await response.json();
    } catch (error) {
      console.error(error);
      return false;
    }
  }
  
  return (
    <InfiniteScrollWithLazyLoad 
      Loader= {Loader}
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
  )
}

```



## Props

| Prop name        |    Type     |    Default     | Required |                         Description                          |
| ---------------- | :---------: | :------------: | :------: | :----------------------------------------------------------: |
| `Loader`         |  Component  | Default Loader |  false   |                   Custom loader component                    |
| `itemHeigth`     |   String    |     '100%'     |  false   |       Defined height for the Item and the placeholder        |
| `itemWidth`      |   String    |    '100vw'     |  false   |        Defined weight for the Item and the placeholde        |
| `ISrootVal`      | DOM Element |      null      |  false   | The element that is used as the viewport for the infinite scroll. Must be the ancestor of the infiniteScrollWithLazyLoad component . Defaults to the browser viewport if not specified. |
| `iSrootMargin`   |   String    |     '0px'      |  false   | Margin around the root, This set of values serves to grow or shrink each side of the root element's bounding box before updating the list. |
| `iSthreshold`    |   Number    |      1.0       |  false   | Either a single number or an array of numbers which indicate at what percentage of the target's visibility the infinite scroll should add the next request. |
| `lazyRootVal`    | DOM Element |      null      |  false   | The element that is used as the viewport for the Item. Must be the ancestor of the Item component. Defaults to the browser viewport if not specified. |
| `lazyRootMargin` |   String    |     '0px'      |  false   | Margin around the root, This set of values serves to grow or shrink each side of the root element's bounding box before updating the list. |
| `lazyThreshold`  |   Number    |      0.2       |  false   | Either a single number or an array of numbers which indicate at what percentage of the target's visibility the infinite scroll should add the next request. |
| `Children`       |  Component  |      null      |   true   |                   Your List Item component                   |
| `request`        |  Function   |      null      |   true   | Your fetching handler function, get  the page number as argument |
| `transformer`    |  Function   |      null      |   true   |        Function to transform the data for mapping it         |



## Contributors

* Steven Becker - [GitHub](https://github.com/stevelagarto)
