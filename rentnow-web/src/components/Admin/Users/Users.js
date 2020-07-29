import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import Dialog from "../../utils/Dialog/Dialog";
import RegisterUserForm from "./RegisterUserForm";
import EditUserForm from "./EditUserForm";
import ViewUser from "./ViewUser";
import DeleteUser from "./DeleteUser";
import { getUsersApi } from "../../../api/usuarios";
import AlertCustom from "../../utils/AlertCustom/AlertCustom";

export default function Users() {
  return <ListUser />;
}

function ListUser(props) {
  const [reload, setReload] = useState(false);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [alertCustomOpen, setAlertCustomOpen] = useState(false);
  const [alertCustomType, setAlertCustomType] = useState();
  const [alertCustomText, setAlertCustomText] = useState();

  useEffect(() => {
    setIsLoading(true);
    getUsersApi().then((response) => {
      if (response.status === "OK") {
        setUsers(response.data);
        setIsLoading(false);
        setReload(false);
      } else {
        setIsLoading(false);
      }
    });
  }, [reload]);

  const [open, setOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogContent, setDialogContent] = useState(null);
  const [dialogSize, setDialogSize] = useState("sm");

  const addUserDialog = () => {
    setDialogTitle("Nuevo Usuario");
    setDialogContent(
      <RegisterUserForm
        setOpen={setOpen}
        setReload={setReload}
        setAlertCustomOpen={setAlertCustomOpen}
        setAlertCustomType={setAlertCustomType}
        setAlertCustomText={setAlertCustomText}
      />
    );
    setDialogSize("md");
    setOpen(true);
  };

  const editUserDialog = (user) => {
    const { id, ...rest } = user;

    setDialogTitle("Editar usuario " + user.nombres + " " + user.apellidos);
    setDialogContent(
      <EditUserForm
        setOpen={setOpen}
        user={rest}
        userId={id}
        setReload={setReload}
        setAlertCustomOpen={setAlertCustomOpen}
        setAlertCustomType={setAlertCustomType}
        setAlertCustomText={setAlertCustomText}
      />
    );
    setDialogSize("md");
    setOpen(true);
  };

  const viewUserDialog = (user) => {
    setDialogTitle("Usuario: " + user.nombres + " " + user.apellidos);
    setDialogContent(<ViewUser setOpen={setOpen} user={user} />);
    setDialogSize("sm");
    setOpen(true);
  };

  const deleteUserDialog = ({ id, ...rest }) => {
    setDialogTitle("Eliminar Usuario: " + rest.nombres + " " + rest.apellidos);
    setDialogContent(
      <DeleteUser
        setOpen={setOpen}
        userId={id}
        setReload={setReload}
        setAlertCustomOpen={setAlertCustomOpen}
        setAlertCustomType={setAlertCustomType}
        setAlertCustomText={setAlertCustomText}
      />
    );
    setDialogSize("sm");
    setOpen(true);
  };

  return (
    <>
      <MaterialTable
        
        isLoading={isLoading}
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
            onClick: (event, row) => {
              deleteUserDialog(row);
            },
          },
        ]}
        options={{
          actionsColumnIndex: -1,
          pageSize: 10,
          pageSizeOptions: [10]
        }}
      />
      <Dialog
        title={dialogTitle}
        open={open}
        setOpen={setOpen}
        size={dialogSize}
      >
        {dialogContent}
      </Dialog>

      <AlertCustom
        type={alertCustomType}
        text={alertCustomText}
        open={alertCustomOpen}
        setOpen={setAlertCustomOpen}
      />
    </>
  );
}
