import firebase from "firebase";
import { getComplejosApi } from "./complejos";
import {
  getAllReservasByDate,
  getAllReservasByDateAndIdComplejo,
} from "./reservas";
import { getEspaciosByIdComplejo } from "./espacios";

export async function getRankingConcurrenciaApi(date) {
  try {
    const complejos = await getComplejosApi();
    const reservas = await getAllReservasByDate(date);
    const ranking = [];

    complejos.data.map((complejo) => {
      const item = {
        idComplejo: complejo.id,
        nombreComplejo: complejo.nombre,
        cantidadReservas: 0,
      };

      reservas.data.map((reserva) => {
        if (reserva.complejo.id === complejo.id) {
          item.cantidadReservas += 1;
        }
      });

      ranking.push(item);
    });

    ranking.sort((a, b) => (a.cantidadReservas < b.cantidadReservas ? 1 : -1));

    return {
      status: "OK",
      message: "Ranking consultado correctamente",
      data: ranking,
    };
  } catch (err) {
    return {
      status: "ERROR",
      message: "Error al consultar ranking",
      data: err,
    };
  }
}

export async function getDatosHome(idComplejo, date) {
  try {
    const espaciosResult = await getEspaciosByIdComplejo(idComplejo);
    const reservasResult = await getAllReservasByDateAndIdComplejo(
      date,
      idComplejo
    );
    let data = [];
    let cantidadConcretadas = 0;
    let cantidadInconclusas = 0;
    let cantidadReservasApp = 0;
    let cantidadReservasWeb = 0;

    const reservaAppOWeb = (reserva) => {
      if(reserva.reservaApp) {
        cantidadReservasApp++;
      } else {
        cantidadReservasWeb++;
      }
    }

    espaciosResult.data.map((espacio) => {
      let item = {
        nombreEspacio: espacio.nombre,
        cantidadReservasConcretadas: 0,
        cantidadReservasInconclusas: 0,
      };
      reservasResult.data.map((reserva) => {
  
        if (espacio.id === reserva.espacio.id) {
          let index = reserva.estados.length - 1;
          if (reserva.estados[index].estado === "FINALIZADA") {
            cantidadConcretadas += 1;
            item.cantidadReservasConcretadas += 1;
            reservaAppOWeb(reserva)
          } else {
            if (
              reserva.estados[index].estado === "SIN CONCURRENCIA" ||
              reserva.estados[index].estado === "CANCELADA"
            ) {
              item.cantidadReservasInconclusas += 1;
              cantidadInconclusas += 1;
              reservaAppOWeb(reserva)
            }
          }
        }
      });
      data.push(item);
    });

    return {
      status: "OK",
      message: "Datos consultados correctamente",
      data: {
        cantidadConcretadas,
        cantidadInconclusas,
        cantidadReservasApp,
        cantidadReservasWeb,
        data,
      },
    };
  } catch (error) {
    return {
      status: "ERROR",
      message: "Error al consultar datos de home",
      data: error,
    };
  }
}
