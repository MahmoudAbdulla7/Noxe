import axios from "axios";
import React, { useEffect, useState } from "react";
import MediaItem from "../MediaItem/MediaItem";
import Loading from "../Loading/Loading";
import ReactPaginate from "react-paginate";

export default function Home() {
  const [movies, setmovies] = useState([]);
  const [tv, setTv] = useState([]);
  const [people, setPeople] = useState([]);
  const [pageNum, setPageNum] = useState(1);

  const handlePageClick = (event) => {
    setPageNum(event.selected + 1);
  };
  let pageCount = 1000;

  async function getDataFromApi(mediatype, callback,pageNum) {
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/${mediatype}/week?api_key=67cf6dbae13ea6866f23d0336f15d01d&page=${pageNum}`
    );
    callback(data.results);
  }

  useEffect(() => {
    // dispach(getMovies("movie",pageNum));
    getDataFromApi("movie", setmovies,pageNum);
    getDataFromApi("tv", setTv,pageNum);
    getDataFromApi("person", setPeople,pageNum);
  }, [pageNum]);


  return (
    <>
      <div className="row">


        {movies.length > 0 ? (
          <>
                  <ReactPaginate
          breakLabel="..."
          nextLabel=">"
          onPageChange={handlePageClick}
          marginPagesDisplayed={2}
          pageRangeDisplayed={2}
          pageCount={pageCount}
          previousLabel="<"
          containerClassName={"pagination  justify-content-center p-3"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link text-dark"}
          previousClassName={"page-item"}
          nextClassName={"page-item"}
          previousLinkClassName={"page-link text-info"}
          nextLinkClassName={"page-link text-info"}
          breakClassName={"page-item"}
          breakLinkClassName={"page-link text-muted"}
          activeClassName={"active mx-1 p-0"}
          
        />

            {" "}
            <div className="col-md-4 d-flex align-items-center">
              <div>
                <div className="brdr w-25 mb-3"></div>
                <h2 className="fs-4">
                  Trending movies <br /> To watch right now
                </h2>
                <div className="text-muted py-2">Movies to watch right now</div>
                <div className="brdr w-100 mt-3"></div>
              </div>
            </div>
            {movies.slice(0, 20).filter(el=>el.poster_path!=null).map((item, idx) => (
              <MediaItem key={idx} item={item} />
            ))}
            <div className="py-4"></div>
            <div className="col-md-4 d-flex align-items-center">
              <div>
                <div className="brdr w-25 mb-3"></div>
                <h2 className="fs-4">
                  Trending Tv <br /> To tv right now
                </h2>
                <div className="text-muted py-2">Tv to watch right now</div>
                <div className="brdr w-100 mt-3"></div>
              </div>
            </div>
            {tv.slice(0, 20).filter(el=>el.poster_path!=null).map((item, idx) => (
              <MediaItem key={idx} item={item} />
            ))}
            <div className="py-4"></div>
            <div className="col-md-4 d-flex align-items-center">
              <div>
                <div className="brdr w-25 mb-3"></div>
                <h2 className="fs-4">
                  Trending People <br /> To People right now
                </h2>
                <div className="text-muted py-2">People to watch right now</div>
                <div className="brdr w-100 mt-3"></div>
              </div>
            </div>
            {people.slice(0, 20).filter(el=>el.profile_path!=null).map((item, idx) => (
              <MediaItem key={idx} item={item} />
            ))}
          </>
        ) : (
          <Loading />
        )}
      </div>
    </>
  );
}
