import Carousel from 'react-bootstrap/Carousel';
import logo from '../assets/logo.png';
import { useEffect, useState, useNavigate } from 'react';

function NewsSlider() {
    const [newsData, setNewsData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        let controller = new AbortController();
        let status = controller.signal;
        (async () => {
            const spaceNewsUrl = 'https://api.spaceflightnewsapi.net/v4/articles?limit=5';
            const response = await fetch(spaceNewsUrl, { signal: status });
            const newsResponse = await response.json();
            console.log(newsResponse);
            setNewsData(newsResponse.results);
        })();
    
        
      return () => {
        controller.abort()
      }
    }, []);

    const handleClick = () => {
      navigate('/News');
    }
    
  return (
    <Carousel>
        {newsData && newsData.map((news, index)=>(
            <Carousel.Item key={index} interval={1000} onClick={handleClick()}>
                <div className="d-flex justify-content-center align-items-center bg-light" style={{ height: '500px' }}>
                <div style={{ width: '800px', position: 'relative' }}>

                <img
                    src={news.image_url}
                    alt={news.title}
                    style={{
                        width: '800px',
                        height: '500px',
                        objectFit: 'contain',
                        borderRadius: '8px',
                    }}
                    onError={(e)=>{
                        e.target.src = 'https://placehold.co/800x500';
                    }}
                    />
                <Carousel.Caption className="bg-dark bg-opacity-50 rounded p-2"  style={{width: '100%', left: '0'}}>
                    <h3>{news.title}</h3>
                    <p>{news.summary.slice(0, 100)}...</p>
                </Carousel.Caption>
                </div>
                </div>

            </Carousel.Item>
        ))}
      
      {/* <Carousel.Item interval={500}>
      <img
          className=" w-50"
          src= {logo}
          alt="First slide"
        />        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img
          className=" w-50"
          src= {logo}
          alt="First slide"
        />        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item> */}
    </Carousel>
  );
}

export default NewsSlider;