import React, { useState } from "react";
import axios from "axios";

// Material UI components have been used to provide a better user experience.
import {
  Select,
  MenuItem,
  RadioGroup,
  Radio,
  makeStyles,
  Paper,
  Grid, 
  FormControl,
  FormControlLabel,
  FormHelperText,
  Typography,
  TextField,
  Button,
  CircularProgress
} from "@material-ui/core";

// Using using makeStyles for styling the components and providing common classes for easier maintanability
const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  eltSpacing: {
    marginLeft: 5,
    marginRight: 5,
  },
  selectStyle: {
    marginTop: 13,
  },
  buttonStyle: {
    marginTop: 15,
  },
}));

/* 
 UI with the following input elements:
    1. Sentence Type: yesno, whatobj, whosubj : Indicates what type of a sentence is it, default is declarative statement
    2. Subject - Noun : Required 
    3. Object - Noun : Required input
    4. Verb: - Noun : Required input
    5. Tense: Present, Past or Future tense - Default is "Present"
    6. Added optional inputs for params with singular or plural subject and Object selection
 */
/* API: https://lt-nlgservice.herokuapp.com/rest/english/realise?[PARAMS]*/
  
function SentenceForm() {
  const classes = useStyles();
  /*
  State contains information about the data fetch
  Waiting for data : loading is true and a spinner is displayed
  Data Fetch successful: set the response and display the success message in green color
  Data Fetch failed: Display an error message to let the user know about the failure
  */ 
  const [state, setstate] = useState({
    data:"",
    loading: false,
    error: ""
  })

  // Using useState hook for the params subject,object,verb, tense and sentenceType

  const [subject, setSubject] = useState("");
  const [object, setObject] = useState("");
  const [verb, setVerb] = useState("");
  const [tense, setTense] = useState("Present");
  const [sentenceType, setSentenceType] = useState("declarative");
  const tenses = ["Present", "Past", "Future"]; // List of possibile menu options for verb tense
  
// Error Handling: In case of any validation errors, display the error mesage: 
// validations includes, empty required fields, entering any other data in the input fields other than strings.

  const [objectErr, setObjectErr] = React.useState("");
  const [subjectErr, setSubjectErr] = React.useState("");
  const [verbErr, setVerbErr] = React.useState("");

  // optional params considered:
  const [objNum, setObjNum] = useState("singular");
  const [subjNum, setSubjNum] = useState("singular");
  const [objDet, setObjDet] = useState("a"); // By default singular will have "a" and when the plural option is selected, params will be passed with "the"
  const [subjDet, setSubjDet] = useState("a");

  // Base url for Linguatools Sentence Generating API, params are dynamically added based on the change events to input params in the form
  const baseUrl = `https://lt-nlgservice.herokuapp.com/rest/english/realise?subject=${subject}&verb=${verb}&object=${object}&tense=${tense.toLocaleLowerCase()}&objnum=${objNum}&subjnum=${subjNum}&objdet=${objDet}&subjdet=${subjDet}&sentencetype=${sentenceType}&progressive=progressive`;
  const isValidationFailed = () => {
    let hasError = false;

    const regex =  /^[a-zA-Z][a-zA-Z \\s]+$/; // Allowing only alphabtes and spaces for the input text fields

    if (!subject || !regex.test(subject)) {
      setSubjectErr("Please enter valid Subject");
      hasError = true;
    } else {
      setSubjectErr("");
    }
    if (!object || !regex.test(object)) {
      setObjectErr("Please enter valid Object");
      hasError = true;
    } else {
      setObjectErr("");

    }
    if (!verb || !regex.test(verb)) {
      setVerbErr("Please enter a valid Verb");
      hasError = true;

    } else {
      setVerbErr("");

    }

    setstate({
      data: "",
      loading: false,
      error: ""
    });
    return hasError;
  }

// Handling the form submit to fetch the data from the api

  const handleSubmit = (evt) => {
    evt.preventDefault();   

    // If the validation is successful and there are no validation error, then make the api call
    if (!isValidationFailed()) {
      setstate({
        data: "",
        loading: true,
        error: ""
      });
      
      axios
        .get(baseUrl)
        .then((response) => {
          console.log("Response is ", response);
          if (response.data.result === "OK") {
              // Data fetch is successful, so set the loading indicator to false and display the sentence fetched
                setstate({
                data: response.data.sentence,
                loading: false,
                error: ""
                });
            }
        })
        .catch((err) => {
          console.log("Errored out with ", err);
            // Data fetch errored out, so set the error message to inform the user about the failure

          setstate({
            data:"",
            loading: false,
            error:  "Error fetching the sentence data"
          });
        });
    }
  };

  return (
    <div data-testid="form">
      <Typography variant="h6" component="h2" className={classes.root}
      data-testid="sentenceResult">

      {state.loading && <CircularProgress size={20}/>}
      {state.data && <label data-testid="success" style={{ color: 'green', fontSize:17 }}> Final Sentence: {state.data}</label>}
      {state.error && <label data-testid="error"  style={{ color: 'red', fontSize:17 }}>{state.error}</label>}
      </Typography>

      <form className={classes.root} noValidate id="sentenceForm">
        <Paper style={{ padding: 16 }}>
          <Grid container alignItems="flex-start" spacing={2}>
            <Grid item xl={12}>
              <FormControl className={classes.eltSpacing}>
                  {/* Subject: A subject is a part of a sentence that contains the 
                  person or thing performing the action (or verb) in a sentence. */}
                <TextField               
                  name="subject"
                  variant="outlined"
                  margin="normal"
                  type="text"
                  fullWidth
                  required
                  label="Subject"
                  value={subject}
                  autoFocus
                  placeholder="Enter Subject"
                  helperText={subjectErr}
                  error={!!subjectErr}
                  onChange={(e) => setSubject(e.target.value)}
                  inputProps={{
                    'data-testid': 'subjectInput'
                  }}
                ></TextField>
              </FormControl>
            </Grid>
            <Grid item xl={12}>
              <FormControl className={classes.eltSpacing}>
                 {/* Verb: A verb is the action or state of being in a sentence. */}
                <TextField
                  variant="outlined"
                  margin="normal"
                  type="text"
                  fullWidth
                  required
                  label="Verb"
                  helperText={verbErr}
                  placeholder="Enter Verb"
                  error={!!verbErr}
                  onChange={(e) => setVerb(e.target.value)}
                  inputProps={{
                    'data-testid': 'verbInput'
                  }}
                ></TextField>
              </FormControl>
            </Grid>
            <Grid item xl={12}>
              <FormControl className={classes.eltSpacing}>
                   {/* Object: The object of a sentence is the person or thing that receives the action of the verb. 
                    It is the who or what that the subject does something to */}
                <TextField
                  variant="outlined"
                  margin="normal"
                  type="text"
                  fullWidth
                  required
                  label="Object"
                  placeholder="Enter Object"
                  helperText={objectErr}
                  error={!!objectErr}
                  onChange={(e) => setObject(e.target.value)}
                  inputProps={{
                    'data-testid': 'objectInput'
                  }}
                ></TextField>
              </FormControl>
            </Grid>
           
            <Grid item>
              <FormControl className={classes.eltSpacing}>
                <Select className={classes.selectStyle}
                  variant="outlined"
                  data-testid= 'sentenceSelect'
                  type="text"
                  fullWidth
                  id="sentence-type"
                  value={sentenceType}
                  onChange={(e) => setSentenceType(e.target.value)}                
                >
                   <MenuItem   
                      id=""                  
                      value= "declarative"
                      style={{ zIndex: 1900 }}
                    > Declarative </MenuItem>
                   <MenuItem   
                      id=""                  
                      value= "yesno"
                      style={{ zIndex: 1900 }}
                    > Yes/NO Question</MenuItem>
                     <MenuItem   
                      id=""                  
                      value= "whatobj"
                      style={{ zIndex: 1900 }}
                    > WH-question object</MenuItem>
                     <MenuItem   
                      id=""                  
                      value= "whosubj"
                      style={{ zIndex: 1900 }}
                    > WH-question subject</MenuItem>
                </Select>
                <FormHelperText className={classes.eltSpacing}>Sentence Type</FormHelperText>
              </FormControl>

            </Grid>
            <Grid item>
              <FormControl className={classes.eltSpacing}>
                <Select className={classes.selectStyle}
                  data-testid= 'tenseSelect'
                  variant="outlined"
                  type="text"
                  fullWidth                
                  id="tense"
                  value={tense}
                  onChange={(e) => setTense(e.target.value)}
                 
                >
                  {tenses.map((tenseType, index) => (
                    <MenuItem
                      key={index}
                      value={tenseType}
                      style={{ zIndex: 1900 }}
                    >
                      {tenseType}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText className={classes.eltSpacing}>Verb Tense</FormHelperText>
              </FormControl>
            </Grid>

            <Grid item xl={12}>              
              <FormControl className={classes.eltSpacing}>
              <RadioGroup aria-label="singPlu" name="singPlu" value={subjNum} onChange={e => setSubjNum(e.target.value, setSubjDet("the"))}>
              <FormControlLabel value="singular" control={<Radio />} label="Singular" />
              <FormControlLabel value="plural" control={<Radio />} label="Plural"/>
                </RadioGroup>
                <FormHelperText className={classes.eltSpacing}>Subject Plural</FormHelperText>
              </FormControl>
            </Grid>

            <Grid item xl={12}>              
              <FormControl className={classes.eltSpacing}>
              <RadioGroup aria-label="singPlu" name="singPlu" value={objNum} onChange={e => setObjNum(e.target.value, setObjDet("the"))}>
              <FormControlLabel value="singular" control={<Radio />} label="Singular" />
              <FormControlLabel value="plural" control={<Radio />} label="Plural"/>
                </RadioGroup>
                <FormHelperText className={classes.eltSpacing}>Object Plural</FormHelperText>
              </FormControl>
            </Grid>

           
            <Grid item>
              <FormControl>
                <Button className={classes.buttonStyle} type="submit" color="primary" onClick={handleSubmit} data-testid="submit" value="Submit">
                  Submit
                </Button>
              </FormControl>
            </Grid>
          </Grid>
        </Paper>
      </form>
    </div>
  );
}

export default SentenceForm;