"use client";
import React from "react";
import { useState, useEffect } from "react";
import CollapsibleElement from "@/app/components/CollapsibleElement/CollapsibleElement";
import ContactPopUp from "@/app/components/PopUps/ContactPopup/ContactPopup";
import IconCard from "@/app/components/Cards/Card-Icon/IconCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Pagination, Autoplay } from "swiper";
import "swiper/css/pagination";
import ContactForm from "@/app/components/PopUps/ContactForm";
import Image from "next/image";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Templates.css";
import Loading from "@/app/loading";
import dynamic from "next/dynamic";
const Template2 = ({ Data }) => {
  const Section5 = dynamic(
    () => import("@/app/components/LandingPage/Section5/Section5"),
    {
      loading: () => <Loading />,
      ssr: false,
    }
  );
  const Section4 = dynamic(
    () => import("@/app/components/LandingPage/Section4/Section4"),
    {
      loading: () => <Loading />,
      ssr: false,
    }
  );
  const Section2 = dynamic(
    () => import("@/app/components/LandingPage/Section2/Section2"),
    {
      loading: () => <Loading />,
      ssr: false,
    }
  );
  const Section6 = dynamic(
    () => import("@/app/components/LandingPage/Section6/Section6"),
    {
      loading: () => <Loading />,
      ssr: false,
    }
  );
  const [sliderData, setSliderData] = useState(null);
  const [Testimonials, setTestimonials] = useState(null);
  const [showModal, setShowModal] = React.useState(false);
  const [section6Data, setSection6Data] = useState(null);
  const [section7Data, setSection7Data] = useState(null);
  const [tabs, setTabs] = useState(null);
  const [brands, setBrands] = useState(null);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  useEffect(() => {
    const fetchSliderData = async () => {
      setSection7Data(Data.TemplateProperties.section7);

      const [mainPageData, sidePagesData] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_END_POINT_URL}/MainPage`).then((res) =>
          res.json()
        ),
        fetch(`${process.env.NEXT_PUBLIC_END_POINT_URL}/SidePages`).then(
          (res) => res.json()
        ),
      ]);
      const MainData = mainPageData[0];
      const Tabs = sidePagesData;
      setTabs(Tabs);
      setSliderData(MainData.Section5);
      setTestimonials(MainData.Section4);
      setSection6Data(MainData.Section6);
      setBrands({
        title: Data.TemplateProperties.section7.title,
        content: Data.TemplateProperties.section7.content,
        imgList: MainData.Section2.imgList,
      });
    };
    fetchSliderData();
  }, []);
  const renderCards = Data.TemplateProperties.section2.Cards.map((card) => {
    return (
      <SwiperSlide key={card.id}>
        <IconCard data={card} />
      </SwiperSlide>
    );
  });
  const renderServices = Data.TemplateProperties.section3.services.map(
    (service) => {
      return (
        <li className="serviceElement" data-aos="fade-down" key={service.id}>
          <Image src="/mark-35780_640.png" alt="check" width="25" height="25" />
          {service.text}
        </li>
      );
    }
  );
  const RenderFAQ = Data.TemplateProperties.FAQ.map((question) => {
    return (
      <CollapsibleElement
        key={question.id}
        buttonText={question.Q}
        Text={question.A}
      />
    );
  });

  return (
    <div className="ViewTemplate">
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
      <div className="Section1">
        <div className="innerContent">
          <div className="Left">
            {Data.TemplateProperties.section1.title && (
              <h2 data-aos="fade-down">
                {" "}
                {Data.TemplateProperties.section1.title}
              </h2>
            )}
            {Data.TemplateProperties.section1.content && (
              <div
                data-aos="fade-right"
                dangerouslySetInnerHTML={{
                  __html: Data.TemplateProperties.section1.content,
                }}
              ></div>
            )}
            <div className="button-wrapper">
              <a
                className="Button"
                data-aos="fade-up"
                href={`tel:${Data.callNumber}`}
              >
                Give us a call
              </a>
            </div>
          </div>
          <div className="Right" data-aos="fade-left">
            <h4>Book Our Service</h4>
            <ContactForm Target={Data.PageName} textColor="Black" />
          </div>
        </div>
      </div>
      {Data.TemplateProperties.section2.Cards.length > 0 && (
        <div className="Section2">
          {Data.TemplateProperties.section2.title && (
            <h2 data-aos="fade-down">
              {Data.TemplateProperties.section2.title}
            </h2>
          )}
          {Data.TemplateProperties.section2.content && (
            <div
              data-aos="fade-left"
              dangerouslySetInnerHTML={{
                __html: Data.TemplateProperties.section2.content,
              }}
            ></div>
          )}
          <Swiper
            freeMode={true}
            loop={
              Data.TemplateProperties.section2.Cards.length >= 4 ? true : false
            }
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
            modules={[Pagination, Autoplay]}
            className="SEC2swiper"
          >
            {renderCards}
          </Swiper>
        </div>
      )}
      <div className="Section3">
        {Data.TemplateProperties.section3.title && (
          <h2 data-aos="fade-down">{Data.TemplateProperties.section3.title}</h2>
        )}
        {Data.TemplateProperties.section3.content && (
          <div
            data-aos="fade-left"
            dangerouslySetInnerHTML={{
              __html: Data.TemplateProperties.section3.content,
            }}
          ></div>
        )}
        <ul className="serviceList">{renderServices}</ul>
      </div>
      <div className="Section4">
        {Data.TemplateProperties.section4.title && (
          <h2 data-aos="fade-down">{Data.TemplateProperties.section4.title}</h2>
        )}
        <div className="innerContent">
          <div className="Left">
            {Data.TemplateProperties.section4.content && (
              <div
                data-aos="fade-right"
                dangerouslySetInnerHTML={{
                  __html: Data.TemplateProperties.section4.content,
                }}
              ></div>
            )}
            <div className="button-wrapper">
              <button
                className="Button"
                data-aos="fade-up"
                onClick={handleShowModal}
              >
                Request this service
              </button>
              <a
                className="Button"
                data-aos="fade-up"
                href={`tel:${Data.callNumber}`}
              >
                Call {Data.callNumber}
              </a>
            </div>
          </div>
          <div className="Right">
            <Image
              src={Data.TemplateProperties.section4.image}
              alt="image"
              width="700"
              height="500"
            />
          </div>
        </div>
      </div>

      {sliderData && (
        <Section5
          ServerData={sliderData}
          specialStyles={true}
          content={Data.TemplateProperties.section5.content}
          title={Data.TemplateProperties.section5.title}
          Autoplay={Autoplay}
          Pagination={Pagination}
          SwiperSlide={SwiperSlide}
          Swiper={Swiper}
        />
      )}
      {section6Data && (
        <Section6 ServerData={section6Data} specialStyles={true} Tabs={tabs} />
      )}
      {Testimonials && (
        <Section4
          ServerData={Testimonials}
          Autoplay={Autoplay}
          Pagination={Pagination}
          SwiperSlide={SwiperSlide}
          Swiper={Swiper}
        />
      )}

      {Data.TemplateProperties.section7.Default && brands ? (
        <Section2
          Autoplay={Autoplay}
          Pagination={Pagination}
          SwiperSlide={SwiperSlide}
          Swiper={Swiper}
          ServerData={brands}
        />
      ) : (
        section7Data && (
          <Section2
            ServerData={section7Data}
            Autoplay={Autoplay}
            Pagination={Pagination}
            SwiperSlide={SwiperSlide}
            Swiper={Swiper}
          />
        )
      )}

      <div className="FAQ">
        {Data.TemplateProperties.FAQ.length > 0 && (
          <h2 data-aos="fade-down">Frequently Asked Questions</h2>
        )}
        {RenderFAQ}
      </div>

      <ContactPopUp
        show={showModal}
        handleClose={handleCloseModal}
        type="Contact"
      />
    </div>
  );
};

export default Template2;
