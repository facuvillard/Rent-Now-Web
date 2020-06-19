import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/Login/Login";
import { Layout } from "./components/Layout/Layout";
import * as Routes from "./constants/routes";
import AuthProvider from "./Auth/Auth";
import PrivateRoute from "./Auth/PrivateRoute";
import Complejos from "./components/App/Complejos/Complejos";
import Users from "./components/Admin/Users/Users";
import Landing from "./components/Landing/Landing"      

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Switch>
            
            <Route path={Routes.LOGIN} exact  component={() => <Login />} />
              <Route
                path={Routes.LANDING}
                exact
                component={() => (
                  <Landing />
                )}
              />
            <Layout>
              <PrivateRoute
                path={Routes.COMPLEJOS}
                component={() => <Complejos />}
              />
              <PrivateRoute
                exact
                path={Routes.USUARIOS}
                component={() => <Users />}
              />
            </Layout>
            <Route path="*" exact component={() => <Login />} /> //Se redirecciona aca en caso de no encontrar la ruta.
          </Switch>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
