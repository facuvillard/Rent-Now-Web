import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/Login/Login";
import * as Routes from "./constants/routes";
import AuthProvider from "./Auth/Auth";
import Complejos from "./components/App/Complejos/Complejos";
import Users from "./components/Admin/Users/Users";
import Landing from "./components/Landing/Landing"
import RouteWithSidebar from './components/Layout/WithSidebar/RouteWithSidebar'
import RouteWithoutSidebar from './components/Layout/WithoutSidebar/RouteWithoutSidebar'
import { AbilityContext } from "./Auth/can";
import ability from "./Auth/ability"


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
              <RouteWithSidebar component={() => <Users />} path={Routes.USUARIOS} isPrivate={true} /> 
              <RouteWithoutSidebar component={() => <Complejos />} path={Routes.COMPLEJOS} isPrivate={true} />           
              <Route path="*" exact component={() => <Landing />} /> 
             </Switch>
          </Router>
      </AbilityContext.Provider>
    </AuthProvider>
    </div>
  );
}

export default App;
