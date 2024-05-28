import React, {useState, useEffect, useRef} from 'react'
import Image from '../Elements/Image'
import arrow from '../../assets/svg/arrow-right.svg'
import './Carousel.scss';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import hook from '../../utils/hook'

const Carousel = ({imgList}) => {
    let carouslRef = useRef(null);

    const prev = () => {
      carouslRef &&
        carouslRef.current &&
        carouslRef.current.scrollTo({
          behavior: "smooth",
          top: 0,
          left:
            carouslRef.current.scrollLeft - carouslRef.current.clientWidth * 1,
        });
    };
  
    const next = () => {
      carouslRef &&
        carouslRef.current &&
        carouslRef.current.scrollTo({
          behavior: "smooth",
          top: 0,
          left:
            carouslRef.current.scrollLeft + carouslRef.current.clientWidth * 1,
        });
    };
  
    return (
      // <div className= 'carousel'>
      //   <button className='direction' onClick={prev}>
      //     <img className='arrow arrow-left' src={arrow} alt="left button" />
      //   </button>
      //   <div className='card-div'>
      //     <main className='card-scroll' ref={carouslRef}>
      //       {imgList.map((item, i) => (
      //           <Image url={item.url} key={i} />
      //       ))}
      //     </main>
      //   </div>
      //   <button className='direction' onClick={next}>
      //     <img className='arrow' src={arrow} alt="right button" />
      //   </button>
      // </div>
      <div className="slider-wrapper">
      <AwesomeSlider>
        
       {imgList.map((item, i) => (
         <div className="carousel-slide">
           <span className="slide-title">{item.action}</span>
          <Image url={item.url} key={i} />
          </div>
        ))}
    </AwesomeSlider>
    </div>
    );
}
export default Carousel;