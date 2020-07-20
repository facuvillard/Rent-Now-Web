import React, { useState, useEffect } from 'react'
import MaterialTable from "material-table";
import { getComplejosApi } from "./../../../api/complejos"
import Dialog from "../../utils/Dialog/Dialog";


const AdminComplejos = () => {
    return (
        <ListComplejos />
    )
}

function ListComplejos(props) {
    const [reload, setReload] = useState(false);
    const [complejos, setComplejos] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const [alertCustomOpen, setAlertCustomOpen] = useState(false);
    const [alertCustomType, setAlertCustomType] = useState();
    const [alertCustomText, setAlertCustomText] = useState();


    useEffect(() => {
        setIsLoading(true);
        getComplejosApi().then((response) => {
            if (response.status === "OK") {
                setComplejos(response.data);
                setIsLoading(false);
                setReload(false);
            } else {
                console.log(response.message, response.error);
                setIsLoading(false);
            }
        });
    }, [reload]);

    const [open, setOpen] = useState(false);
    const [dialogTitle, setDialogTitle] = useState("");
    const [dialogContent, setDialogContent] = useState(null);
    const [dialogSize, setDialogSize] = useState("sm");

    const viewComplejoDialog = (complejo) => {
        setDialogTitle("Complejo: " + complejo.nombre + " - Dueño: " + complejo.usuarios[0].nombre);
        setDialogContent();
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
                    { title: "Fecha Alta" },
                    { title: "Habilitado", field: "habilitado", type: 'boolean' }
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
                ]}
                options={{
                    exportButton: true,
                    grouping: true,
                    actionsColumnIndex: -1,
                    pageSize: 10,
                    pageSizeOptions: [10],
                    rowStyle: {
                        backgroundColor: '#FAFAFA',
                    },
                    headerStyle: {
                        backgroundColor: '#656b74',
                        color: '#FFF'
                    }
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
        </>
    )
}
export default AdminComplejos