
const BASE_URL = 'http://localhost:3005/api/';

export const callApi = (endpoint, authenticated) => {

  let token = localStorage.getItem('id_token') || null,
    config = {};

  if(authenticated) {
    if(token) {
      config = {
        headers: { 'x-access-token': `${token}` }
      }
    }
    else {
      throw "No token saved!";
    }
  }

  return fetch(BASE_URL + endpoint, config);
}