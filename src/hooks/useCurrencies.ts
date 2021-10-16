import { useQuery, UseQueryResult } from 'react-query';
import {
  split,
  pipe,
  slice,
  map,
  zipObject,
  first,
  keyBy,
  filter,
  identity,
} from 'lodash/fp';

export interface CurrencyRecord {
  amount: number;
  country: string;
  currency: string;
  rate: number;
  symbol: string;
}

type CurrencyRecordRaw = Record<keyof CurrencyRecord, string>;

const keyMapping = {
  kód: 'symbol',
  kurz: 'rate',
  měna: 'currency',
  množství: 'amount',
  země: 'country',
} as { [k: string]: string };

export const parseCurrencyListCSV = (input: string) => {
  const rows = pipe(
    split('\n'),
    filter(identity), // remove empty lines
    slice(1, Infinity), // skip first line with date
    map(split('|'))
  )(input);
  const headers = first(rows)!; // headers are always there
  const renamedHeaders = map((key: string) => {
    if (!(key in keyMapping)) {
      throw new Error(`Unrecognized record key "${key}" in currency data`);
    }
    return keyMapping[key] as string;
  }, headers);
  const values = slice(1, Infinity, rows);

  return pipe(
    map(zipObject(renamedHeaders)),
    map((record: CurrencyRecordRaw) => ({
      ...record,
      amount: parseInt(record.amount, 10),
      rate: parseFloat(record.rate.replace(',', '.')),
    })),
    keyBy((record) => record.symbol)
  )(values);
};

function fetchCurrencyList() {
  return fetch(
    '/cs/financni_trhy/devizovy_trh/kurzy_devizoveho_trhu/denni_kurz.txt'
  )
    .then((res) => res.text())
    .then(parseCurrencyListCSV);
}

export function useCurrencyList(): UseQueryResult<{
  [k: string]: CurrencyRecord;
}> {
  const currencyList = useQuery('currenciesList', () => fetchCurrencyList());
  return currencyList;
}
