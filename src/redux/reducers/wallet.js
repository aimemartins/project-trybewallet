import {
  SAVE_WALLET,
  SAVE_EXPENSES,
  DELETE_EXPENSES,
  EDIT_BTN_ON, EDIT_EXPENSES,
  EDIT_BTN_OFF } from '../actions';
// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
};
const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_WALLET:
    return {
      ...state,
      currencies: Object.keys(action.wallet).filter((el) => el !== 'USDT'),
    };
  case SAVE_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  case DELETE_EXPENSES:
    return {
      ...state,
      expenses: action.payload,
    };

  case EDIT_BTN_ON:
    return {
      ...state,
      editor: true,
      idToEdit: action.payload,
    };

  case EDIT_BTN_OFF:
    return {
      ...state,
      editor: false,
      idToEdit: action.payload,
    };
    // Ajuda de Victor Salles para realização do requisito 9
  case EDIT_EXPENSES: {
    const idsElement = state.expenses.map((elem) => elem.id);
    const index = idsElement.indexOf(action.payload.id);
    const newExpenses = [...state.expenses];
    newExpenses[index] = action.payload;
    return {
      ...state,
      expenses: newExpenses,
    };
  }
  default:
    return state;
  }
};

export default wallet;
