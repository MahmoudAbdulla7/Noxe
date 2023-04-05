import logo from './logo.svg';
import './App.css';
import Home from './components/Home/Home'
import Layout from './components/Layout/Layout'
import Login from './components/Login/Login'
import Movies from './components/Movies/Movies'
import People from './components/People/People'
import Register from './components/Register/Register'
import Tv from './components/Tv/Tv'
import Profile from './components/Profile/Profile'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import ItemDetailes from './components/ItemDetailes/ItemDetailes';
import { Offline } from 'react-detect-offline';
import { Provider } from 'react-redux';
import store from './redux/store';
import Error from './components/Error/Error';


function App() {

  useEffect(()=>{
    if (localStorage.getItem('userToken')!==null) {
      saveUserData();
      
    }
  },[])

  const [userData,setUserData]= useState();

  function saveUserData(){
    let inCoded =localStorage.getItem('userToken');
    let deCoded=jwtDecode(inCoded);
    // console.log(deCoded);
    setUserData(deCoded);
  }

  let router= createBrowserRouter([{path:'/' , element:<Layout setUserData={setUserData} userData={userData}/>,children:[
    {path:'home', element: <ProtectedRoute userData={userData}><Home/></ProtectedRoute> }
    ,{path:'login',element:<Login saveUserData={saveUserData}/> },
    {index:true,element:<Register/>},
    {path:'movies',element:<ProtectedRoute userData={userData}><Movies/> </ProtectedRoute> },
    {path:'people',element: <ProtectedRoute userData={userData}><People/></ProtectedRoute> },
    {path:'itemDetailes/:mediatype/:id',element: <ProtectedRoute userData={userData}><ItemDetailes/></ProtectedRoute> },
    {path:'profile',element:<ProtectedRoute userData={userData}><Profile userData={userData}/> </ProtectedRoute> },
    {path:'tv',element: <ProtectedRoute userData={userData}><Tv/></ProtectedRoute> },
    {path:'*',element: <Error/> },
  ]}]);


  return<>

  <Provider store={store}>
  <RouterProvider router={router}/>
  <Offline> <div className="bg-warning text-dark fs-3 position-fixed end-0 bottom-0 my-5 mx-3 rounded-3 p-3"> <label htmlFor="">Connection is not stable</label> </div></Offline>
  </Provider>
  
  </>

}

export default App;
