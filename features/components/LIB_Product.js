import { expect as Chaiexpect } from "chai";
import ProductPage from "../pageobjects/pg_Product.js";
import OrderPage from "../pageobjects/pg_Order.js";

class Product {
  async bc_GetProductDetails() {
    // get product name of the second product in the Product page
    const productName = await ProductPage.lbl_SecondProductName.getText();

    //get product price of the second product in the Product page
    const productPrice = await ProductPage.lbl_SecondProductPrice.getText();

    //get product tax of the second product in the Product page
    const extractedTax = await ProductPage.lbl_TaxAmount.getText();

    //calculate amount with tax
    const withTax = await this.bc_GetTax(extractedTax, productPrice);

    return { productName, productPrice, extractedTax, withTax };
  }

  async bc_SelectSecondProduct() {
    await browser.pause(2000);
    //calling bc_GetProductDetails() method
    const proDetails = await this.bc_GetProductDetails();

    //click on second Product and naviagte to product details page
    await ProductPage.lbl_SecondProductName.click();

    //switch to product details page
    await browser.switchWindow("booking.com/hotel");

    return proDetails;
  }

  async bc_VerifyProductDetails(prm_ProductName) {
    //wait till the element exist
    await ProductPage.lbl_ProductNamePd.waitForExist({
      timeout: 10000,
      timeoutMsg: "product details page is not fully loaded",
    });

    //get product Name
    const pdProductName = await ProductPage.lbl_ProductNamePd.getText();

    //verify the product name in the product details page with the product list page
    Chaiexpect(prm_ProductName).to.equal(pdProductName);
  }

  async bc_GetTax(prm_ExtractedTax, prm_ProductPrice) {
    //get tax value
    const tax = prm_ExtractedTax.replace(/[^\d,.-]/g, "");

    //get current price after discount
    const price = prm_ProductPrice.replace(/[^\d,.-]/g, "");

    //get full amount by tax+price
    const fullAmount = parseInt(tax) + parseInt(price);

    return fullAmount;
  }

  async bc_SelectRoomCount(prm_FullAmount) {
    await browser.pause(3000);
    //scroll till view the selectbox
    await ProductPage.lbl_HeadingLevel.scrollIntoView();
    await browser.pause(3000);

    let count = 0;
    let priceMatch = false;

    while (!priceMatch) {
      //get price and tax amount of each table row according to count variable starting from first row
      const getprice = await ProductPage.lbl_Price[count].getText();
      const gettax = await ProductPage.lbl_Tax[count].getText();

      //remove alphabetical characters from the price
      const tablePrice = getprice.replace(/[^\d,.-]/g, "");

      //remove alphabetical characters from the tax
      const tableTax = gettax.replace(/[^\d,.-]/g, "");

      //calculate full amount of the row
      const fullAmount2 = parseInt(tablePrice) + parseInt(tableTax);

      //compare the calculated price with the fullamount got the product details page
      if (prm_FullAmount == fullAmount2) {
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
        priceMatch = true;
      } else {
        //if values are not similar increase count by 1
        count++;
      }
    }
  }
}

export default new Product();
