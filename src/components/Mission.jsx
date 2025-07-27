import React, { useEffect, useState } from 'react'
import Card from './Card'

function Mission({openModal}) {
    let [mission, setMission] = useState(null);
    useEffect(()=> {
        const fetchMission = async () => {
            const url = "https://api.spacexdata.com/v5/launches/latest";
            try{
                const response = await fetch(url);
                const missionResponse = await response.json();
                // console.log(missionResponse);
                setMission(missionResponse);
            }
            catch (error){
                console.error(error.message);
            }
        }
        fetchMission();
    }, []);

    const handleClick = async () =>{
        let crewList = mission?.crew?.map((member) => member);
        console.log(crewList);
        let crewIdList = crewList.map((crewData)=> crewData?.crew || [])
        console.log("crewIdList: "+ crewIdList);
        // for(let crewId of crewIdList){
        //     console.log(crewId);
        //     (async() => {
        //         console.log("triggered");
        //         let crewData = await fetch(`https://api.spacexdata.com/v4/crew/${crewId}`);
        //         console.log(crewData);
                
        //     })();
        // }
        let crewDetails = await Promise.all(
            crewIdList.map(async (crewId)=>{
                console.log("triggered");
                let res = await fetch(`https://api.spacexdata.com/v4/crew/${crewId}`);
                return await res.json();
            })
            

        )
        console.log(crewDetails);
        openModal(
            <>
                <h3>{mission?.name}</h3>
                <p>Status: {mission.success ? "Successful" : "Failed"}</p>
                <div className="crew-container">
                    {crewDetails.map((crewData, index) => (
                        <div className="crew-member" key={index}>
                            <img src={crewData?.image} style={{ width: "100px", margin: "5px"}}/>
                            <span>{crewData?.name}</span>
                            <span>(Role: {crewList?.[index]?.role})</span>
                        </div>
                    ))}
                </div>
                <p>Want to join the launch discussion?
                    <a rel="external" href={mission?.links?.reddit?.launch}>View Reddit thread</a>
                </p>
                <a href={mission?.links?.wikipedia}>Curious to know more?</a>
            </>
        );
    }
  return (
        <Card cardName= "Latest Mission" url={mission?.links?.patch?.large} onClick={handleClick}>
            <h3>{mission?.name}</h3>
        </Card>

  )
}

export default Mission