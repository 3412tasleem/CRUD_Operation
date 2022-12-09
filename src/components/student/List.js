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
  IconButton,
  Tooltip,
  Button,
} from "@material-ui/core";
import { orange } from "@material-ui/core/colors";
import VisibilityIcon from "@material-ui/icons/Visibility";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useHistory, useParams } from "react-router-dom";

import { Link } from "react-router-dom";
import axios from "axios";

import { useState, useEffect } from "react";
const useStyles = makeStyles({
  stuListColor: {
    backgroundColor: orange[300],
    color: "white",
  },
  tableHeadCell: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

const List = () => {
  const classes = useStyles();
  const history = useHistory();

  const [employess, setEmployess] = useState([]);

  useEffect(() => {
    async function getAllemployes() {
      try {
        const employess = await axios.get("http://localhost:3333/data");
        // console.log(employess.data);
        setEmployess(employess.data);
      } catch (error) {
        console.log("Something is Wrong");
      }
    }
    getAllemployes();
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3333/data/${id}`);
    var newemployes = employess.filter((item) => {
      // console.log(item);
      return item.id !== id;
    });
    setEmployess(newemployes);
  };
  function handleClick() {
    history.push("/");
  }
  return (
    <>
      <Box textAlign="center" p={2} className={classes.stuListColor}>
        <Typography variant="h4">employes List</Typography>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: "#616161" }}>
              <TableCell align="center" className={classes.tableHeadCell}>
                No
              </TableCell>
              <TableCell align="center" className={classes.tableHeadCell}>
                Name
              </TableCell>
              <TableCell align="center" className={classes.tableHeadCell}>
                Email
              </TableCell>
              <TableCell align="center" className={classes.tableHeadCell}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employess.map((employes, i) => {
              return (
                <TableRow key={i}>
                  <TableCell align="center">{i + 1}</TableCell>
                  <TableCell align="center">{employes.name}</TableCell>
                  <TableCell align="center">{employes.email}</TableCell>
                  <TableCell align="center">
                    <Tooltip title="View">
                      <IconButton>
                        <Link to={`/view/${employes.id}`}>
                          <VisibilityIcon color="primary" />
                        </Link>
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit">
                      <IconButton>
                        <Link to={`/edit/${employes.id}`}>
                          <EditIcon />
                        </Link>
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton onClick={() => handleDelete(employes.id)}>
                        <DeleteIcon color="secondary" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <Box m={3} textAlign="center">
          <Button variant="contained" color="primary" onClick={handleClick}>
            Back to Home
          </Button>
        </Box>
      </TableContainer>
    </>
  );
};

export default List;
