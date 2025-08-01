import React from 'react'
import { useState, useMemo} from 'react'
import Apod from './Apod'
import Mission from './Mission'
import Gallery from './Gallery'
import Iss from './Iss'
import Modal from './Modal'
import Navbar from './Navbar'
import Footer from './Footer'
import NewsSlider from './NewsSlider'
import UpcomingMission from './UpcomingMission'


const Homepage = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [modalContent, setModalContent] = useState(null);
  
    const openModal = (content) => {
      setModalContent(content);
      setIsOpen(true);
    }
  
    const closeModal = () =>{
      setModalContent(null);
      setIsOpen(false);
    }
    // const apodComponent = useMemo(() => <Apod openModal= {openModal}/>, []);
    // const missionComponent = useMemo(() => <Mission openModal= {openModal}/>, []);
    // const galleryComponent = useMemo(() => <Gallery/>, []);

  return (
    <>
        <Navbar/>
        <h1>SpaceDeck</h1>        
        <div className="card-container my-4">
            {/* {apodComponent} */}
            <Apod openModal= {openModal}/>
            <Mission openModal= {openModal}/>
            <Gallery/>
            {/* {missionComponent} */}
            {/* {galleryComponent} */}
           
            <Modal isOpen = {isOpen} onClose= {closeModal}>
                {modalContent}
            </Modal>
        </div>
        <div className='container my-3'>
          <p class="fs-2">Latest News</p>
          <NewsSlider/>
        </div>
        <div className='container my-5'>
          <p class="fs-2">Upcoming Missions</p>
          <UpcomingMission/>
        </div>
        <div className="my-5">
          <Iss />
        </div>
        <Footer/>
    </>
  )
}

export default Homepage