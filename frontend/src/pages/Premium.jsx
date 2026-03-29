import React from 'react';
import { useNavigate } from 'react-router-dom';

function Premium() {
  const navigate = useNavigate();
  return (
    <div className="text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Choose Your Plan</h1>

      <div className="grid md:grid-cols-3 gap-6">

        {/* Free Plan */}
        <div className="bg-gray-800 p-5 rounded-lg">
          <h2 className="text-xl font-bold">Free</h2>
          <p className="my-2">₹0/month</p>
          <ul className="text-sm mb-4">
            <li>✔ Ads included</li>
            <li>✔ Limited skips</li>
          </ul>
          <button className="bg-white text-black px-4 py-2 rounded">
            Current Plan
          </button>
        </div>

        {/* Premium Plan */}
        <div className="bg-gray-800 p-5 rounded-lg">
          <h2 className="text-xl font-bold">Premium</h2>
          <p className="my-2">₹99/month</p>
          <ul className="text-sm mb-4">
            <li>✔ No Ads</li>
            <li>✔ Unlimited skips</li>
            <li>✔ Offline download</li>
          </ul>
          
          <button 
            className="bg-green-500 px-4 py-2 rounded"
            onClick={() => navigate("/payment")}
          >
            Buy Now
          </button>
        </div>

        {/* Family Plan */}
        <div className="bg-gray-800 p-5 rounded-lg">
          <h2 className="text-xl font-bold">Family</h2>
          <p className="my-2">₹199/month</p>
          <ul className="text-sm mb-4">
            <li>✔ 5 Accounts</li>
            <li>✔ All Premium features</li>
          </ul>
          <button className="bg-green-500 px-4 py-2 rounded">
            Buy Now
          </button>
        </div>

      </div>
    </div>
  );
}

export default Premium;