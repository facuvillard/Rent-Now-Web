import React, {useState, useEffect} from 'react'
import { ResponsiveHeatMap } from '@nivo/heatmap'
import { ResponsiveRadar } from '@nivo/radar'
import {getReservasComplejoHistorico} from 'api/reservas'
import {useParams} from 'react-router-dom'
import {tiposEspacio} from 'constants/espacios/constants'

const data = [
    {
      "taste": "fruity",
      "chardonay": 46,
      "carmenere": 88,
      "syrah": 107
    },
    {
      "taste": "bitter",
      "chardonay": 77,
      "carmenere": 73,
      "syrah": 69
    },
    {
      "taste": "heavy",
      "chardonay": 71,
      "carmenere": 59,
      "syrah": 54
    },
    {
      "taste": "strong",
      "chardonay": 83,
      "carmenere": 36,
      "syrah": 72
    },
    {
      "taste": "sunny",
      "chardonay": 53,
      "carmenere": 41,
      "syrah": 106
    }
  ]

//   const data = [
//     {
//         "tipoEspacio": "Cancha Futbol",
//         "Lunes": 29,
//         "LunesColor": "hsl(0, 70%, 50%)",
//         "Martes": 63,
//         "MartesColor": "hsl(176, 70%, 50%)",
//     },
//     {
//         "tipoEspacio": "Quincho",
//         "Lunes": 3,
//         "LunesColor": "hsl(0, 70%, 50%)",
//         "Martes": 8,
//         "MartesColor": "hsl(176, 70%, 50%)",
//     },
//   ]



 const ReporteConcurrencia = () => {
    const [reservas, setReservas ] = useState([])
    const [daySelected, setDaySelected] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [reservasByDay, setReservasByDay] = useState([])
    const [reservasByFranja, setReservasByFranja] = useState([])

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


    //   const data = [
//     {
//         "tipoEspacio": "Cancha Futbol",
//         "Lunes": 29,
//         "LunesColor": "hsl(0, 70%, 50%)",
//         "Martes": 63,
//         "MartesColor": "hsl(176, 70%, 50%)",
//     },
//     {
//         "tipoEspacio": "Quincho",
//         "Lunes": 3,
//         "LunesColor": "hsl(0, 70%, 50%)",
//         "Martes": 8,
//         "MartesColor": "hsl(176, 70%, 50%)",
//     },
//   ]

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



    return (
        <div style={{height: '100vh'}}>  
        <div style= {{height: '50vh'}}>
            <ResponsiveHeatMap
                padding={2}
                data={reservasByDay}
                keys={[
                    'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'
                ]}
                indexBy="tipoEspacio"
                margin={{ top: 100, right: 60, bottom: 60, left: 60 }}
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
                colors='YlOrBr'
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
        </div>
            {daySelected ? 
            <ResponsiveRadar
            data={reservasByFranja}
            keys={tiposEspacio}
            indexBy="franjaHoraria"
            maxValue="auto"
            margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
            curve="linearClosed"
            borderWidth={2}
            borderColor={{ from: 'color' }}
            gridLevels={5}
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
            fillOpacity={0.25}
            blendMode="multiply"
            animate={true}
            motionConfig="wobbly"
            isInteractive={true}
            />
            : null}
        </div>
        )
}


export default  ReporteConcurrencia