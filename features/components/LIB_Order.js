import { expect as Chaiexpect } from "chai";
import OrderPage from "../pageobjects/pg_Order.js";

class Order {
  async bc_VerifyBooking(prm_InDate, prm_OutDate, prm_Total) {
    //get checkin date from Orderpage
    const checkInPd = await OrderPage.lbl_Indate.getText();

    //verify whether checkin date of home page matches checkin date order confirmation page
    const checkin = checkInPd.substring(0, checkInPd.lastIndexOf(" "));
    await expect(checkin).toEqual(prm_InDate);

    //get checkout date from Orderpage
    const checkOutPd = await OrderPage.lbl_Outdate.getText();

    //verify whether checkout date of home page matches checkout date order confirmation page
    const checkOut = checkOutPd.substring(0, checkOutPd.lastIndexOf(" "));
    await expect(checkOut).toEqual(prm_OutDate);

    //get total cost by calling bc_GetTotalCost() method
    const totalCost = await this.bc_GetTotalCost();

    //verify whether the total calculated matches with what got from product page
    await expect(prm_Total).toEqual(totalCost);
  }

  async bc_GetTotalCost() {
    //get displayed total
    const pdPrice = await OrderPage.lbl_ProductTotal.getText();

    //removing alphabetical characters from the price
    const pdPrice2 = Math.round(pdPrice.replace(/[^\d,.-]/g, ""));

    //get displayed tax amount
    const taxedAmount = await OrderPage.lbl_Tax.getText();

    //removing alphabetical characters from the price
    const taxedAmount2 = taxedAmount.replace(/[^\d,.-]/g, "");

    //calculate full amount tax+price
    const fullAmount3 = parseInt(taxedAmount2) + parseInt(pdPrice2);
    return fullAmount3;
  }

  async bc_FillDetailsForm(prm_FirstName, prm_LastName, prm_Email) {
    //fill out firstname, lastname, email
    await OrderPage.tf_FirstName.setValue(prm_FirstName);

    await OrderPage.tf_LastName.setValue(prm_LastName);

    await OrderPage.tf_EmailAddress.setValue(prm_Email);

    //wait till browser load
    await browser.pause(6000);

    //click next button
    await OrderPage.btn_Next.click();
  }

  async bc_VerifyFormDetails(prm_FirstName, prm_LastName, prm_Email) {
    await browser.pause(5000);

    //get full name by concatinating two strings
    const fullName = prm_FirstName + " " + prm_LastName;

    //get full name from the element
    const fullName2 = await OrderPage.lbl_FullName.getText();

    //get email address from the element
    const emailAddress = await OrderPage.lbl_Email.getText();

    //verify full name in the order confirmation page with what entered in above step
    Chaiexpect(fullName).to.equal(fullName2);

    //verify email in the order confirmation page with what entered in above step
    Chaiexpect(prm_Email).to.equal(emailAddress);

    //click on booking.com logo
    await OrderPage.lnk_BookingLogo.click();
  }
}

export default new Order();
