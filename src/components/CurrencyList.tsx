import { CurrencyRecord, useCurrencyList } from '../hooks/useCurrencies';
import { formatAsCurrency } from '../utils/format';

interface Props {
  onCurrencyClick: (currency: CurrencyRecord) => void;
}

export function CurrencyList({ onCurrencyClick }: Props) {
  const currencies = useCurrencyList();

  if (currencies.isLoading) {
    return <>'...'</>;
  }

  if (!currencies.data) {
    return <>No Data</>;
  }

  return (
    <div className="mt-16 flex flex-col items-center">
      <div>
        <ul className="flex gap-8">
          {['EUR', 'USD', 'GBP'].map((currency) => (
            <li key={currency}>
              {currency}:{' '}
              <span className="font-bold">
                {formatAsCurrency(currencies.data[currency].rate, 'CZK')}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-8 w-full max-w-md">
        <ul className="border-2 rounded-lg border-indigo-600 p-4">
          {Object.entries(currencies.data!)
            .sort(([, a], [, b]) => (a.symbol < b.symbol ? -1 : 1))
            .map(([symbol, data]) => (
              <li key={symbol}>
                <a
                  className="cursor-pointer flex justify-between border-b-2 border-dotted hover:bg-indigo-100 px-2"
                  onClick={(e) => (e.preventDefault(), onCurrencyClick(data))}
                >
                  <div className="flex-1 text-left">
                    {data.country} ({data.symbol})
                  </div>
                  <div>{formatAsCurrency(data.rate, 'CZK')}</div>
                </a>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
