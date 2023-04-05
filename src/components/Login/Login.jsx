import axios from "axios";
import Joi from "joi";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login(p) {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isloading, setisloading] = useState(false);
  const [errorList, seterrorList] = useState([]);

  let navigate = useNavigate();

  function getUserData(e) {
    let userData = { ...user };
    userData[e.target.name] = e.target.value;
    setUser(userData);
  }

  function validation() {
    let schema = Joi.object({
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .required(),
      password: Joi.string()
        .pattern(/^[A-Z][a-z]{3,6}/)
        .required(),
    });

    return schema.validate(user, { abortEarly: false });
  }
  async function postUserData() {
    let { data } = await axios.post(
      `https://route-movies-api.vercel.app/signin`,
      user
    );
    if (data.message == "success") {
      //7elo
      localStorage.setItem('userToken',data.token)
      navigate('/home');
      setisloading(false);
      // console.log(data);
      p.saveUserData();
    } else {
      //w7sh
      setError(data.message);
      setisloading(false);
    }
  }

  function submitLoginForm(e) {
    setisloading(true);
    e.preventDefault();

    let valid = validation();
    if (valid.error) {
      seterrorList(valid.error.details);
      setisloading(false);
      // console.log(errorList);
    } else {
      postUserData();
    }
  }

  return (
    <>
      <form onSubmit={submitLoginForm}>
        {error.length > 0 ? (
          <div className="alert alert-danger text-center">
            <span className="fs-5">{error}</span>
          </div>
        ) : (
          ""
        )}
        <label className="fs-5 mb-1" htmlFor="email">
          Email
        </label>
        <input
          onChange={getUserData}
          type="email"
          name="email"
          className="form-control bg-transparent borderInput mb-2 text-light"
        />
        {errorList.filter((error) => error.context.label == "email")[0] ? (
          <div className="alert alert-danger">
            {
              errorList.filter((error) => error.context.label == "email")[0]
                ?.message
            }
          </div>
        ) : (
          ""
        )}
        <label className="fs-5 mb-1" htmlFor="password">
          Password
        </label>
        <input
          onChange={getUserData}
          type="password"
          name="password"
          className="form-control bg-transparent borderInput mb-2 text-light"
        />
        {errorList.filter(e => e.context.label=="password")[0]?<div className="alert alert-danger">
            password is incorrect
          </div>:''}
        <button className="btn btn-outline-warning text-light mt-3">
          {isloading == false ? (
            "Login"
          ) : (
            <i className="fa-solid fa-circle-notch fa-spin"></i>
          )}
        </button>
      </form>
    </>
  );
}
