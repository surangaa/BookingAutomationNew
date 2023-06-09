import { expect as Chaiexpect } from "chai";
import ProductPage from "../pageobjects/pg_Product.js";
import OrderPage from "../pageobjects/pg_Order.js";

class ProductComponent {
  async getProductDetails() {
    // get product name of the second product in the Product page
    const productname = await ProductPage.lbl_SecondProductName.getText();

    //get product price of the second product in the Product page
    const productprice = await ProductPage.lbl_SecondProductPrice.getText();

    //get product tax of the second product in the Product page
    const extractedtax = await ProductPage.lbl_TaxAmount.getText();

    //calculate amount with tax and discounted amount
    const fa = await this.getTaxAndDiscount(extractedtax, productprice);

    return { productname, productprice, extractedtax, fa };
  }

  async selectSecondProduct() {
    await browser.pause(2000);
    const pd = await this.getProductDetails();

    //click on second Product and naviagte to product details page
    await ProductPage.lbl_SecondProductName.click();

    //switch to product details page
    await browser.switchWindow("booking.com/hotel");

    return pd;
  }

  async verifyProductDetails(productName) {
    //verify the product name in the product details page with the product list page
    await ProductPage.lbl_ProductNamePd.waitForExist({
      timeout: 10000,
      timeoutMsg: "product details page is not fully loaded",
    });
    const pdproductname = await ProductPage.lbl_ProductNamePd.getText();

    await Chaiexpect(productName).to.equal(pdproductname);
  }

  async getTaxAndDiscount(extractedtax, productprice) {
    //get original price of the product
    // const op = await ProductPage.lbl_OriginalPrice.getText();
    // const originalprice = op.replace(/[^\d,.-]/g, "");

    //get tax value
    const tax = extractedtax.replace(/[^\d,.-]/g, "");
    //get current price after discount
    const price = productprice.replace(/[^\d,.-]/g, "");

    //get full amount by tax+price
    const full_amount = parseInt(tax) + parseInt(price);

    //get discounted amount by originalprice-price
    // const discountedprice = parseInt(originalprice) - parseInt(price);

    return full_amount;
  }

  async selectRoomCount(full_amount) {
    await browser.pause(3000);
    //scroll till view the selectbox
    await ProductPage.lbl_HeadingLevel.scrollIntoView();
    await browser.pause(3000);

    const count = 0;
    const getprice = await ProductPage.lbl_Price[count].getText();
    const gettax = await ProductPage.lbl_Tax[count].getText();

    const gp = getprice.replace(/[^\d,.-]/g, "");
    const gt = gettax.replace(/[^\d,.-]/g, "");

    const famount = parseInt(gp) + parseInt(gt);

    if (full_amount == famount) {
      await ProductPage.dd_RoomCount[count].selectByAttribute("value", "1");

      await browser.pause(1000);
      await ProductPage.btn_Reserve.click();

      await OrderPage.lbl_ProductTotal.waitForExist({ timeout: 10000 });
    } else {
      count++;
    }
  }
}

export default new ProductComponent();
