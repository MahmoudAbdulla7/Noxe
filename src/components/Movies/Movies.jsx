import axios from 'axios';
import React, { useEffect, useState } from 'react'
import MediaItem from '../MediaItem/MediaItem';
import Loading from '../Loading/Loading';
import { getMovies } from '../../redux/moviesTrending';
import { useDispatch, useSelector } from 'react-redux';

export default function Movies() {
  let dispach=useDispatch();
  let {movies}=useSelector(state =>state.movie)
  useEffect(()=>{
    dispach(getMovies('movie'))
    
  },[]);

  return (
      <div className="row">
        {movies.length>0?<>    <div className="col-md-4 d-flex align-items-center">
      <div>
      <div className="brdr w-25 mb-3"></div>
      <h2 className='fs-4'>Trending movies <br /> To watch right now</h2>
      <div className="text-muted py-2">Movies to watch right now</div>
      <div className="brdr w-100 mt-3"></div></div>
    </div>
    {movies.slice(0,16).map((item ,idx)=> <MediaItem key={idx} item={item}/>)}</>:<Loading/>}
  </div>
  )
}
