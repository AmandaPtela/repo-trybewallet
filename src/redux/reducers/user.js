// Esse reducer será responsável por tratar as informações da pessoa usuária
const estadoInicialUser = {
  email: '',
};

function user(state = estadoInicialUser, action) {
  if (action.type === 'login') {
    return { email: action.value };
  }
  return state;
}
export default user;
