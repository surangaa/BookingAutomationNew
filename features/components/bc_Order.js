import { expect as Chaiexpect } from "chai";
import OrderPage from "../pageobjects/pg_Order.js";

class OrderComponent {
  async verifyBooking(indate, outdate, total) {
    const checkinPd = await OrderPage.lbl_Indate.getText();

    //verify whether checkin date of home page matches checkin date order confirmation page
    const checkin = checkinPd.substring(0, checkinPd.lastIndexOf(" "));
    await expect(checkin).toEqual(indate);

    const checkoutPd = await OrderPage.lbl_Outdate.getText();
    //verify whether checkout date of home page matches checkout date order confirmation page
    const checkout = checkoutPd.substring(0, checkoutPd.lastIndexOf(" "));
    await expect(checkout).toEqual(outdate);

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

  async fillDetailsForm(firstname, lastname, email) {
    //fill out firstname, lastname, email
    await OrderPage.tf_FirstName.setValue(firstname);

    await OrderPage.tf_LastName.setValue(lastname);

    await OrderPage.tf_EmailAddress.setValue(email);

    await browser.pause(6000);
    //click next button
    await OrderPage.btn_Next.click();
  }

  async verifyFormDetails(firstname, lastname, email) {
    await browser.pause(5000);
    //verify full name and email
    const fullname = firstname + " " + lastname;

    const fullname2 = await OrderPage.lbl_FullName.getText();
    const email2 = await OrderPage.lbl_Email.getText();

    await Chaiexpect(fullname).to.equal(fullname2);
    await Chaiexpect(email).to.equal(email2);

    //click on booking.com logo
    await OrderPage.lnk_BookingLogo.click();
  }
}

export default new OrderComponent();
