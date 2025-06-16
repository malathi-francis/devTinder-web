import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/Constants';

const Login = () => {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [firstName,setFirstName] = useState("");
  const [lastName,setLastName] = useState("");
  const [isLoginForm,setIsLoginForm] = useState(true);
  const [error,setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async() =>{
    try{
      const res = await axios.post(BASE_URL + "/login",{
        email,
        password
      },{withCredentials:true});
      dispatch(addUser(res.data));
      return navigate('/');
    } catch(err){
      setError(err?.response?.data || "Somthing went wrong!");
      console.error("error whike logging in " + err);
    };
  };

  const handleSignup = async() =>{
    try{
      const res = await axios.post(BASE_URL + "/signup",{
        firstName,
        lastName,
        email,
        password
      },{withCredentials:true});
      dispatch(addUser(res.data.data));
      return navigate('/profile');
    } catch(err){
      setError(err?.response?.data || "Somthing went wrong!");
      console.error(err.message);
    };
  };

  return (
    <div className="flex justify-center my-10">
      <div className="card card-border bg-base-300 w-96">
        <div className="card-body">
          <h2 className="card-title">{isLoginForm ? "Login" : "SignUp"}</h2>
          <div>
          {!isLoginForm && ( <><fieldset className="fieldset">
              <legend className="fieldset-legend">First Name</legend>
              <input type="text" value={firstName} className="input"
              onChange={(e) => setFirstName(e.target.value)} placeholder="Type here" />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Last Name</legend>
              <input type="text" value={lastName} onChange={(p) => setLastName(p.target.value)} className="input" placeholder="Type here" />
            </fieldset></>)}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Email Id</legend>
              <input type="text" value={email} className="input"
              onChange={(e) => setEmail(e.target.value)} placeholder="Type here" />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Password</legend>
              <input type="text" value={password} onChange={(p) => setPassword(p.target.value)} className="input" placeholder="Type here" />
            </fieldset>
          </div>
          <p className='text-red-500'>{error}</p>
          <div className="card-actions justify-center my-4">
            <button className="btn btn-primary" onClick={isLoginForm ? handleLogin : handleSignup}>{isLoginForm? "Login" : "SignUp"}</button>
          </div>
          <p className='m-auto cursor-pointer py-2' onClick={() => setIsLoginForm((value) => !value)}>{isLoginForm ? "New user? SignUp here" : "Existing user? Login here"}</p>
        </div>
      </div>
    </div>
  );};

export default Login;