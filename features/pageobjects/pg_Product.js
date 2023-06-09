
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
    return $('button[data-tooltip-class="submit_holder_button_tooltip"]');
  }

  get lbl_HeadingLevel() {
    return $('h2*=Availability');
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

  get lbl_OriginalPrice(){
    return $("//span[@class='c5888af24f e729ed5ab6']");
  }

  async listCount(){
    var listlength = this.lbl_Price.length;
    return listlength
  }

}

export default new ProductPage();
