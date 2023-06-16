
class Common {
    async bc_OpenHomePage(prm_Url) {
       //load the booking.com website url 
        await browser.url(prm_Url);  
    }
  
    bc_VerifyPageUrl = async () => {
      //verify that loaded url is booking.com 
      await expect(browser).toHaveUrlContaining('booking')
      console.log('booking.com url is loaded')
    }
  }
  
  export default new Common();