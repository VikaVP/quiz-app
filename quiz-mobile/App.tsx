/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {Provider} from 'react-redux';
import AppNavStack from '@navStacks/AppNavStack';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './src/store/store';
import {NativeBaseProvider} from 'native-base';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

function App(): JSX.Element {
  const queryClient = new QueryClient({
    defaultOptions: {queries: {retry: 2}},
  });

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NativeBaseProvider>
            <AppNavStack />
          </NativeBaseProvider>
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  );
};

export default App;
