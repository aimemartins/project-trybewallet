import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchAPI, saveExpenses, editBtnOff, editExpenses } from '../redux/actions';
import responseAPI from '../services/responseAPI';

class WalletForm extends Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      value: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchAPI());
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };
  // Função realizada em group programming (Sérgio, João Felipe, Jose, João Lelles)

  handleClick = async () => {
    const {
      id,
      value,
      currency,
      method,
      tag,
      description,
    } = this.state;

    const { dispatch } = this.props;
    const exchangeRates = await responseAPI();

    const estados = {
      id,
      value,
      currency,
      method,
      tag,
      description,
      exchangeRates,
    };

    dispatch(saveExpenses(estados));
    this.setState((prev) => ({
      id: prev.id + 1,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',

    }));
  };

  handleEditBtnClick = () => {
    const { dispatch, expenses, idToEdit } = this.props;
    const expense = expenses.find((e) => e.id === idToEdit);

    const { value, currency, method, tag, description } = this.state;

    const obj = {
      id: idToEdit,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: expense.exchangeRates,

    };

    dispatch(editExpenses(obj));
    dispatch(editBtnOff());
    this.setState(() => ({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Trabalho',
    }));
  };

  render() {
    const { currencies, editor } = this.props;
    const { value, currency, method, tag, description } = this.state;
    return (
      <div>
        <h1>WalletForm</h1>
        <form>
          <label htmlFor="value">
            Valor:
            <input
              id="value"
              name="value"
              type="number"
              value={ value }
              data-testid="value-input"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="description">
            Descrição:
            <input
              id="description"
              name="description"
              type="text"
              value={ description }
              data-testid="description-input"
              onChange={ this.handleChange }
            />
          </label>

          <label htmlFor="currency">
            Moeda:
            <select
              data-testid="currency-input"
              name="currency"
              id="currency"
              value={ currency }
              onChange={ this.handleChange }
            >
              {currencies.map((element, index) => (
                <option key={ index }>{element}</option>
              ))}
            </select>
          </label>

          <label htmlFor="method">
            Método de Pagamento:
            <select
              data-testid="method-input"
              name="method"
              id="method"
              value={ method }
              onChange={ this.handleChange }
            >
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag">
            Categoria:
            <select
              data-testid="tag-input"
              name="tag"
              id="tag"
              value={ tag }
              onChange={ this.handleChange }
            >
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
          { !editor && (
            <button
              type="button"
              onClick={ this.handleClick }
            >
              Adicionar despesa
            </button>
          )}
          {editor && (
            <button
              type="button"
              onClick={ this.handleEditBtnClick }
            >
              Editar despesa
            </button>
          )}
        </form>
      </div>
    );
  }
}

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  expenses: PropTypes.arrayOf.isRequired,
  idToEdit: PropTypes.number.isRequired,
  editor: PropTypes.number.isRequired,
};

const mapStateToProps = ({ wallet }) => ({
  currencies: wallet.currencies,
  expenses: wallet.expenses,
  editor: wallet.editor,
  idToEdit: wallet.idToEdit,

});

export default connect(mapStateToProps)(WalletForm);
