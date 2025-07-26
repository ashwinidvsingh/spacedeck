import React, { useEffect, useState } from 'react'
import Card from './Card';
import { useNavigate } from 'react-router-dom';
import SpaceGallery from './SpaceGallery';
function Gallery() {

    const url = "https://images-api.nasa.gov/search?q=space";
    const [galleryData, setGalleryData] = useState(null);
    const [itemsData, setItemsData] = useState(null);
    const [showGallery, setShowGallery] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
        
        let controller = new AbortController();
        let status = controller.signal;
        console.log(status);
      const getGalleryCardData = async () => {
        let galleryResponse = await fetch(url, {status});
        let galleryResponseJson = await galleryResponse.json();
        setItemsData(galleryResponseJson?.collection?.items || []);
        let gallerySize = galleryResponseJson?.collection?.items?.length || 0;
        // console.log(gallerySize);
        let index = gallerySize > 0 ? Math.floor(Math.random() * gallerySize) : 0
        // console.log(index);
        setGalleryData(galleryResponseJson?.collection?.items[index]);
      }

      getGalleryCardData();
    
      return () => {
        controller.abort()
      }
    }, []);

    
    const handleClick = () => {
      setShowGallery(true);
      navigate('/gallery',  { state: { itemsData }, replace:true});
    }
    
    
  return (
    <>
      <Card cardName= "Space Gallery" url={galleryData?.links[0]?.href} onClick={handleClick}>
        <h3>{galleryData?.data?.[0]?.title}</h3>
      </Card>
      {showGallery && galleryData && <SpaceGallery data= {itemsData}/>}
    </>
    
  )
}

export default Gallery