import { expect as Chaiexpect } from "chai";
import ProductPage from "../pageobjects/pg_Product.js";

class ProductComponent{

  async getProductDetails() {
    // get product name of the second product in the Product page
    const productname = await ProductPage.lbl_SecondProductName.getText();

    //get product price of the second product in the Product page
    const productprice = await ProductPage.lbl_SecondProductPrice.getText();
    console.log("product_price"+ productprice)

    //get product tax of the second product in the Product page
    const extractedtax = await ProductPage.lbl_TaxAmount.getText();
    const fa = await this.getTaxAndDiscount(extractedtax, productprice);
    return { productname, productprice, extractedtax, fa };
  }


  async selectSecondProduct() {
    await browser.pause(2000);
    const pd = await this.getProductDetails();
    

    //click on Product name and naviagte to product details page
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

  async getTaxAndDiscount(extractedtax, productprice){
   const tax= extractedtax.replace(/[^\d,.-]/g, '');
   const price= productprice.replace(/[^\d,.-]/g, '');

   console.log('tax2'+ tax)
   const full_amount = tax + price
   return full_amount;
  }

  async selectRoomCount(productprice, extractedtax) {
    await browser.pause(3000);
    //scroll till view the selectbox
    await ProductPage.lbl_HeadingLevel.scrollIntoView();

    let count = 0;
    let pricesMatch = false;

    while (count < 6 && !pricesMatch) {
      try {
        const getprice = await ProductPage.lbl_Price[count].getText();
        const gettax = await ProductPage.lbl_Tax[count].getText();

        if (getprice == productprice) {
          await ProductPage.dd_RoomCount[count].selectByAttribute("value", "1");

          await browser.pause(1000);
          await ProductPage.btn_Reserve.click();

          await OrderPage.lbl_ProductTotal.waitForExist({ timeout: 10000 });

          pricesMatch = true; // Set pricesMatch to true if the prices match
        } else {
          count++;
        }
      } catch (error) {
        console.log("Prices do not match:", error.message);
      }
    }
  }
}

export default new ProductComponent();
