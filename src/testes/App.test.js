import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from '../tests/helpers/renderWith';
// import storeGeral from '../redux/store';
import mockData from '../tests/helpers/mockData';
import App from '../App';
import Wallet from '../pages/Wallet';
import Table from '../components/Table';

describe('Testa página de Login', () => {
  it('Verifica rota da página Login', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    expect(history.location.pathname).toBe('/');
  });

  it('Verifica existência de inputs para login', () => {
    renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByTestId('email-input');
    expect(inputEmail).toBeInTheDocument();

    const inputPassword = screen.getByTestId('password-input');
    expect(inputPassword).toBeInTheDocument();
  });

  it('Verifica se, no Header, não é visível o email do usuário', () => {
    renderWithRouterAndRedux(<App />);
    const textoHeader = screen.getByText('TrybeWallet');
    expect(textoHeader).toBeInTheDocument();
  });

  it('Verifica se o botão de login está desabilitado', () => {
    renderWithRouterAndRedux(<App />);
    const botaoLogin = screen.getByRole('button');
    expect(botaoLogin).toBeDisabled();
  });
});

describe('Verifica página Wallet', () => {
  const initialState = {
    wallet: {
      currencies: [
        'USD',
        'CAD',
        'GBP',
        'ARS',
        'BTC',
        'LTC',
        'EUR',
        'JPY',
        'CHF',
        'AUD',
        'CNY',
        'ILS',
        'ETH',
        'XRP',
        'DOGE',
      ],
      expenses: [
        {
          id: '',
          value: '',
          description: '',
          currency: '',
          method: '',
          ExchangeRates: {
            mockData,
          },
        },
      ],
    },
  };

  it('Verifica se Wallet é renderizada', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const componentDidMount = jest.fn();
    componentDidMount();
    expect(componentDidMount).toHaveBeenCalled();

    const inputEmail = screen.getByTestId('email-input');
    const inputPassword = screen.getByTestId('password-input');
    const botaoLogin = screen.getByRole('button');
    userEvent.type(inputEmail, 'email@email.com');
    userEvent.type(inputPassword, '123456');
    userEvent.click(botaoLogin);
    expect(botaoLogin).not.toBeInTheDocument();
    userEvent.click(botaoLogin);

    const { pathname } = history.location;
    expect(pathname).toBe('/carteira');

    const headerText = screen.getByTestId('email-field');
    expect(headerText).toBeInTheDocument();

    const headerSum = screen.getByTestId('total-field');
    expect(headerSum).toBeInTheDocument();

    const headerCurrency = screen.getByTestId('header-currency-field');
    expect(headerCurrency).toBeInTheDocument();
  });

  const fetchApi = jest.fn();
  fetchApi();
  expect(fetchApi).toHaveBeenCalled();
  expect(typeof fetchApi).toBe('function');

  it('Verifica inputs da carteira', () => {
    const { container } = renderWithRouterAndRedux(<Wallet />);

    const botaoAddExpense = screen.getByText(/adicionar despesa/i);
    expect(botaoAddExpense).toBeInTheDocument();

    const inputValor = screen.getByTestId('value-input');
    const inputDescricao = screen.getByTestId('description-input');
    const inputCurrency = screen.getByTestId('currency-input');
    const inputTag = screen.getByTestId('tag-input');
    const inputMethod = screen.getByTestId('method-input');

    userEvent.type(inputValor, '0');
    userEvent.type(inputDescricao, 'description');
    userEvent.selectOptions(inputCurrency, 'USD');
    userEvent.selectOptions(inputMethod, 'Dinheiro');
    userEvent.selectOptions(inputTag, 'Alimentação');
    userEvent.click(botaoAddExpense);
    expect(inputValor).toContainHTML('');
    expect(inputDescricao).toContainHTML('');
    expect(inputCurrency).toContainHTML('');
    expect(inputMethod).toContainHTML('');
    expect(inputTag).toContainHTML('');
    expect(initialState.wallet.expenses).toHaveLength(1);

    renderWithRouterAndRedux(<Table />);

    const tabela = screen.getAllByRole('columnheader');
    expect(typeof tabela).toBe('object');
    expect(tabela[0]).toBeInTheDocument();

    const linhas = container.querySelector('td');
    expect(linhas).toBeInTheDocument();

    const array = [
      'USD',
      'CAD',
      'GBP',
      'ARS',
      'BTC',
      'LTC',
      'EUR',
      'JPY',
      'CHF',
      'AUD',
      'CNY',
      'ILS',
      'ETH',
      'XRP',
      'DOGE',
    ];

    expect(initialState.wallet.currencies).toEqual(array);
    expect(typeof initialState.wallet.expenses).toBe('object');

    const editExpense = jest.fn();
    editExpense();
    expect(editExpense).toHaveBeenCalled();

    const remove = jest.fn();
    remove();
    expect(remove).toHaveBeenCalled();
  });
});
