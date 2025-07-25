import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/Constants';
import axios from 'axios';
import { removeUser } from '../utils/userSlice';

const NavBar = () => {
const user = useSelector((store) => store.user);
const dispatch = useDispatch();
const navigate = useNavigate();

const handleLogout = async() =>{
  try{
    await axios.post(BASE_URL + "/logout",{},{
      withCredentials:true
    });
    dispatch(removeUser());
    return navigate("/login");
  } catch(err){
    console.error("Error while logging out!"+ err);
  }
};


  return <div className="navbar bg-base-300 shadow-sm">
  <div className="flex-1">
    <Link to="/" className="btn btn-ghost text-xl">DevTinder</Link>
  </div>
  <div className="flex gap-2">
    {user &&(
      <div className='flex-none gap-2 flex items-center'>
      <div>Welcome, {user.firstName}</div>
    <div className="dropdown dropdown-end mx-5">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src={user.photoUrl} />
        </div>
       
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li>
          <Link to="/profile" className="justify-between">
            Profile
          </Link>
        </li>
        <li><Link to="/connections">Connections</Link></li>
        <li><Link to="/requests">Requests</Link></li>
        <li><Link to="/premium">Upgrade</Link></li>
        <li><a onClick={handleLogout}>Logout</a></li>
      </ul>
    </div>
    </div>
     )}
  </div>
</div>;
};

export default NavBar;
