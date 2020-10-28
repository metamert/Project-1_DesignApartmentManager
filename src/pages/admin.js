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
import { Button } from "@material-ui/core";
import { deleteUser,createUser,editUser } from "../_actions/user_actions";
const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: "80vh",
  },
});

function StickyHeadTable({ users, deleteUser ,create,editS}) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [id, setid] = React.useState(0);
  const [open, setopen] = React.useState(0);
  const [selected, set_selected] = React.useState(0);
  const [open2, setopen2] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [rows, setRows] = React.useState([]);
  const [loading, setloading] = React.useState(false);
  const handleOpen = (id) => {
    setid(id);
    setopen(true);
  };

  const handleClose = () => {
    setopen(false);
  };

  const editUser = (user) => {
      console.log("geldi",user)
   editS(user)
  };

  const createUser = (user) => {
    console.log(rows);
    console.log(user.role);
    let arr = rows;
    let id = Math.random(1000);

create({id:id,...user})

  
    
    
  };

  /*
     const handleSubmit=(obj)=> {
      
    
    
        //Then cipher any text:
      
    
        editUser(obj).then(
          (response) => {
          console.log(response)
    
            if (response.success) {
              Update()

              




            } else {
                setloading(false)
             
            }
          }
        );
      }


*/

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  function createData(id, name, email, due, role, edit, del) {
    return { id, name, email, due, role, edit, del };
  }

  const edit = (user) => {
    set_selected(user);
    setopen2(true);
  };
  const columns = [
    { id: "id", label: "id", minWidth: 170 },
    { id: "name", label: "name", minWidth: 100 },
    {
      id: "email",
      label: "email",
      minWidth: 100,
    },
    {
      id: "due",
      label: "due",
      minWidth: 100,
    },
    {
      id: "role",
      label: "role",
      minWidth: 100,
    },
    {
      id: "edit",
      label: "edit",
      align: "right",
      minWidth: 50,
    },
    {
      id: "del",
      label: "delete",
      minWidth: 50,
      align: "right",
    },
  ];

  React.useEffect(() => {
    Update();
  }, [users]);

  const Update = () => {
    let arr = [];
    setloading(true);
    users.map((item) => {
      console.log("ITEM ID", item[id]);
      arr.push(
        createData(
          item.id,
          item.name,
          item.email,
          item.due,
          item.role,
          <EditIcon
            className="needHover"
            onClick={() => edit(item)}
          ></EditIcon>,
          <BackspaceIcon
            className="needHover"
            onClick={() => deleteUser(item.id)}
          ></BackspaceIcon>
        )
      );
    });
    console.log(users);
    setRows(arr);
    setTimeout(() => {
      setloading(false);
    }, 2000);
  };

  console.log("users",users);
  console.log("rows",rows)

  if (!loading)
    return (
      <Paper className={classes.root}>
        <Modal
          open={open}
          Content={
            <CreateUserForm
              create={createUser}
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
              edit={editUser}
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
  users: state.user,
});
const mapDispatchToProps = (dispatch) => ({
  deleteUser: (id) => dispatch(deleteUser(id)),
  create: (p) => dispatch(createUser(p)),
  editS: (p) => dispatch(editUser(p)),
});
export default connect(mapStateToProps, mapDispatchToProps)(StickyHeadTable);
