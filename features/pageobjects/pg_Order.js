
class OrderPage {
  get lbl_Dates() {
    return $$('time span[class="bui-date__title"]');
  }

  get lbl_ProductTotal() {
    return $(
      'div[class="bp-price-details__total-price e2e-price-details__total-charge--user"] span'
    );
  }

  get tf_FirstName() {
    return $("#firstname");
  }

  get tf_LastName() {
    return $("#lastname");
  }

  get tf_EmailAddress() {
    return $("#email");
  }
  get btn_Next() {
    return $("button*= Next: Final details");
  }

  get lbl_AccountDetails() {
    return $$('div[class="bp-u-text-ellipsis bui-f-color-grayscale"]');
  }

  get lnk_BookingLogo() {
    return $("aria/Booking.com online hotel reservations");
  }

  get dd_Country() {
    return $$('span[class="f9afbb0024 e733f1c8d1"]');
  }

}

export default new OrderPage();
