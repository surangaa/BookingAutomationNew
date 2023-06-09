import { Given, When, Then } from '@wdio/cucumber-framework';
import CommonComponent from '../components/bc_Common.js';
import report from '@wdio/allure-reporter'
import {config} from '/Users/SurangaWijayarathna/Desktop/webdriverio3/wdio.conf.js'

Given(/^The user is navigated to "([^"]*)"$/, async (url) => {
    //load the booking.com website url
    const urlnew = config.baseUrl;
    const fullUrl =  urlnew + url;
    await CommonComponent.openHomePage(fullUrl);
    report.addStep('opening the web page with booking.com url')
});
