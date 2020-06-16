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

export function getCitiesByProvincesApi(province, cityName) {
  const url = BASE_URL + "localidades?nombre=" + cityName + "&provincia=" + province + "&max=10";

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
