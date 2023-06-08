import { Given, When, Then } from '@wdio/cucumber-framework';
import OrderComponent from '../components/bc_Order.js';
import { setValue, getValue } from '@wdio/shared-store-service'
import report from '@wdio/allure-reporter'


Then(/^checkout, checkin dates and amount should be same$/, async () => {
    //verify booking details in the Order Page
    const cid = await getValue("checkindate");
    const cod = await getValue("checkoutdate");
    const pp = await getValue("productprice");
    report.addStep('getting checkindate, checkoutdate and product price from local storage')
 
    await OrderComponent.verifyBooking(cid, cod, pp);
    report.addStep('verifing the checkindate, checkoutdate and product price details')

  });
  
  When(/^user enters firstname, lastname and emailaddress and click Next$/, async () => {
      //fill firstname, lastname and email 
      const accdetails = await OrderComponent.fillDetailsForm()
    //   console.log('account details'+accdetails)
      var key5 = Object.keys(accdetails)[0];
      var key6 = Object.keys(accdetails)[1];
      var key7 = Object.keys(accdetails)[2];
  
  
      await setValue("fname", accdetails[key5]);
      await setValue("lname", accdetails[key6]);
      await setValue("email", accdetails[key7]);
      report.addStep('storing firstname, lastname and email address in local storage')

  });
  
  
  Then(/^entered details should be same$/, async () => {
      const fn = await getValue("fname");
      const ln = await getValue("lname");
      const em = await getValue("email");
      report.addStep('getting firstname, lastname and email address from local storage')

      //verify form details
      await OrderComponent.verifyFormDetails(fn, ln, em)
      report.addStep('verifying firstname, lastname and email address')
  });