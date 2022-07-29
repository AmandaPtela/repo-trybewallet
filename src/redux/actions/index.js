// Coloque aqui suas actions
const login = 'login';
const actionLogin = (value) => ({
  type: login, value });

const wallet = 'wallet';
const actionWallet = (value) => ({
  type: wallet, value,
});

export default { actionLogin, actionWallet };
