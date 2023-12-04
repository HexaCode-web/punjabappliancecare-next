import React from "react";
import "./Section1.css";
import Card from "../../Cards/Card/Card";
import CardMobile from "../../Cards/Card/CardMobile";

const Section1 = (props) => {
  const severData = props.ServerData;

  const renderDummyData = severData.Cards.map((Data, index) => {
    return <Card Data={Data} key={index} />;
  });
  const renderDummyDataSmall = severData.Cards.map((Data, index) => {
    return (
      <props.SwiperSlide key={index}>
        <CardMobile Data={Data} />
      </props.SwiperSlide>
    );
  });

  return (
    <section className="Section1">
      {severData.Title && <h2 data-aos="fade-down">{severData.Title}</h2>}
      <div className="Cards-wrapper" data-aos="fade-up">
        {props.screenWidth > 1000 ? (
          renderDummyData
        ) : (
          <props.Swiper
            freeMode={true}
            loop={true}
            slidesPerView={1}
            spaceBetween={10}
            pagination={{
              clickable: true,
            }}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            breakpoints={{
              900: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
              250: {
                slidesPerView: 1,
                spaceBetween: 10,
              },
            }}
            modules={[props.Pagination, props.Autoplay]}
            className="Swiper-Testimonials"
          >
            {renderDummyDataSmall}
          </props.Swiper>
        )}
      </div>
    </section>
  );
};
export default Section1;
