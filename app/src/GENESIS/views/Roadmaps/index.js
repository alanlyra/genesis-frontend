import React, { useState } from 'react';
import Roadmap from './components/Roadmaps';

function App() {
  const [data, setData] = useState([]);

  return (
    <React.Fragment>
      <Roadmap data={data} setData={setData}/>
    </React.Fragment>
  );
}

export default App;