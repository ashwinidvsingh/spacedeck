import React from 'react'
import { useState, useMemo} from 'react'
import Apod from './Apod'
import Mission from './Mission'
import Gallery from './Gallery'
import Iss from './Iss'
import Modal from './Modal'
import Navbar from './Navbar'

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
        <div className="card-container">
            {/* {apodComponent} */}
            <Apod openModal= {openModal}/>
            <Mission openModal= {openModal}/>
            <Gallery/>
            {/* {missionComponent} */}
            {/* {galleryComponent} */}
            <Iss />
            <Modal isOpen = {isOpen} onClose= {closeModal}>
                {modalContent}
            </Modal>
        </div>
    </>
  )
}

export default Homepage