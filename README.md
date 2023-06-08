# BookingAutomationProject

This project includes a basic flow automation of Booking.com official website. Webdriverio and cucumber is used in implementation

## Prerequisites to setup project
install and setup Node
install an IDE (preferably VS Code)


## Steps to run the code
clone the reporsitory -  git clone https://github.com/surangaa/BookingAutomationProject.git
Open the project in IDE
run a 'npm install' to install all the dependencies
To run the test -> npm run test/ npm run testsuite / npm run bookingfeature 
to run the test in edge browser or firefox browser, edit wdio.conf.js file line 72 accordingly as utils.firefox or utils.edge

## Issues faced

1. Faced difficulty in locating some elements as they were not having any unique attribute for id, name or aria attribute.

*Workaround -*
- $$ is used to fetch multiple elements on the page and stored them in an array and use index of array element to access a specific element.
- try to find the xpath of the elements. For this install 'Chropath' browser extension and find xpath to uniquely locate an element.

2. Observed that between some steps, there should be a wait time in order to load the page or elements.

*Workaround -* having waitforExist() or waitForClickable() to handle particular scenarios

3. Parameterization test url.
*Workaround -* had a seperate file as url.js with the urls and read the specific property in 'common.page.js' page.

               If user want to select a specific url according to the environment, 
                I. to get the url by environment '/' should be used within brackets in common.page.js file line 11. 
                II. make sure to comment line 6-13 and line 108 in wdio.conf.js and comment line 107 in wdio.conf.js
                III. they can first set the ENV variable using "SET ENV='DEV'" then call out the 'npm run test' in cmd line.
       

4. Sharing data between cucumber steps       
*Workaround -*  used shared Store service to exchange data between steps and specs    


## Challenges
- an modal dialog appears on booking.com site randomly when going to select country. Had to handle the modal dialog and close it before proceeding with the next steps. 



