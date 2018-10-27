import * as React from 'react';

import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import ApolloClient from 'apollo-boost';
import { Provider } from 'mobx-react';
import { HistoryAdapter } from 'mobx-state-router';
import { ApolloProvider } from 'react-apollo';
import { getTheme } from './components';
import { Shell } from './shell';
import { rootStore } from './stores';
import { history } from './utils/history';

const theme = getTheme();

// Observe history changes
const historyAdapter = new HistoryAdapter(rootStore.routerStore, history);
historyAdapter.observeRouterStateChanges();

const client = new ApolloClient({
    uri: 'https://api.github.com/graphql',
    request: async operation => {
        operation.setContext({
            headers: {
                authorization: `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}`
            }
        });
    }
});

export class App extends React.Component {
    public render() {
        return (
            <ApolloProvider client={client}>
                <MuiThemeProvider theme={theme}>
                    <Provider rootStore={rootStore}>
                        <Shell />
                    </Provider>
                </MuiThemeProvider>
            </ApolloProvider>
        );
    }
}
