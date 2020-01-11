const request = async (pages) => {  
  try {
    const response = await fetch('https://pixabay.com/api/?key=12607862-fd9c4e5d2ce0e316e5fe18d32&image_type=photo&per_page=24&page=' + pages);
    return await response.json();
    // console.log('FETCHED', json);
    // return(json);
  } catch (e) {
    console.log('ERROR');
    return false;
}
}
export default request;