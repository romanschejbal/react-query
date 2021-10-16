import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { CurrencyConverter } from './components/CurrencyConverter';
import { CurrencyList } from './components/CurrencyList';

const queryClient = new QueryClient();

function App() {
  const [initialCurrency, setInitialCurrency] = useState('EUR');
  return (
    <QueryClientProvider client={queryClient}>
      <div className="container mx-auto p-4 text-center min-h-screen flex flex-col justify-center">
        <div className="flex flex-col lg:flex-row lg:items-center">
          <div className="flex-1">
            <img src="/image.svg" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl my-8">
              Kurzy devizového trhu ze stránek ČNB
            </h1>
            <CurrencyConverter initialCurrency={initialCurrency} />
          </div>
        </div>
        <CurrencyList
          onCurrencyClick={(currency) => setInitialCurrency(currency.symbol)}
        />
      </div>
    </QueryClientProvider>
  );
}

export default App;
