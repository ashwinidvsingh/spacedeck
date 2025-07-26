import React, { useEffect, useState } from 'react'
import Map from './Map';
function Iss() {
    const [location, setLocation] = useState(null);

    useEffect(() => {
      const issLocation = async () => {
        let issApiUrl = "https://api.wheretheiss.at/v1/satellites/25544";
        let issApiRes = await fetch(issApiUrl);
        let issLocation = await issApiRes.json();
        setLocation(issLocation);
      }
      issLocation();
      // const intervalId = setInterval(issLocation, 1000);

    
      return () => {
          // clearInterval(intervalId);
      }
    }, [])
    if(!location){
    return (
        <div className="space-card skeleton">
          {console.log("rendered")}
        <div className="space-card-content">
          <h3>Loading ISS Location...</h3>
          <div style={{ height: "400px", background: "#f0f0f0" }} />
        </div>
      </div>
    );
    }
  return (
    <Map center= {[location?.longitude, location?.latitude]}></Map>
  )
}

export default Iss