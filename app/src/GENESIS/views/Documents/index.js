import React, { useState } from 'react';
import FileUpload from './components/FileUpload';
import Documents from './components/Documents';

function InputMeu(params){
  return(
    <span>{params.class}</span>
  )
}

function App() {
  const [data, setData] = useState([]);

  return (
    <React.Fragment>
      <FileUpload data={data} setData={setData}/>
      <Documents data={data} setData={setData}/>
      <InputMeu class="alo alo"></InputMeu>
    </React.Fragment>
  );
}

export default App;