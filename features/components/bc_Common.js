
class CommonComponent {
    async openHomePage(url) {
       //load the booking.com website url 
        await browser.url(url);  
       
    }
  
    verifyPageUrl = async () => {
      //verify that loaded url is booking.com 
      await expect(browser).toHaveUrlContaining('booking')
      console.log('booking.com url is loaded')
    }
  }
  
  export default new CommonComponent();