import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from '../tests/helpers/renderWith';
import App from '../App';

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
  it('Verifica se botão é desabilitado', () => {
    renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByTestId('email-input');
    const inputPassword = screen.getByTestId('password-input');
    const botaoLogin = screen.getByRole('button');
    userEvent.type(inputEmail, 'email@email.com');
    userEvent.type(inputPassword, '123456');
    userEvent.click(botaoLogin);
    expect(botaoLogin).not.toBeInTheDocument();
    const { history } = renderWithRouterAndRedux(<App />);
    expect(history.location.pathname).toBe('/');
  });
  it('verifica a presença do header', () => {
    renderWithRouterAndRedux(<App />);
    const headerText = screen.getByText(/trybewallet/i);
    expect(headerText).toBeInTheDocument();
  });
});
