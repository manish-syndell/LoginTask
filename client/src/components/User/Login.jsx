import React, { useEffect, useState } from "react";
import styles from "./login.module.css";
import image from "../../images/image.png";
import logo from "../../images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { loadUser, loginHandler } from "../../action";
import Navbar from "../Header/Navbar";

const Login = () => {
  const [type, setType] = useState("password");
  const [text, setText] = useState(<AiOutlineEye />);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useNavigate();
  const dispatch = useDispatch();

  const { user, message, isVerified } = useSelector((state) => state.user);

  const showPassword = () => {
    if (type === "text") {
      setText(<AiOutlineEye />);

      setType("password");
    } else {
      setText(<AiOutlineEyeInvisible />);
      setType("text");
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const hasValue = (value) => {
    return value.trim().length > 0;
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      if (email === "" || password === "") {
        alert("Please enter email or password");
      } else {
        dispatch(loginHandler(email, password));
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    
    dispatch(loadUser());

    if (user && isVerified) {
      history("/");
    }
    if (message) {
      alert(message);
    }
    if (!isVerified) {
    } else {
    }
  }, [dispatch, history, message, user, isVerified]);

  return (
    <>
    {/* <Navbar/> */}
      <div className={styles.bodyStyle}>
        <div className={styles.container}>
          <div className={styles.leftBox}>
            <img src={image} alt="ClutchUP" />
          </div>
          <div className={styles.rightBox}>
            <div className={styles.logo}>
              <img src={logo} alt="" />
              <span>Sign into your Account </span>
            </div>
            <div className={styles.iputBox}>
              <form onSubmit={submitHandler}>
                <div
                  className={`${styles.inputfields} ${
                    hasValue(email) ? `${styles.hasValue}` : ""
                  }`}
                >
                  <input
                    type="email"
                    required={true}
                    value={email}
                    onChange={handleEmailChange}
                  />
                  <span
                    className={`${hasValue(email) ? `${styles.hasValue}` : ""}`}
                  >
                    Email
                  </span>
                </div>
                <div className={styles.inputfields}>
                  <input
                    type={type}
                    value={password}
                    required={true}
                    onChange={handlePasswordChange}
                  />
                  <span
                    className={`${
                      hasValue(password) ? `${styles.hasValue}` : ""
                    }`}
                  >
                    Password
                  </span>
                  <p onClick={showPassword}>{text}</p>
                </div>
                <div className={styles.linkBox}>
                  <div>
                    <input type="checkbox" name="remember" id="" />
                    &nbsp; Remember me
                  </div>
                  <span className={styles.link}>Fogot Password</span>
                </div>
                <button className={styles.btn} type="submit">
                  Sign In
                </button>
              </form>
            </div>
            <h3>
              Don't have an account ? <Link to="/register">Sign-Up</Link>
            </h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
