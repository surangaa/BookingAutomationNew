import { Given, When, Then } from '@wdio/cucumber-framework';
import SearchComponent from '../components/bc_Search.js';
import ProductComponent from '../components/bc_Product.js';
import { setValue, getValue } from '@wdio/shared-store-service'
import report from '@wdio/allure-reporter'


Then(/^the location should be selected as location$/, async () => {
	// verify the location
    await SearchComponent.clickSearch();
    report.addStep('perform a search')

    await SearchComponent.verifyLocation();
    report.addStep('verify the location')
});

When(/^user clicks on 5 star rating$/, async () => {
    //select 5 star option for rating
	await SearchComponent.selectRating();
    report.addStep('select the 5 star rating')
});

When(/^User filters price lowest products$/, async () => {
    //select pricelowest option from the filter dropdown
	await SearchComponent.selectSortBypriceOption();
    report.addStep('select lowest price option from the dropdown')
});

When(/^User selects second product on the list$/, async () => {

    //select the second product from the list
	let pdetails = await ProductComponent.selectSecondProduct();
    report.addStep('select second product from the list')

    var key = Object.keys(pdetails)[0];
    var key3 = Object.keys(pdetails)[1];
    var key4 = Object.keys(pdetails)[2];

    await setValue("productprice", pdetails[key3]);
    await setValue("extractedtax", pdetails[key4]);
    console.log("productprice and extractedtax"+ pdetails[key3] + pdetails[key4])
    report.addStep('storing product price in the local storage')

    await ProductComponent.verifyProductDetails(pdetails[key]);
    report.addStep('verify product details')

});

When(/^user selects Rooms count and proceed$/, async() => {
//select Room count 
   const getp = await getValue("productprice");
   const et = await getValue("extractedtax");
   
	await ProductComponent.selectRoomCount(getp,et)
    report.addStep('select the room count and proceed')

});