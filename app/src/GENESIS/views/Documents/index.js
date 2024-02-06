import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import FileUpload from './components/FileUpload';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={FileUpload} />
      </Switch>
    </Router>
  );
}

export default App;