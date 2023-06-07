import React, { useState } from "react";
import styles from "./register.module.css";
import image from "../../images/image.png";
import logo from "../../images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Register = () => {
  const [type, setType] = useState("password");
  const [text, setText] = useState(<AiOutlineEye />);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const showPassword = () => {
    if (type === "text") {
      setText(<AiOutlineEye />);

      setType("password");
    } else {
      setText(<AiOutlineEyeInvisible />);
      setType("text");
    }
  };

  const handleNameChange = (e) => {};

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
  };
  const hasValue = (value) => {
    return value.trim().length > 0;
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.logo}>
          <img src={logo} alt="" />
          <span>Create your Account </span>
        </div>
        <div className={styles.iputBox}>
          <form onSubmit={submitHandler}>
          <div className={`${styles.inputfields}`}>
              <input
                type="text"
                required={true}
                value={name}
                onChange={handleNameChange}
              />
              <span
                className={`${hasValue(name) ? `${styles.hasValue}` : ""}`}
              >
                Name
              </span>
            </div>
            <div className={`${styles.inputfields}`}>
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
                className={`${hasValue(password) ? `${styles.hasValue}` : ""}`}
              >
                Password
              </span>
              <p onClick={showPassword}>{text}</p>
            </div>
            <div className={styles.inputfields}>
              <input
                type={type}
                value={confirmPassword}
                required={true}
                onChange={handleConfirmPasswordChange}
              />
              <span
                className={`${
                  hasValue(confirmPassword) ? `${styles.hasValue}` : ""
                }`}
              >
                Confirm Password
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
              Create
            </button>
          </form>
        </div>
        <h3>
          Already have an account ? <Link to="/login">Sign-In</Link>
        </h3>
      </div>
    </>
  );
};

export default Register;
