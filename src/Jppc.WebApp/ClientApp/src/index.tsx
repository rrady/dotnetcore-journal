import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { throttle } from 'lodash';

import { MuiThemeProvider, createMuiTheme, Theme } from '@material-ui/core/styles';
import { amber, indigo } from '@material-ui/core/colors';

import { configureStore, saveAuthState } from './store';

import App from './App';

const store = configureStore();
store.subscribe(
  throttle(
    () => {
      saveAuthState(store.getState().auth);
    },
    1000
  )
);

const theme: Theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: indigo,
    secondary: amber,
  }
});

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('app') as HTMLElement
);
