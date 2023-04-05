import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <>
    {/* <div>footer</div> */}
      {/* <nav className="navbar navbar-expand-lg shadow">
        <div className="container-fluid">
          <Link className="m-0" to="home">
            <h1 className="m-0 pe-3">Noxe</h1>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link active text-light"
                  aria-current="page"
                  to="movies"
                >
                  Movies
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link text-light"
                  aria-current="page"
                  to="tv"
                >
                  Tv
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link text-light"
                  aria-current="page"
                  to="people"
                >
                  People
                </Link>
              </li>
            </ul>

            <div className="socialMedia pe-3 d-flex flex-column flex-md-row">
            <i className="fa-brands fa-facebook fs-5 pe-2"></i>
            <i className="fa-brands fa-instagram fs-5 pe-2"></i>
            <i className="fa-brands fa-spotify fs-5 pe-2"></i>
          </div>
          <div className="log">
            <ul className="list-unstyled d-flex flex-column flex-md-row">
              <li className="pe-3"><Link to=''>Register</Link></li>
              <li className="pe-3"><Link to='login'>Login</Link></li>
              <li className="pe-3"><span>LogOut</span></li>
            </ul>
          </div>
          </div>
        </div>
      </nav> */}
    </>
  );
}
