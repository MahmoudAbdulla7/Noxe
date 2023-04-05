import React from "react";
import Footer from "../Footer/Footer";
import Nav from "../Nav/Nav";
import { Outlet, useNavigate } from "react-router-dom";

export default function Layout({userData ,setUserData}) {
  let navigate =useNavigate();

  function logOut(){
    localStorage.removeItem('userToken');
    setUserData(null);
    navigate('login');
  }
  return (
    <>
      <Nav logOut={logOut} userData={userData}/>
      <div className="container">
      <Outlet/>
      </div>
      <Footer />
    </>
  );
}
