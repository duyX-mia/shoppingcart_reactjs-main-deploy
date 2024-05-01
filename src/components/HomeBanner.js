import React from "react";

import styles from "./HomeBanner.module.css";

import BackgroundImage1 from "../assets/images/slider_1.jpg";
import BackgroundImage2 from "../assets/images/slider_2.jpg";
import BackgroundImage3 from "../assets/images/slider_3.jpg";
import Carousel from "react-bootstrap/Carousel";

function HomeBanner(props) {
  return (
    <Carousel className={styles.banner}>
      <Carousel.Item>
        <img className={styles.bannerImage} src={BackgroundImage1} />
        <Carousel.Caption>
          <h3 className="text-black">Latest product</h3>
          <p className="text-black">
          Discover our newest products!
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className={styles.bannerImage} src={BackgroundImage2} />
        <Carousel.Caption>
          <h3 className="text-black">Special offers</h3>
          <p className="text-black">
          Get 20% off your flagship phone now!
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className={styles.bannerImage} src={BackgroundImage3} />
        <Carousel.Caption>
          <h3 className="text-black">Collection</h3>
          <p className="text-black">
          Explore our diverse phone collection!
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default HomeBanner;
