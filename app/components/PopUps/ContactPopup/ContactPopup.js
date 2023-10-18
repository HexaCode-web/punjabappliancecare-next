import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import "./ContactPopup.css";
import "bootstrap/dist/css/bootstrap.min.css";

import EmailTemplate from "../EmailTemplate";
import GETCOLLECTION from "@/lib/getCollection";
import SENDMAIL from "@/lib/sendEmail";
import CreateToast from "@/lib/createToast";
import Image from "next/image";
import Link from "next/link";
function ContactPopUp(props) {
  const [email, setEmail] = useState("");
  const [formData, setFormData] = useState({
    Lname: "",
    Fname: "",
    Email: "",
    Number: "",
    Subject: "",
    Message: "",
  });
  const [Data, setData] = useState({ Phone: "", Email: "", Description: "" });
  useEffect(() => {
    const FetchEmail = async () => {
      const res = await GETCOLLECTION("customization");
      setEmail(res[2].Email);
      setData({
        Email: res[0].FooterData.Email,
        Phone: res[0].FooterData.Phone,
        Description: res[2].ModalDescription,
      });
    };
    FetchEmail();
  }, []);
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );
  function handleWindowSizeChange() {
    setWidth(typeof window !== "undefined" ? window.innerWidth : 0);
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleWindowSizeChange);
      return () => {
        window.removeEventListener("resize", handleWindowSizeChange);
      };
    }
  }, []);

  const [formType, setFormType] = useState("");
  const FormTypes = {
    Contact: {
      title: "Contact Us",
      ExtraProperties: {},
    },

    ProjectDiscuss: {
      title: "Discuss Your Project with us",
      ExtraProperties: { ProjectType: true },
    },
  };

  useEffect(() => {
    switch (props.type) {
      case "Contact":
        setFormType(FormTypes.Contact);
        break;
      case "Project":
        setFormType(FormTypes.ProjectDiscuss);
        break;

      default:
        break;
    }
  }, []);
  const SubmitForm = (e) => {
    e.preventDefault();
    SENDMAIL(
      EmailTemplate,
      email,
      "punjabappliancecare",
      `${formData.Fname} has submitted a form`,
      formData,
      "New Contact Form Submission"
    )
      .then((response) => {
        CreateToast("Email has been sent");
      })
      .catch((error) => {
        console.error(error);
        CreateToast("error sending the email");
      });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  return (
    <Modal
      className={props.className}
      show={props.show}
      onHide={props.handleClose}
    >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <>
          <div className={`Form-wrapper ${width < 1000 ? "small" : ""}`}>
            <h2>{formType?.title}</h2>
            <form className="ContactForm" onSubmit={SubmitForm}>
              <input
                id="Fname"
                required
                type="text"
                name="Fname"
                value={formData.Fname}
                placeholder="First Name"
                onChange={handleChange}
              />
              <input
                required
                type="text"
                name="Lname"
                placeholder="Last Name"
                value={formData.Lname}
                id="Lname"
                onChange={handleChange}
              />
              <input
                required
                type="email"
                name="Email"
                placeholder="Email"
                value={formData.Email}
                onChange={handleChange}
                id="Email"
              />

              <input
                required
                type="text"
                name="Number"
                placeholder="Contact Number"
                value={formData.Number}
                onChange={handleChange}
                id="number"
              />
              <input
                required
                type="text"
                name="Subject"
                placeholder="Subject"
                value={formData.Subject}
                onChange={handleChange}
                id="Subject"
              />
              <textarea
                required
                name="Message"
                placeholder="Message"
                value={formData.Message}
                onChange={handleChange}
                id="Message"
              />
              <button>Send</button>
            </form>
          </div>
          {width > 1000 ? (
            <div className="SidePanel">
              <div className="section">
                <h2>{Data.Description}</h2>
              </div>
              <div className="section">
                <h5>Contact Us</h5>
                <div className="ContactInfo">
                  <a href={`tel:${Data.Phone}`}>
                    <Image
                      alt="Phone"
                      src="/phone.png"
                      width="32"
                      height="32"
                    />{" "}
                    {Data.Phone}
                  </a>
                  <Link href={`mailto:${Data.Email}`}>
                    <Image alt="Email" src="/mail.png" width="32" height="32" />{" "}
                    {Data.Email}
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </>
      </Modal.Body>
    </Modal>
  );
}

export default ContactPopUp;
