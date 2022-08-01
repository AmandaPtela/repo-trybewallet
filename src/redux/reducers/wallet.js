// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const initialStateWallet = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

function wallet(state = initialStateWallet, action) {
  if (action.type === 'wallet') {
    return { [state.wallet.currencies]: action.value };
  }
  return state;
}
export default wallet;
