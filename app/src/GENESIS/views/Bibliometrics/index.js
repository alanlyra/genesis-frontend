import React, { useState } from 'react';
import Bibliometrics from './components/Bibliometrics';

function App() {
  const [data, setData] = useState([]);

  return (
    <React.Fragment>
      <Bibliometrics data={data} setData={setData}/>
    </React.Fragment>
  );
}

export default App;