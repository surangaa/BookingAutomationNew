@bookingfeature
Feature: TC_001_ValidatingBookingProcess

    Background:
        Given The user is navigated to "https://www.booking.com/" in "QA"

    Scenario: As a user, I can proceed with placing order, cancel the booking process and navigate back to home page
        When  the user perform country selection
        Then the country should be changed to UK
        When  the user perform currency selection
        Then the currency should be changed to USD
        When  the user click on Stays tab
        Then the tab should be changed to Stays
        When  the user enter the location
        And the user selects check in and check out dates
        And the user select adults and child count
        Then the location should be selected as location
        When user clicks on 5 star rating
        And User filters price lowest products
        And User selects second product on the list
        When user selects Rooms count and proceed
        Then checkout, checkin dates and amount should be same
        When user enters firstname, lastname and emailaddress and click Next
        Then entered details should be same
        When user dismisses the alert
        Then alert should not be present












