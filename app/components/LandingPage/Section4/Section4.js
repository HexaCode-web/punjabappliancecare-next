"use client";
/*global google*/
import React, { useEffect, useState } from "react";
import "./Section4.css";
import Testimonial from "../../Cards/Testimonial/Testimonial";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Pagination, Autoplay } from "swiper";
import "swiper/css/pagination";
import { v4 as uuid } from "uuid";
import Image from "next/image";
import Link from "next/link";
const Section4 = (props) => {
  const [placeDetails, setPlaceDetails] = useState(null);
  useEffect(() => {
    // Create a script element
    const script = document.createElement("script");
    console.log(process.env.NEXT_PUBLIC_REACT_APP_GOOGLEMAP);
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_REACT_APP_GOOGLEMAP}&libraries=places&callback`;

    // Create a map container div
    const mapDiv = document.querySelector("#map"); // Use the correct selector

    // Callback function when the script is loaded
    script.onload = () => {
      // Create a PlacesService and get details
      const service = new google.maps.places.PlacesService(mapDiv);
      service.getDetails(
        {
          placeId: "ChIJ7czy9dYVK4gRLvLxLLZXTrQ",
        },
        function (place, status) {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            // Place details retrieved successfully
            setPlaceDetails(place);
          } else {
            // Handle the error here, for example:
            console.error("Error fetching place details:", status);
            // You can add additional error handling logic as needed
          }
        }
      );
    };

    // Error handling if the script fails to load
    script.onerror = () => {
      console.error("Error loading Google Maps script");
      // You can handle this error as needed, e.g., show a message to the user
    };

    // Add the script to the body
    document.body.appendChild(script);

    // Cleanup function
    return () => {
      // Remove the mapDiv and script element
      document.body.removeChild(script);
    };
  }, []);

  const RenderTestimonials = placeDetails?.reviews.map((review) => {
    return (
      <SwiperSlide key={uuid()}>
        <Testimonial Testimonial={review} />
      </SwiperSlide>
    );
  });

  return (
    <section className="Section4">
      <div className="Top">
        {props.ServerData.Title && (
          <h2 data-aos="fade-down">{props.ServerData.Title}</h2>
        )}
        {props.ServerData.paragraph && (
          <p data-aos="fade-down">{props.ServerData.paragraph}</p>
        )}
      </div>

      <div className="GeneralRating" data-aos="fade-down">
        <div className="Left">
          <div className="logo">
            <Image src="/google.png" alt="google" width="60" height="60" />

            <span>Rating</span>
          </div>
          <div className="TotalRating">
            <span>
              {placeDetails?.rating} ({placeDetails?.reviews.length})
            </span>
            {placeDetails?.rating >= 1 && (
              <Image
                src="/starFilled.png"
                alt="Star Filled"
                width="20"
                height="20"
              />
            )}
            {placeDetails?.rating >= 2 && (
              <Image
                src="/starFilled.png"
                alt="Star Filled"
                width="20"
                height="20"
              />
            )}
            {placeDetails?.rating >= 3 && (
              <Image
                src="/starFilled.png"
                alt="Star Filled"
                width="20"
                height="20"
              />
            )}
            {placeDetails?.rating >= 4 && (
              <Image
                src="/starFilled.png"
                alt="Star Filled"
                width="20"
                height="20"
              />
            )}
            {placeDetails?.rating >= 5 && (
              <Image
                src="/starFilled.png"
                alt="Star Filled"
                width="20"
                height="20"
              />
            )}
          </div>
        </div>
        <Link
          className="Right"
          href="https://search.google.com/local/writereview?placeid=ChIJ7czy9dYVK4gRLvLxLLZXTrQ"
          target="_blank"
          rel="noreferrer"
        >
          Write a review
        </Link>
      </div>
      <div className="Bottom" data-aos="fade">
        <Swiper
          freeMode={true}
          loop={true}
          slidesPerView={1}
          spaceBetween={10}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          modules={[Pagination, Autoplay]}
          className="Swiper-Testimonials"
        >
          {RenderTestimonials}
        </Swiper>
      </div>
    </section>
  );
};

export default Section4;
