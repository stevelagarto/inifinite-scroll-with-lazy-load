const request = async (pages) => {  
  try {
    const response = await fetch(`https://api.unsplash.com/search/photos?client_id=04902b80294822aa86dbe5c57ee47e1c1f0e8a0f0f360979746970a1239001dd&query=faces&per_page=24&page=${pages}`);
    const dataFetched = await response.json();
   // console.log('FETCHED', json);
    return(dataFetched);
  } catch (e) {
    console.log('ERROR');
    return false;
  }
}
export default request;

// https://pixabay.com/api/?key=12607862-fd9c4e5d2ce0e316e5fe18d32&image_type=photo&per_page=24&page=1