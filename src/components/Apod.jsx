import React, { useState, useEffect} from 'react'
import Card from './Card'
// import Modal from './Modal';
function Apod({openModal}) {
    const [data, setData] = useState(null);
    // const [showPopup, setShowPopup] = useState(false);

    useEffect(()=>{
        async function  getPictureOfTheDay() {
            const url = "https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY";
            try{
                const response = await fetch(url);
                const json = await response.json();
                console.log(json);
                setData(json);
    
            }
            catch (error){
                console.error(error.message);
            }
        }
        getPictureOfTheDay();
    }, []);

    let handleClick = () =>{
        console.log("handleClick");
        openModal(
            <>
                <h3>{data?.title}</h3>
                <p>{data?.date}</p>
                <p>{data.explanation}</p>
            </>
        );
    }
    

  return (
    <>
        <Card cardName = "Astronomy Picture of the Day" url={data?.url} isLoading={!data} onClick={handleClick}>
                <h3>{data?.title}</h3>
                <p>{data?.date}</p>
                {/* <p>{data.explanation}</p> */}
        </Card>

        {/* {showPopup && (
            <Modal isOpen={showPopup} onClose={() => setShowPopup(false)}>
                
            </Modal>
        )} */}
    </>
  )
}

export default Apod