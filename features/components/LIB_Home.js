import HomePage from "../pageobjects/pg_home.js"

class Home {
  async bc_SelectCountry() {
    //close the randomly appearing modal dialog
    await HomePage.btn_ModalClose.click();

    //click on home page country btn
    await HomePage.btn_Country.click();

    //selelct Uk as the country
    await HomePage.btn_CountryUk.click();
  }

  async bc_SelectCurrency() {
    //click on home page currency btn
    await HomePage.btn_Currency.click();

    //selelct usd as the currency
    await HomePage.btn_CurrencyUsd.click();
  }

  async bc_ClickStaysBtn() {
    //click stays button
    await HomePage.btn_Stays.click();
  }

  async bc_DismissAlert() {
    //wait for alert to appear
    await HomePage.btn_AlertClose.waitForExist({ timeout: 10000 });

    //dimiss the alert
    await HomePage.btn_AlertClose.click();
  }

  async bc_CheckForAlert() {
    browser.pause(2000);
    
    //verify whether the alert is opened
    let isOpen = await HomePage.btn_AlertClose.isDisplayed();
    await expect(isOpen).toEqual(false);
  }
}

export default new Home();
