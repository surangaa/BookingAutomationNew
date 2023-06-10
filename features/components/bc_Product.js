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

    //calculate amount with tax
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

  async getTax(extractedtax, productprice) {
    //get tax value
    const tax = extractedtax.replace(/[^\d,.-]/g, "");
    //get current price after discount
    const price = productprice.replace(/[^\d,.-]/g, "");

    //get full amount by tax+price
    const full_amount = parseInt(tax) + parseInt(price);

    return full_amount;
  }

  async getDiscount(productprice) {
    //get original price of the product
    const op = await ProductPage.lbl_OriginalPrice.getText();
    const originalprice = op.replace(/[^\d,.-]/g, "");

    //get current price after discount
    const price = productprice.replace(/[^\d,.-]/g, "");

    //get discounted amount by originalprice-price
    const discountedamount = parseInt(originalprice) - parseInt(price);

    return discountedamount;
  }

  async selectRoomCount(full_amount) {

    await browser.pause(3000);
    //scroll till view the selectbox
    await ProductPage.lbl_HeadingLevel.scrollIntoView();
    await browser.pause(3000);

    let count = 0;
    let pricematch = false;

    while (!pricematch) {
      //get price and tax amount of each table row according to count variable starting from first row
      const getprice = await ProductPage.lbl_Price[count].getText();
      const gettax = await ProductPage.lbl_Tax[count].getText();

      const tableprice = getprice.replace(/[^\d,.-]/g, "");

      const tabletax = gettax.replace(/[^\d,.-]/g, "");
      //calculate full amount of the row
      const famount = parseInt(tableprice) + parseInt(tabletax);

     //compare the calculated price with the amount got in the product details page
      if (full_amount == famount) {
        //if the values are similar select room count
        await ProductPage.dd_RoomCount[count].selectByAttribute("value", "1");

        await browser.pause(1000);
        //click on Reserve button
        await ProductPage.btn_Reserve.click();
        await browser.pause(5000);

        //wait for Order detaills page to load
        await OrderPage.tf_FirstName.waitForExist({
          timeout: 60000,
          timeoutMsg: "Order page is not fully loaded",
        });
        pricematch = true;
      } else {
        //if values are not similar increase count by 1
        count++;
      }
    }
  }
}

export default new ProductComponent();
