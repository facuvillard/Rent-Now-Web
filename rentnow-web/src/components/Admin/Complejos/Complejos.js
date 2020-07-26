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

    /*    const result = await habilitarComplejoApi(complejo.id, complejo.habilitado);
   
       if (result.status === "OK") {
         setReload(true);
         setAlertCustomText(result.message)
         setAlertCustomType("success")
         setAlertCustomOpen(true)
       } else {
         setAlertCustomText(result.message)
         setAlertCustomType("error")
         setAlertCustomOpen(true)
       } */
  };

  const viewComplejoDialog = (complejo) => {
    setDialogTitle("Complejo: " + complejo.nombre);
    setDialogContent(<ViewComplejo complejo={complejo} />);
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
    </>
  );
}
export default AdminComplejos;
