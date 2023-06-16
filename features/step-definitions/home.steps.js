import { Given, When, Then } from '@wdio/cucumber-framework';
import homeCom from '../components/LIB_Home.js';
import commonCom from '../components/LIB_Common.js';
import searchCom from '../components/LIB_Search.js';
import homePage from '../pageobjects/pg_home.js'
import searchPage from '../pageobjects/pg_Search.js'
import { setValue, getValue } from '@wdio/shared-store-service'
import report from '@wdio/allure-reporter'
import locationservice from '../services/locateService.js';

When(/^the user perform country selection$/,async () => {
//verify page url
    await commonCom.bc_VerifyPageUrl();
    report.addStep('verifing the page url')

    //select the country
    await homeCom.bc_SelectCountry();
    report.addStep('selecting the country UK from country list')

});

Then(/^the country should be changed to UK$/, async () => {
    //verify the country selection
    const countryUk = await homePage.btn_CountryUk2
    await expect(countryUk).toBeDisplayed();
    report.addStep('verify whether UK is selected')

});

When(/^the user perform currency selection$/, async () => {
     //currency selelction
    await homeCom.bc_SelectCurrency();
    report.addStep('selelcting the currency as USD')

});


Then(/^the currency should be changed to USD$/,async () => {
    await browser.pause(3000);
    //verify the currency selection
    const currencyUsd = await homePage.btn_CurrencyUsd2
    await expect(currencyUsd).toBeDisplayed()
    report.addStep('verify whether USD is selected')

});

 
When(/^the user click on Stays tab$/, async () => {
    //select Stays tab
	await homeCom.bc_ClickStaysBtn()
    report.addStep('selecting Stays tab')

});

Then(/^the tab should be changed to Stays$/, async () => {
	await browser.pause(3000);
    //verify Stays tab selection and location input is displayed
    const locationInput = await searchPage.tf_Location
    await expect(locationInput).toBeDisplayed()
    report.addStep('verify whether the location input is loaded')

});

When(/^the user enter the location$/, async () => {  
    //get the location
    const location = (await locationservice.getLocation()).town

    //type the location
    report.addStep('selecting the location')
	await searchCom.bc_SelectLocation(location);

});

When(/^the user selects check in and check out dates$/, async() => {
    //selelct checkin and checkout times
	const datesArray = await searchCom.bc_SelectCheckinCheckout();

    const key1 = Object.keys(datesArray)[0];
    const key2 = Object.keys(datesArray)[1];

    report.addStep('select checkin and checkout dates')

    await setValue("checkindate", datesArray[key1]);
    await setValue("checkoutdate", datesArray[key2]);
    
    report.addStep('store checkin and checkout dates in local storage')
 
});

When(/^the user select adults and child count$/, async() => {
    //select adult,child and room count
	await searchCom.bc_SelectAdultChildCount();
    report.addStep('selecting adult, child and rooms count')

});


When(/^user dismisses the alert$/, async () => {
    //dismiss the alert
    await homeCom.bc_DismissAlert()
    report.addStep('dismiss the alert')

});

Then(/^alert should not be present$/, async () => {
    //verify whether the alert is opened
	await homeCom.bc_CheckForAlert()
    report.addStep('check whether the alert is present on the page')

});







