import axios from "axios";
import React, { useEffect, useState } from "react";
import Loading from "../Loading/Loading";
import MediaItem from "../MediaItem/MediaItem";

export default function People() {
  const [people, setPeople] = useState([]);
  async function getDataFromApi() {
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/person/week?api_key=67cf6dbae13ea6866f23d0336f15d01d`
    );
    setPeople(data.results);
    // console.log(data);
    // console.log(data.results.biography);
  }
  useEffect(() => {
    getDataFromApi();
  }, []);

  return (
    <> <div className="row">
      {people.length>0 ? (
        <div className="row">
          <div className="col-md-4 d-flex align-items-center">
            <div>
              <div className="brdr w-25 mb-3"></div>
              <h2 className="fs-4">
                Trending people <br /> To watch right now
              </h2>
              <div className="text-muted py-2">people to watch right now</div>
              <div className="brdr w-100 mt-3"></div>
            </div>
          </div>
          {people.slice(0, 16).map((item, idx) => (
            <MediaItem key={idx} item={item} />
          ))}
        </div>
      ) : <Loading/>}
      </div>
    </>
  );
}
