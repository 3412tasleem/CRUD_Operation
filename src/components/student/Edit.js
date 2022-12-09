import {
  Typography,
  Box,
  makeStyles,
  Grid,
  TextField,
  Button,
} from "@material-ui/core";
import { deepPurple, green } from "@material-ui/core/colors";
import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
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

const Edit = () => {
  const classes = useStyles();
  const { id } = useParams();
  const history = useHistory();
  const [employes, setEmployes] = useState({
    name: "",
    email: "",
  });
  useEffect(() => {
    async function getemployes() {
      try {
        const employes = await axios.get(`http://localhost:3333/data/${id}`);
        // console.log(employes.data);
        setEmployes(employes.data);
      } catch (error) {
        console.log("Something is Wrong");
      }
    }
    getemployes();
  }, [id]);

  function onTextFieldChange(e) {
    setEmployes({
      ...employes,
      [e.target.name]: e.target.value,
    });
  }

  async function onFormSubmit(e) {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3333/data/${id}`, employes);
      history.push("/");
    } catch (error) {
      console.log("Something is Wrong");
    }
  }
  function handleClick() {
    history.push("/List");
  }
  return (
    <>
      <Box textAlign="center" p={2} className={classes.headingColor} mb={2}>
        <Typography variant="h2">React CRUD with API Call</Typography>
      </Box>

      <Grid container justify="center" spacing={4}>
        <Grid item md={6} xs={12}>
          <Box textAlign="center" p={2} className={classes.addStuColor} mb={2}>
            <Typography variant="h4">Edit employes</Typography>
          </Box>
          <form>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="id"
                  name="id"
                  variant="outlined"
                  required
                  fullWidth
                  id="id"
                  label="ID"
                  autoFocus
                  value={id}
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="name"
                  name="name"
                  variant="outlined"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  value={employes.name}
                  onChange={(e) => onTextFieldChange(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="email"
                  name="email"
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  value={employes.email}
                  onChange={(e) => onTextFieldChange(e)}
                />
              </Grid>
            </Grid>
            <Box m={3}>
              <Button
                type="button"
                variant="contained"
                color="primary"
                fullWidth
                onClick={(e) => onFormSubmit(e)}
              >
                {" "}
                Update{" "}
              </Button>
            </Box>
          </form>
          <Box m={3} textAlign="center">
            <Button variant="contained" color="primary" onClick={handleClick}>
              Back to Employes List
            </Button>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Edit;
