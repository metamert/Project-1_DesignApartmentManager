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
    admin_id,
    admin_email,
   
   del
  ) {
    return {
        admin_id,
        admin_email,
       
       del
    };
  }

  const columns = [
    { id: "admin_id", label: "id", minWidth: 130 },
    { id: "admin_email", label: "admin email", minWidth: 160 },
   
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

  
  const deleteAdminApi = async (id) => {
    try {
      console.log(id);
      let response = await axios.delete(
        `http://localhost:5000/admin/delete-admin/${id}`,
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


 
  

  const Update = async () => {
    let arr = [];
    setloading(true);
    try {
      const res = await fetch(`http://localhost:5000/admin/admin`, {
        method: "GET",
        headers: { jwt_token: admin.token },
      });

  

     
      const parseRes = await res.json();
    

      console.log("resopnse", parseRes);
      parseRes.map((item) => {
        arr.push(
          createData(
            item.admin_id,
            item.admin_email,
           

            <BackspaceIcon
              className="needHover"
              onClick={() => deleteAdminApi(item.admin_id)}
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
