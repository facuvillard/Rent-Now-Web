import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/Login/Login";
import * as Routes from "./constants/routes";
import AuthProvider from "./Auth/Auth";
import Complejos from "./components/App/Complejos/Complejos";
import RegistrarComplejo from "./components/App/Complejos/RegisterComplejo/RegisterComplejo";
import Users from "./components/Admin/Users/Users";
import Landing from "./components/Landing/Landing"
import RouteWithSidebar from './components/Layout/WithSidebar/RouteWithSidebar'
import RouteWithoutSidebar from './components/Layout/WithoutSidebar/RouteWithoutSidebar'
import { AbilityContext } from "./Auth/can";
import ability from "./Auth/ability"
import * as Breadcrumbs from "./constants/breadcrumbs"
import AdminComplejos from './components/Admin/Complejos/Complejos'
import EditComplejos from "components/App/Complejos/EditComplejos";


function App() {
  return (
    <div className="App">
      <AuthProvider>
        <AbilityContext.Provider value={ability}>
          <Router>
            <Switch>
              <Route path={Routes.LOGIN} exact component={() => <Login />} />
              <Route
                path={Routes.LANDING}
                exact
                component={() => (
                  <Landing />
                )}
              />
              <RouteWithSidebar title="Usuarios" component={() => <Users />} path={Routes.USUARIOS} isPrivate={true} breadcrumbs={Breadcrumbs.ADMIN_USUARIOS} />
              <RouteWithSidebar title="Administrar Complejos" component={() => <AdminComplejos />} path={Routes.ADMIN_COMPLEJOS} isPrivate={true} breadcrumbs={Breadcrumbs.ADMIN_COMPLEJOS} />
              <RouteWithSidebar title="Modificar Datos del Complejo" component={() => <EditComplejos />} path={Routes.MODIFICAR_COMPLEJO} isPrivate={true} breadcrumbs={Breadcrumbs.APP_MODIFICAR_COMPLEJO} />
              <RouteWithoutSidebar title="Complejos" exact component={() => <Complejos />} path={Routes.COMPLEJOS} isPrivate={true} breadcrumbs={Breadcrumbs.APP_COMPLEJOS} />
              <RouteWithoutSidebar title="Registrar Nuevo Complejo" exact component={() => <RegistrarComplejo />} path={Routes.REGISTRAR_COMPLEJO} isPrivate={true} breadcrumbs={Breadcrumbs.APP_REGISTRAR_COMPLEJO} />
              <Route path="*" exact component={() => <Landing />} />
            </Switch>
          </Router>
        </AbilityContext.Provider>
      </AuthProvider>
    </div>
  );
}

export default App;
