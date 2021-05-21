import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { register } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import "../scss/signIn.css";
import restaurant_img4 from "../scss/images/restaurant4.jpg";
import anime from "animejs/lib/anime.es.js";

export default function RegisterScreen(props) {
  var textWrapper = document.querySelector(".ml6 .letters");
  // textWrapper.innerHTML = textWrapper.textContent.replace(
  //   /\S/g,
  //   "<span className='letter'>$&</span>"
  // );

  anime
    .timeline({ loop: true })
    .add({
      targets: ".ml6 .letter",
      translateY: ["1.1em", 0],
      translateZ: 0,
      duration: 750,
      delay: (el, i) => 50 * i,
    })
    .add({
      targets: ".ml6",
      opacity: 0,
      duration: 1000,
      easing: "easeOutExpo",
      delay: 1000,
    });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";

  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo, loading, error } = userRegister;

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Password and confirm password are not match");
    } else {
      dispatch(register(name, email, password));
    }
  };

  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [props.history, redirect, userInfo]);
  return (
    <div className=" row body-signIn">
      <div
        className="col description-signIn"
        style={{ marginRight: "-5rem", marginLeft: "8rem" }}
      >
        <div></div>
        <div>
          <label />
          <div style={{ textAlign: "center", marginBottom: "5rem" }}>
            Already have an account?{" "}
            <Link to={`/signin?redirect=${redirect}`}>Sign-In</Link>
          </div>
          <div className="intro-registry" style={{ marginBottom: "5rem" }}>
            <h1 class="ml6">
              <span class="text-wrapper">
                <span className="letters">Wellcom to VietFood</span>
                <span></span>
              </span>
            </h1>
          </div>
          <div>
            <img
              src={restaurant_img4}
              style={{ width: "780px", height: "450px", borderRadius: "30%" }}
            ></img>
          </div>
        </div>
      </div>
      <div className="col form-card-signIn " style={{ marginRight: "8rem" }}>
        <form className="form " onSubmit={submitHandler}>
          <div style={{ width: "505px" }}>
            <h1>Create Account</h1>
          </div>
          {loading && <LoadingBox></LoadingBox>}
          {error && <MessageBox variant="danger">{error}</MessageBox>}
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              placeholder="Enter name"
              required
              onChange={(e) => setName(e.target.value)}
            ></input>
          </div>
          <div>
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              id="email"
              placeholder="Enter email"
              required
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter password"
              required
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>
          <div>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Enter confirm password"
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></input>
          </div>
          <div>
            <label />
            <button
              className="primary btn"
              type="submit"
              style={{ fontSize: "20px" }}
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
