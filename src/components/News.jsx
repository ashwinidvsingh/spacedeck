import React, { useEffect, useState } from 'react'
import { Card, Col, Row, Placeholder, Button } from 'react-bootstrap';
import Navbar from './Navbar';
import Footer from './Footer';

function News() {
  const [newsCardData, setNewsCardData] = useState(null);
  const [previousUrl, setPreviousUrl] = useState(null);
  const [nextUrl, setNextUrl] = useState(null);
  const [currentUrl, setCurrentUrl] = useState('https://api.spaceflightnewsapi.net/v4/articles?limit=10');

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    (async () => {
      const response = await fetch(currentUrl, { signal });
      const newsResponse = await response.json();
      setNewsCardData(newsResponse?.results);

      // Reset pagination
      setNextUrl(newsResponse?.next || null);
      setPreviousUrl(newsResponse?.previous || null);
    })();

    return () => controller.abort();
  }, [currentUrl]);

  const skeletonArray = Array.from({ length: 6 });

  return (
    <>
      <Navbar/>

      <Row xs={1} md={2} className="m-5 g-4">
        {newsCardData
          ? newsCardData.map((newsObj, index) => (
              <Col key={index}>
                <Card>
                  <Card.Img
                    variant="top"
                    src={newsObj?.image_url}
                    style={{ maxHeight: '500px' }}
                    onError={(e) => {
                      e.target.src = 'https://placehold.co/800x500';
                    }}
                  />
                  <Card.Body>
                    <Card.Title>{newsObj?.title}</Card.Title>
                    <Card.Text>
                      <strong>Published At:</strong>{' '}
                      {new Date(newsObj?.published_at).toLocaleString()}
                      <br />
                      {newsObj?.summary}
                      <br />
                      <strong>
                        <a href={newsObj?.url} target="_blank" rel="noopener noreferrer">
                          Click to read full article
                        </a>
                      </strong>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))
          : skeletonArray.map((_, index) => (
              <Col key={index}>
                <Card>
                  <Placeholder as={Card.Img} variant="top" style={{ height: '300px' }} animation="wave" />
                  <Card.Body>
                    <Placeholder as={Card.Title} animation="wave">
                      <Placeholder xs={6} />
                    </Placeholder>
                    <Placeholder as={Card.Text} animation="wave">
                      <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />
                    </Placeholder>
                    <Placeholder.Button variant="primary" xs={6} />
                  </Card.Body>
                </Card>
              </Col>
            ))}
      </Row>

      <div className="d-flex bd-highlight mb-3">
        <div className="me-auto p-2 bd-highlight">
          <button onClick={()=> setCurrentUrl(previousUrl)} disabled={!previousUrl}>Previous</button>
        </div>
        <div className="p-2 bd-highlight">
          <button onClick={()=> setCurrentUrl(nextUrl)} disabled={!nextUrl}>Next</button>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default News;
