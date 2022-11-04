import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  // handleTotalExpenses = () => {
  //   const { expenses } = this.props;
  //   const result = expenses.reduce(((acc, curr) => (
  //     acc + (Number(curr.value) * Number(curr.exchangeRates[curr.currency].ask))
  //   )), 0).toFixed(2);
  //   return result;
  // };

  getExpenses = () => {
    const { expenses } = this.props;
    let gastos = 0;
    expenses.forEach((el) => {
      const result = el.value * el.exchangeRates[el.currency].ask;
      gastos += result;
    });
    return gastos.toFixed(2);
  };

  render() {
    const { email } = this.props;
    return (
      <div>
        <p data-testid="email-field">
          Email:
          {' '}
          { email }
        </p>
        <p data-testid="total-field">{this.getExpenses()}</p>
        <p data-testid="header-currency-field">BRL</p>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string,
  expenses: PropTypes.arrayOf,
}.isRequired;

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
