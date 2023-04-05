import axios from "axios";
import { func } from "joi";
import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import MediaItem from '../MediaItem/MediaItem'
export default function Nav({ userData, logOut }) {
  const [movies , setMovies]=useState([]);
  const [name , setName]=useState('');

  async function getDataFromApi(name){
    let {data}=await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=67cf6dbae13ea6866f23d0336f15d01d&language=en-US&query=${name}&page=1&include_adult=false`);
    setMovies(data.results);
    // console.log(movies);
  }

  function search(e){
    setName(e.target.value);
    getDataFromApi(name);
  }

  function clearSearchResults(e){
    setName('')
  }



  return (
    <>
      <nav name={name} className=" shadow navbar navbar-expand-lg bg-body-tertiary  mb-5 nvbr position-sticky top-0 ">
        <div className="container-fluid">
          <label className="m-0 pe-3 fs-1">
            <h1>Noxe</h1>
          </label>
          <button
            className="navbar-toggler bg-warning"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span>
              <i className="fa-solid fa-bars fa-beat text-light"></i>
            </span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {userData ? (
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink
                    aria-current="page"
                    to="home"
                    className={({ isActive }) =>
                      isActive
                        ? "bg-warning nav-link text-light rounded-2"
                        : "nav-link text-light"
                    }
                  >
                    Home
                  </NavLink>
                </li>
                <li className="nav-item text-light">
                  <NavLink
                    to="movies"
                    className={({ isActive, isPending }) =>
                      isActive
                        ? "bg-warning nav-link text-light rounded-2"
                        : "nav-link text-light"
                    }
                  >
                    Movies
                  </NavLink>
                </li>
                <li className="nav-item text-light">
                  <NavLink
                    className={({ isActive, isPending }) =>
                      isActive
                        ? "bg-warning nav-link text-light rounded-2"
                        : "nav-link text-light"
                    }
                    to="tv"
                  >
                    Tv
                  </NavLink>
                </li>
                <li className="nav-item text-light">
                  <NavLink
                    className={({ isActive, isPending }) =>
                      isActive
                        ? "bg-warning nav-link text-light rounded-2"
                        : "nav-link text-light"
                    }
                    to="people"
                  >
                    People
                  </NavLink>
                </li>
              </ul>
            ) : (
              ""
            )}

            <form className="d-flex ms-auto" role="search">
              <div className="right d-flex align-items-center flex-md-row flex-column" >
                <div className="socialMedia mb-1 m-0 pe-3 d-flex me-auto">
                  <Link target='_blank' to='https://www.facebook.com/mhuud.abdullah'><i className="fa-brands fa-facebook fs-5 m-0 pe-2"></i></Link>
                  <Link target='_blank' to='https://www.instagram.com/mhmuud_abdullah/'><i className="fa-brands fa-instagram fs-5 m-0 pe-2"></i></Link>
                  <Link target='_blank' to='https://www.linkedin.com/in/mahmoud-abdullah-a781a4266/'><i className="fa-brands fa-linkedin-in fs-5 m-0 pe-2"></i></Link>
                  <Link target='_blank' to='https://github.com/MahmoudAbdulla7'><i className="fa-brands fa-github fs-5 m-0 pe-2"></i></Link>
                </div>
                <div className="log">
                  <ul className="list-unstyled m-0 d-flex flex-md-row flex-column">
                    {userData ? (
                      <>
                        <input onChange={search}
                          className="form-control me-2 mb-1"
                          type="Search"
                          placeholder="Search for movies"
                          aria-label="Search"
                        />
                        <li className="pe-3">
                          <NavLink
                            className={({ isActive, isPending }) =>
                              isActive
                                ? "bg-warning nav-link text-light rounded-2 p-1"
                                : "nav-link text-light mb-1"
                            }
                            to="profile"
                          >
                            Profile
                          </NavLink>
                        </li>
                        <li className="pe-3">
                          <span onClick={logOut} className="cursor-pointer">
                            LogOut
                          </span>
                        </li>
                      </>
                    ) : (
                      <>
                        <li className=" pe-3">
                          <NavLink
                            className={({ isActive, isPending }) =>
                              isActive
                                ? "bg-warning nav-link text-light  rounded-2 p-1"
                                : "nav-link text-light"
                            }
                            to=""
                          >
                            Register
                          </NavLink>
                        </li>
                        <li className="pe-3">
                          <NavLink
                            className={({ isActive }) =>
                              isActive
                                ? "bg-warning nav-link text-light rounded-2 p-1"
                                : "nav-link text-light"
                            }
                            to="login"
                          >
                            Login
                          </NavLink>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            </form>
          </div>
        </div>
      </nav>

<div className="container">
  <div className="row">
  {name?<>  {movies?.filter((el)=> el.poster_path !== null).slice(0,20).map((item ,idx)=> <MediaItem clearSearchResults={clearSearchResults} key={idx} item={item}/>)}</>:''}
  </div>
</div>

    </>
  );
}
