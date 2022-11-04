import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchAPI, saveExpenses } from '../redux/actions';
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

  render() {
    const { currencies } = this.props;
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
          <button
            type="button"
            onClick={ this.handleClick }
          >
            Adicionar despesa

          </button>
        </form>
      </div>
    );
  }
}

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = ({ wallet }) => ({
  currencies: wallet.currencies,
});

export default connect(mapStateToProps)(WalletForm);
