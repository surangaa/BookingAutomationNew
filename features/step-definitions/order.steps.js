import { Given, When, Then } from '@wdio/cucumber-framework';
import OrderComponent from '../components/bc_Order.js';
import { setValue, getValue } from '@wdio/shared-store-service'
import report from '@wdio/allure-reporter'


Then(/^checkout, checkin dates and amount should be same$/, async () => {
    //verify booking details in the Order Page
    const checkinorder = await getValue("checkindate");
    const checkoutorder = await getValue("checkoutdate");
    const fullamount = await getValue("fullamount")

    report.addStep('getting checkindate, checkoutdate and totalcost from local storage')
 
    await OrderComponent.verifyBooking(checkinorder, checkoutorder, fullamount);
    report.addStep('verifing the checkindate, checkoutdate and total cost')

  });
  
  When(/^user enters firstname, lastname and emailaddress and click Next$/, async () => {
      //fill firstname, lastname and email 
      await OrderComponent.fillDetailsForm()
      report.addStep('fillout firstname, lastname and email address')

  });
  
  
  Then(/^entered details should be same$/, async () => {
      //verify form details
      await OrderComponent.verifyFormDetails()
      report.addStep('verifying firstname, lastname and email address')
  });