import {
  Typography,
  Box,
  makeStyles,
  Grid,
  TextField,
  Button,
} from "@material-ui/core";
import { useParams, useHistory } from "react-router-dom";

import { deepPurple, green } from "@material-ui/core/colors";

// import List from "../employes/List";
import axios from "axios";

import { useState } from "react";
const useStyles = makeStyles({
  headingColor: {
    backgroundColor: deepPurple[400],
    color: "white",
  },
  addStuColor: {
    backgroundColor: green[400],
    color: "white",
  },
});

const Home = () => {
  const classes = useStyles();
  const history = useHistory();
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const regx = /^([a-zA-Z0-9\._]+)@([a-zA-Z0-9])+.([a-z]+)(.[a-z]+)?$/;
  const [employes, setEmployes] = useState({
    name: "",
    email: "",
  });
  const [status, setStatus] = useState();

  function onTextFieldName(e) {
    setEmployes({
      ...employes,
      [e.target.name]: e.target.value,
    });
    let name = e.target.value;
    if (name.length < 3) {
      setNameError(true);
    } else {
      setNameError(false);
    }
  }

  function onTextFieldEmail(e) {
    setEmployes({
      ...employes,
      [e.target.name]: e.target.value,
    });
    let Email = e.target.value;
    if (!Email.match(regx)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  }

  async function handlesubmit(e) {
    e.preventDefault();

    try {
      await axios.post(`http://localhost:3333/data`, employes);
      setStatus(true);
      alert("your form has been submitted");
    } catch (error) {
      console.log("Something is Wrong");
    }
  }
  if (status) {
    return <Home />;
  }
  function show_data(status) {
    if (status) {
      return history.push("/List");
    }
  }
  return (
    <>
      <Box textAlign="center" className={classes.headingColor} p={2} mb={2}>
        <Typography variant="h2">React CRUD Operation With API Call</Typography>
      </Box>
      <Grid container justify="center" spacing={4}>
        <Grid item md={6} xs={12}>
          <Box textAlign="center" p={2} className={classes.addStuColor} mb={2}>
            <Typography variant="h4">Add employes</Typography>
          </Box>
          <form onSubmit={handlesubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  autoComplete="name"
                  name="name"
                  variant="outlined"
                  fullWidth
                  id="name"
                  label="Name"
                  onChange={(e) => onTextFieldName(e)}
                />
                {nameError ? (
                  <span style={{ color: "red" }}>
                    Name length must be greater than 2 character
                  </span>
                ) : (
                  ""
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  autoComplete="email"
                  name="email"
                  variant="outlined"
                  fullWidth
                  id="email"
                  label="Email Address"
                  onChange={(e) => onTextFieldEmail(e)}
                />
                {emailError ? (
                  <span style={{ color: "red" }}>invalid email</span>
                ) : (
                  ""
                )}
              </Grid>
            </Grid>
            <Box m={3}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Add
              </Button>
            </Box>
            <Box m={3}>
              <Button
                type="button"
                variant="contained"
                color="primary"
                fullWidth
                onClick={show_data}
              >
                show data
              </Button>
            </Box>
          </form>
        </Grid>

        {/* <Grid item md={6} xs={12}>
          <List />
        </Grid> */}
      </Grid>
    </>
  );
};

export default Home;
