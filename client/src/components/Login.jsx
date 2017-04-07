import React from 'react';
import config from './../../../config/config.js';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.onFbClick = this.onFbClick.bind(this);
    this.onPlaidClick = this.onPlaidClick.bind(this);
  }
  
  onFbClick() {
    let myRequest = new Request('/auth/facebook');
    return fetch(myRequest)
      .then((response) => {
        console.log('here is the successful response', response);
        if (response) {
          // this.setState({
          //   signedin: true,
          // });
          console.log('hi')
        } 
      })
      .catch((err) => {
        console.log('error', error);
      });
  }

  onPlaidClick() {
    Plaid.create({
      clientName: 'Plaid Walkthrough Demo',
      env: 'sandbox',
      key: config.plaid.publicKey,
      product: ['auth', 'transactions'],
      // webhook: '[WEBHOOK_URL]', // Optional – use webhooks to get transaction and error updates
      // selectAccount: false, // Optional – trigger the Select Account
      onLoad: function() {
        // Optional, called when Link loads
      },
      onSuccess: function(public_token, metadata) {
        // Send the public_token to your app server.
        // The metadata object contains info about the institution the
        // user selected and the account ID, if `selectAccount` is enabled.
        // TODO: implement server route for plaid
        $.post('/get_access_token', {
          public_token: public_token,
        });
      },
      onExit: function(err, metadata) {
        // The user exited the Link flow.
        if (err != null) {
          // The user encountered a Plaid API error prior to exiting.
        }
        // metadata contains information about the institution
        // that the user selected and the most recent API request IDs.
        // Storing this information can be helpful for support.
      }
    }).open();
  }

  render() {
    return (
      <div className="login">
        <h3>Welcome!</h3>
        {/* TODO: pass loggedIn prop here && check
        // read the token, if they are signed in: render button to add stuff to plaid OR go to balances
        // else show this button*/}
        <button onClick={this.onFbClick}>Sign In with Facebook</button>
        <button id="link-button"
          onClick={this.onPlaidClick}
        >Add Accounts to Plaid</button>
      </div>
    );
  }
};

export default Login;