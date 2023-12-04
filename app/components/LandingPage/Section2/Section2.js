import React from "react";
import "./Section2.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, Pagination } from "swiper";
import "swiper/css/pagination";
import Image from "next/image";

const Section2 = (props) => {
  const RenderSlider = props.ServerData.imgList.map((img) => {
    return (
      <SwiperSlide key={img.id}>
        <Image src={img.url} alt="company" width="200" height="100" />
      </SwiperSlide>
    );
  });
  return (
    <section className="Section2">
      {props.ServerData.imgList.length > 0 && (
        <>
          {props.ServerData.title && (
            <h2 data-aos="fade-down">{props.ServerData.title}</h2>
          )}
          {props.ServerData.content && (
            <div
              data-aos="fade-down"
              dangerouslySetInnerHTML={{ __html: props.ServerData.content }}
            ></div>
          )}
          <div className="Swiper" data-aos="fade-up">
            <Swiper
              freeMode={true}
              loop={true}
              slidesPerView={3}
              spaceBetween={10}
              pagination={{
                clickable: true,
              }}
              modules={[Pagination, Autoplay]}
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
                  spaceBetween: 10,
                },
              }}
              className="mySwiper"
            >
              {RenderSlider}
            </Swiper>
          </div>
        </>
      )}
    </section>
  );
};

export default Section2;
