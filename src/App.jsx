import React from 'react'
import './App.css'
import { ToastContainer} from 'react-toastify';
import MainForm from './components/MainForm'
import {Route,Routes, useLocation} from 'react-router-dom'
import Login from './components/Login';
import Error404 from './components/Error404';
import PrivateRoute from './Utils/PrivateRoute';
import LoadingBar from 'react-top-loading-bar'
import { useSelector } from 'react-redux';
import Navbar from './components/Navbar';
import {loader} from './Utils/Redux/loadingSlice'
import Signup from './components/Signup';
import { darkMode } from './Utils/Redux/darkModeSlice';

function App() {
  const location = useLocation();
  const { pathname } = location;
  useSelector(darkMode) && !['/login', '/signup'].includes(pathname) ?document.body.style = 'background: black;':document.body.style = 'background: white;'
  const showNavbar = () => {

    return !['/login', '/signup'].includes(pathname);
  };
  return (
    <div >
     {showNavbar() && <Navbar/> }
      <LoadingBar color='#c084fc' progress={useSelector(loader)} height={5} />
      <ToastContainer
      position="top-center"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss={false}
      draggable
      pauseOnHover
      theme="dark"
      />
      <Routes>
        <Route path='/' element={
          <PrivateRoute>
            <div className='h-[100%] flex  justify-center items-center'>
            <MainForm />
            </div>
          </PrivateRoute>
        }/>
        <Route exact path='/login' element={
        <div className='h-[100vh] flex justify-center items-center'>       
          <Login />
        </div>
        }
        />
        <Route exact path='/signup' element={
        <div className='h-[100vh] flex justify-center items-center'>
          <Signup/>
        </div>
        }/>
        <Route path='*' element={<Error404/>}/>
      </Routes>
    </div>
  )

}

export default App
