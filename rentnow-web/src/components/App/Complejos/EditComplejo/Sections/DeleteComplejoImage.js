import React, { useState } from "react";
import { Button, Typography, Grid, CircularProgress } from "@material-ui/core";
import { deleteComplejoImageApi } from "api/complejos";

const DeleteComplejoImage = (props) => {

    const [isLoading, setIsLoading] = useState(false);

    // const handleComplejoImageDelete = async () => {
    //     setIsLoading(true);
    //     const result = await deleteComplejoImageApi(fotos, idComplejo);
    //     setIsLoading(false);
    //     if (result.status === "OK") {
    //         setAlertCustomText(result.message);
    //         setAlertCustomType("success");
    //         setAlertCustomOpen(true);
    //         setOpen(false);
    //     } else {
    //         setAlertCustomText(result.message);
    //         setAlertCustomType("error");
    //         setAlertCustomOpen(true);
    //     }
    // };

    return (
        <>
            {isLoading ? (
                <Grid container justify="center">
                    <Grid item>
                        <CircularProgress />
                    </Grid>
                </Grid>
            ) : (
                    <Grid container spacing={2} justify="space-evenly">
                        <Grid item xs={12}>
                            <Typography>La imagen ya no podrá ser utilizada dentro de la aplicación</Typography>
                        </Grid>

                        <Grid item xs={2}>
                            <Button
                                color="primary"
                                variant="contained"
                                onClick={props.deleteHandler}
                            >
                                Aceptar
                    </Button>
                        </Grid>
                        <Grid item xs={2}>
                            <Button
                                variant="contained"
                                onClick={() => {
                                    props.setOpen(false);
                                }}
                                color="secondary"
                            >
                                Cancelar
                    </Button>
                        </Grid>
                    </Grid>
                )}
        </>
    );
}


export default DeleteComplejoImage