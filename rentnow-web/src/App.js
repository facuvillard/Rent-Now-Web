import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/Login/Login";
import * as Routes from "./constants/routes";
import AuthProvider from "./Auth/Auth";
import Complejos from "./components/App/Complejos/Complejos/Complejos";
import RegistrarComplejo from "./components/App/Complejos/RegisterComplejo/RegisterComplejo";
import Users from "./components/Admin/Users/Users";
import Landing from "./components/Landing/Landing";
import RouteWithSidebar from "./components/Layout/WithSidebar/RouteWithSidebar";
import RouteWithoutSidebar from "./components/Layout/WithoutSidebar/RouteWithoutSidebar";
import { AbilityContext } from "./Auth/can";
import ability from "./Auth/ability";
import * as Breadcrumbs from "./constants/breadcrumbs";
import AdminComplejos from "./components/Admin/Complejos/Complejos";
import EditComplejos from "components/App/Complejos/EditComplejo/EditComplejos";
import HomeComplejo from "components/App/Complejos/Complejos/HomeComplejo/HomeComplejo";
import RegisterEspacios from "components/App/Espacios/RegisterEspacios";
import Espacios from "components/App/Espacios/Espacios";
import EditEspacio from "components/App/Espacios/EditEspacio/EditEspacio";
import ReservasByEspacio from "components/App/Reservas/ReservaByEspacio/ReservasByEspacio";
import Ayuda from "components/Ayuda/Ayuda";
import ReporteConcurrencia from "components/App/Estadisticas/ReporteConcurrencia/ReporteConcurrencia";
import ReservasList from 'components/App/Reservas/ListadoReservas/ReservasList'


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
                component={() => <Landing />}
              />
              <RouteWithSidebar
                title="Usuarios"
                component={() => <Users />}
                path={Routes.USUARIOS}
                isPrivate={true}
                permiso="admin"
                elemento="usuario"
                breadcrumbs={Breadcrumbs.ADMIN_USUARIOS}
              />

              <RouteWithSidebar
                title="Administrar Complejos"
                component={() => <AdminComplejos />}
                path={Routes.ADMIN_COMPLEJOS}
                isPrivate={true}
                permiso="admin"
                elemento="complejo"
                breadcrumbs={Breadcrumbs.ADMIN_COMPLEJOS}
              />

              <RouteWithoutSidebar
                title="Ayuda"
                exact
                component={() => <Ayuda />}
                path={Routes.AYUDA}
                isPrivate={true}
                permiso="read"
                elemento="ayuda"
                breadcrumbs={Breadcrumbs.APP_AYUDAS}
              />

              <RouteWithoutSidebar
                title="Registrar Nuevo Complejo"
                exact
                component={() => <RegistrarComplejo />}
                path={Routes.REGISTRAR_COMPLEJO}
                isPrivate={true}
                permiso="create"
                elemento="complejo"
                breadcrumbs={Breadcrumbs.APP_REGISTRAR_COMPLEJO}
              />

              <RouteWithoutSidebar
                title="Complejos"
                exact
                component={() => <Complejos />}
                path={Routes.COMPLEJOS}
                isPrivate={true}
                permiso="read"
                elemento="complejo"
                breadcrumbs={Breadcrumbs.APP_COMPLEJOS}
              />

              <RouteWithSidebar
                title="Home del complejo"
                component={() => <HomeComplejo />}
                exact
                path={Routes.COMPLEJO}
                isPrivate={true}
                permiso="read"
                elemento="complejo"
                breadcrumbs={Breadcrumbs.APP_COMPLEJO}
              />

              <RouteWithSidebar
                title="Modificar Datos del Complejo"
                exact
                component={() => <EditComplejos />}
                path={Routes.MODIFICAR_COMPLEJO}
                isPrivate={true}
                permiso="update"
                elemento="complejo"
                breadcrumbs={Breadcrumbs.APP_MODIFICAR_COMPLEJO}
              />
              <RouteWithSidebar
                title="Administrar Espacios"
                component={() => <Espacios />}
                exact
                path={Routes.ESPACIOS}
                isPrivate={true}
                permiso="read"
                elemento="espacio"
                breadcrumbs={Breadcrumbs.APP_ESPACIOS}
              />
              <RouteWithSidebar
                title="Registrar Espacios"
                component={() => <RegisterEspacios />}
                exact
                path={Routes.REGISTRAR_ESPACIO}
                isPrivate={true}
                permiso="create"
                elemento="espacio"
                breadcrumbs={Breadcrumbs.APP_REGISTRAR_ESPACIOS}
              />
              <RouteWithSidebar
                title="Modificar Espacios"
                component={() => <EditEspacio />}
                exact
                path={Routes.MODIFICAR_ESPACIO}
                isPrivate={true}
                permiso="create"
                elemento="espacio"
                breadcrumbs={Breadcrumbs.APP_MODIFICAR_ESPACIO}
              />
              <RouteWithSidebar
                title="Calendario de Reservas"
                component={() => <ReservasByEspacio />}
                exact
                path={Routes.CALENDARIO}
                isPrivate={true}
                permiso="read"
                elemento="reserva"
                breadcrumbs={Breadcrumbs.APP_COMPLEJO_CALENDARIO}
              />
              <RouteWithSidebar
                title="Reporte de concurrencia"
                component={() => <ReporteConcurrencia />}
                exact
                path={Routes.REPORTES_CONCURRENCIA}
                isPrivate={true}
                permiso="read"
                elemento="reporte"
                breadcrumbs={Breadcrumbs.APP_REPORTES_CONCURRENCIA}
                />
               <RouteWithSidebar
                title="Listado de Reservas"
                component={() => <ReservasList />}
                exact
                path={Routes.LISTADO_RESERVAS}
                isPrivate={true}
                permiso="read"
                elemento="reserva"
                breadcrumbs={Breadcrumbs.APP_COMPLEJO_RESERVAS_LISTADO}
              />
              <Route path="*" exact component={() => <Landing />} />
            </Switch>
          </Router>
        </AbilityContext.Provider>
      </AuthProvider>
    </div>
  );
}

export default App;
