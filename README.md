# BookingAutomationProject

This project includes a basic flow automation of Booking.com official website. Webdriverio and cucumber is used in implementation

## Prerequisites to setup project
- install and setup Node
- install an IDE (VS Code)


## Steps to run the code
- clone the reporsitory -  git clone https://github.com/surangaa/BookingAutomationNew.git
- Open the project in IDE
- run a 'npm install' to install all the dependencies
- To run the test -> `npm run test`/ `npm run testsuite` / `npm run bookingfeature` 
- To run qa environment -> `npm run test:qa`
- To run in stg environment -> `npm run test:stg`
- to run the test in edge browser or firefox browser, edit wdio.conf.js file line 72 accordingly as utils.firefox or utils.edge

## Issues faced

1. Faced difficulty in locating some elements as they were not having any unique attribute for id, name or aria attribute.

*Workaround -*
- came up with customized xpath locaters

2. Observed that between some steps, there should be a wait time in order to load the page or elements.

*Workaround -* having waitforExist() or waitForClickable() to handle particular scenarios

3. Parameterization test url and send .
*Workaround -* had a seperate .env file with the urls according to environment
              These urls are used in environment specific .conf files. These config files are executed based on the requirement in runtime. 
              `npm run test:qa` and `npm run stg:qa` can be used to run in specific environments
       

4. Sharing data between cucumber steps       
*Workaround -*  used shared Store service to exchange data between steps and specs    


## Challenges
- an modal dialog appears on booking.com site randomly when going to select country. Had to handle the modal dialog and close it before proceeding with the next steps. 



