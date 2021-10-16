import { parseCurrencyListCSV } from './useCurrencies';

it('parses currency list correctly', () => {
  const input = `15.10.2021 #200
země|měna|množství|kód|kurz
Austrálie|dolar|1|AUD|16,244
Brazílie|real|1|BRL|3,993`;
  const output = {
    AUD: {
      country: 'Austrálie',
      currency: 'dolar',
      amount: 1,
      symbol: 'AUD',
      rate: 16.244,
    },
    BRL: {
      country: 'Brazílie',
      currency: 'real',
      amount: 1,
      symbol: 'BRL',
      rate: 3.993,
    },
  };
  expect(parseCurrencyListCSV(input)).toMatchObject(output);
});
