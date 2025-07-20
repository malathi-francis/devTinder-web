import React, { useEffect } from 'react';
import Navbar from "./Navbar";
import { Outlet, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import axios from 'axios';
import { BASE_URL } from '../utils/Constants';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useSelector } from 'react-redux';

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);

  const fetchUser = async () => {
  try{ 
    if(userData) return;
    const res = await axios.get(BASE_URL + "/profile/view",{
      withCredentials:true
    });
    dispatch(addUser(res.data));
  
  }catch(err){
    if(err.status === 401){
    navigate("/login");
    };
    console.error(err);
    }
  };

  useEffect(() => {
    fetchUser();
},[]);

  return (
  <div>
      <NavBar />
      <Outlet />
      <Footer />

  </div>
)};

export default Body;
