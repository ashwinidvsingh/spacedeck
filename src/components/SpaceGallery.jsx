import React, { useState, useRef, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import './GalleryPage.css';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Navbar from './Navbar'


const SpaceGallery = () => {
  const location = useLocation();
  const initialItems = location?.state?.itemsData;
  const [searchterm, setSearchterm] = useState("space");
  const [itemsData, setItemsData] = useState(initialItems);
  const [currentUrl, setCurrentUrl] = useState(`https://images-api.nasa.gov/search?q=${searchterm}&page=1&page_size=10`);
  const [prevUrl, setPrevUrl] = useState(null);
  const [nextUrl, setNextUrl] = useState(null);
  const inputRef = useRef();
  

  useEffect(() => {
    const controller = new AbortController;
    const signal = controller.signal;
    let searchImages = async () => {
      let response = await fetch(currentUrl,{signal});
      const data = await response.json();
      console.log("space gallery res"+ data);
      setItemsData(data?.collection?.items || []);
      setPrevUrl(null); //resetting prev url
      setNextUrl(null); //resetting next url
      const links = data.collection.links || [];
      links.forEach(link => {
      if(link.rel === "next") setNextUrl(link.href);
      if(link.rel === "prev") setPrevUrl(link.href);
      });

    }
    searchImages();
  
    return () => {
      controller.abort();
    }
  }, [currentUrl, searchterm]);

  const handleClick = () =>{
    console.log("clicked");
    const query = inputRef.current.value;
    console.log(query);
    console.log("space gallery res");
    setSearchterm(query);
    setCurrentUrl(`https://images-api.nasa.gov/search?q=${query}&page=1&page_size=10`);
  }


  
  
  return (
    <>
      <Navbar/>
      <div className='my-5 d-flex gap-3 justify-content-center'>
        <input type="text" name="search-image" placeholder="Enter keyword" id="search-image" ref={inputRef} className='search-image'/>
        <input type="button" value="Search" onClick={()=>handleClick()}/>
      </div>
      {console.log("Helloo spaceGallery")}
      {/* <div className='gallery-container' style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px", padding: "20px" }}>
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
      </div> */}

      <Row xs={1} sm={2} md={3} className="g-4">
          {itemsData?.map((item, index) => (
              <Col key={index}>
              <Card>
                  <Card.Img variant="top" src={item?.links?.[0]?.href} />
                  <Card.Body>
                  <Card.Title> {item?.data?.[0]?.title} </Card.Title>
                  <Card.Text>
                  </Card.Text>
                  </Card.Body>
              </Card>
              </Col>
          ))}
      </Row>
      <div className="d-flex justify-content-between mt-4">
        <button onClick={() => setCurrentUrl(prevUrl)} disabled={!prevUrl}>Previous</button>
        <button onClick={() => setCurrentUrl(nextUrl)} disabled={!nextUrl}>Next</button>
      </div>
    </>
    )
}

export default SpaceGallery