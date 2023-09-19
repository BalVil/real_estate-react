import React from "react";
import { HiLocationMarker } from "react-icons/hi";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import "./Hero.css";

function Hero() {
  return (
    <section className="hero-wrapper">
      <div className="flexCenter paddings innerWidth hero-container">
        <div className="flexColStart hero-first">
          <div className="hero-title">
            <div className="orange-circle"></div>
            <motion.h1
              initial={{ y: "2rem", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 2, type: "spring" }}
            >
              Discover <br /> Most Suitable <br /> Property
            </motion.h1>
          </div>
          <div className="flexColStart hero-desc">
            <p className="secondaryText">
              Find a variety of properties that suit you very easilty
            </p>
            <p className="secondaryText">
              Forget all difficulties in finding a residence for you
            </p>
          </div>
          <div className="flexCenter search-bar">
            <HiLocationMarker color="var(--blue)" size={25} />
            <input type="text" />
            <button className="button">Search</button>
          </div>
          <div className="flexCenter stats">
            <div className="flexColCenter stat">
              <div>
                <CountUp start={8000} end={9000} duration={4} />
                <span className="stat__sign">+</span>
              </div>
              <p className="secondaryText">Premium Products</p>
            </div>

            <div className="flexColCenter stat">
              <div>
                <CountUp start={1950} end={2000} duration={4} />
                <span className="stat__sign">+</span>
              </div>
              <p className="secondaryText">Happy Customers</p>
            </div>

            <div className="flexColCenter stat">
              <div>
                <CountUp end={20} />
                <span className="stat__sign">+</span>
              </div>
              <p className="secondaryText">Award Winning</p>
            </div>
          </div>
        </div>
        <div className="flexCenter hero-second">
          <motion.div
            initial={{ x: "6rem", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 2, type: "spring" }}
            className="image-container"
          >
            <img src="./img/hero-image.webp" alt="" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
