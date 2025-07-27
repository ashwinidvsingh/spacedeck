import React, { useState, useRef } from 'react'
import { useLocation } from 'react-router-dom';
import './GalleryPage.css';
import Navbar from './Navbar'


const SpaceGallery = () => {
  const location = useLocation();
  const initialItems = location?.state?.itemsData;
  // const [searchterm, setSearchterm] = useState("");
  const [itemsData, setItemsData] = useState(initialItems);
  const inputRef = useRef();

  // useEffect(() => {
  //   let searchImages = async () => {
  //     let response = await fetch(`https://images-api.nasa.gov/search?q=${searchterm}`,);
  //     const data = await response.json();
  //     console.log("space gallery res"+ data);
  //     setItemsData(data?.collection?.items || []);
  //   }
  
  //   return () => {
  //     second
  //   }
  // }, [third]);

  const handleClick = () =>{
    console.log("clicked");
    let searchImages = async () => {
      const query = inputRef.current.value;
      console.log(query);
      let response = await fetch(`https://images-api.nasa.gov/search?q=${query}`);
      const data = await response.json();
      console.log("space gallery res"+ data);
      setItemsData(data?.collection?.items || []);
    }
    searchImages();
  }


  
  
  return (
    <>
      <Navbar/>
      <input type="text" name="search-image" placeholder="Enter keyword" id="search-image" ref={inputRef} className='search-image'/>
      <input type="button" value="Search" onClick={handleClick}/>
      {console.log("Helloo spaceGallery")}
      <div className='gallery-container' style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px", padding: "20px" }}>
        {itemsData?.map((item, index) => (
          <div key={`image-${index}`}>
            <img
              key={`image-${index}`}
              src={item?.links?.[0]?.href}
              alt={`space-${index}`}
              style={{ width: "100%", margin: "10px" ,objectFit: "cover", height: "200px"}}
            />
            <h3>{item?.data?.[0]?.title}</h3>
            <a
      href={item?.links?.[0]?.href}
      download
      rel="noopener noreferrer"
      className='download-link'
    >
      Download
    </a>
          </div>
        ))}
      </div>
    </>
    )
}

export default SpaceGallery