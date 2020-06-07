const BASE_URL = "https://apis.datos.gob.ar/georef/api/";

export function getProvincesApi() {
  const url = BASE_URL + "provincias?formato=json";
  const params = {
    method: "GET",
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((error) => {
      return error;
    });
}

export function getCitiesByProvincesApi(data) {
  const url = BASE_URL + "localidades?provincia=" + data + "&max=1000"
  const params = {
    method: "GET",
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((error) => {
      return error;
    });
}
