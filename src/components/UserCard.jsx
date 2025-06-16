import React from 'react';
import axios from 'axios';
import { BASE_URL } from '../utils/Constants';
import { useDispatch } from 'react-redux';
import {removeUserFromFeed} from '../utils/FeedSlice'

const UserCard = ({user}) => {
  console.log("here",user);
  const dispatch = useDispatch();

  if (!user) return <div className="text-center text-gray-500">Loading user...</div>; // or return null;
  
  const {_id,firstName,lastName,age,gender,about} = user;

  const handleSendRequest = async(status,userId) => {
    try{
      const res = await axios.post(BASE_URL + "/request/" + status +"/" + userId,
        {},
        { withCredentials: true }
      );
      console.log("id = ",_id);

      dispatch(removeUserFromFeed(userId));
    } catch (err){
      console.error(err.message);
            // console.log("id = ",_id);

    };
  };

  return (
<div className="card bg-base-300 w-64 shadow-xl m-5">
  <figure >
    <img src={user.photoUrl} alt="photo"/>
  </figure>
  <div className="card-body">
    <h2 className="card-title">{firstName + " " +lastName}</h2>
    {age && gender && <p>{age + ", "+ gender}</p>}
    <p>{about}</p>
    <div className="card-actions justify-center my-4">
      
      <button className="btn btn-primary" onClick={() => handleSendRequest("ignored",_id)}>Ignore</button>
      <button className="btn btn-secondary" onClick={() => handleSendRequest("interested",_id)}>Interested</button>

    </div>
  </div>
</div>
  )};

export default UserCard;
