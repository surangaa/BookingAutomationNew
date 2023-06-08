import { Given, When, Then } from '@wdio/cucumber-framework';
import CommonComponent from '../components/bc_Common.js';
import report from '@wdio/allure-reporter'

Given(/^The user is navigated to "([^"]*)" in "([^"]*)"$/, async (url, environment) => {
    //load the booking.com website url
    await CommonComponent.openHomePage(url, environment);
    report.addStep('opening the web page with booking.com url')
});
