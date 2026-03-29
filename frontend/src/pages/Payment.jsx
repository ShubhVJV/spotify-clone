import React from 'react';

function Payment() {

  const handlePayment = async () => {
   const res = await fetch("/create-order", {
  method: "POST",
});

    const data = await res.json();

    const options = {
      key: "YOUR_RAZORPAY_KEY", // public key
      amount: data.amount,
      currency: "INR",
      name: "Music App",
      order_id: data.id,
      handler: function (response) {
        alert("Payment Successful!");
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="text-white p-6">
      <h1 className="text-2xl mb-6">Choose Payment Method</h1>

      <button
        className="bg-green-500 px-6 py-3 rounded"
        onClick={handlePayment}
      >
        Pay Now (UPI / Card)
      </button>
    </div>
  );
}

export default Payment;