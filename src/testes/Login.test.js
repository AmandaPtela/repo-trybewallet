import React from 'react';
// import { renderWithRouter } from '../tests/helpers/renderWith';
import { screen } from '@testing-library/react';
import App from '../App';
import Header from '../components/Header';
import { renderWithRouterAndRedux } from '../tests/helpers/renderWith';
import userEvent from '@testing-library/user-event';

describe('Testa página de Login', () => {
  it('Verifica rota da página Login', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    expect(history.location.pathname).toBe('/');
  })
  it('Verifica existência de inputs para login', () => {
    renderWithRouterAndRedux(<App />, '/')
    const inputEmail = screen.getByTestId('email-input');
    expect(inputEmail).toBeInTheDocument();
    
    const inputPassword = screen.getByTestId('password-input');
    expect(inputPassword).toBeInTheDocument();
    expect(inputPassword.length).toBe > 6;
  })
  it('Verifica se, no Header, não é visível o email do usuário', () => {
    renderWithRouterAndRedux(<App />)
    const textoHeader = screen.getByText('TrybeWallet');
    expect(textoHeader).toBeInTheDocument();
  })
  it('Verifica se o botão de login está desabilitado', () => {
    renderWithRouterAndRedux(<App />)
    const botaoLogin = screen.getByRole('button');
    expect(botaoLogin).toBeDisabled();
    });

    describe('Verifica página Wallet', () => {

  })
})