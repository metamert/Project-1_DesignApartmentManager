import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import EditIcon from "@material-ui/icons/Edit";
import BackspaceIcon from "@material-ui/icons/Backspace";
import { CircularProgress } from "@material-ui/core";
import { connect } from "react-redux";
import Modal from "./Modal";
import CreateUserForm from "./createUser";
import EditUserform from "./editUser";
import axios from "axios";
import { Button } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: "80vh",
  },
});

function StickyHeadTable({cur_user,history}) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [id, setid] = React.useState(0);
  const [open, setopen] = React.useState(0);
  const [err, seterr] = React.useState("");
  const [selected, set_selected] = React.useState(0);
  const [open2, setopen2] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [rows, setRows] = React.useState([]);
  const [loading, setloading] = React.useState(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  function createData(id,created_at ,name,last_name, phone_number,flat_status, flat_no, debt,gender, del) {
    return { id,created_at, name,last_name, phone_number,flat_status, flat_no, debt,gender, del };
  }

  const edit = (user) => {
    set_selected(user);
    setopen2(true);
  };
  const columns = [
    { id: "id", label: "id", minWidth: 60 },
    { id: "created_at", label: "created at", minWidth: 60 },
    { id: "name", label: "name", minWidth: 70 },
    { id: "last_name", label: "name", minWidth: 70 },
    {
      id: "phone_number",
      label: "phone_number",
      minWidth: 100,
    },
    {
      id: "flat_status",
      label: "flat_status",
      minWidth: 100,
    },
    {
      id: "flat_no",
      label: "flat_no",
      minWidth: 50,
    },
    {
      id: "debt",
      label: "debt",
      minWidth: 100,
    },
    {
      id: "gender",
      label: "gender",
      minWidth: 70,
    },

    {
      id: "del",
      label: "delete",
      minWidth: 50,
      align: "right",
    },
  ];

  React.useEffect(() => {
    if(!cur_user){
history.push("/login")
    }
    Update();
  }, []);

  const deleteUserApi = async (id) => {
  try {
    console.log(id)
    let response = await axios.post("https://localhost/api/deleteuser.php",{id:id});
   if(response.data.status)
   Update()
   else alert(response.data.message)
  
  } catch (error) {
    alert(error)
  }
  };

  const Update = async () => {
    let arr = [];
    setloading(true);
    try {
      let response = await axios.get("https://localhost/api/getusers.php");

      console.log("resopnse", response);
      response.data.map((item) => {
        console.log("ITEM ID", item[id]);
        arr.push(
          createData(
            item.id,
            item.created_at,
            item.name,
            item.last_name,
            item.phone_number,
            item.flat_status,
            item.flat_no,
            item.debt,
            item.gender,
           
         

            <BackspaceIcon
              className="needHover"
              onClick={() => deleteUserApi(item.id)}
            ></BackspaceIcon>
          )
        );
      });

      setRows(arr);

      setloading(false);
    } catch (error) {}
  };

  if (!loading)
    return (
      <Paper className={classes.root}>
        <Modal
          open={open}
          Content={
            <CreateUserForm
              
              updatePage={Update}
              cancel={() => setopen(false)}
            ></CreateUserForm>
          }
        ></Modal>
        <Modal
          selectedUser={selected}
          open={open2}
          Content={
            <EditUserform
             
              selectedUser={selected}
              updatePage={Update}
              cancel={() => setopen2(false)}
            />
          }
        ></Modal>
        <Button
          onClick={() => setopen(true)}
          variant="contained"
          color="primary"
        >
          Create User
        </Button>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    );
  else
    return (
      <CircularProgress
        style={{ position: "absolute", left: "50%" }}
      ></CircularProgress>
    );
}
const mapStateToProps = (state) => ({
  cur_user: state.user.user,
});

export default connect(mapStateToProps)(StickyHeadTable);
