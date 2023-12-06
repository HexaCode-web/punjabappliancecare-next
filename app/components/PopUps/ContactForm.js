"use client";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
// import SENDMAIL from "@/lib/sendEmail";
import EmailTemplate from "./EmailTemplate";
import "./ContactPopup/ContactPopup.css";
import CreateToast from "@/lib/createToast";

const ContactForm = ({ Target, textColor }) => {
  const [email, setEmail] = useState("");
  const [formData, setFormData] = useState({
    Lname: "",
    Fname: "",
    Email: "",
    Number: "",
    Subject: "",
    Message: "",
  });

  useEffect(() => {
    const FetchEmail = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_END_POINT_URL}/WebSite`
      ).then((res) => res.json());
      setEmail(res[0].Email);
    };
    FetchEmail();
  }, []);
  const SubmitForm = (e) => {
    e.preventDefault();
    let EmailHeader;
    let Subject;
    if (Target) {
      EmailHeader = `${formData.Fname} has Requested the service in ${Target} `;
      Subject = `Service Needed in ${Target}`;
    } else {
      EmailHeader = `${formData.Fname} has submitted a form`;
      Subject = "New Contact Form Submission";
    }
    // SENDMAIL(
    //   EmailTemplate,
    //   email,
    //   "punjabappliancecare",
    //   EmailHeader,
    //   formData,
    //   Subject
    // )
    //   .then((response) => {
    //     CreateToast("Email has been sent");
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //     CreateToast("error sending the email");
    //   });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  return (
    <form className="ContactForm" onSubmit={SubmitForm}>
      <input
        id="Fname"
        required
        type="text"
        data-aos="fade-up"
        name="Fname"
        value={formData.Fname}
        style={{ color: textColor }}
        placeholder="First Name"
        onChange={handleChange}
      />
      <input
        required
        type="text"
        name="Lname"
        data-aos="fade-up"
        style={{ color: textColor }}
        placeholder="Last Name"
        value={formData.Lname}
        id="Lname"
        onChange={handleChange}
      />
      <input
        required
        style={{ color: textColor }}
        type="email"
        data-aos="fade-up"
        name="Email"
        placeholder="Email"
        value={formData.Email}
        onChange={handleChange}
        id="Email"
      />

      <input
        required
        style={{ color: textColor }}
        type="text"
        data-aos="fade-up"
        name="Number"
        placeholder="Contact Number"
        value={formData.Number}
        onChange={handleChange}
        id="number"
      />
      <input
        required
        style={{ color: textColor }}
        type="text"
        name="Subject"
        data-aos="fade-up"
        placeholder="Subject"
        value={formData.Subject}
        onChange={handleChange}
        id="Subject"
      />
      <textarea
        required
        style={{ color: textColor }}
        name="Message"
        placeholder="Message"
        data-aos="fade-up"
        value={formData.Message}
        onChange={handleChange}
        id="Message"
      />
      <button>Send</button>
    </form>
  );
};

export default ContactForm;
