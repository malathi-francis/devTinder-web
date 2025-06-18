import React, { useState } from 'react';
import { BASE_URL } from '../utils/Constants';
import axios from 'axios';

const Premium = () => {

  const [isUserPremium,setIsUserPremium] = useState(false);

  const verifyPremiumUser = async()=>{
    const res = await axios.get(BASE_URL + "/premium/verify",{
      withCredentials:true
    });

    if(res.data.isPremium){
      setIsUserPremium(true);
    }
  }
  const handleBuy = async(type) => {
    const order = await axios.post(BASE_URL + "/payment/create",{
      membershipType:type,
    },{withCredentials: true});

    //it should open razorpay doalog box
const {amount,keyId,currency,notes,orderId} = order.data;

    const options = {
        key: keyId, // Replace with your Razorpay key_id
        amount: amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: currency,
        name: 'TappyPals',
        description: 'Transaction',
        order_id: orderId, // This is the order_id created in the backend
        prefill: {
          name: notes.firstName+ " "+ notes.lastName,
          email: notes.email,
        },
        theme: {
          color: '#F37254'
        },
        handler : verifyPremiumUser
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
  };
  return isUserPremium ? "You're already a premium user!" : (
<div className='m-10'><div className="flex w-full flex-col lg:flex-row">
  <div className="card bg-base-300 rounded-box grid h-50 grow place-items-center p-5"><h1 className='font-bold text-3xl p-10'>Silver Membership</h1>
  <ul>
    <li> - Chat with connection</li>
    <li> - 100 requests per day</li>
    <li> - 3 months validity</li>
    </ul>
    <button className="btn btn-soft btn-primary mx-2 m-8" onClick={() => handleBuy("silver")}>Buy Silver membership</button></div>
  <div className="divider lg:divider-horizontal">OR</div>
  <div className="card bg-base-300 rounded-box grid h-50 grow place-items-center p-5"><h1 className='font-bold text-3xl p-10'>Gold Membership</h1>
  <ul>
    <li> - Chat with all members</li>
    <li> - infinite requests per day</li>
    <li> - life time validity</li>
    </ul>
    <button className="btn btn-soft btn-secondary mx-2 m-8" onClick={() => handleBuy("gold")}>Buy Gold membership</button>
  </div>
</div></div>
  )};

export default Premium;
