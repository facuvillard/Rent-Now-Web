import firebase from "firebase";
import { getComplejosApi } from "./complejos";
import { getAllReservasByDate } from "./reservas";

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
