import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/Login/Login";
import { Layout } from "./components/Layout/Layout";
import  * as Routes  from "./constants/routes";
import { Typography } from "@material-ui/core";
import  AuthProvider from "./Auth/Auth";
import PrivateRoute from './Auth/PrivateRoute'
import Complejos from "./components/Admin/Complejos/Complejos"
function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Switch>
            <Route path={Routes.LOGIN} exact component={() => <Login  />} />
            <Layout>
              <Route path={Routes.LANDING} exact component={() => ( <Typography>Estas es la landing page</Typography>)} />
              <PrivateRoute path={Routes.COMPLEJOS} component={() => <Complejos />} />
             
            </Layout>
          </Switch>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
