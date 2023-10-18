import React from "react";
import "./Templates.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, Pagination } from "swiper";
import "swiper/css/pagination";
import ContactForm from "@/app/components/PopUps/ContactForm";
import Image from "next/image";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Template4 = ({ Data }) => {
  const RenderSlider = Data.imgList.map((img) => {
    return (
      <SwiperSlide key={img.id}>
        <Image src={img.url} alt="slide Image" width="400" height="400" />
      </SwiperSlide>
    );
  });
  return (
    <div className="ViewTemplate Template4">
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <div dangerouslySetInnerHTML={{ __html: Data.Content }}></div>
      <div className="Swiper" data-aos="fade-up">
        <Swiper
          freeMode={true}
          loop={true}
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
              slidesPerView: 3,
              spaceBetween: 20,
            },
            250: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
          }}
          className="aboutUsSwiper"
        >
          {RenderSlider}
        </Swiper>
      </div>
      <div className="Right">
        <h2>Get in touch with us</h2>
        <ContactForm textColor="Black" />
      </div>
    </div>
  );
};

export default Template4;
