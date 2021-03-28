import React, {useEffect, useState} from 'react'
import { useRouteMatch } from 'react-router-dom'
import {getComplejosById } from 'api/complejos'


export const ComplejoContext = React.createContext();

const CurrentComplejo = (props) => {
    const [currentComplejo, setCurrentComplejo] = useState()

    let match = useRouteMatch("/app/complejos/:idComplejo");
  
    useEffect(()=> {
      if(match && match.params.idComplejo ){
          if(!currentComplejo){
              getComplejosById(match.params.idComplejo).then((response) => {
                if (response.status === "OK") {
                  setCurrentComplejo(response.data);
                } 
              });
          }
      } else {
          setCurrentComplejo({}) 
      }
      
    }, [match])

    return (
        <ComplejoContext.Provider value={currentComplejo}>
            {props.children}
        </ComplejoContext.Provider >
    )
}


export default CurrentComplejo