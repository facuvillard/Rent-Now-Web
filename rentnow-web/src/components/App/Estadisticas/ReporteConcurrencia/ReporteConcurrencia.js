import React, { useState, useEffect } from 'react'
import { ResponsiveHeatMap } from '@nivo/heatmap'
import { ResponsiveRadar } from '@nivo/radar'
import { ResponsiveBar } from '@nivo/bar'
import { getReservasComplejoHistorico } from 'api/reservas'
import { useParams } from 'react-router-dom'
import { tiposEspacio } from 'constants/espacios/constants'
import { Typography, ButtonGroup, Button, Paper, Grid } from '@material-ui/core'
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    grilla: {
        marginBottom: theme.spacing(3),
        marginTop: theme.spacing(3),
    },
    paper: {
        marginTop: theme.spacing(3),
    },
    titulo: {
        marginLeft: theme.spacing(3),
    },
}))

const ReporteConcurrencia = () => {
    const classes = useStyles();
    const [reservas, setReservas] = useState([])
    const [daySelected, setDaySelected] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [reservasByDay, setReservasByDay] = useState([])
    const [reservasByFranja, setReservasByFranja] = useState([])
    const [chartToShow, setChartToShow] = useState('barras')

    const { idComplejo } = useParams()


    useEffect(() => {
        setIsLoading(true);
        getReservasComplejoHistorico(idComplejo).then((response) => {
            if (response.status === "OK") {
                setReservas(response.data);
                formatReservasByDay(response.data)
                setIsLoading(false);
            } else {
                setIsLoading(false);
            }
        });
    }, [idComplejo])


    const formatReservasByDay = (reservasToFormat) => {

        let reservasByDay = []
        reservasToFormat.forEach(reservaToFormat => {


            const index = reservasByDay.findIndex(reserva => reserva.tipoEspacio === reservaToFormat.espacio.tipoEspacio)
            const diastring = reservaToFormat.diaString.normalize('NFD').replace(/([^n\u0300-\u036f]|n(?!\u0303(?![\u0300-\u036f])))[\u0300-\u036f]+/gi,"$1").normalize();
            if (index !== -1) {

                reservasByDay[index][diastring] = reservasByDay[index][diastring] + 1
            } else {
                const newTipoEspacio = {
                    "tipoEspacio": reservaToFormat.espacio.tipoEspacio,
                    "Lunes": reservaToFormat.diaString === 'Lunes' ? 1 : 0,
                    "Martes": reservaToFormat.diaString === 'Martes' ? 1 : 0,
                    "Miercoles": diastring === 'Miercoles' ? 1 : 0,
                    "Jueves": reservaToFormat.diaString === 'Jueves' ? 1 : 0,
                    "Viernes": reservaToFormat.diaString === 'Viernes' ? 1 : 0,
                    "Sabado": diastring === 'Sabado' ? 1 : 0,
                    "Domingo": reservaToFormat.diaString === 'Domingo' ? 1 : 0,
                }
                reservasByDay.push(newTipoEspacio)
            }
        })

        setReservasByDay(reservasByDay)
    }


    useEffect(() => {
        function formatReservasByFranja(reservasToFormat){
            const reservasByFranjaArray = [
                {
                    franjaHoraria: 'Mañana',
                    "Cancha Futbol": 0,
                    "Cancha Basquet": 0,
                    "Cancha Handball": 0,
                    "Cancha Tenis": 0,
                    "Cancha Paddle": 0,
                    "Cancha Hockey": 0,
                    "Quincho": 0,
                    "Asador": 0
                },
                {
                    franjaHoraria: 'Siesta',
                    "Cancha Futbol": 0,
                    "Cancha Basquet": 0,
                    "Cancha Handball": 0,
                    "Cancha Tenis": 0,
                    "Cancha Paddle": 0,
                    "Cancha Hockey": 0,
                    "Quincho": 0,
                    "Asador": 0
                },
                {
                    franjaHoraria: 'Tarde',
                    "Cancha Futbol": 0,
                    "Cancha Basquet": 0,
                    "Cancha Handball": 0,
                    "Cancha Tenis": 0,
                    "Cancha Paddle": 0,
                    "Cancha Hockey": 0,
                    "Quincho": 0,
                    "Asador": 0
                },
                {
                    franjaHoraria: 'Noche',
                    "Cancha Futbol": 0,
                    "Cancha Basquet": 0,
                    "Cancha Handball": 0,
                    "Cancha Tenis": 0,
                    "Cancha Paddle": 0,
                    "Cancha Hockey": 0,
                    "Quincho": 0,
                    "Asador": 0
                },
            ]
            reservasToFormat.forEach(reservaToFormat => {
                const diastring = reservaToFormat.diaString.normalize('NFD').replace(/([^n\u0300-\u036f]|n(?!\u0303(?![\u0300-\u036f])))[\u0300-\u036f]+/gi,"$1").normalize();
                
                if (diastring !== daySelected) {
                    return
                }
                const index = reservasByFranjaArray.findIndex(item => item.franjaHoraria === reservaToFormat.franjaHoraria)
                if (index !== -1) {
                    reservasByFranjaArray[index][reservaToFormat.espacio.tipoEspacio] = reservasByFranjaArray[index][reservaToFormat.espacio.tipoEspacio] ? reservasByFranjaArray[index][reservaToFormat.espacio.tipoEspacio] + 1 : 1
                }
            })
            setReservasByFranja(reservasByFranjaArray)
    
        }
        formatReservasByFranja(reservas)
    }, [daySelected, reservas])


    const byFranjaChart = () => {
        if (chartToShow === 'barras') {
            return (
                <ResponsiveBar
                theme={{
                    "background": 'transparent',
                    "fontSize": 15,
                    "fontFamily": 'sans-serif',
                    "grid": {
                    },
                    "labels": {
                        "text": {
                            "fontSize": 18,
                        }
                    },
                }}
                    data={reservasByFranja}
                    keys={tiposEspacio}
                    indexBy="franjaHoraria"
                    margin={{ top: 50, right: 160, bottom: 50, left: 40 }}
                    padding={0.3}
                    innerPadding={0}
                    borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                    axisTop={null}
                    axisRight={null}
                    axisBottom={
                        {
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                        }
                    }
                    axisLeft={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                    }}
                    labelSkipWidth={12}
                    labelSkipHeight={12}
                    labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                    legends={[
                        {
                            dataFrom: 'keys',
                            anchor: 'bottom-right',
                            direction: 'column',
                            justify: false,
                            translateX: 120,
                            translateY: 0,
                            itemsSpacing: 2,
                            itemWidth: 100,
                            itemHeight: 20,
                            itemDirection: 'left-to-right',
                            itemOpacity: 0.85,
                            symbolSize: 20,
                            effects: [
                                {
                                    on: 'hover',
                                    style: {
                                        itemOpacity: 1
                                    }
                                }
                            ]
                        }
                    ]}
                    animate={true}
                    motionStiffness={90}
                    motionDamping={15}
                    borderRadius={10}
                />

            )
        }
        if (chartToShow === 'radar') {
            return (

                <ResponsiveRadar
                theme={{
                    "background": 'transparent',
                    "fontSize": 15,
                    "fontFamily": 'sans-serif',
                    "grid": {
                    },
                    "labels": {
                        "text": {
                            "fontSize": 18,
                        }
                    },
                }}
                    data={reservasByFranja}
                    keys={tiposEspacio}
                    indexBy="franjaHoraria"
                    maxValue="auto"
                    margin={{ top: 50, right: 30, bottom: 50, left: 30 }}
                    curve="linearClosed"
                    borderWidth={4}
                    borderColor={{ from: 'color' }}
                    gridLevels={4}
                    gridShape="linear"
                    gridLabelOffset={36}
                    enableDots={true}
                    dotSize={10}
                    dotColor={{ from: 'color' }}
                    dotBorderWidth={2}
                    dotBorderColor={{ from: 'color' }}
                    enableDotLabel={true}
                    dotLabel="value"
                    dotLabelYOffset={-12}
                    colors={{ scheme: 'nivo' }}
                    blendMode="multiply"
                    animate={true}
                    motionConfig="wobbly"
                    isInteractive={true}
                    fillOpacity={0.75}
                />
            )
        }
    }

    return (
        <>
            <Paper elevation={6} style={{ height: '40vh' }}>
                <ResponsiveHeatMap
                    theme={{
                        "background": 'transparent',
                        "fontSize": 15,
                        "fontFamily": 'sans-serif',
                        "grid": {
                        },
                        "labels": {
                            "text": {
                                "fontSize": 18,
                            }
                        },
                    }}
                    padding={2}
                    data={reservasByDay}
                    keys={[
                        'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'
                    ]}
                    indexBy="tipoEspacio"
                    margin={{ top: 50, right: 40, bottom: 40, left: 80 }}
                    forceSquare={false}
                    axisTop={{ orient: 'top', tickSize: 5, tickPadding: 5, tickRotation: 0, legend: '', legendOffset: 36 }}
                    axisRight={null}
                    axisBottom={null}
                    axisLeft={{
                        orient: 'left',
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: -55,
                        legendPosition: 'middle',
                        legendOffset: -40
                    }}
                    colors='YlOrRd'
                    cellOpacity={0.8}
                    cellBorderWidth={2}
                    cellBorderColor={{ from: 'color', modifiers: [['darker', 0.7]] }}
                    labelTextColor={{ from: 'color', modifiers: [['darker', 3]] }}
                    defs={[
                        {
                            id: 'lines',
                            type: 'patternLines',
                            background: 'inherit',
                            color: 'rgba(0, 0, 0, 0.1)',
                            rotation: -45,
                            lineWidth: 4,
                            spacing: 7
                        }
                    ]}
                    fill={[{ id: 'lines' }]}
                    animate={false}
                    hoverTarget="column"
                    cellHoverOthersOpacity={0.25}
                    onClick={(cell, event) => {
                        setDaySelected(cell.xKey)
                    }}
                />
            </Paper>


            {daySelected ?
                <>
                    <Grid
                        container
                        direction="row"
                        justify="space-between"
                        alignItems="center"
                        className={classes.grilla}
                    >
                        <Grid item md={10} >
                            <Typography variant='h5' className={classes.titulo} >DÍA SELECCIONADO: {daySelected}</Typography>
                        </Grid>
                        <Grid item md={2} style={{ display: "flex", justifyContent: "flex-end" }}>
                            <ButtonGroup disableElevation variant="contained" color="secondary">
                                <Button variant={chartToShow === 'radar' ? 'contained' : 'outlined'} onClick={() => { setChartToShow('radar') }}>Radar</Button>
                                <Button variant={chartToShow === 'barras' ? 'contained' : 'outlined'} onClick={() => { setChartToShow('barras') }}>Barras</Button>
                            </ButtonGroup>
                        </Grid>
                        <Grid item md={12} className={classes.paper}>
                            <Paper elevation={6} style={{ height: '40vh' }}>
                                {byFranjaChart()}
                            </Paper>
                        </Grid>
                    </Grid>
                </>
                : null}
        </>
    )
}


export default ReporteConcurrencia