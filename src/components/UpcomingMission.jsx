import React, { useEffect, useState } from 'react'
import { Card, Row, Col, Container, Badge } from 'react-bootstrap';

function UpcomingMission() {
    const [missions, setMissions] = useState([]);

    useEffect(() => {
      const upcomingMissionUrl = "https://ll.thespacedevs.com/2.2.0/launch/upcoming/?limit=7";
      const controller = new AbortController();
      const signal = controller.signal;
      (async () => {
        const response = await fetch(upcomingMissionUrl, {signal});
        const upcomingMissions = await response.json();
        console.log(upcomingMissions);
        setMissions(upcomingMissions?.results);
      })()
    
      return () => {
        controller.abort();
      }
    }, [])

    const getStatusVariant = (id) => {
      switch(id) {
        case 1: return "primary";
        case 2: return "warning";
        case 3: return "success";
        case 4: return "danger";
        case 5: return "secondary";
        case 6: return "info";
        case 7: return "danger";
        case 8: return "dark";
        default: return "light";
      }
    };
    
  return (
    <div>
        {missions && missions.map((upcomingMission, index)=>(
            <Card className="mb-4" key={index}>
            <Row className="g-0">
              <Col md={6}>
                <Card.Img
                  variant="left"
                  src={upcomingMission?.image || 'https://via.placeholder.com/300x300?text=No+Image'}
                  alt={upcomingMission.name}
                  style={{ maxHeight: "500px", maxWidth: "500px", objectFit: 'cover' }}
                />
              </Col>
              <Col md={6}>
                <Card.Body>
                  <Card.Title>{upcomingMission?.name}</Card.Title>
                  <Card.Text>
                    <strong>Launch Date:</strong>{' '}
                    {new Date(upcomingMission?.net).toLocaleString()}
                  </Card.Text>
                  <Card.Text>
                    <strong> Status: </strong>
                    <Badge bg={getStatusVariant(upcomingMission?.status?.id)}>
                      {upcomingMission?.status?.name}
                    </Badge>
                  </Card.Text>
                  <Card.Text>
                    <strong> Launch Pad: </strong>
                    {upcomingMission?.pad?.name || 'Unknown'} - {upcomingMission?.pad?.location?.name}
                  </Card.Text>
                  <Card.Text>
                    <strong> Mission Type: </strong>
                    {upcomingMission?.mission?.type || 'Not Specified'}
                  </Card.Text>
                  <Card.Text>
                    <strong> Provider: </strong>
                    {upcomingMission?.launch_service_provider?.name || 'Not Mentioned'}
                  </Card.Text>
                  <Card.Text>
                    <strong>Details:</strong>{' '}
                    {upcomingMission?.mission ? upcomingMission.mission?.description : 'No description available.'}
                  </Card.Text>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        ))}
    </div>

  )
}

export default UpcomingMission