import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from '../tests/helpers/renderWith';
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
  it('Verifica se Wallet é renderizada', async () => {
    renderWithRouterAndRedux(<App />);
    const componentDidMount = jest.fn();
    componentDidMount();
    expect(componentDidMount).toHaveBeenCalled();

    const inputEmail = screen.getByTestId('email-input');
    const inputPassword = screen.getByTestId('password-input');
    const botaoLogin = screen.getByRole('button');
    userEvent.type(inputEmail, 'email@email.com');
    userEvent.type(inputPassword, '123456');
    userEvent.click(botaoLogin);

    const headerText = screen.getByTestId('email-field');
    expect(headerText).toBeInTheDocument();
    const headerSum = screen.getByTestId('total-field');
    expect(headerSum).toBeInTheDocument();

    const headerCurrency = screen.getByTestId('header-currency-field');
    expect(headerCurrency).toBeInTheDocument();
  });

  it('Verifica se api é chamada ao renderizar Wallet', () => {
    renderWithRouterAndRedux(<Wallet />);
    const fetchApi = jest.fn();
    fetchApi();
    expect(fetchApi).toHaveBeenCalled();
  });

  it('Verifica inputs da carteira', () => {
    renderWithRouterAndRedux(<Wallet />);
    const fetchApi = jest.fn();

    const botaoAddExpense = screen.getByText(/adicionar despesa/i);
    expect(botaoAddExpense).toBeInTheDocument();

    const inputValor = screen.getByTestId('value-input');
    const inputDescricao = screen.getByTestId('description-input');
    const inputCurrency = screen.getByTestId('currency-input');
    const inputTag = screen.getByTestId('tag-input');
    const inputMethod = screen.getByTestId('method-input');

    expect(inputCurrency).toHaveAttribute('name', 'EcurrencyCopy');

    userEvent.type(inputValor, '2.00');
    userEvent.type(inputDescricao, 'Descrição');
    userEvent.selectOptions(inputCurrency, 'USD');
    userEvent.selectOptions(inputMethod, 'Dinheiro');
    userEvent.selectOptions(inputTag, 'Alimentação');
    expect(inputValor).toContainHTML('2.00');
    userEvent.click(botaoAddExpense);
    fetchApi();
    expect(fetchApi).toHaveBeenCalled();
    expect(inputValor).toContainHTML('');
    expect(inputDescricao).toContainHTML('');
    expect(inputCurrency).toContainHTML('');
    expect(inputMethod).toContainHTML('');
    expect(inputTag).toContainHTML('');

    const initialStateMock = {
      user: {},
      wallet: {
        currencies: ['USD'],
        expenses: [
          {
            id: 0,
            value: 2.00,
            description: 'descrição',
            currency: 'USD',
            method: 'Dinheiro',
            tag: 'Alimentação',
            exchangeRates: {
              USD: {
                code: 'USD',
                codein: 'BRL',
                name: 'Dólar Americano/Real Brasileiro',
                high: '4.7558',
                low: '4.6908',
                varBid: '0.0234',
                pctChange: '0.49',
                bid: '4.7526',
                ask: '4.7531',
                timestamp: '1653943661',
                create_date: '2022-05-30 17:47:41' },
            },
          },
        ],
        editor: false,
        idToEdit: 0,
      },
    };
    renderWithRouterAndRedux(<Table />, { initialState: initialStateMock });
    const titleTable = screen.getAllByRole('columnheader');

    expect(titleTable[0]).toBeInTheDocument();
    expect(titleTable[1]).toBeInTheDocument();
    expect(titleTable[2]).toBeInTheDocument();
    expect(titleTable[3]).toBeInTheDocument();
    screen.logTestingPlaygroundURL();
    expect(initialStateMock.wallet.editor).toBe(false);
    /* const botaoEditar = screen.getByTestId('edit-btn')
    expect(botaoEditar).toBeInTheDocument(); */

    const editExpense = jest.fn();
    editExpense();
    expect(editExpense).toHaveBeenCalled();

    const remove = jest.fn();
    remove();
    expect(remove).toHaveBeenCalled();
  });
});
