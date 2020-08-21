import React from 'react'
import {
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Typography,
} from "@material-ui/core";
import Chip from "@material-ui/core/Chip";
import imgPlaceHolder from "assets/img/image-placeholder.png";
import HttpsOutlined from "@material-ui/icons/HttpsOutlined";
import { makeStyles } from "@material-ui/core/styles";
import LinkCustom from 'components/utils/LinkCustom/LinkCustom'

const useStyles = makeStyles((theme) => ({
    media: {
        height: 350,
    },

}))

const CardComplejo = (props) => {
    const classes = useStyles();
    return (
        <Card>
            <CardActionArea disabled={!props.complejo.habilitado}>
                <LinkCustom to={`/app/complejos/${props.complejo.id}`} >
                    <CardMedia
                        className={classes.media}
                        image={
                            props.complejo.fotos[0] || imgPlaceHolder
                        }
                        title={props.complejo.nombre}
                    />
                    <CardContent>
                        <Typography
                            gutterBottom
                            variant="h5"
                            component="h2"
                        >
                            {props.complejo.nombre}{" "}
                            {props.complejo.habilitado ? null : (
                                <Chip
                                    variant="outlined"
                                    label="Deshabilitado"
                                    color="primary"
                                    icon={<HttpsOutlined />}
                                />
                            )}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            {props.complejo.direccion}
                        </Typography>
                    </CardContent>
                </LinkCustom>
            </CardActionArea>
        </Card>
    )
}

export default CardComplejo
