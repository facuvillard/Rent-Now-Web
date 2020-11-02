export function capitalize(string){
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function getFranjaHoraria(hora) {
  
    if(hora >= 5 && hora < 13) {
      return 'Mañana'
   
    } 
    if(hora >= 13 && hora < 16){
      return 'Siesta'
     
    } 
    if(hora >= 16 && hora < 19){
     return 'Tarde'
      
    } 
    if(hora >= 19 && hora < 24){
      return 'Noche'
      
    }

    return 'Fuera de franja'
  }