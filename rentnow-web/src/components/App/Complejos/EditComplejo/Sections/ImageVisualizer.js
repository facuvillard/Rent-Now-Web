import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {
    Grid,
    Card,
    CardActionArea,
    CardMedia,
    IconButton,
    CardContent,
} from "@material-ui/core";
import Carousel from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({

}));

const Arrow = function (props) {
    return (
        <IconButton>
            {props.back ? (
                <ArrowBackIcon style={{ color: props.cssColor }} />
            ) : (
                    <ArrowForwardIcon style={{ color: props.cssColor }} />
                )}
        </IconButton>
    );
};

const ImageVisualizer = (props) => {
    const classes = useStyles();
    return (
        <Grid container spacing={1}>
            <Carousel
                dots
                arrowLeft={<Arrow back cssColor="black" />}
                arrowLeftDisabled={<Arrow back cssColor="grey" />}
                arrowRight={<Arrow cssColor="black" />}
                arrowRightDisabled={<Arrow cssColor="grey" />}
                addArrowClickHandler
            >

                {props.complejo.fotos.map((foto) => (
                    <Grid item xs={12} sm={6} key={foto}>
                        <Card>
                            <CardActionArea href={foto} target="_blank">
                                <CardMedia component="img" height={300} image={foto} />
                            </CardActionArea>
                            <CardContent>
                                <IconButton aria-label="delete">
                                    <DeleteIcon />
                                </IconButton>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Carousel>
        </Grid>
    )
}

export default ImageVisualizer;