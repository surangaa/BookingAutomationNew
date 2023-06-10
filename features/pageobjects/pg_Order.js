
class OrderPage {
  get lbl_Indate() {
    return $('(//time/descendant::span)[1]');
  }

  get lbl_Outdate() {
    return $('(//time/descendant::span)[3]');
  }

  get lbl_ProductTotal() {
    return $(
      'div[class*="bp-price-details__total-price"] span'
    );
  }

  get tf_FirstName() {
    return $('//input[@id="firstname"]');
  }

  get tf_LastName() {
    return $('//input[@id="lastname"]');
  }

  get tf_EmailAddress() {
    return $('//input[@id="email"]');
  }
  get btn_Next() {
    return $("button*= Next: Final details");
  }

  get lbl_FullName() {
    return $('(//ul)[4]/li/div[2]');
  }

  get lbl_Email() {
    return $('((//ul)[4]/li/div)[4]');
  }

  get lnk_BookingLogo() {
    return $("aria/Booking.com online hotel reservations");
  }

  get lbl_Tax(){
    return $('(//div[@class="bui-u-text-right"])[2]/div');
  }

}

export default new OrderPage();
