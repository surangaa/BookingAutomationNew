class SearchPage {
    get tf_Location() {
      return $("//input[@id=':Ra9:']");
    }
  
    get dd_Location() {
      return $('(//ul)[2]/li');
    }
  
    async btn_CheckinDate(in_day) {
  
      await $(`td span[data-date="${in_day}"]`).click();
    }
  
    async btn_CheckoutDate(out_day) {
      await $(`td span[data-date="${out_day}"]`).click();
    }
  
    get tf_AdultChildCount() {
      return $('button[data-testid="occupancy-config"]');
    }
  
    get btn_Minus() {
      return $("//div[contains(@class, 'e98c626f34')]//button[1]");
    }
  
    get btn_Done() {
      return $("button*=Done");
    }
  
    get btn_Search() {
      return $("//span[text()='Search']/..");
    }
  
    get chk_StarRate() {
      return $("//input[@id=':Rlf94q:']");
    }
  
    get btn_SortBy() {
      return $("button*=Sort by");
    }
  
    get btn_PriceLowestListItem() {
      return $("button*=Price (lowest first)");
    }
  
    get tf_LocationSearch() {
      return $('//input[@name="ss"]');
    }
  
    get btn_SelectedCheckinDate() {
      return $("//div[@class='f9cf783bde'][2]//button[1]");
    }
  
    get btn_SelectedCheckoutDate() {
      return $("//div[@class='f9cf783bde'][2]//button[2]");
    }
  
    get txt_Count() {
      //gets all room, adult and child count
      return $$('div[class="e98c626f34"] span[class="e615eb5e43"]');
    }
  
  }
  
  export default new SearchPage();
  