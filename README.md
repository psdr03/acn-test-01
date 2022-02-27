# Test Payment Component Application

## Application github page 
https://psdr03.github.io/acn-test-01/

## Packages used
- typescript
- material ui
- react hook form
- moment - Required by datetime picker
- react payment inputs - For validation of credit card numbers
- mockAxios - For mocking the initial API call during the rendering of the application (unit tests)

## Folder structure
- constants - contains a constants file where strings can be placed and imported in other files so as to avoid typos
- interfaces - contains interfaces file that can be imported throughout the application
- services - contains the services file where API calls are consolidated and imported throughout the application

## Sample card numbers
React payment inputs uses Mastercard and Visa card numbers to check validity. Some valid card numbers for testing:
- 5555555555554444
- 5105105105105100
- 4111111111111111
- 4012888888881881