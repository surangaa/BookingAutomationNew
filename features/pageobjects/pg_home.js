class HomePage {
  get btn_Country() {
    return $('(//span[@class="cb5ebe3ffb"]/button)[2]');
  }

  get btn_ModalClose() {
    return $('div[class="e5aa33035e"] button');
  }

  get btn_CountryUk() {
    return $("button*=English (UK)");
  }

  get btn_CountryUk2() {
    return $("aria/Language: English (UK)");
  }

  get btn_Currency() {
    return $('button[data-testid="header-currency-picker-trigger"]');
  }

  get btn_CurrencyUsd() {
    return $("button*=United States Dollar");
  }

  get btn_CurrencyUsd2() {
    return $("aria/Prices in United States Dollar");
  }
  get btn_Stays() {
    return $('//a[@aria-controls="accommodations"]');
  }

  get btn_AlertClose() {
    return $('div[class="notice-item-close-x"]');
  }

}

export default new HomePage();
