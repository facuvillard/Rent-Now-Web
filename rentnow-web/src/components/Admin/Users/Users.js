import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import Dialog from "../../utils/Dialog/Dialog";
import RegisterUserForm from "./RegisterUserForm";
import EditUserForm from "./EditUserForm";
import ViewUser from "./ViewUser";
import DeleteUser from "./DeleteUser"
import { Typography } from "@material-ui/core";
import { getUsersApi } from "../../../api/usuarios";

export default function Users() {
  return <ListUser />;
}

function ListUser(props) {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    getUsersApi().then((resp) => {
      setUsers(resp);
      setIsLoading(false);
    });
  }, []);

  const [open, setOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogContent, setDialogContent] = useState(null);
  const [dialogSize, setDialogSize] = useState("sm");

  const addUserDialog = () => {
    setDialogTitle("Nuevo Usuario");
    setDialogContent(<RegisterUserForm setOpen={setOpen} />);
    setDialogSize("md");
    setOpen(true);
  };

  const editUserDialog = (user) => {
    const {id , ...rest} = user

    setDialogTitle("Editar usuario " + user.nombres + " " + user.apellidos);
    setDialogContent(<EditUserForm setOpen={setOpen} user={rest} userId={id} />);
    setDialogSize("md");
    setOpen(true);
  };

  const viewUserDialog = (user) => {
    setDialogTitle("Usuario: " + user.nombres + " " + user.apellidos);
    setDialogContent(<ViewUser setOpen={setOpen} user={user} />);
    setDialogSize("sm");
    setOpen(true);
  };

  const deleteUserDialog = ({id,...rest})=>{
  setDialogTitle("Eliminar Usuario: " + rest.nombres + " " + rest.apellidos);
  setDialogContent(<DeleteUser setOpen={setOpen} user={rest} userId={id} />);
  setDialogSize("sm");
  setOpen(true);
  };

  return (
    <>
      <Typography variant="h3" align="center">
        Usuarios
      </Typography>
      {isLoading ? (
        <Typography> Cargando... </Typography>
      ) : (
        <MaterialTable
          title=""
          columns={[
            { title: "Nombres", field: "nombres" },
            { title: "Apellidos", field: "apellidos" },
            { title: "Email", field: "email" },
            { title: "Provincia", field: "provincia" },
          ]}
          data={users}
          actions={[
            {
              icon: "person_add",
              tooltip: "Agregar Usuario",
              isFreeAction: true,
              onClick: addUserDialog,
            },
            {
              icon: "visibility",
              tooltip: "Ver usuario",
              onClick: (event, row) => {
                viewUserDialog(row);
              },
            },
            {
              icon: "edit",
              tooltip: "Edit User",
              onClick: (event, row) => {
                editUserDialog(row);
              },
            },
            {
              icon: "delete",
              tooltip: "Eliminar Usuario",
              onClick: (event,row) => {
                deleteUserDialog(row);
              },
            },
          ]}
          options={{
            actionsColumnIndex: -1,
          }}
        />
      )}
      <Dialog
        title={dialogTitle}
        open={open}
        setOpen={setOpen}
        size={dialogSize}
      >
        {dialogContent}
      </Dialog>
    </>
  );
}
