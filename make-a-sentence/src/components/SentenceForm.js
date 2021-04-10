import React, { useState } from "react";
import axios from "axios";
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
What:  UI with the following input elements:
/*
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
  const [state, setstate] = useState({
    data:"",
    loading: false,
    error: ""
  })
  const [subject, setSubject] = useState("");
  const [object, setObject] = useState("");
  const [verb, setVerb] = useState("");
  const [tense, setTense] = useState("Present");
  const [sentenceType, setSentenceType] = useState("declarative");
  

  const [objectErr, setObjectErr] = React.useState("");
  const [subjectErr, setSubjectErr] = React.useState("");
  const [verbErr, setVerbErr] = React.useState("");
  const tenses = ["Present", "Past", "Future"];

  // optional params considered:
  const [objNum, setObjNum] = useState("singular");

  const [subjNum, setSubjNum] = useState("singular");

  //subjnum

  const [objDet, setObjDet] = useState("a");
  const [subjDet, setSubjDet] = useState("a");


  const baseUrl = `https://lt-nlgservice.herokuapp.com/rest/english/realise?subject=${subject}&verb=${verb}&object=${object}&tense=${tense.toLocaleLowerCase()}&objnum=${objNum}&subjnum=${subjNum}&objdet=${objDet}&subjdet=${subjDet}&sentencetype=${sentenceType}&progressive=progressive`;
  const isValidationFailed = () => {
    let hasError = false;
    const regex =  /^[a-zA-Z][a-zA-Z \\s]+$/;

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

  const handleSubmit = (evt) => {
    evt.preventDefault();   
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
          if (response.data.result === "OK")
            setstate({
              data: response.data.sentence,
              loading: false,
              error: ""
            });
        })
        .catch((err) => {
          console.log("Errored out with ", err);
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
      <Typography variant="h6" component="h2" className={classes.root}>

      {state.loading && <CircularProgress size={20}/>}
      {state.data && <label style={{ color: 'green', fontSize:17 }}> Final Sentence: {state.data}</label>}
      {state.error && <label style={{ color: 'red', fontSize:17 }}>{state.error}</label>}
      </Typography>

      <form className={classes.root} noValidate id="sentenceForm">
        <Paper style={{ padding: 16 }}>
          <Grid container alignItems="flex-start" spacing={2}>
            <Grid item xl={12}>
              <FormControl className={classes.eltSpacing}>
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
                ></TextField>
              </FormControl>
            </Grid>
            <Grid item xl={12}>
              <FormControl className={classes.eltSpacing}>
                <TextField
                data-testid="filter-input-object"
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
                ></TextField>
              </FormControl>
            </Grid>
            <Grid item xl={12}>
              <FormControl className={classes.eltSpacing}>
                <TextField
                                 data-testid="filter-input-verb"

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
                ></TextField>
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl className={classes.eltSpacing}>
                <Select className={classes.selectStyle}
                  variant="outlined"
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
                <Button className={classes.buttonStyle} type="submit" color="primary" onClick={handleSubmit} data-testid="submit">
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