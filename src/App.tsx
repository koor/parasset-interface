//@ts-nocheck
import React from "react";
import { Provider } from "react-redux";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { UseWalletProvider } from "use-wallet";
import MinesProvider from "./contexts/Mines";
import ItanksProvider from "./contexts/ITanks";
import DebtsProvider from "./contexts/Debts";
import BasisCashProvider from "./contexts/BasisCashProvider";
import Page from "./components/Page";

import Home from "./views/Home";


import store from "./state";
import theme from "./theme";
import config from "./config";
import Updaters from "./state/Updaters";
import StatusModal from "./components/StatusModal";

const App: React.FC = () => {
  return (
    <Providers>
      <Router>
        <Switch>
          <Page>
            <Route path="/" exact>
              <Home />
            </Route>
          </Page>
        </Switch>
        <StatusModal />
      </Router>
    </Providers>
  );
};

const Providers: React.FC = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <UseWalletProvider
        autoConnect      
        chainId={config.chainId}
        connectors={{
          walletconnect: { rpcUrl: config.defaultProvider },
        }}
      >
        <Provider store={store}>
          <Updaters />
          <BasisCashProvider>
            <ItanksProvider>
              <MinesProvider>
                <DebtsProvider>
                  <>{children}</>
                </DebtsProvider>
              </MinesProvider>
            </ItanksProvider>
          </BasisCashProvider>
        </Provider>
      </UseWalletProvider>
    </ThemeProvider>
  );
};

export default App;
