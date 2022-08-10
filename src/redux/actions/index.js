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

const valoresCambio = 'valoresCambio';
const actionValorCambio = (value) => ({
  type: valoresCambio, value,
});

const exchangeRates = 'exchangeRates';
const actionExchangeRates = (value) => ({
  type: exchangeRates, value,
});

const somaTotal = 'somaTotal';
const actionSomaTotal = (value) => ({
  type: somaTotal, value,
});

const editExpense = 'editExpense';
const actionEditExpense = (value) => ({
  type: editExpense, value,
});
const edit = 'edit';
const actionEdit = (value) => ({
  type: edit, value,
});
const idToEdit = 'idToEdit';
const actionIdToEdit = (value) => ({
  type: idToEdit, value,
});

export default {
  actionLogin,
  actionWallet,
  actionCurrencies,
  actionValorCambio,
  actionExchangeRates,
  actionSomaTotal,
  actionEditExpense,
  actionIdToEdit,
  actionEdit,
};
