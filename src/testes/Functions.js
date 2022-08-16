const remove = (e, despesas, dispatch, valorTotal) => {
  const valor = e.target.value;
  const filtro = despesas.filter(({ value }) => value !== valor);

  dispatch({
    type: 'walletExpense',
    value: filtro,
  });

  dispatch({
    type: 'somaTotal',
    value: (valorTotal - valor),
  });
};

const editar = (id, dispatch) => {
  dispatch({
    type: 'editExpense',
    value: true,
  });

  dispatch({ type: 'idToEdit', value: id });
};

const soma = (despesas, dispatch) => {
  const lista = despesas.reduce((acc, i) => acc
      + (i.value * i.exchangeRates[i.currency].ask), 0);
  dispatch({ type: 'somaTotal', value: Number(lista).toFixed(2) });
};

export { remove, editar, soma };
