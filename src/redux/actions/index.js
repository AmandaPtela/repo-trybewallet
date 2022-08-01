// Coloque aqui suas actions
const login = 'login';
const actionLogin = (value) => ({
  type: login, value });

const api = 'API';
const chamadaApi = () => ({
  type: api,
});

const wallet = 'walletExpense';
const actionWallet = (value) => ({
  type: wallet, value,
});

export default { actionLogin, actionWallet, chamadaApi };
