import React from 'react';
import PaypalExpressBtn from 'react-paypal-express-checkout';

class Paypal extends React.Component {
  render() {
		const onSuccess = (payment) => {
        console.log(JSON.stringify(payment));
        this.props.onSuccess(payment)
		}

		const onCancel = (data) => {
			// The user pressed "cancel" or closed the PayPal popup
      console.log(JSON.stringify(data));
      this.props.transactionCanceled(data)
		}

		const onError = (err) => {
			// The main Paypal script could not be loaded or something blocked the script from loading
      console.log(JSON.stringify(err));
      this.props.transactionError(err)
			// Because the Paypal's main script is loaded asynchronously from "https://www.paypalobjects.com/api/checkout.js"
			// => sometimes it may take about 0.5 second for everything to get set, or for the button to appear
		}

		let env = 'production'; 
		let currency = 'MXN'; 
		let total = this.props.toPay;  // this is the total amount (based on currency) to charge
		// Document on Paypal's currency code: https://developer.paypal.com/docs/classic/api/currency_codes/

		const client = {
			sandbox: 'ARS4zW-twUfe27JuVhbDrL1MWkXE8hqylj_JbWL85_ta19-d53EXvLbDJdS7eLD83UhO3gTtZm5AL_ds',
			production: 'ATlMadh4__vzYQ56gupF-U7mgIAr7bFSvv2JM6TvSFoMEHWO3In6URckNrL3wH4RMMgfbBHyz3NGolBT',
		}
		//   => https://developer.paypal.com/docs/classic/lifecycle/sb_credentials/
		// Note: IGNORE the Sandbox test AppID - this is ONLY for Adaptive APIs, NOT REST APIs)
		// For production app-ID:
		//   => https://developer.paypal.com/docs/classic/lifecycle/goingLive/

	      return (
            <PaypalExpressBtn 
              env={env} 
              client={client} 
              currency={currency} 
              total={total} 
              onError={onError} 
              onSuccess={onSuccess} 
              onCancel={onCancel} 
              style={{
                size: 'medium',
                color: 'black',
                shape: 'rect',
                label: 'checkout'
              }}
            />
        );
    }
}
export default Paypal;
