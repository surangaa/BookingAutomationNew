import { Given, When, Then } from "@wdio/cucumber-framework";
import orderCom from "../components/LIB_Order.js";
import { setValue, getValue } from "@wdio/shared-store-service";
import report from "@wdio/allure-reporter";
import userService from "../services/useService.js";

Then(/^checkout, checkin dates and amount should be same$/, async () => {
  //verify booking details in the Order Page
  const checkInOrder = await getValue("checkindate");
  const checkOutOrder = await getValue("checkoutdate");
  const fullAmount = await getValue("fullamount");

  report.addStep(
    "getting checkindate, checkoutdate and totalcost from local storage"
  );

  await orderCom.bc_VerifyBooking(checkInOrder, checkOutOrder, fullAmount);
  report.addStep("verifing the checkindate, checkoutdate and total cost");
});

When(/^user enters (.+) and click Next$/, async (userType) => {
  const firstName = (await userService.getUserByType(userType)).firstName;
  const lastName = (await userService.getUserByType(userType)).lastName;
  const emailAddress = (await userService.getUserByType(userType)).email;

  //fill firstname, lastname and email
  await orderCom.bc_FillDetailsForm(firstName, lastName, emailAddress);
  report.addStep("fillout firstname, lastname and email address");

  await browser.pause(3000);
});

Then(/^entered (.+) should be same$/, async (userType) => {
  await browser.pause(3000);
  //verify form details
  const firstName = (await userService.getUserByType(userType)).firstName;
  const lastName = (await userService.getUserByType(userType)).lastName;
  const emailAddress = (await userService.getUserByType(userType)).email;

  await orderCom.bc_VerifyFormDetails(firstName, lastName, emailAddress);
  report.addStep("verifying firstname, lastname and email address");
});
