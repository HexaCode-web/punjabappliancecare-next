"use client";
import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import CreateToast from "@/lib/createToast";
import GETDOC from "@/lib/getDoc";
import LOGIN from "@/lib/login";
import DELETECURRENTUSER from "@/lib/deleteCurrentUser";
import DELETEDOC from "@/lib/deleteDoc";
import RESETPASSWORD from "@/lib/resetPassword";
import GETCOLLECTION from "@/lib/getCollection";
import encrypt from "@/lib/encrypt";
import decrypt from "@/lib/decrypt";
import SETDOC from "@/lib/setDoc";
import NEWUSER from "@/lib/newUser";
import "./Portal.css";
import MyModal from "../components/PopUps/Confirm/Confirm";
import { ToastContainer } from "react-toastify";
import Dashboard from "../Dashboard/page";
import Loading from "../loading";
export default function Portal() {
  const [user, setUser] = React.useState("");

  const [isLoading, setIsLoading] = React.useState(true);
  const [IsAdmin, setIsAdmin] = React.useState(false);
  const [showSignup, setShowSignUp] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [newUser, setNewUser] = React.useState({
    Active: false,
    Lname: "",
    Fname: "",

    Role: "User",
    dateOfBirth: "",
    email: "",
    deleteUser: false,
    gender: "",
    joinedAt: getCurrentDateFormatted(),
    Username: "",
    Password: "",
    phone: "",
  });
  const [showModal, setShowModal] = React.useState(false);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const handlePrimaryAction = async () => {
    handleCloseModal();
    try {
      RESETPASSWORD(email);
      CreateToast("email has been sent", "success");
    } catch (error) {
      CreateToast(error, "error");
    }
    setEmail("");
  };
  const [loginData, setLoginData] = React.useState({
    email: "",
    Password: "",
  });
  const changeForm = () => {
    setShowSignUp((prev) => !prev);
    setLoginData({
      email: "",
      Password: "",
    });
    setNewUser((prev) => {
      return { ...prev, email: "", Password: "", Username: "" };
    });
  };

  const UpdateInput = (form, event) => {
    if (form === "login") {
      const { name, value } = event.target;
      setLoginData((prev) => {
        return {
          ...prev,
          [name]: value,
        };
      });
    }
    if (form === "newUser") {
      const { name, value } = event.target;
      setNewUser((prev) => {
        return {
          ...prev,
          [name]: value,
        };
      });
    }
  };
  function getCurrentDateFormatted() {
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, "0");
    const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // January is 0!
    const year = String(currentDate.getFullYear()).slice(-2);
    return `${day}/${month}/${year}`;
  }

  const Signup = async (e) => {
    e.preventDefault();
    if (
      ![newUser.Fname, newUser.Lname, newUser.Password, newUser.email].every(
        Boolean
      )
    ) {
      CreateToast("Please fill out all the fields", "error");
      return;
    }
    CreateToast("creating account...", "info");
    e.preventDefault();
    const Users = await GETCOLLECTION("users");
    try {
      const CheckUsername = Users.find((user) => {
        return user.Username === newUser.Username;
      });

      if (CheckUsername) {
        CreateToast("username is taken.", "error");

        return;
      }
      const authUser = await NEWUSER(newUser.email, newUser.Password);
      await SETDOC(
        "users",
        authUser.uid,
        { ...newUser, id: authUser.uid, Password: "" },
        true
      );
      CreateToast("Successfully signed up! You can now login.", "success");
      setShowSignUp(false);
    } catch (error) {
      if (error.message.includes("auth/user-not-found")) {
        CreateToast("no such user", "error");
      } else if (error.message.includes("invalid-email")) {
        CreateToast("invalid Email", "error");
      } else if (error.message.includes("missing-password")) {
        CreateToast("Password cant be empty", "error");
      } else if (error.message.includes("auth/wrong-password")) {
        CreateToast(
          "Wrong Password if you forgot it, try resetting it",
          "error"
        );
      } else {
        CreateToast(error.message, "error");
      }
    }
  };
  const signIn = async (e) => {
    e.preventDefault();
    CreateToast("logging in", "info");

    try {
      const authUser = await LOGIN(loginData.email, loginData.Password);
      const DBuser = await GETDOC("users", authUser.uid);
      if (DBuser.deleteUser) {
        await DELETEDOC("users", authUser.uid),
          await DELETECURRENTUSER(),
          CreateToast("sorry your account have been deleted", "info");
        return;
      } else {
        await SETDOC("users", authUser.uid, { ...DBuser, Active: true });
        sessionStorage.setItem(
          "activeUser",
          JSON.stringify({ id: encrypt(DBuser.id) })
        );
        if (DBuser.Role === "Owner" || DBuser.Role === "Admin") {
          window.location.href = "/Dashboard";
        } else {
          window.location.href = `/Portal/${encrypt(user.id)}`;
        }
      }
    } catch (error) {
      if (error.message.includes("auth/user-not-found")) {
        CreateToast("no such user", "error");
      } else if (error.message.includes("invalid-email")) {
        CreateToast("invalid Email", "error");
      } else if (error.message.includes("missing-password")) {
        CreateToast("Password cant be empty", "error");
      } else if (error.message.includes("auth/wrong-password")) {
        CreateToast(
          "Wrong Password if you forgot it, try resetting it",
          "error"
        );
      } else {
        CreateToast(error.message, "error");
      }
    }
  };
  useEffect(() => {
    setUser();
  }, []);

  const CheckInfo = (res) => {
    const vals = Object.keys(res).map(function (key) {
      return res[key];
    });
    for (let index = 0; index < vals.length; index++) {
      if (typeof vals[index] !== "boolean") {
        if (typeof vals[index] !== "object")
          if (vals[index] !== 0) {
            if (!vals[index]) {
              CreateToast(
                `your Profile is incomplete! go to ${
                  res.Role === "Admin" || res.Role === "Owner"
                    ? "Admin Profile"
                    : "settings"
                } to complete it`,
                "warning"
              );
              return;
            }
          }
      }
    }
  };
  useEffect(() => {
    const checkData = async () => {
      let fetchedData = {};
      GETDOC(
        "users",
        decrypt(JSON.parse(sessionStorage.getItem("activeUser"))?.id)
      ).then((res) => {
        fetchedData = res;
        fetchedData.Role === "Admin" || fetchedData.Role === "Owner"
          ? setIsAdmin(true)
          : setIsAdmin(false);
        setIsLoading(false);
        setUser(fetchedData);
        if (fetchedData.Role === "User") {
          CheckInfo(fetchedData);
        }
      });
    };
    if (sessionStorage.getItem("activeUser")) {
      checkData();
    }
  }, []);
  return (
    <>
      {user ? (
        isLoading ? (
          <Loading loading={isLoading} />
        ) : IsAdmin ? (
          <Dashboard />
        ) : (
          user && (window.location.href = `/Portal/${encrypt(user.id)}`)
        )
      ) : (
        <div className="Portal ">
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
          <h3
            className="animate__animated animate__fast animate__fadeInDown"
            style={{ animationDelay: ".5s" }}
          >
            {!showSignup ? "Welcome Back" : "Register"}
          </h3>
          {showSignup ? (
            <form className="animate__animated animate__fast animate__fadeInDown SignupForm">
              <div className="formItem ">
                <label htmlFor="email">Email:</label>
                <input
                  required
                  type="email"
                  id="email"
                  name="email"
                  value={newUser.email}
                  onChange={() => {
                    UpdateInput("newUser", event);
                  }}
                ></input>
              </div>
              <div className="formItem ">
                <label htmlFor="username">Username:</label>
                <input
                  required
                  type="text"
                  id="username"
                  name="Username"
                  value={newUser.Username}
                  onChange={() => {
                    UpdateInput("newUser", event);
                  }}
                ></input>
              </div>
              <div className="NameWrapper">
                <div className="formItem animate__animated animate__fast animate__fadeIn">
                  <label htmlFor="Fname">FirstName:</label>
                  <input
                    required
                    type="text"
                    id="Fname"
                    name="Fname"
                    value={newUser.Fname}
                    onChange={() => {
                      UpdateInput("newUser", event);
                    }}
                  ></input>
                </div>
                <div className="formItem animate__animated animate__fast animate__fadeIn">
                  <label htmlFor="Lname">LastName:</label>
                  <input
                    required
                    type="text"
                    id="Lname"
                    name="Lname"
                    value={newUser.Lname}
                    onChange={() => {
                      UpdateInput("newUser", event);
                    }}
                  ></input>
                </div>
              </div>
              <div className="formItem ">
                <label htmlFor="Password">Password:</label>
                <input
                  required
                  type="password"
                  id="Password"
                  name="Password"
                  value={newUser.Password}
                  onChange={() => {
                    UpdateInput("newUser", event);
                  }}
                ></input>
              </div>
              <input
                type="submit"
                className="Button"
                value="sign up"
                onClick={Signup}
              ></input>
            </form>
          ) : (
            <form className="animate__animated animate__fast animate__fadeInDown">
              <div className="formItem ">
                <label htmlFor="email">Email:</label>
                <input
                  required
                  type="email"
                  id="email"
                  name="email"
                  value={loginData.email}
                  onChange={() => {
                    UpdateInput("login", event);
                  }}
                ></input>
              </div>
              <div className="formItem " style={{ animationDelay: ".7s" }}>
                <label htmlFor="Password">Password:</label>
                <input
                  min={8}
                  required
                  type="password"
                  id="Password"
                  name="Password"
                  value={loginData.Password}
                  onChange={() => {
                    UpdateInput("login", event);
                  }}
                ></input>
              </div>
              <input
                type="submit"
                value="login"
                className="Button"
                onClick={signIn}
              ></input>
            </form>
          )}
          <p
            className="animate__animated animate__fast animate__fadeInUp"
            style={{
              textAlign: "center",
              animationDelay: "1s",
              marginTop: "15px",
            }}
          >
            {!showSignup ? "not a user?" : "already have an account?"}{" "}
            <span style={{ cursor: "pointer" }} onClick={changeForm}>
              {!showSignup ? "sign up now" : "sign in now!"}
            </span>
          </p>
          <button
            style={{
              border: "none",
              animationDelay: "1.1s",
              opacity: ".7",
              backgroundColor: "white",
              fontSize: ".8rem",
            }}
            className="animate__animated animate__fast animate__fadeInUp"
            onClick={handleShowModal}
          >
            Forgot Password?
          </button>
          <MyModal
            className="Confirm"
            show={showModal}
            handleClose={handleCloseModal}
            title="Reset password"
            primaryButtonText="send email"
            handlePrimaryAction={handlePrimaryAction}
          >
            <>
              <p>
                please put your email and if its a valid email we will send a
                reset password link to it
              </p>
              <div className="formItem ">
                <label htmlFor="email">Email:</label>
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                ></input>
              </div>
            </>
          </MyModal>
        </div>
      )}
    </>
  );
}
