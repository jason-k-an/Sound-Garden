var env, key;
if (process.env.PLAID_env) {
  env = process.env.PLAID_env;
  key = process.env.PLAID_publicKey;
} else {
  env = 'sandbox';
  key = 'a315a5f1d3b001210a2ea7ef2d1945';
}

module.exports.createPlaid = () => {
  Plaid.create({
    clientName: 'Plaid Walkthrough Demo',
    env: env,
    key: key, 
    product: ['auth', 'transactions'],
    onSuccess: function(public_token, metadata) {
      fetch('/plaid/access_token', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          public_token: public_token,
          metadata: metadata,
        })
      })
        .then((response) => {
          console.log('successful post to plaid access token');
          window.location.reload();
        })
        .catch((err) => {
          console.log('error in post to plaid access token', err);
        });
    },
    onExit: function(err, metadata) {
      console.log(metadata);
      if (err != null) {
      }
    }
  }).open();
};