import React, {useState, useEffect} from 'react'
import { ResponsiveHeatMap } from '@nivo/heatmap'
import { ResponsiveRadar } from '@nivo/radar'
import { ResponsiveBar } from '@nivo/bar'
import {getReservasComplejoHistorico} from 'api/reservas'
import {useParams} from 'react-router-dom'
import {tiposEspacio} from 'constants/espacios/constants'
import { Typography, ButtonGroup, Button, Paper } from '@material-ui/core'


 const ReporteConcurrencia = () => {
    const [reservas, setReservas ] = useState([])
    const [daySelected, setDaySelected] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [reservasByDay, setReservasByDay] = useState([])
    const [reservasByFranja, setReservasByFranja] = useState([])
    const [chartToShow, setChartToShow] = useState('radar')

    const {idComplejo} = useParams()


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
    }, [])


    const formatReservasByDay = (reservasToFormat) => { 
        
        let reservasByDay = []
        reservasToFormat.forEach(reservaToFormat => {
        

            const index = reservasByDay.findIndex( reserva => reserva.tipoEspacio === reservaToFormat.espacio.tipoEspacio)

            if(index !== -1) {

                reservasByDay[index][reservaToFormat.diaString] = reservasByDay[index][reservaToFormat.diaString] + 1 
            } else {
                const newTipoEspacio = {
                    "tipoEspacio": reservaToFormat.espacio.tipoEspacio,
                    "Lunes": reservaToFormat.diaString === 'Lunes' ? 1 : 0,
                    "Martes": reservaToFormat.diaString === 'Martes' ? 1 : 0,
                    "Miercoles": reservaToFormat.diaString === 'Miercoles' ? 1 : 0,
                    "Jueves": reservaToFormat.diaString === 'Jueves' ? 1 : 0,
                    "Viernes": reservaToFormat.diaString === 'Viernes' ? 1 : 0,
                    "Sabado": reservaToFormat.diaString === 'Sabado' ? 1 : 0,
                    "Domingo": reservaToFormat.diaString === 'Domingo' ? 1 : 0,
                }
                reservasByDay.push(newTipoEspacio)
            }
        })

        setReservasByDay(reservasByDay)
    }

    const formatReservasByFranja = (reservasToFormat) => {
       const  reservasByFranjaArray = [
        {franjaHoraria: 'Mañana',
        "Cancha Futbol" : 0 ,
        "Cancha Basquet" : 0,
        "Cancha Handball": 0,
        "Cancha Tenis": 0,
        "Cancha Paddle": 0,
        "Cancha Hockey": 0,
        "Quincho": 0,
        "Asador": 0},
        {franjaHoraria: 'Siesta',
        "Cancha Futbol" : 0 ,
        "Cancha Basquet" : 0,
        "Cancha Handball": 0,
        "Cancha Tenis": 0,
        "Cancha Paddle": 0,
        "Cancha Hockey": 0,
        "Quincho": 0,
        "Asador":0 },
        {franjaHoraria: 'Tarde',
        "Cancha Futbol" : 0 ,
        "Cancha Basquet" : 0,
        "Cancha Handball": 0,
        "Cancha Tenis": 0,
        "Cancha Paddle": 0,
        "Cancha Hockey": 0,
        "Quincho": 0,
        "Asador": 0},
        {franjaHoraria: 'Noche',
        "Cancha Futbol" : 0 ,
        "Cancha Basquet" : 0,
        "Cancha Handball": 0,
        "Cancha Tenis": 0,
        "Cancha Paddle": 0,
        "Cancha Hockey": 0,
        "Quincho": 0,
        "Asador":0 },
    ]
       reservasToFormat.forEach( reservaToFormat => { 
           if(reservaToFormat.diaString !== daySelected){
               return
           }
           const index = reservasByFranjaArray.findIndex(item => item.franjaHoraria === reservaToFormat.franjaHoraria)
           if(index !== -1){
               reservasByFranjaArray[index][reservaToFormat.espacio.tipoEspacio] = reservasByFranjaArray[index][reservaToFormat.espacio.tipoEspacio] ? reservasByFranjaArray[index][reservaToFormat.espacio.tipoEspacio] + 1 : 1 
            }
       })

       console.log(reservasByFranjaArray)
       setReservasByFranja(reservasByFranjaArray)
       
    }   


    useEffect(() => {
        console.log(daySelected)
        formatReservasByFranja(reservas)
    }, [daySelected, reservas])


    const byFranjaChart = () => {
        if(chartToShow === 'barras') {
            return (
                <ResponsiveBar
                data={reservasByFranja}
                keys={tiposEspacio}
                indexBy="franjaHoraria"
                margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                padding={0.3}
                innerPadding={0}
                colors={{ scheme: 'nivo' }}
                borderColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
                axisTop={null}
                axisRight={null}
                axisBottom={
                    {
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                    }
                 } 
                axisLeft={null}
                labelSkipWidth={12}
                labelSkipHeight={12}
                labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
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
                    data={reservasByFranja}
                    keys={tiposEspacio}
                    indexBy="franjaHoraria"
                    maxValue="auto"
                    margin={{ top: 50, right: 30, bottom: 50, left: 30 }}
                    curve="cardinalClosed"
                    borderWidth={2}
                    borderColor={{ from: 'color' }}
                    gridLevels={2}
                    gridShape="circular"
                    gridLabelOffset={36}
                    enableDots={true}
                    dotSize={10}
                    dotColor={{ theme: 'background' }}
                    dotBorderWidth={2}
                    dotBorderColor={{ from: 'color' }}
                    enableDotLabel={true}
                    dotLabel="value"
                    dotLabelYOffset={-12}
                    colors={{ scheme: 'nivo' }}
                    blendMode="normal"
                    animate={true}
                    motionConfig="wobbly"
                    isInteractive={true}
                    fillOpacity={0.95}
                    />
                )
        }
    }

    return (
        <>  
        <Paper elevation={6} style= {{height: '40vh'}}>
            <ResponsiveHeatMap
                padding={2}
                data={reservasByDay}
                keys={[
                    'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'
                ]}
                indexBy="tipoEspacio"
                margin={{ top: 50, right: 40, bottom: 20, left: 70 }}
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
                cellOpacity={0.5}
                cellBorderWidth={2}
                cellOpacity={1}
                cellBorderColor={{ from: 'color', modifiers: [ [ 'darker', 0.7 ] ] }}
                labelTextColor='theme'
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
                fill={[ { id: 'lines' } ]}
                animate={false}
                hoverTarget="column"
                cellHoverOthersOpacity={0.25}
                onClick = {(cell, event)=> {
                    setDaySelected(cell.xKey)
                }}
                />
        </Paper>

        <Typography variant='h5'>Dia seleccionado: {daySelected}</Typography>
        <ButtonGroup disableElevation variant="contained" color="primary">
            <Button variant={chartToShow === 'radar' ? 'contained' : 'outlined'} onClick={()=>{setChartToShow('radar')}}>Radar</Button>
            <Button variant={chartToShow === 'barras' ? 'contained' : 'outlined'} onClick={()=>{setChartToShow('barras')}}>Barras</Button>
        </ButtonGroup>

            {daySelected ? 
            <> 
        <Paper  elevation={6} style={{height: '30vh'}}> 
                {byFranjaChart()}
        </Paper>
            </>
            : null}
        </>
        )
    }
    
    
    export default  ReporteConcurrencia