import SearchPage from "../pageobjects/pg_Search.js";
import dates from "../test-Data/td_dates.js"

class Search {
  async bc_SelectLocation(prm_Location) {
    //click on location text field
    await SearchPage.tf_Location.click();
    await browser.pause(1000);

    //set the location value
    await SearchPage.tf_Location.setValue(prm_Location);
    await browser.pause(3000);

    //select the suggested first location
    await SearchPage.dd_Location.click();
    await browser.pause(3000);
  }

  async bc_SelectCheckinCheckout() {
    //read checkin and checkout dates from td_dates data file
    const inDay = dates.checkIn;
    const outDay = dates.checkOut;

    //select checkin date
    await SearchPage.btn_CheckinDate(inDay);

    //select checkout date
    await SearchPage.btn_CheckoutDate(outDay);

    //get and store selected checkin and checkout dates
    let passDates = await this.bc_GetDates();
    return passDates;
  }

  async bc_SelectAdultChildCount() {
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

  async bc_ClickSearch() {
    //click serach button
    await SearchPage.btn_Search.click();
  }

  async bc_VerifyLocation(prm_Location) {
    let locationValue = await SearchPage.tf_LocationSearch.getValue();

    //get the stored location
    let locationPassed =  prm_Location;

    //verify location
    await expect(locationValue).toEqual(locationPassed);
  }

  async bc_SelectRating() {
    //scroll down of the page
    await SearchPage.chk_StarRate.scrollIntoView();
    //click star 5 rating
    await SearchPage.chk_StarRate.click();
  }

  async bc_SelectSortBypriceOption() {
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

  async bc_GetDates() {
    //get checkin date and checkout date after selection
    let checkInDate = await SearchPage.btn_SelectedCheckinDate.getText();
    let checkOutDate = await SearchPage.btn_SelectedCheckoutDate.getText();
    return { checkInDate, checkOutDate };
  }
}

export default new Search();
