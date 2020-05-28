import React from 'react';
import './App.css';
import {BrowserRouter as Router,  Route, Switch} from 'react-router-dom'
import Login from './components/Login/Login'
import { Layout } from './components/Layout/Layout';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          
        <Layout>
          <Route path='/login' exact component={() => <Login nombre="Sebastian" />} />
      
        
          <Route path='/admin'  exact component= {()=> <Login nombre="Juan" />} />
            

        </Layout>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
