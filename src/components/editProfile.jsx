import React, { useState } from 'react';
import { BASE_URL } from '../utils/Constants';
import UserCard from './UserCard';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import axios from 'axios';

const EditProfile = ({user}) => {
  const [firstName,setFirstName] = useState(user.firstName);
  const [lastName,setLastName] = useState(user.lastName);
  const [age,setAge] = useState(user.age);
  const [gender,setGender] = useState(user.gender);
  const [about,setAbout] = useState(user.about);
  const [skills,setSkills] = useState(user.skills);
  const [photoUrl,setPhotoUrl] = useState(user.photoUrl);
  const [error,setError] = useState("");
  const [showToast,setShowToast] = useState(false);
  const dispatch = useDispatch();

  const saveProfile = async() =>{
    try{
      setError("");
      const res = await axios.patch(BASE_URL + "/profile/edit",{
        firstName,
        lastName,
        age,
        gender,
        skills,
        photoUrl,
        about
      },{withCredentials:true});
      dispatch(addUser(res.data.data));
      setShowToast(true);
      const i = setTimeout(() => {
        setShowToast(false);
      },3000);
    } catch(err){
      setError(err?.response?.data || "Somthing went wrong!");
      console.error(err.message); 
    }
  }

  return (
    <div>
      <div className="flex justify-center my-10">
        <div className="flex justify-center ">
          <div className="card card-border bg-base-300 w-96">
            <div className="card-body">
              <h2 className="card-title">Edit Profile</h2>
              <div>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">First Name</legend>
                  <input
                    type="text"
                    value={firstName}
                    className="input"
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Type here"
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Last Name</legend>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(p) => setLastName(p.target.value)}
                    className="input"
                    placeholder="Type here"
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Age</legend>
                  <input
                    type="text"
                    value={age}
                    className="input"
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="Type here"
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Gender</legend>
                  <div className="dropdown w-full">
                    <div
                      tabIndex={0}
                      role="button"
                      className="input w-full text-left cursor-pointer"
                    >
                      {gender || "Select gender"}
                    </div>
                    <ul
                      tabIndex={0}
                      className="menu dropdown-content bg-base-200 rounded-box z-[10] mt-2 w-full p-2 shadow"
                    >
                      <li>
                        <a onClick={() => setGender("Male")}>Male</a>
                      </li>
                      <li>
                        <a onClick={() => setGender("Female")}>Female</a>
                      </li>
                      <li>
                        <a onClick={() => setGender("Other")}>Other</a>
                      </li>
                    </ul>
                  </div>
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Skills</legend>
                  <input
                    type="text"
                    value={skills}
                    onChange={(p) => setSkills(p.target.value)}
                    className="input"
                    placeholder="Type here"
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">PhotoUrl</legend>
                  <input
                    type="text"
                    value={photoUrl}
                    onChange={(p) => setPhotoUrl(p.target.value)}
                    className="input"
                    placeholder="Type here"
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">About</legend>
                  <textarea
                    className="textarea h-24"
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                  ></textarea>
                </fieldset>
              </div>
              <p className="text-red-500">{error}</p>
              <div className="card-actions justify-center my-4">
                <button className="btn btn-primary" onClick={saveProfile}>
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
        <UserCard
          user={{ firstName, lastName, age, gender, about, skills, photoUrl }}
        ></UserCard>
      </div>
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile saved successfully.</span>
          </div>
        </div>
      )}
      ;
    </div>
  );};

export default EditProfile;