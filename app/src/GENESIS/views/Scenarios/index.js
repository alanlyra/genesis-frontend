import React, { useState } from 'react';
import Scenarios from './components/Scenarios';

function App() {
  const [data, setData] = useState([]);

  return (
    <React.Fragment>
      <Scenarios data={data} setData={setData}/>
    </React.Fragment>
  );
}

export default App;