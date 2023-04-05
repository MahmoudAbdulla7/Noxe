import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import Joi from 'joi'
export default function Register() {
  const [user,setUser]=useState({
    first_name:'',
    last_name:'',
    age:0,
    email:'',
    password:'',
  });
  let navigate =useNavigate();
  const [error,setError]=useState('');
  const [loading,setLoading]=useState(false);
  const [errorList,setErrorList]=useState([]);


  function getUserData(e){
    let userData={...user};
    userData[e.target.name] = e.target.value;
    setUser(userData);
    // console.log(userData);
  }
  async function postData(){
    let {data} = await axios.post(`https://route-movies-api.vercel.app/signup`,user);
    console.log(data.message);
    if (data.message=='success') {
      setLoading(false);
      navigate('/login');
      //login
    }else{
      setError(data.message);
      setLoading(false);
      
    }
  }
  function validation(){
    let schema= Joi.object(
      {
        first_name : Joi.string().pattern(/^[A-Z]/).min(3).max(10).required(),
        last_name : Joi.string().pattern(/^[A-Z]/).min(3).max(10).required(),
        age : Joi.number().min(16).max(60).required(),
        email : Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
        password : Joi.string().pattern(/^[A-Z][a-z]{2,6}/).required()
    }
    )

    return schema.validate(user, {abortEarly:false});
  }
  function sendUserData(e){
    e.preventDefault();
    setLoading(true);
    let valid=validation();
    if(valid.error){
      setErrorList(valid.error.details);
      setLoading(false);
      console.log(errorList);
    }else{
    postData();
    }
  }



  return <>
<div className="container mt-4">
  <form onSubmit={sendUserData}>
    {error.length>0? <div className='alert alert-danger text-center'><span className='fs-5'>{error}</span></div>:''}

    <label className='fs-5 mb-1' htmlFor="first_name">First Name</label>
    <input onChange={getUserData} type="text" name='first_name' className='form-control bg-transparent borderInput mb-2 text-light' />
    {errorList.filter((error)=>error.context.label=="first_name")[0]?<div className='alert alert-danger'>{errorList.filter((err)=>err.context.label=="first_name")[0]?.message}</div>:''}

    <label className='fs-5 mb-1' htmlFor="last_name">Last Name</label>
    <input onChange={getUserData} type="text" name='last_name' className='form-control bg-transparent borderInput mb-2 text-light' />

    {errorList.filter(error =>error.context.label == "last_name")[0]?<div className='alert alert-danger'>{errorList.filter(error =>error.context.label == "last_name")[0]?.message}</div>:''}

    <label className='fs-5 mb-1' htmlFor="age">Age</label>
    <input onChange={getUserData} type="number" name='age' className='form-control bg-transparent borderInput mb-2 text-light' />
    {errorList.filter(error =>error.context.label == "age")[0]?<div className='alert alert-danger'>{errorList.filter(error =>error.context.label == "age")[0]?.message}</div>:''}


    <label className='fs-5 mb-1' htmlFor="email">Email</label>
    <input onChange={getUserData} type="text" name='email' className='form-control bg-transparent borderInput mb-2 text-light' />
    {errorList.filter(error =>error.context.label == "email")[0]?<div className='alert alert-danger'>{errorList.filter(error =>error.context.label == "email")[0]?.message}</div>:''}

    <label className='fs-5 mb-1' htmlFor="password">Password</label>
    <input onChange={getUserData} type="password" name='password' className='form-control bg-transparent borderInput mb-2 text-light' />
    {errorList.filter(error =>error.context.label == "password")[0]?<div className='alert alert-danger'>Password should start with capital letter followed by 2 letters</div>:''}


    <button className='btn btn-outline-warning text-light mt-3'>{loading==false?'Register':<i className="fa-solid fa-circle-notch fa-spin"></i>}</button>

  </form>
  </div>
  </>
}
