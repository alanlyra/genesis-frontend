import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Projects from './components/Projects';

function App() {
  return (
    <React.Fragment>
      <Projects/>
    </React.Fragment>
  );
}

export default App;