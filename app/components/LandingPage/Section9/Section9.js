import React from "react";
import "./Section9.css";
import Section9Cards from "../../Cards/Section9Cards/Section9Cards";

const Section9 = (props) => {
  const serverData = props.ServerData;
  const renderCards = serverData?.Cards.map((card) => {
    return (
      <props.SwiperSlide key={card.id}>
        <Section9Cards cardData={card} />
      </props.SwiperSlide>
    );
  });
  return (
    <div className="Section9">
      {serverData.Title && <h2>{serverData.Title}</h2>}
      <div className="Skill-wrapper">
        <props.Swiper
          freeMode={true}
          loop={true}
          slidesPerView={3}
          spaceBetween={10}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          breakpoints={{
            900: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            250: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
          }}
          modules={[props.Pagination, props.Autoplay]}
          className="Swiper-cards"
        >
          {renderCards}
        </props.Swiper>
      </div>
    </div>
  );
};

export default Section9;
