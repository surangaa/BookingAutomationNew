
class CommonComponent {
    async openHomePage(url, environment) {
       //load the booking.com website url  
       if(environment == "QA"){
        await browser.url(url);  
       }
    }
  
    verifyPageUrl = async () => {
      //verify that loaded url is booking.com 
      await expect(browser).toHaveUrlContaining('booking')
      console.log('booking.com url is loaded')
    }
  }
  
  export default new CommonComponent();