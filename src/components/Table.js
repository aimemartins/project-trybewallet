import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpenses, editBtnOn } from '../redux/actions';

// construção da função deleteButton e expenses.map em group programmming (João Felipe, Sérgio, Joseane e João Lelles)

class Table extends Component {
  deleteButton = (payload) => {
    const { expenses, dispatch } = this.props;
    const filter = expenses.filter((elem) => elem.id !== payload);
    dispatch(deleteExpenses(filter));
  };
  // Ajuda de Victor Salles para realização do requisito 9

  editBtn = (id) => {
    const { dispatch } = this.props;
    dispatch(editBtnOn(id));
  };

  render() {
    const { expenses } = this.props;
    return (
      <>
        <div>Tabela</div>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((elem) => (
              <tr key={ elem.id }>
                <td>{elem.description}</td>
                <td>{elem.tag}</td>
                <td>{elem.method}</td>
                <td>{Number(elem.value).toFixed(2)}</td>
                <td>{elem.exchangeRates[elem.currency].name}</td>
                <td>{Number(elem.exchangeRates[elem.currency].ask).toFixed(2)}</td>
                <td>
                  {Number(elem
                    .value * elem.exchangeRates[elem.currency].ask).toFixed(2)}
                </td>
                <td>Real</td>
                <td>
                  <button
                    type="button"
                    onClick={ () => this.editBtn(elem.id) }
                    data-testid="edit-btn"
                  >
                    Editar

                  </button>
                  <button
                    type="button"
                    data-testid="delete-btn"
                    onClick={ () => this.deleteButton(elem.id) }
                  >
                    Excluir

                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </>
    );
  }
}

Table.propTypes = {
  dispatch: PropTypes.func,
  expenses: PropTypes.arrayOf,
}.isRequired;

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
