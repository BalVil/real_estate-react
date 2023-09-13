import { useEffect, useRef } from "react";
import { register } from "swiper/element/bundle";
import "./Residencies.css";
import data from "../../utils/slider.json";

function Residencies() {
  const swiperRef = useRef(null);

  // Function to go to the next slide
  const slideNext = () => {
    const swiperInstance = swiperRef.current.swiper;
    if (swiperInstance) {
      swiperInstance.slideNext();
    }
  };

  // Function to go to the previous slide
  const slidePrev = () => {
    const swiperInstance = swiperRef.current.swiper;
    if (swiperInstance) {
      swiperInstance.slidePrev();
    }
  };

  useEffect(() => {
    register();

    const params = {
      // slidesPerView: 1,
      spaceBetween: 50,
      breakpoints: {
        375: {
          slidesPerView: 1,
        },
        600: {
          slidesPerView: 2,
        },
        750: {
          slidesPerView: 3,
        },
        1100: {
          slidesPerView: 4,
        },
      },
    };

    Object.assign(swiperRef.current, params);

    swiperRef.current.initialize();
  }, []);

  return (
    <section className="r-wrapper">
      <div className="paddings innerWidth r-container">
        <div className="r-head flexColStart">
          <p className="orangeText">Best Choices</p>
          <p className="primaryText">Popular Residencies</p>
          <div className="flexCenter r-buttons">
            <button onClick={slidePrev}>&lt;</button>
            <button onClick={slideNext}>&gt;</button>
          </div>
        </div>

        <swiper-container init="false" ref={swiperRef}>
          {data.map(({ id, image, name, price, detail }) => (
            <swiper-slide key={id}>
              <div className="flexColStart r-card">
                <img src={image} alt={name} />
                <p className="secondaryText r-price">
                  <span className="r-price__sign">$</span>
                  <span>{price}</span>
                </p>
                <p className="primaryText">{name}</p>
                <p className="secondaryText">{detail}</p>
              </div>
            </swiper-slide>
          ))}
        </swiper-container>
      </div>
    </section>
  );
}

export default Residencies;
