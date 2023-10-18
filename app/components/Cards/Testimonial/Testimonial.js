import React from "react";
import "./Testimonial.css";
import Image from "next/image";

export default function Testimonial(props) {
  const Testimonial = props.Testimonial;

  return (
    <div className="Testimonial">
      <div className="Left">
        {Testimonial.rating && (
          <div className="Rating-wrapper">
            {Testimonial.rating >= 1 && (
              <Image
                src="/starFilled.png"
                alt="Star Filled"
                width="24"
                height="24"
              />
            )}
            {Testimonial.rating >= 2 && (
              <Image
                src="/starFilled.png"
                alt="Star Filled"
                width="24"
                height="24"
              />
            )}
            {Testimonial.rating >= 3 && (
              <Image
                src="/starFilled.png"
                alt="Star Filled"
                width="24"
                height="24"
              />
            )}
            {Testimonial.rating >= 4 && (
              <Image
                src="/starFilled.png"
                alt="Star Filled"
                width="24"
                height="24"
              />
            )}
            {Testimonial.rating >= 5 && (
              <Image
                src="/starFilled.png"
                alt="Star Filled"
                width="24"
                height="24"
              />
            )}
          </div>
        )}
        {Testimonial.text && <p className="Review">{Testimonial.text}</p>}
        {Testimonial.author_name && (
          <div className="Person">
            <Image
              src={Testimonial.profile_photo_url}
              alt="profile Pic"
              width="24"
              height="24"
            />
            <p className="name">{Testimonial.author_name}</p>
          </div>
        )}
      </div>
    </div>
  );
}
