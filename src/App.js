import React from 'react';

import Home from './pages/Home'
import About from './pages/About'
import Users from './pages/Users'
import Recipe from './components/Recipes/Recipe'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

export default function App() {
  return(
    <Router>
      <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/recipe/:id" children={<Recipe />} />
      </Switch>
    </Router>
  )
}

// function Users() {
//   return <h2>Users</h2>;
// }