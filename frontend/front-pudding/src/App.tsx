import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Switch} from "react-router-dom";

import PageA from './page/PageA';
import PageB from './page/PageB';
import PageC from './page/PageC';
import PageD from './page/PageD';
import Page404 from './page/Page404';

function App() {
  return (
    <BrowserRouter>

    <Switch>

      <Route exact path="/" component={PageA} />
      <Route exact path="/pageb" component={PageB} />
      <Route exact path="/pagec" component={PageC} />
      <Route exact path="/paged" component={PageD} />
      <Route component={Page404} />

    </Switch>

  </BrowserRouter>
  );
}

export default App;
