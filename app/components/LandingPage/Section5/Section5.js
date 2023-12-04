import React from "react";
import "./Section5.css";
import SkillCard from "../../Cards/SkillCard/SkillCard";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import { Pagination, Autoplay } from "swiper";
// import "swiper/css/pagination";
const Section5 = (props) => {
  // const renderData = props.ServerData.Slider.map((skill) => {
  //   return (
  //     <SwiperSlide key={skill.id}>
  //       <SkillCard Data={skill} />
  //     </SwiperSlide>
  //   );
  // });
  return (
    <section
      className={`Section5 ${props.specialStyles ? "specialStyles" : ""}`}
    >
      {props.ServerData.Title && (
        <h2 data-aos="fade-down">
          {props.specialStyles ? props.title : props.ServerData.Title}
        </h2>
      )}
      {props.specialStyles ? (
        <div
          data-aos="fade-down"
          className="text-container"
          dangerouslySetInnerHTML={{ __html: props.content }}
        ></div>
      ) : (
        props.ServerData.paragraph && (
          <p data-aos="fade-up">{props.ServerData.paragraph}</p>
        )
      )}
      <div className="Skill-wrapper">
        {/* <Swiper
          freeMode={true}
          loop={true}
          slidesPerView={4}
          spaceBetween={10}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 1000,
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
              spaceBetween: 20,
            },
          }}
          modules={[Pagination, Autoplay]}
          className="Swiper-Skills"
        >
          {renderData}
        </Swiper> */}
      </div>
    </section>
  );
};

export default Section5;
