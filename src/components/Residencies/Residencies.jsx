import { useEffect, useRef } from "react";
import { register } from "swiper/element/bundle";
import { PuffLoader } from "react-spinners";
import useProperties from "../../hooks/useProperties";
import PropertyCard from "../PropertyCard/PropertyCard";
import "./Residencies.css";

function Residencies() {
  const swiperRef = useRef(null);
  const { data, isLoading, isError } = useProperties();

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

    if (swiperRef.current) {
      Object.assign(swiperRef.current, params);
      swiperRef.current.initialize();
    }
  }, [data]);

  if (isError) {
    return (
      <div className="wrapper">
        <span>Error while fetching data</span>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="wrapper flexCenter" style={{ height: "50vh" }}>
        <PuffLoader
          height="80"
          width="80"
          radius={1}
          color="#4066ff"
          aria-label="puff-loading"
        />
      </div>
    );
  }

  // Check if data is an array
  // if (!Array.isArray(data)) {
  //   return (
  //     <div className="wrapper">
  //       <span>Data is not in the expected format</span>
  //     </div>
  //   );
  // }

  return (
    <section className="r-wrapper" id="residencies">
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
          {data?.slice(0, 8).map((card) => (
            <swiper-slide key={card.id}>
              <PropertyCard card={card} />
            </swiper-slide>
          ))}
        </swiper-container>
      </div>
    </section>
  );
}

export default Residencies;
