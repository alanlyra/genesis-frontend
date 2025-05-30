import React, { useEffect, useState, useCallback, useRef } from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useHistory, useLocation } from 'react-router-dom';
import GetScenarios from '../connections/ScenariosConnection';

function Scenarios({ data, setData }) {

  const [project, setProject] = useState({
      name: '',
      description: '',
      startDate: '2024-01-01',
      endDate: '2100-12-31',
      status: 'Created',
      owner: '1',
      createdBy: '1',
      createdDate: new Date(),
      keywords: [] // Adicione o campo keywords aqui
    });

    const history = useHistory();
      const location = useLocation();
      const _id = location.pathname.split('/').pop();
      //let getScenarios = null;
      //if(location.pathname.includes('/document')) getScenarios = GetScenarios(_id, 'document');
      //else getScenarios = GetScenarios(_id, 'project');

  const handleRefine = (event) => {
    event.preventDefault();
    
    axios.put(`${process.env.REACT_APP_BACKEND_URL}/scenarios/${_id}`, project._id)
      .then(response => {
        console.log(response.data);
        //getProjects().then(setData).catch(console.error);
        //setShowEditModal(false);
      })
      .catch(error => {
        console.error(error);
      });
  }

  //const loadScenarios = async () => {
   //   const scenarios = await GetScenarios();
   //   setData(scenarios);
   // }
  
   // useEffect(() => {
   //   loadScenarios()
   // }, []);

  const handleDownload = (event) => {
    event.preventDefault();

    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'scenarios-data.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  
  return (
    <React.Fragment>

      <div>
        <Button variant="secondary" onClick={handleRefine} style={{ marginBottom: '20px' }}>
          Generate Scenarios
        </Button>
        <Button variant="secondary" onClick={handleDownload} style={{ marginBottom: '20px', float: 'right' }}>
          Download
        </Button>
      </div>

    </React.Fragment>
  )
}

export default Scenarios;