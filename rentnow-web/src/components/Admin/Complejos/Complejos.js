import React, { useState, useEffect } from 'react'
import MaterialTable from "material-table";
import { getComplejosApi } from "./../../../api/complejos"


const AdminComplejos = () => {
    return (
        <ListComplejos />
    )
}

function ListComplejos(props) {
    const [reload, setReload] = useState(false);
    const [complejos, setComplejos] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

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

    return (
        <>
            <MaterialTable

                isLoading={isLoading}
                title=""
                columns={[
                    { title: "Nombre", field: "nombre" },
                    { title: "Dueño", field: "usuarios" },
                    { title: "Estado", field: "habilitado" },
                    { title: "Fecha Alta"}
                ]}
                data={complejos}
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
        </>
    )
}
export default AdminComplejos