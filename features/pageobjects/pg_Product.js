
class ProductPage {
  get lbl_SecondProductName() {
    return $('(//h3[@class="a4225678b2"]//a//div[@data-testid="title"])[2]');
  }

  get lbl_SecondProductPrice() {
    return $(
      '(//span[@data-testid="price-and-discounted-price"])[2]'
    );
  }

  get lbl_ProductNamePd() {
    return $('h2[class="d2fee87262 pp-header__title"]');
  }

  get dd_RoomCount() {
    //get room selection dropdowns in the table
    return $$('//select[@class="hprt-nos-select js-hprt-nos-select"]');
  }

  get btn_Reserve() {
    return $('//button[@id="b_tt_holder_1"]');
  }

  get lbl_HeadingLevel() {
    return $('//button[@data-sb-id="main"]');
  }

  get lbl_TaxAmount() {
    return $('(//div[@data-testid="taxes-and-charges"])[2]');
  }

  get lbl_Price() {
    //get price elements in the table
    return $$('span[class="prco-valign-middle-helper"]');
  }

  get lbl_Tax() {
    //get tax elements in the table
    return $$(
      'div[class*="prd-taxes-and-fees-under-price"]'
    );
  }

}

export default new ProductPage();
