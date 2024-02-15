import axios from 'axios';
import Joi, { number, string } from 'joi';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [error,setError]=useState('');
  const [isLoading,setIsLoading]=useState(false);
  let navigate =useNavigate();
  const [errorList,setErrorList]=useState([]);
  const [user , setUser] = useState({
    userName:'',
    email:'',
    password:'',cpassword:''
  })

  function getUserData(eventInfo){
    let myUser ={...user};
    myUser[eventInfo.target.name]=eventInfo.target.value;
    setUser(myUser);
  }

  async function sendUserData() {
    axios.post(`https://ecommerce-theta-gules.vercel.app/auth/signup`,user).then((res)=>{
      setIsLoading(false)
      navigate("/login")
    }).catch((err)=>{
      
      setError(err.response.data.message)
    setIsLoading(false)})
  }


  function validateRegisterForm(){
    let schema =Joi.object(
      {
        userName:Joi.string().min(3).max(10).required(),
        email:Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
        password:Joi.string().min(6).max(20).pattern(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z0-9]).{8,}$/)).required(),
        cpassword:Joi.string().valid(Joi.ref("password")).required()
      }
    )
     return schema.validate(user,{abortEarly:false})
  }

  function submitData(e) {
    setIsLoading(true);
    e.preventDefault();

    let validation =validateRegisterForm()
    if (validation.error) {
      setErrorList(validation.error.details)
      setIsLoading(false);
    }
    else
    {
      sendUserData()
    }
  }


  return <>
  <form onSubmit={submitData}>

    {error.length>0? <div className="alert alert-danger my-2 text-center">{error}</div> :''}

    <label htmlFor="userName">User name</label>
    <input onChange={getUserData} type="text" className='form-control my-input my-2' name='userName' id='userName' />
    {errorList.filter((error)=>error.context.label=='userName')[0]?<div className="alert alert-danger my-2">{errorList.filter((error)=>error.context.label=='userName')[0]?.message}</div>:''}

    <label htmlFor="email">email</label>
    <input onChange={getUserData} type="email" className='form-control my-input my-2' name='email' id='email' />
    {errorList.filter((error)=>error.context.label=='email')[0]?<div className="alert alert-danger my-2">{errorList.filter((error)=>error.context.label=='email')[0]?.message}</div>:''}

    <label htmlFor="password">password</label>
    <input onChange={getUserData} type="password" className='form-control my-input my-2' name='password' id='password' />
    {errorList.filter((error)=>error.context.label=='password')[0]?<div className="alert alert-danger my-2">Password should contain numbers, special character, uper letter and smaller letter</div>:''}
    
    <label htmlFor="cpassword">cpassword</label>
    <input onChange={getUserData} type="cpassword" className='form-control my-input my-2' name='cpassword' id='cpassword' />
    {errorList.filter((error)=>error.context.label=='cpassword')[0]?<div className="alert alert-danger my-2">Password do not match</div>:''}

    <button type='submit' className='btn btn-info'>
      {isLoading== true ?<i className='fas fa-spinner fa-spin'></i>:'Register'}
      </button>
  </form>
  
  
  </>
}
