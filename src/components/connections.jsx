import React, { useEffect } from 'react';
import { BASE_URL } from '../utils/Constants';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import {addConnections} from '../utils/connectionSlice';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

 
const Connections = () => {
  const dispatch = useDispatch();

const connections = useSelector((store) => store.connections);
  const fetchConnections = async()=>{
    try{
      const res = await axios.get(BASE_URL + "/user/get/connections",{
        withCredentials:true
      });
      dispatch(addConnections(res.data.data));
      
    } catch(err){
      console.error(err.message);
      
    }
  };

  useEffect(() => {
    fetchConnections();
  },[]);
  console.log("Connections:", connections);

  if(!connections) return;

  if(connections.length === 0) return <h1 className='flex justify-center my-10'>No Connections found</h1>

  return (
<div className='text-center my-10'>
  <h1 className='text-bold text-white text-3xl'>Connections</h1>

  {connections.map((connection) => {
        const {_id,firstName,lastName,photoUrl,age,gender,about} = connection

return (
<div key={_id} className='flex items-center justify-between m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto'>
  <div className='flex items-center'>
    <img alt="photo" className='w-20 h-20 rounded-full' src={photoUrl} />
    <div className='text-left ml-10'> {/* <- Increased from mx-4 to ml-6 */}
      <h2 className='font-bold text-xl'>{firstName + " " + lastName}</h2>
      {age && gender && <p>{age + ", " + gender}</p>}
      <p>{about}</p>
    </div>
  </div>
  <div className='mr-10'> {/* <- Reduced right margin to move button left */}
    <Link to={"/chat/"+_id}><button className="btn btn-soft btn-secondary">Chat</button></Link>
  </div>
</div>


)})}

</div>
  )};

export default Connections;
