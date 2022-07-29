// Coloque aqui suas actions
const login = 'login';
const actionLogin = (value) => ({
  type: login, value });

const wallet = 'wallet';
const actionWallet = (valor) => ({
  type: wallet, valor });

export default { actionLogin, actionWallet };
