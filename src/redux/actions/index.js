// Coloque aqui suas actions
const login = 'login';
const actionLogin = (value) => ({
  type: login, value,
});

const currencies = 'addCurrencies';
const actionCurrencies = (value) => ({
  type: currencies, value,
});

const wallet = 'walletExpense';
const actionWallet = (value) => ({
  type: wallet, value,
});

const exchange = 'addValue';
const actionAddValue = (value) => ({
  type: exchange, value,
});

const valoresCambio = 'valoresCambio';
const actionValorCambio = (value) => ({
  type: valoresCambio, value,
});

const valorFinal = 'valorFinal';
const actionValorFinal = (value) => ({
  type: valorFinal, value,
});

export default {
  actionLogin,
  actionWallet,
  actionCurrencies,
  actionAddValue,
  actionValorCambio,
  actionValorFinal,
};
