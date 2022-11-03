const endpoint = 'https://economia.awesomeapi.com.br/json/all';

const responseAPI = async () => {
  const response = await fetch(endpoint);
  const json = await response.json();
  return json;
};

export default responseAPI;
