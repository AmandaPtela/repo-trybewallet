// Esse reducer será responsável por tratar as informações da pessoa usuária
const estadoInicialUser = {
  email: '',
}

function userReducer(state = estadoInicialUser, action) {
  if(action.type) {
    return {email: action.email}
  }
  return state;
}
export default userReducer;