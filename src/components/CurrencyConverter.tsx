import { useCurrencyList } from '../hooks/useCurrencies';
import { Field, Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { formatAsCurrency } from '../utils/format';

interface Props {
  initialCurrency: string;
}

export function CurrencyConverter({ initialCurrency }: Props) {
  const currencies = useCurrencyList();
  const [state, setState] = useState({ currency: initialCurrency, value: 100 });

  useEffect(() => {
    setState((state) => ({ ...state, currency: initialCurrency }));
  }, [initialCurrency]);

  if (currencies.isLoading) {
    return <>'...'</>;
  }

  if (!currencies.data) {
    return <>No Data</>;
  }

  return (
    <div>
      <Formik initialValues={state} onSubmit={(values) => setState(values)}>
        <Form className="mx-auto flex flex-col max-w-sm">
          <div className="mb-4 flex items-center justify-between">
            <Field
              name="value"
              type="text"
              className="text-center rounded-2xl border-gray-200 w-28 flex-1"
            />
            <span className="mx-2">CZK do</span>
            <Field
              name="currency"
              as="select"
              className="rounded-2xl border-gray-200"
            >
              {Object.entries(currencies.data).map(([symbol, currency]) => (
                <option value={symbol}>{symbol}</option>
              ))}
            </Field>
          </div>
          <button
            type="submit"
            className="bg-indigo-600 text-white px-8 py-2 rounded-lg w-full"
          >
            Spočítat
          </button>
        </Form>
      </Formik>
      <div className="text-2xl font-bold mt-4">
        {formatAsCurrency(state.value, 'CZK')} ={' '}
        {formatAsCurrency(
          state.value / currencies.data[state.currency].rate,
          state.currency
        )}
      </div>
    </div>
  );
}
