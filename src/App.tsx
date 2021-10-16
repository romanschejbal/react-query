import React, { useState, Suspense } from 'react';
import {
  QueryClient,
  QueryClientProvider,
  QueryErrorResetBoundary,
} from 'react-query';
import { ErrorBoundary } from 'react-error-boundary';
import { CurrencyConverter } from './components/CurrencyConverter';
import { CurrencyList } from './components/CurrencyList';

const queryClient = new QueryClient({
  defaultOptions: { queries: { suspense: true } },
});

function App() {
  const [initialCurrency, setInitialCurrency] = useState('EUR');
  return (
    <QueryClientProvider client={queryClient}>
      <div className="container mx-auto p-4 text-center min-h-screen flex flex-col justify-center">
        <QueryErrorResetBoundary>
          {({ reset }) => (
            <ErrorBoundary
              onReset={reset}
              fallbackRender={({ resetErrorBoundary, error }) => (
                <div>
                  There was an error! {error.toString()}
                  <button
                    className="text-white bg-indigo-600 rounded-lg ml-2 px-8 py-2"
                    onClick={() => resetErrorBoundary()}
                  >
                    Try again
                  </button>
                </div>
              )}
            >
              <Suspense fallback={<>...</>}>
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
                  onCurrencyClick={(currency) =>
                    setInitialCurrency(currency.symbol)
                  }
                />
              </Suspense>
            </ErrorBoundary>
          )}
        </QueryErrorResetBoundary>
      </div>
    </QueryClientProvider>
  );
}

export default App;
