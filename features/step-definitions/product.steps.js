import { Given, When, Then } from "@wdio/cucumber-framework";
import searchCom from "../components/LIB_Search.js";
import productCom from "../components/LIB_Product.js";
import { setValue, getValue } from "@wdio/shared-store-service";
import report from "@wdio/allure-reporter";
import locateService from '../services/locateService.js';


Then(/^the location should be selected as location$/, async () => {
  // verify the location
  await searchCom.bc_ClickSearch();
  report.addStep("perform a search");

  const location = (await locateService.getLocation()).town

  await searchCom.bc_VerifyLocation(location);
  report.addStep("verify the location");
});

When(/^user clicks on 5 star rating$/, async () => {
  //select 5 star option for rating
  await searchCom.bc_SelectRating();
  report.addStep("select the 5 star rating");
});

When(/^User filters price lowest products$/, async () => {
  //select pricelowest option from the filter dropdown
  await searchCom.bc_SelectSortBypriceOption();
  report.addStep("select lowest price option from the dropdown");
});

When(/^User selects second product on the list$/, async () => {
  //select the second product from the list
  let productInfo = await productCom.bc_SelectSecondProduct();
  report.addStep("select second product from the list");

  //get fullamount and productname from pdetails object
  let key3 = Object.keys(productInfo)[0];
  let key4 = Object.keys(productInfo)[3];

  await setValue("fullamount", productInfo[key4]);
  report.addStep("storing product price in the local storage");

  await productCom.bc_VerifyProductDetails(productInfo[key3]);
  report.addStep("verify product details");
});

When(/^user selects Rooms count and proceed$/, async () => {
  //select Room count
  const fullAmount = await getValue("fullamount");

  await productCom.bc_SelectRoomCount(fullAmount);
  report.addStep("select the room count and proceed");
});
