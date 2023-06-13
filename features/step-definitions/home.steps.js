import { Given, When, Then } from '@wdio/cucumber-framework';
import HomeComponent from '../components/bc_Home.js';
import CommonComponent from '../components/bc_Common.js';
import SearchComponent from '../components/bc_Search.js';
import HomePage from '../pageobjects/pg_home.js'
import SearchPage from '../pageobjects/pg_Search.js'
import { setValue, getValue } from '@wdio/shared-store-service'
import report from '@wdio/allure-reporter'
import locationservice from '../services/locationservice.js';

When(/^the user perform country selection$/,async () => {
//verify page url
    await CommonComponent.verifyPageUrl();
    report.addStep('verifing the page url')

    //select the country
    await HomeComponent.selectCountry();
    report.addStep('selecting the country UK from country list')

});

Then(/^the country should be changed to UK$/, async () => {
    //verify the country selection
    const countryuk = await HomePage.btn_CountryUk2
    await expect(countryuk).toBeDisplayed();
    report.addStep('verify whether UK is selected')

});

When(/^the user perform currency selection$/, async () => {
     //currency selelction
    await HomeComponent.selectCurrency();
    report.addStep('selelcting the currency as USD')

});


Then(/^the currency should be changed to USD$/,async () => {
    await browser.pause(3000);
    //verify the currency selection
    const currencyusd = await HomePage.btn_CurrencyUsd2
    await expect(currencyusd).toBeDisplayed()
    report.addStep('verify whether USD is selected')

});

 
When(/^the user click on Stays tab$/, async () => {
    //select Stays tab
	await HomeComponent.clickStaysBtn()
    report.addStep('selecting Stays tab')

});

Then(/^the tab should be changed to Stays$/, async () => {
	await browser.pause(3000);
    //verify Stays tab selection
    const locationinput = await SearchPage.tf_Location
    await expect(locationinput).toBeDisplayed()
    report.addStep('verify whether the location input is loaded')

});

When(/^the user enter the location$/, async () => {
    
    const location = (await locationservice.getLocation()).town
    console.log('location'+ location)

    //type the location
    report.addStep('selecting the location')
	await SearchComponent.selectLocation(location);

});

When(/^the user selects check in and check out dates$/, async() => {
    //selelct checkin and checkout times
	const datesarray = await SearchComponent.selectCheckinCheckout();

    const key1 = Object.keys(datesarray)[0];
    const key2 = Object.keys(datesarray)[1];

    report.addStep('select checkin and checkout dates')

    await setValue("checkindate", datesarray[key1]);
    await setValue("checkoutdate", datesarray[key2]);
    
    report.addStep('store checkin and checkout dates in local storage')
 
});

When(/^the user select adults and child count$/, async() => {
    //select adult,child and room count
	await SearchComponent.selelctAdultChildCount();
    report.addStep('selecting adult, child and rooms count')

});


When(/^user dismisses the alert$/, async () => {
    //dismiss the alert
    await HomeComponent.dismissAlert()
    report.addStep('dismiss the alert')

});

Then(/^alert should not be present$/, async () => {
    //verify whether the alert is opened
	await HomeComponent.checkForAlert()
    report.addStep('check whether the alert is present on the page')

});







