import SearchPage from "../pageobjects/pg_Search.js";
import dates from "../test-Data/td_dates.js"
import location from "../test-Data/td_product.js";

class SearchComponent {
  async selectLocation() {
    //click on location text field
    await SearchPage.tf_Location.click();
    await browser.pause(1000);

    //set the location value
    await SearchPage.tf_Location.setValue(location.town);
    await browser.pause(3000);

    //select the suggested first location
    await SearchPage.dd_Location.click();
    await browser.pause(3000);
  }

  async selectCheckinCheckout() {
    //read checkin and checkout dates from td_dates data file
    const in_day = dates.checkin;
    const out_day = dates.checkout;

    //select checkin date
    await SearchPage.btn_CheckinDate(in_day);

    //select checkout date
    await SearchPage.btn_CheckoutDate(out_day);
    //get and store selected checkin and checkout dates
    let cd = await this.getDates();
    return cd;
  }

  async selelctAdultChildCount() {
    //click on dropdown button
    await SearchPage.tf_AdultChildCount.click();
    //select adult count
    await SearchPage.btn_Minus.click();

    //verify selected values for adult, child and rooms count
    await expect(SearchPage.txt_Count[0]).toHaveText("1");
    await expect(SearchPage.txt_Count[1]).toHaveText("0");
    await expect(SearchPage.txt_Count[2]).toHaveText("1");

    //click done button
    await SearchPage.btn_Done.click();
  }

  async clickSearch() {
    //click serach button
    await SearchPage.btn_Search.click();
  }

  async verifyLocation() {
    let locationvalue = await SearchPage.tf_LocationSearch.getValue();
    //get the stored location from the data file
    let locationpassed = location.town;
    //verify location
    await expect(locationvalue).toEqual(locationpassed);
  }

  async selectRating() {
    //scroll down of the page
    await SearchPage.chk_StarRate.scrollIntoView();
    //click star 5 rating
    await SearchPage.chk_StarRate.click();
  }

  async selectSortBypriceOption() {
    //scroll up the page
    await SearchPage.btn_SortBy.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
    //perform click on sort by dropdown
    await SearchPage.btn_SortBy.click();
    //select price lowest option
    await SearchPage.btn_PriceLowestListItem.click();
  }

  async getDates() {
    //get checkin date and checkout date after selection
    let checkindate = await SearchPage.btn_SelectedCheckinDate.getText();
    let checkoutdate = await SearchPage.btn_SelectedCheckoutDate.getText();
    return { checkindate, checkoutdate };
  }
}

export default new SearchComponent();
