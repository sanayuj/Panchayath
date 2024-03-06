import React from 'react'
import "./Payment.css"
import { Link, useNavigate } from 'react-router-dom'
function Payment() {
    const navigate=useNavigate()
    const handleKSEBPayment = () => {
        window.open('https://wss.kseb.in/selfservices/quickpay', '_blank');
      };

      const handleWaterPayment = () => {
        window.open('https://epay.kwa.kerala.gov.in/quickpay', '_blank');
      };
  return (
    <div className='paymentMainDiv'>
        <h4>Bill payment</h4>
        <div className='paymentContent'>
        <div className='method'> <p className='m-2'>*Click here to pay KSEB bills : </p><button onClick={handleKSEBPayment} className='btn btn-primary'>Pay</button></div> 
        </div>
        <div className='paymentContent'>
        <div className='method'> <p className='m-2'>*Click here to pay Water bills : </p><button onClick={handleWaterPayment} className='btn btn-primary'>Pay</button></div> 
        </div>
    </div>
  )
}

export default Payment