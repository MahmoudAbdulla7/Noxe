import React from 'react'
import { Link, NavLink } from 'react-router-dom'

export default function MediaItem( {item ,clearSearchResults}) {

  if (item.media_type==null) {
    item.media_type='movie'
  }

  return <>
  <div onClick={clearSearchResults} className=" col-sm-6 col-md-4 col-xl-2 col-6  mb-3">
    
    <NavLink   to={`/itemDetailes/${item.media_type}/${item.id}`}>
    <div className="trnslt movie position-relative overflow-hidden">
        {item.profile_path?<img className='w-100' src={'https://image.tmdb.org/t/p/w500' +item.profile_path} alt="" />:<img className='w-100' src={'https://image.tmdb.org/t/p/w500' +item.poster_path} alt="" />}

        <div className="lay d-flex align-items-center ">
        <h3 className='my-2 h5 text-center mx-auto text-light fw-bold '> {item.title} {item.name}</h3>
        </div>
        
        <div className="vote position-absolute top-0 end-0 px-2 py-1 text-white  bg-warning rounded-bottom rounded-start">
            {item.vote_average?item.vote_average?.toFixed(1):item.popularity?.toFixed(1)}
        </div>
    </div>
    </NavLink>

  </div>
  </>
}
