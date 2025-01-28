import React, { useState } from 'react';
import FileUpload from './components/FileUpload';
import Documents from './components/Documents';
import Bibliometrics from './components/Bibliometrics';

function App() {
  const [data, setData] = useState([]);

  return (
    <React.Fragment>
      <FileUpload data={data} setData={setData}/>
      <Documents data={data} setData={setData}/>
      {/* <Bibliometrics data={data} setData={setData}/> */}
    </React.Fragment>
  );
}

export default App;