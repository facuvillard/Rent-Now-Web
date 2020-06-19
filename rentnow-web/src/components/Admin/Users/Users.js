import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import Dialog from "../../utils/Dialog/Dialog";
import RegisterUserForm from "./RegisterUserForm";
import EditUserForm from "./EditUserForm";
import ViewUser from "./ViewUser";

export default function Users() {
  return <ListUser />;
}

function ListUser(props) {
  const [open, setOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogContent, setDialogContent] = useState(null);

  const addUserDialog = () => {
    setDialogTitle("Nuevo Usuario");
    setDialogContent(<RegisterUserForm setOpen={setOpen} />);
    setOpen(true);
  };

  const editUserDialog = () => {
    setDialogTitle("Editar usuario");
    setDialogContent(<EditUserForm setOpen={setOpen} />);
    setOpen(true);
  };

  const viewUserDialog = () => {
    setDialogTitle("TITULO VISTA DE USUARIO");
    setDialogContent(<ViewUser setOpen={setOpen} />);
    setOpen(true);
  };

  return (
    <>
      <MaterialTable
        title="Usuarios"
        columns={[
          { title: "Nombres", field: "name" },
          { title: "Apellidos", field: "lastname" },
          { title: "Email", field: "email" },
          { title: "Rol", field: "role" },
        ]}
        data={[
          {
            name: "Facundo",
            lastname: "Villard",
            email: "facuvillard@gmail.com",
            role: "Administrador",
          },
          {
            name: "Juan",
            lastname: "Bergues",
            email: "jpbergues@gmail.com",
            role: "Adm. Complejos",
          },
          {
            name: "Facundo",
            lastname: "Villard",
            email: "facuvillard@gmail.com",
            role: "Administrador",
          },
          {
            name: "Juan",
            lastname: "Bergues",
            email: "jpbergues@gmail.com",
            role: "Adm. Complejos",
          },
          {
            name: "Facundo",
            lastname: "Villard",
            email: "facuvillard@gmail.com",
            role: "Administrador",
          },
          {
            name: "Juan",
            lastname: "Bergues",
            email: "jpbergues@gmail.com",
            role: "Adm. Complejos",
          },
        ]}
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
            onClick: editUserDialog,
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
      <Dialog title={dialogTitle} open={open} setOpen={setOpen}>
        {dialogContent}
      </Dialog>
    </>
  );
}
