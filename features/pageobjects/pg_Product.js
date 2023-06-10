
class ProductPage {
  get lbl_SecondProductName() {
    return $("(//div[@data-testid='property-card'])[2]//h3//div[1]")
  }

  get lbl_SecondProductPrice() {
    return $(
      '(//span[@data-testid="price-and-discounted-price"])[2]'
    );
  }

  get lbl_ProductNamePd() {
    return $('//h2[@class="d2fee87262 pp-header__title"]');
  }

  get dd_RoomCount() {
    //get all room selection dropdowns in the table
    return $$('//select[@class="hprt-nos-select js-hprt-nos-select"]');
  }

  get btn_Reserve() {
    return $('//button[@data-tooltip-class="submit_holder_button_tooltip"]');
  }

  get lbl_HeadingLevel() {
    return $('h2*=Availability');
  }

  get lbl_TaxAmount() {
    return $('(//div[@data-testid="taxes-and-charges"])[2]');
  }

  get lbl_Price() {
    //get all price elements in the table
    return $$('//span[@class="prco-valign-middle-helper"]');
  }

  get lbl_Tax() {
    //get all tax elements in the table
    return $$(
      'div[class*="prd-taxes-and-fees-under-price"]'
    );
  }

  get lbl_OriginalPrice(){
    return $('(//div[@data-testid="availability-rate-information"]//div/span[1])[3]');
  }


}

export default new ProductPage();
