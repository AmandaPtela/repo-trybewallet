import mockData from '../tests/helpers/mockData';
import { remove, editar, soma } from './Functions';

describe('Verifica funções Table', () => {
  it('Função Remove', () => {
    const e = { target: { value: 2.00 } };
    const despesas = [{
      value: 2.00,
    }];
    expect(remove(e, despesas, () => {}, 0)).toBe(undefined);
  });

  it('Função Editar', () => {
    const id = 0;
    expect(editar(id, () => {})).toBe(undefined);
  });

  it('Função Somar despesas', () => {
    const despesas = [
      { value: 2.00, currency: 'USD', exchangeRates: mockData },
      { value: 5.00, currency: 'EUR', exchangeRates: mockData },
    ];
    expect(soma(despesas, () => {})).toBe(undefined);
  });
});
