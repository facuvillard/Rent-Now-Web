import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import Dialog from "../../utils/Dialog/Dialog";
import RegisterUserForm from "./RegisterUserForm";
import EditUserForm from "./EditUserForm";
import ViewUser from "./ViewUser";
import { Typography } from "@material-ui/core";
import { getUsersApi } from "../../../Api/Usuarios";

export default function Users() {
  return <ListUser />;
}

function ListUser(props) {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    getUsersApi().then((resp) => {
      setIsLoading(false);
      setUsers(resp);
    });
  }, []);

  const [open, setOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogContent, setDialogContent] = useState(null);

  const addUserDialog = () => {
    setDialogTitle("Nuevo Usuario");
    setDialogContent(<RegisterUserForm setOpen={setOpen} />);
    setOpen(true);
  };

  const editUserDialog = (editUser) => {
    setDialogTitle("Editar usuario");
    setDialogContent(<EditUserForm setOpen={setOpen} editUser={editUser} />);
    setOpen(true);
  };

  const viewUserDialog = () => {
    setDialogTitle("TITULO VISTA DE USUARIO");
    setDialogContent(<ViewUser setOpen={setOpen} />);
    setOpen(true);
  };

  return (
    <>
      <Typography variant="h3" align="center">
        Usuarios
      </Typography>
      {
        isLoading ? <Typography> Cargando... </Typography> :
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
            onClick: viewUserDialog,
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
            onClick: (event) => {
              console.log("Clickeaste eliminar usuario");
            },
          },
        ]}
        options={{
          actionsColumnIndex: -1,
        }}
        />
      }
      <Dialog title={dialogTitle} open={open} setOpen={setOpen}>
        {dialogContent}
      </Dialog>
    </>
  );
}
