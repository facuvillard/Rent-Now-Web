import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { getComplejosApi } from "./../../../api/complejos";
import AlertCustom from "../../utils/AlertCustom/AlertCustom";
import Dialog from "../../utils/Dialog/Dialog";
import Switch from "@material-ui/core/Switch";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import EnableComplejo from "./EnableComplejo";
import ViewComplejo from "./ViewComplejo";
import Drawer from "@material-ui/core/Drawer";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  drawer: {
    maxHeight: "50%",
  },
}));

const AdminComplejos = () => {
  return <ListComplejos />;
};

function ListComplejos() {
  const [reload, setReload] = useState(false);
  const [complejos, setComplejos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [alertCustomOpen, setAlertCustomOpen] = useState(false);
  const [alertCustomType, setAlertCustomType] = useState();
  const [alertCustomText, setAlertCustomText] = useState();
  const [open, setOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogContent, setDialogContent] = useState(null);
  const [dialogSize, setDialogSize] = useState("sm");
  const [openDrawer, setOpenDrawer] = useState(false);
  const [drawerContent, setDrawerContent] = useState("");
  const classes = useStyles();

  useEffect(() => {
    setIsLoading(true);
    getComplejosApi().then((response) => {
      if (response.status === "OK") {
        setComplejos(response.data);
        setIsLoading(false);
        setReload(false);
      } else {
        setIsLoading(false);
      }
    });
  }, [reload]);

  const handleHabilitar = async (complejo) => {
    const opc = !complejo.habilitado ? "habilitar" : "deshabilitar";
    setDialogTitle(
      `¿Estas seguro de que quieres ${opc} el complejo "${complejo.nombre}"?`
    );
    setDialogContent(
      <EnableComplejo
        setOpen={setOpen}
        setReload={setReload}
        setAlertCustomText={setAlertCustomText}
        setAlertCustomOpen={setAlertCustomOpen}
        setAlertCustomType={setAlertCustomType}
        complejo={complejo}
      />
    );
    setOpen(true);
  };

  const viewComplejoDialog = (complejo) => {
    setDialogTitle("Complejo: " + complejo.nombre);
    setDialogContent(
      <ViewComplejo
        complejo={complejo}
        setOpenDrawer={setOpenDrawer}
        setDrawerContent={setDrawerContent}
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
          { title: "Nombre", field: "nombre" },
          { title: "Dueño", field: "usuarios[0].nombre" },
          { title: "Fecha Alta", field: "fechaAlta", type: "datetime" },
          {
            title: "Fecha habilitación",
            field: "fechaHabilitado",
            type: "datetime",
          },
          {
            title: "Habilitado",
            field: "habilitado",
            type: "boolean",
            render: (rowData) =>
              rowData.habilitado ? <CheckIcon /> : <CloseIcon />,
          },
        ]}
        data={complejos}
        actions={[
          {
            icon: "visibility",
            tooltip: "Ver Datos del Complejo",
            onClick: (event, row) => {
              viewComplejoDialog(row);
            },
          },
          (rowData) => ({
            icon: () => (
              <Switch
                color="primary"
                checked={rowData.habilitado}
                onChange={() => handleHabilitar(rowData)}
              />
            ),
            tooltip: rowData.habilitado ? "Deshabilitar" : "Habilitar",
          }),
        ]}
        options={{
          actionsColumnIndex: -1,
          pageSize: 10,
          pageSizeOptions: [10],
          rowStyle: {
            backgroundColor: "#FAFAFA",
          },
          headerStyle: {
            backgroundColor: "#656b74",
            color: "#FFF",
          },
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
      <Drawer
        classes={{ paperAnchorBottom: classes.drawer }}
        open={openDrawer}
        anchor="bottom"
        onClose={() => setOpenDrawer(false)}
      >
        {drawerContent}
      </Drawer>
    </>
  );
}
export default AdminComplejos;
