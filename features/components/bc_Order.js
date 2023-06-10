import { expect as Chaiexpect } from "chai";
import OrderPage from "../pageobjects/pg_Order.js";
import staticData from "../test-Data/td_user.js";

class OrderComponent {
  async verifyBooking(indate, outdate, total) {
    const checkinPd = await OrderPage.lbl_Indate.getText();

    //verify whether checkin date of home page matches checkin date order confirmation page
    const ci = checkinPd.substring(0, checkinPd.lastIndexOf(" "));
    await expect(ci).toEqual(indate);

    const checkoutPd = await OrderPage.lbl_Outdate.getText();
    //verify whether checkout date of home page matches checkout date order confirmation page
    const co = checkoutPd.substring(0, checkoutPd.lastIndexOf(" "));
    await expect(co).toEqual(outdate);

    const totalcost = await this.getTotalCost();

    await expect(total).toEqual(totalcost);
  }

  async getTotalCost() {
    //get displayed total
    const pdprice = await OrderPage.lbl_ProductTotal.getText();
    const pdprice2 = Math.round(pdprice.replace(/[^\d,.-]/g, ""));

    const taxedamount = await OrderPage.lbl_Tax.getText();
    const taxedamount2 = taxedamount.replace(/[^\d,.-]/g, "");

    const fullamount3 = parseInt(taxedamount2) + parseInt(pdprice2);
    return fullamount3;
  }

  async fillDetailsForm() {
    //fill out firstname, lastname, email
    await OrderPage.tf_FirstName.setValue(staticData.firstName);

    await OrderPage.tf_LastName.setValue(staticData.lastName);

    await OrderPage.tf_EmailAddress.setValue(staticData.email);

    await browser.pause(6000);
    //click next button
    await OrderPage.btn_Next.click();
  }

  async verifyFormDetails() {
    await browser.pause(5000);
    //verify full name and email
    const fullname = staticData.firstName + " " + staticData.lastName;

    const fullname2 = await OrderPage.lbl_FullName.getText();
    const email2 = await OrderPage.lbl_Email.getText();

    await Chaiexpect(fullname).to.equal(fullname2);
    await Chaiexpect(staticData.email).to.equal(email2);

    //click on booking.com logo
    await OrderPage.lnk_BookingLogo.click();
  }
}

export default new OrderComponent();
