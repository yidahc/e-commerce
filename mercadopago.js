var mercadopago = require('mercadopago');
mercadopago.configurations.setAccessToken(config.access_token);

var payment_data = {
  transaction_amount: 136,
  token: 'ff8080814c11e237014c1ff593b57b4d'
  description: 'Rustic Rubber Shirt',
  installments: 3,
  payment_method_id: 'amex',
  issuer_id: 310,
  payer: {
    email: 'malvina@gmail.com'
  }
};
// Save and posting the payment
mercadopago.payment.save(payment_data).then(function (payment) {
  // ...
}).catch(function (error) {
  // ...
});