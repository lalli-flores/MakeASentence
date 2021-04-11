# Description:

Make-a-Sentence is a Web application built using ReactJS, axios, react hooks, material ui and allows the users learning English to form proper sentences.

# UI Layout: The UI is built to have the following input elements:
    1. Sentence Type: yesno, whatobj, whosubj : Indicates what type of a sentence is it, default is declarative statement
    2. Subject - Noun : Required 
    3. Object - Noun : Required 
    4. Verb: - Noun : Required 
    5. Tense: Present, Past or Future tense - Default is "Present"
    6. Added optional inputs for params with singular or plural subject and Object selection
    7. UI created to work well on both browsers (Validated on Chrome and Safari) and mobile devices (Android and Iphone)

API: https://lt-nlgservice.herokuapp.com/rest/english/realise?[PARAMS]  where PARAMS include the inputs from the form.
  
# Running the project:

Do a fresh ### `npm install` 
then run ### `npm start`
Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


# Implementatation Details:

1. Form Validation: Form validation is in place to ensure mandatory fields are filled in and only alphabets are allowed   
   for subject,verb and object fields before actually making an api call. This avoid unnecessary api calls unless valid param info is available
2. Error Handling: Application provides a way to gracefully handle errors by maintaining the state: State contains  
   information about the data fetch
        Waiting for data : loading is true and a spinner is displayed
        Data Fetch successful: set the response and display the success message in green color
        Data Fetch failed: Display an error message to let the user know about the failure
3. Material UI: Used material ui to provide better user experience.
4. Used axios as it provides a secure way for making http request to the api and is lightweight and easy to customize  
5. Used Jest, axiosMock and react testing library for unit testing.
6. Manual testing on browser as well as on mobile to align with the requirements

# Web Application Working Snapshots:

## Error Handling Scenario: ![image](https://user-images.githubusercontent.com/60489850/114287340-efec4c80-9a1a-11eb-8aba-430ff3474336.png)
## Succesful Data Fetch![image](https://user-images.githubusercontent.com/60489850/114287263-8d934c00-9a1a-11eb-976b-950204211b80.png)
Loading Data Scenario: ![image](https://user-images.githubusercontent.com/60489850/114287301-9edc5880-9a1a-11eb-8053-a7950bc9c69e.png)
Unsuccessful Data Fetch scenario:![image](https://user-images.githubusercontent.com/60489850/114287384-4194d700-9a1b-11eb-811a-642f197c28ce.png)
Application on Mobile Device: ![image](https://user-images.githubusercontent.com/60489850/114287616-157a5580-9a1d-11eb-80cb-032e45fe9617.png)
