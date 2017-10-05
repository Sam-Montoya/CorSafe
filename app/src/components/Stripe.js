import React, { Component } from 'react';

import StripeCheckout from 'react-stripe-checkout';

export default class Stripe extends Component {

  render() {
    return (
      <div>
        <StripeCheckout
          token={1}
          stripeKey={process.env.REACT_APP_API_KEY}
          amount={1000}
        />
      </div >
    )
  }
}