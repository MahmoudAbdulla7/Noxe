import axios from "axios";
import { link } from "joi";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";


export default function ItemDetailes({name}) {
  let { id, mediatype } = useParams();
  const [dtls, setDtls] = useState({});
  const [genres, setgenres] = useState([]);
  const [biography, setbiography] = useState([]);

  async function getDetailes(id, media_type) {
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}?api_key=67cf6dbae13ea6866f23d0336f15d01d&language=en-US`
    );
    // console.log(data);
    setDtls(data);
    setgenres(data.genres);
    setbiography(data.biography)
  }

  useEffect(() => {
    getDetailes(id, mediatype);

  }, []);
  return (
    <>
      <div className="row py-3 shadow-lg bgImg">

        <div className="col-md-4">
        {dtls.poster_path?          <img
            className="w-100"
            src={`https://image.tmdb.org/t/p/w500${dtls.poster_path}`} 
            alt=""
          />:          <img
          className="w-100"
          src={`https://image.tmdb.org/t/p/w500${dtls.profile_path}`} 
          alt=""
        />}

        </div>

        <div className="col-md-8">
          <h3 className="my-3 h4">
            {dtls.title} {dtls.name}
          </h3>
          <p className="text-muted my-3"> {dtls.tagline}</p>
          <div className="d-flex my-3">
          {genres?.map( (el , idx) => <h6 key={idx} className="bg-warning text-dark p-2 m-2 rounded-1"> {el.name}</h6>)}
          </div>
          {dtls.vote_average?<p className="mt-1">vote : <span> {dtls.vote_average}</span></p>:''}
          {dtls.vote_count?<p>vote count: <span> {dtls.vote_count}</span></p>:''}
          <p>popularity : <span> {dtls.popularity}</span></p>
          {dtls.release_date?<p>release date : <span> {dtls.release_date}</span></p>:''}
          {dtls.birthday?<p>birthday : <span> {dtls.birthday}</span></p>:''}
          {dtls.known_for_department?<p>known for department : <span> {dtls.known_for_department}</span></p>:''}
          <p className="text-muted my-3"> {dtls.overview}</p>
          {dtls.biography ?<p className="text-muted my-3"> {dtls.biography}</p>:''}
          {dtls.homepage && <button className="btn btn-outline-warning"> <Link target="_blank" to={dtls.homepage}>More</Link></button>}
        </div>
      </div>
    </>
  );
}
