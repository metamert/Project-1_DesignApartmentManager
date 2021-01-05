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
import { ToastContainer, toast } from "react-toastify";
import BackspaceIcon from "@material-ui/icons/Backspace";
import { CircularProgress } from "@material-ui/core";
import { connect } from "react-redux";
import Modal from "../Modal";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import ShowDuesComponent from "./showDues";
import Modal2 from "../Modal2";

import CancelIcon from "@material-ui/icons/Cancel";
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

function StickyHeadTable({ admin, history }) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [id, setid] = React.useState(0);

  const [selected, set_selected] = React.useState(0);
  const [selected2, set_selected2] = React.useState(0);
  const [open2, setopen2] = React.useState(0);
  const [open3, setopen3] = React.useState(0);
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

  function createData(
    user_id,
    due,
    created_at,
    user_name,
    user_email,
    phone_number,
    flat_status,
    flat_no,
    swimming_pool,
    fitness,
    is_active,
    moved_at,
    edit,
    del
  ) {
    return {
      user_id,
      due,
      created_at,
      user_name,
      user_email,
      phone_number,
      flat_status,
      flat_no,
      swimming_pool,
      fitness,
      is_active,
      moved_at,
      edit,
      del,
    };
  }

  const columns = [
    { id: "user_id", label: "id", minWidth: 30 },
    { id: "due", label: "due", minWidth: 60 },
    { id: "created_at", label: "moved date", minWidth: 40 },
    { id: "user_name", label: "name", minWidth: 40 },
    { id: "user_email", label: "email", minWidth: 10 },
    {
      id: "phone_number",
      label: "phone_number",
      minWidth: 50,
    },
    {
      id: "flat_status",
      label: "flat status",
      minWidth: 20,
    },
    {
      id: "flat_no",
      label: "flat ",
      minWidth: 30,
    },
    {
      id: "swimming_pool",
      label: "swimming",
      minWidth: 40,
    },
    {
      id: "fitness",
      label: "fitness service",
      minWidth: 40,
    },
    {
      id: "is_active",
      label: "active",
      minWidth: 40,
    },
    {
      id: "moved_at",
      label: "moved at",
      minWidth: 60,
    },
    {
      id: "edit",
      label: "update",
      minWidth: 30,
      align: "right",
    },
    {
      id: "del",
      label: "delete",
      minWidth: 30,
      align: "right",
    },
  ];

  React.useEffect(() => {
    Update();
  }, []);

  function getFormattedDate(date) {
    var year = date.getFullYear();

    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : "0" + month;

    var day = date.getDate().toString();
    day = day.length > 1 ? day : "0" + day;

    return month + "/" + day + "/" + year;
  }

  const deleteUserApi = async (id) => {
    try {
      console.log(id);
      let response = await axios.delete(
        `http://localhost:5000/admin/delete-user/${id}`,
        {
          method: "DELETE",
          headers: { jwt_token: admin.token },
        }
      );
      console.log(response);
      if (response.status) Update();
      else toast.success(response.data.message);
    } catch (error) {
      toast.error(error);
    }
  };

  const edit = async (data) => {
    try {
      const myHeaders = new Headers();

      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("jwt_token", admin.token);

      await fetch(`http://localhost:5000/admin/update-user/${data.user_id}`, {
        method: "PUT",
        headers: myHeaders,
        body: JSON.stringify(data),
      });

      await Update();

      // window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  const updateUser = async (user) => {
    set_selected(user);
    setopen2(true);
  };

  console.log("token", admin.token);

  const findDue = (dues, id) => {
    const arr = [];
    dues.map((due) => {
      if (due.user_id == id && due.is_paid == false) {
        arr.push(due);
      }
    });

    return arr;
  };

  const AllDue = (dues, id) => {
    const arr = [];
    dues.map((due) => {
      if (due.user_id == id) {
        arr.push(due);
      }
    });

    return arr;
  };

  const showDues = (dues) => {
    set_selected2(dues);
    setopen3(true);
  };

  const Update = async () => {
    let arr = [];
    setloading(true);
    try {
      const res = await fetch(`http://localhost:5000/admin/`, {
        method: "GET",
        headers: { jwt_token: admin.token },
      });

      const dueResponse = await fetch(`http://localhost:5000/admin/dues`, {
        method: "GET",
        headers: { jwt_token: admin.token },
      });

      console.log("env", process.env.domain);
      const parseRes = await res.json();
      const dues = await dueResponse.json();
      console.log("dues", dues);

      console.log("resopnse", parseRes);
      parseRes.map((item) => {
        arr.push(
          createData(
            item.user_id,
            findDue(dues, item.user_id).length > 0 ? (
              <Button
                onClick={() => showDues(findDue(dues, item.user_id))}
                variant="contained"
                color="secondary"
              >
                Due
              </Button>
            ) : (
              <h3
                className="needHover"
                onClick={() => showDues(AllDue(dues, item.user_id))}
                style={{ color: "green", paddingLeft: 5 }}
              >
                paid
              </h3>
            ),
            getFormattedDate(new Date(item.created_at)),
            item.user_name,
            item.user_email,
            item.phone_number,
            item.flat_status,
            item.flat_no,
            item.swimming_pool ? (
              <CheckCircleOutlineIcon style={{ color: "green" }} />
            ) : (
              <CancelIcon color="secondary" />
            ),
            item.fitness ? (
              <CheckCircleOutlineIcon style={{ color: "green" }} />
            ) : (
              <CancelIcon color="secondary" />
            ),
            item.is_active ? (
              <CheckCircleOutlineIcon style={{ color: "green" }} />
            ) : (
              <CancelIcon color="secondary" />
            ),
            item.moved_at
              ? getFormattedDate(new Date(item.moved_at))
              : "not moved yet",

            <EditIcon className="needHover" onClick={() => updateUser(item)} />,

            <BackspaceIcon
              className="needHover"
              onClick={() => deleteUserApi(item.user_id)}
            ></BackspaceIcon>
          )
        );
      });

      setRows(arr);

      setloading(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  if (!loading)
    return (
      <Paper className={classes.root}>
        <Modal
          selectedUser={selected}
          open={open2}
          Content={
            <EditUserform
              selectedUser={selected}
              updatePage={Update}
              cancel={() => setopen2(false)}
              edit={edit}
            />
          }
        ></Modal>
        <Modal2
          selectedUser={selected2}
          open={open3}
          cancel={() => setopen3(false)}
          Content={
            <ShowDuesComponent dues={selected2}  cancel={() => setopen3(false)} />
          }
        ></Modal2>

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
  else return <CircularProgress></CircularProgress>;
}
const mapStateToProps = (state) => ({
  admin: state.user.admin,
});

export default connect(mapStateToProps)(StickyHeadTable);
