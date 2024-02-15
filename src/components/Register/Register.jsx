import axios from 'axios';
import Joi, { number, string } from 'joi';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Login({saveUserData}) {
  const [error,setError]=useState('');
  const [isLoading,setIsLoading]=useState(false);
  let navigate =useNavigate();
  const [errorList,setErrorList]=useState([]);
  const [user , setUser] = useState({
    email:'',
    password:''
  })

  function getUserData(eventInfo){
    let myUser ={...user};
    myUser[eventInfo.target.name]=eventInfo.target.value;
    setUser(myUser);
  }

  async function sendUserData() {
    axios.post(`https://ecommerce-theta-gules.vercel.app/auth/login`,user).then((res)=>{
      localStorage.setItem("userToken",res.data.refreshToken)
      navigate("/home");
      setIsLoading(false);
    }).catch((err)=>{
      setError(err.response.data.message);
      setErrorList([])
      setIsLoading(false);
    })
  }


  function validateLoginForm(){
    let schema =Joi.object(
      {
        email:Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
        password:Joi.string().min(6).max(20).pattern(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z0-9]).{8,}$/)).required()
      }
    )
     return schema.validate(user,{abortEarly:false})
  }

  function submitData(e) {
    setIsLoading(true);
    e.preventDefault();

    let validation =validateLoginForm()
    if (validation.error) {
      setIsLoading(false);
      setErrorList(validation.error.details)
    }
    else
    {
      sendUserData()
    }
  }


  return <>
  {error && <div className="alert text-center alert-danger my-2">{error}</div>}
  <form onSubmit={submitData}>

    <label htmlFor="email">email</label>
    <input onChange={getUserData} type="email" className='form-control my-input my-2' name='email' id='email' />
    {errorList.filter((error)=>error.context.label=='email')[0]?<div className="alert alert-danger my-2">{errorList.filter((error)=>error.context.label=='email')[0]?.message}</div>:''}

    <label htmlFor="password">password</label>
    <input onChange={getUserData} type="password" className='form-control my-input my-2' name='password' id='password' />
    {errorList.filter((error)=>error.context.label=='password')[0]?<div className="alert alert-danger my-2">Password should contain numbers, special character, uper letter and smaller letter</div>:''}

    <button type='submit' className='btn btn-info'>
      {isLoading== true ?<i className='fas fa-spinner fa-spin'></i>:'Login'}
      </button>
  </form>
  
  
  </>
}
