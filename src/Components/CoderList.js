import React, { useState, useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Dropdown from "react-bootstrap/Dropdown";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import ReactPaginate from "react-paginate";

// ***************************** Data Table *****************************
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

// ***************************** Search Bar *****************************
const useSearchStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "50%",
      left: "0",
    },
  },
}));

function CoderList() {
  const classes = useStyles();
  const searchClasses = useSearchStyles();
  const [sortBy, setSortBy] = useState("Filter Contests");
  const [search, setSearch] = useState("");
  const [list, setList] = useState([]);
  const [tempList, setTempList] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);

  // ***************************** fetch json data *****************************
  useEffect(() => {
    fetch("https://codeforces.com/api/contest.list")
      .then((response) => response.json())
      .then((data) => {
        setList(data.result);
        setTempList(data.result);
      });
  }, []);

  // ***************************** filter list with search *****************************
  const filteredList = list.filter((element) => {
    return element.name.toLowerCase().includes(search.toLowerCase());
  });

  // ***************************** Pagination *****************************
  const contestsPerPage = 25;
  const pagesVisited = pageNumber * contestsPerPage;
  const pageCount = Math.ceil(list.length / contestsPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <div>
      {/* ***************************** Filter Button ***************************** */}
      <Dropdown className="dropdown1 mt-1">
        <Dropdown.Toggle variant="info">
          <span className="toggleDropDown">{sortBy}</span>

          <Dropdown.Menu>
            <Dropdown.Item
              onClick={() => {
                setSortBy("ICPC");
                let newList = list.filter((element) => element.type === "ICPC");
                setList(newList);
              }}
            >
              ICPC
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                setSortBy("CF");
                let newList = list.filter((element) => element.type === "CF");
                setList(newList);
              }}
            >
              CF
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                setSortBy("Filter Contests");
                setList(tempList);
              }}
            >
              Clear filters
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown.Toggle>
      </Dropdown>

      {/* ***************************** Search Bar ***************************** */}
      <form className={searchClasses.root} autoComplete="off">
        <TextField
          id="outlined-basic"
          label="Search Contest"
          variant="outlined"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
      </form>

      {/* ***************************** Display Contests Table ***************************** */}
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Contest Name</StyledTableCell>
              <StyledTableCell align="right">Contest ID</StyledTableCell>
              <StyledTableCell align="right">Contest Type</StyledTableCell>
              <StyledTableCell align="right">Phase</StyledTableCell>
              <StyledTableCell align="right">Duration</StyledTableCell>
              <StyledTableCell align="right">Start-time</StyledTableCell>
              <StyledTableCell align="right">Relative-time</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredList
              .slice(pagesVisited, pagesVisited + contestsPerPage)
              .map((element) => (
                <StyledTableRow key={element.name}>
                  <StyledTableCell component="th" scope="row">
                    {element.name}
                  </StyledTableCell>
                  <StyledTableCell align="right">{element.id}</StyledTableCell>
                  <StyledTableCell align="right">
                    {element.type}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {element.phase}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {element.durationSeconds}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {element.startTimeSeconds}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {element.relativeTimeSeconds}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ReactPaginate
        className="pagination"
        previousLabel={"Previous"}
        nextLabel={"NextLabel"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"paginationBttns"}
        previousLinkClassName={"previousBttn"}
        nextLinkClassName={"nextBttn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
      />
    </div>
  );
}

export default CoderList;
