import React from 'react'
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const carouselStyles = {
  borderRadius: "10px",
  marginTop: "2rem",
  marginBottom: "2rem"
}

const CarouselComponent = () => {
  return (
    <div style={carouselStyles}>
      <Carousel autoPlay infiniteLoop interval={5000} showThumbs={false}>
        <div>
          <img src="/images/campaigns.jpg" alt="banner1" style={{borderRadius: '10px'}}/>
        </div>
        <div>
          <img src="/images/campaigns2.png" alt="banner2" style={{borderRadius: '10px'}}/>
        </div>
      </Carousel>
    </div>
  )
}

export default CarouselComponent