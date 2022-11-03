// import responseAPI from '../../services/responseAPI';

// Coloque aqui suas actions
// ACTIONS TYPES
export const ADD_EMAIL = 'ADD_EMAIL';
export const SAVE_WALLET = 'SAVE_WALLET';
export const REQUEST_API = 'REQUEST_API';

// função que chama a função assíncrona

// ACTIONS CREATORS
export const addEmail = (email) => ({
  type: ADD_EMAIL,
  email,
});

export const saveWallet = (wallet) => ({
  type: SAVE_WALLET,
  wallet,
});

export const requestAPI = () => ({
  type: REQUEST_API,
});

// export const fetchResponseAPI = async (dispatch) => {
//   const response = await responseAPI();
//   dispatch(requestAPI(response));
// };

export function fetchAPI() {
  return async (dispatch) => {
    dispatch(requestAPI());
    return fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((json) => dispatch(saveWallet(json)));
  };
}
// export const responseAPIAction = () => fetchResponseAPI;
// As actions precisam ser objetos! É preciso algo para interceptar.
// A thunk é uma função que chama outra função.
// Em vez de vc chamar o fetch no didMount, vc chama aqui na action
