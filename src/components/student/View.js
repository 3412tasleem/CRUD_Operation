import {
  Typography,
  Box,
  makeStyles,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@material-ui/core";
import { orange } from "@material-ui/core/colors";
import { useParams, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
const useStyles = makeStyles({
  stuListColor: {
    backgroundColor: orange[400],
    color: "white",
  },
  tableHeadCell: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
const View = () => {
  const classes = useStyles();
  const { id } = useParams();
  const [employes, setEmployes] = useState([]);
  const history = useHistory();
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

  function handleClick() {
    history.push("/List");
  }
  return (
    <>
      <Box textAlign="center" p={2} className={classes.stuListColor}>
        <Typography variant="h4">employes Detail</Typography>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: "#616161" }}>
              <TableCell align="center" className={classes.tableHeadCell}>
                ID
              </TableCell>
              <TableCell align="center" className={classes.tableHeadCell}>
                Name
              </TableCell>
              <TableCell align="center" className={classes.tableHeadCell}>
                Email
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell align="center">{employes.id}</TableCell>
              <TableCell align="center">{employes.name}</TableCell>
              <TableCell align="center">{employes.email}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Box m={3} textAlign="center">
        <Button variant="contained" color="primary" onClick={handleClick}>
          Back to Employes List
        </Button>
      </Box>
    </>
  );
};

export default View;
