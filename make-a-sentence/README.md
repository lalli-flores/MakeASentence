Description:

Make-a-Sentence is a Web application built using ReactJS, axios, react hooks, material ui and allows the users learning English to form proper sentences.

UI Layout: The UI is built to have the following input elements:
    1. Sentence Type: yesno, whatobj, whosubj : Indicates what type of a sentence is it, default is declarative statement
    2. Subject - Noun : Required 
    3. Object - Noun : Required 
    4. Verb: - Noun : Required 
    5. Tense: Present, Past or Future tense - Default is "Present"
    6. Added optional inputs for params with singular or plural subject and Object selection

API: https://lt-nlgservice.herokuapp.com/rest/english/realise?[PARAMS]  where PARAMS include the inputs from the form.
  
Running the project:

Do a fresh ### `npm install` 
then run ### `npm start`
Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


1. Form Validation: Form validation is in place to ensure mandatory fields are filled in and only alphabets are allowed   
   for subject,verb and object fields before actually making an api call. This avoid unnecessary api calls unless valid param info is available
2. Error Handling: Application provides a way to gracefully handle errors by maintaining the state: State contains  
   information about the data fetch
        Waiting for data : loading is true and a spinner is displayed
        Data Fetch successful: set the response and display the success message in green color
        Data Fetch failed: Display an error message to let the user know about the failure
3. 

