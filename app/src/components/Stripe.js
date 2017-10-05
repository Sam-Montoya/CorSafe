import React, { Component } from 'react';

import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

export default class Stripe extends Component {

  onToken = (token) => {
    token.card = void 0;
  }

  render() {
    return (
      <div>
        <StripeCheckout
          token={this.onToken}
          stripeKey={'pk_test_5ZqhFejW6WlLGSLRycoDbs57'}
          amount={1000}
        />
      </div >
    )
  }
}