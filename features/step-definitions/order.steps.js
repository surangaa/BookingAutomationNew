import { Given, When, Then } from '@wdio/cucumber-framework';
import OrderComponent from '../components/bc_Order.js';
import { setValue, getValue } from '@wdio/shared-store-service'
import report from '@wdio/allure-reporter'
import userservice from '../services/userservice.js';


Then(/^checkout, checkin dates and amount should be same$/, async () => {
    //verify booking details in the Order Page
    const checkinorder = await getValue("checkindate");
    const checkoutorder = await getValue("checkoutdate");
    const fullamount = await getValue("fullamount")

    report.addStep('getting checkindate, checkoutdate and totalcost from local storage')
 
    await OrderComponent.verifyBooking(checkinorder, checkoutorder, fullamount);
    report.addStep('verifing the checkindate, checkoutdate and total cost')

  });
  
  When(/^user enters (.+) and click Next$/, async (userType) => {
        const firstname = (await userservice.getUserByType(userType)).firstName
        const lastname = (await userservice.getUserByType(userType)).lastName
        const email = (await userservice.getUserByType(userType)).email

      //fill firstname, lastname and email 
      await OrderComponent.fillDetailsForm(firstname, lastname, email)
      report.addStep('fillout firstname, lastname and email address')

      await browser.pause(3000);


  });
  
  
  Then(/^entered (.+) should be same$/, async (userType) => {
    await browser.pause(3000);
      //verify form details
      const firstname = (await userservice.getUserByType(userType)).firstName
      const lastname = (await userservice.getUserByType(userType)).lastName
      const email = (await userservice.getUserByType(userType)).email

      await OrderComponent.verifyFormDetails(firstname, lastname, email)
      report.addStep('verifying firstname, lastname and email address')
  });