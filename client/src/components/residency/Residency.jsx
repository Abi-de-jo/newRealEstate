import React from "react";
import "swiper/css";
import "./Residency.css";
import { sliderSettings } from "../../utils/common";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import PropertyCard from "../PropertyCard/PropertyCard";
import { motion } from "framer-motion";
import useProperties from "../../hooks/useProperties";
import PuffLoader from "react-spinners/PuffLoader";
import { useTranslation } from 'react-i18next'; // Import useTranslation

function Residency() {
  const { t } = useTranslation('res'); // Specify the namespace for residency
  const { data, isError, isLoading } = useProperties();

  if (isError) {
    return (
      <div className='wrapper'>
        <span>{t('errorFetchingData')}</span> {/* Use translation for error message */}
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="wrapper flexCenter" style={{ height: "60vh" }}>
        <PuffLoader
          size={80}
          color="#4066ff"
          aria-label="puff-loading"
        />
      </div>
    );
  }

  return (
    <section className="r-wrapper bg-neutral text-gray-950">
      <div className="paddings innerWidth r-container">
        <div className="r-head flexColStart">
          <span className="orangeText">{t('bestChoices')}</span> {/* Use translation */}
          <span className="primaryText">{t('popularResidencies')}</span> {/* Use translation */}
        </div>

        {/* Wrap Swiper with motion.div to animate the entire slider */}
        <motion.div
          initial={{ opacity: 0, y: 50 }} // Start offscreen from the bottom
          whileInView={{ opacity: 1, y: 0 }} // Move to place when in view
          transition={{ duration: 0.8, type: "tween" }} // Animation configuration
          viewport={{ once: true }} // Triggers animation once when in view
        >
          <Swiper {...sliderSettings}>
            <SliderButtons />
            <div className="scroll-card">
              {data.slice(0, 8).map((card, i) => (
                <SwiperSlide key={i}>
                  {/* Wrap PropertyCard with motion.div for individual card animation */}
                  <motion.div className="card"
                    initial={{ opacity: 0, y: 60 }} // Start from the bottom
                    whileInView={{ opacity: 1, y: 0 }} // Move into place when in view
                    transition={{ duration: .7, delay: i * .6 }} // Delay each card animation
                    viewport={{ once: true }} // Only animate once when in view
                  >
                    <PropertyCard card={card} />
                  </motion.div>
                </SwiperSlide>
              ))}
            </div>
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
}

export default Residency;

const SliderButtons = () => {
  const swiper = useSwiper();
  return (
    <div className="flexCenter r-buttons">
      <button onClick={() => swiper.slidePrev()} className="r-prevButton">
        &lt;
      </button>
      <button onClick={() => swiper.slideNext()} className="r-nextButton">
        &gt;
      </button>
    </div>
  );
};
