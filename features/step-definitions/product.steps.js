import { Given, When, Then } from "@wdio/cucumber-framework";
import SearchComponent from "../components/bc_Search.js";
import ProductComponent from "../components/bc_Product.js";
import { setValue, getValue } from "@wdio/shared-store-service";
import report from "@wdio/allure-reporter";
import location from "../test-Data/td_product.js";

Then(/^the location should be selected as location$/, async () => {
  // verify the location
  await SearchComponent.clickSearch();
  report.addStep("perform a search");

  await SearchComponent.verifyLocation(location.town);
  report.addStep("verify the location");
});

When(/^user clicks on 5 star rating$/, async () => {
  //select 5 star option for rating
  await SearchComponent.selectRating();
  report.addStep("select the 5 star rating");
});

When(/^User filters price lowest products$/, async () => {
  //select pricelowest option from the filter dropdown
  await SearchComponent.selectSortBypriceOption();
  report.addStep("select lowest price option from the dropdown");
});

When(/^User selects second product on the list$/, async () => {
  //select the second product from the list
  let productinfo = await ProductComponent.selectSecondProduct();
  report.addStep("select second product from the list");

  //get fullamount and productname from pdetails object
  let key3 = Object.keys(productinfo)[0];
  let key4 = Object.keys(productinfo)[3];

  await setValue("fullamount", productinfo[key4]);
  report.addStep("storing product price in the local storage");

  await ProductComponent.verifyProductDetails(productinfo[key3]);
  report.addStep("verify product details");
});

When(/^user selects Rooms count and proceed$/, async () => {
  //select Room count
  const fullamount = await getValue("fullamount");

  await ProductComponent.selectRoomCount(fullamount);
  report.addStep("select the room count and proceed");
});
