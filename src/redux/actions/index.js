// -------------------Salvar email no Estado Global
// ACTIONS TYPES
export const ADD_EMAIL = 'ADD_EMAIL';
// ACTIONS CREATORS
export const addEmail = (email) => ({
  type: ADD_EMAIL,
  email,
});

// -------------------Salvar wallet no Estado Global
// ACTIONS TYPES
export const SAVE_WALLET = 'SAVE_WALLET';
// ACTIONS CREATORS

export const saveWallet = (wallet) => ({
  type: SAVE_WALLET,
  wallet,
});

// -------------------Salvar o retorno da API no Estado Global
// ACTIONS TYPES
export const REQUEST_API = 'REQUEST_API';
// ACTIONS CREATORS
export const requestAPI = () => ({
  type: REQUEST_API,
});

// -------------------Salvar a wallet na expenses do Estado Global
// ACTIONS TYPES
export const SAVE_EXPENSES = 'SAVE_EXPENSES';
// ACTIONS CREATORS
export const saveExpenses = (payload) => ({
  type: SAVE_EXPENSES,
  payload,
});

export const DELETE_EXPENSES = 'DELETE_EXPENSES';

export const deleteExpenses = (payload) => ({
  type: DELETE_EXPENSES,
  payload,
});
// -------------------Editar as expenses do Estado Global

export const EDIT_BTN_ON = 'EDIT_BTN_ON';

export const editBtnOn = (payload) => ({
  type: EDIT_BTN_ON,
  payload,
});

export const EDIT_EXPENSES = 'EDIT_EXPENSES';

export const editExpenses = (payload) => ({
  type: EDIT_EXPENSES,
  payload,
});

export const EDIT_BTN_OFF = 'EDIT_BTN_OFF';

export const editBtnOff = () => ({
  type: EDIT_BTN_OFF,
  payload: 0,
});
// export const fetchResponseAPI = async (dispatch) => {
//   const response = await responseAPI();
//   dispatch(requestAPI(response));
// };
// export const responseAPIAction = () => fetchResponseAPI;

// As actions precisam ser objetos! É preciso algo para interceptar.
// A thunk é uma função que chama outra função.
// Em vez de vc chamar o fetch no didMount, vc chama aqui na action

export function fetchAPI() {
  return async (dispatch) => {
    dispatch(requestAPI());
    return fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((json) => dispatch(saveWallet(json)));
  };
}
