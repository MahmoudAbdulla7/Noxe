import axios from 'axios';
import React, { useEffect, useState } from 'react'
import MediaItem from '../MediaItem/MediaItem';
import Loading from '../Loading/Loading';

export default function People() {

  const [tv , setTv]=useState([]);
  async function getDataFromApi(){
    let {data}=await axios.get(`https://api.themoviedb.org/3/trending/tv/week?api_key=67cf6dbae13ea6866f23d0336f15d01d`);
    setTv(data.results);
  }
  useEffect(()=>{
    getDataFromApi();
  },[]);


  return (
      <div className="row">
        {tv.length>0?<>    <div className="col-md-4 d-flex align-items-center">
      <div>
      <div className="brdr w-25 mb-3"></div>
      <h2 className='fs-4'>Trending Tv <br /> To watch right now</h2>
      <div className="text-muted py-2">Tv to watch right now</div>
      <div className="brdr w-100 mt-3"></div></div>
    </div>
    {tv.slice(0,16).map((item ,idx)=> <MediaItem key={idx} item={item}/>)}</>:<Loading/>}
  </div>
  )
}
