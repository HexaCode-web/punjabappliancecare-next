import React from "react";
import "./Section9.css";
import Section9Cards from "../../Cards/Section9Cards/Section9Cards";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import { Pagination, Autoplay } from "swiper";
// import "swiper/css/pagination";
const Section9 = (props) => {
  const serverData = props.ServerData;
  // const renderCards = serverData?.Cards.map((card) => {
  //   return (
  //     <SwiperSlide key={card.id}>
  //       <Section9Cards cardData={card} />
  //     </SwiperSlide>
  //   );
  // });
  return (
    <div className="Section9">
      {serverData.Title && <h2>{serverData.Title}</h2>}
      <div className="Skill-wrapper">
        {/* <Swiper
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
          modules={[Pagination, Autoplay]}
          className="Swiper-cards"
        >
          {renderCards}
        </Swiper> */}
      </div>
    </div>
  );
};

export default Section9;
