import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
const StripeCheckoutButton = ({ price,id ,up}) => {
  const priceForStripe = price * 100;
  const publishableKey = 'pk_test_YzIzKGTcUKh3KtKQQPpxefXY00Fd0LDUAt';

  const onToken = token => {
      console.log("id",id)
    axios({
      url: 'http://localhost:5000/dues/payment',
      method: 'post',
      data: {
        amount: priceForStripe,
        token: token,
        id:id
      }
    })
      .then(response => {
        toast.success('succesful payment');
        up()
      })
      .catch(error => {
        console.log('Payment Error: ', error);
        toast.error('There was an issue with your payment! Please make sure you use the provided credit card.')
      
      });
  };

  return (
    <StripeCheckout
      label='Pay Now'
      name='Apartment Management'
      
      image='https://svgshare.com/i/CUz.svg'
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel='Pay Now'
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;