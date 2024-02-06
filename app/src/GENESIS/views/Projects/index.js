import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Projects from './components/Projects';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Projects} />
      </Switch>
    </Router>
  );
}

export default App;