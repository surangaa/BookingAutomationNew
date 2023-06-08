import { expect as Chaiexpect } from "chai";
import OrderPage from '../pageobjects/pg_Order.js'
import staticData  from "../test-Data/td_user.js";

class OrderComponent {


  async verifyBooking(indate, outdate, total) {
    const checkinPd = await OrderPage.lbl_Dates[0].getText();

    //verify whether checkin date of home page matches checkin date order confirmation page
    const ci = checkinPd.substring(0, checkinPd.lastIndexOf(" "));
    await expect(ci).toEqual(indate);

    const checkoutPd = await OrderPage.lbl_Dates[1].getText();
    //verify whether checkout date of home page matches checkout date order confirmation page
    const co = checkoutPd.substring(0, checkoutPd.lastIndexOf(" "));
    await expect(co).toEqual(outdate);

    //verify the booking price
    const pdprice = await OrderPage.lbl_ProductTotal.getText();
    await expect(Math.round(total)).toEqual(Math.round(pdprice));
  }

  async fillDetailsForm() {
    // let a = firstname;
    // let b = lastname;
    // let c = emailaddress;

    //fill out firstname, lastname, email
    await OrderPage.tf_FirstName.setValue(staticData.firstName);

    await OrderPage.tf_LastName.setValue(staticData.lastName);

    await OrderPage.tf_EmailAddress.setValue(staticData.email);

    browser.pause(60000);
    //click next button
    await OrderPage.btn_Next.click();

    // return { a, b, c };
  }

  async verifyFormDetails(fn, ln, em) {
    browser.pause(5000);
    //verify full name and email
    const fullname = fn + " " + ln;
    const fullname2 = await OrderPage.lbl_AccountDetails[0].getText();
    const email2 = await OrderPage.lbl_AccountDetails[1].getText();
    // console.log(fullname)
    await Chaiexpect(fullname).to.equal(fullname2);
    await Chaiexpect(em).to.equal(email2);

    //click on booking.com logo
    await OrderPage.lnk_BookingLogo.click();
  }
}

export default new OrderComponent();
