import React, { useEffect, useState } from 'react';
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
    keywords: []
  });

  const [showEditModal, setShowEditModal] = useState(false);
  const [editScenario, setEditScenario] = useState(null);

  const history = useHistory();
  const location = useLocation();
  const _id = location.pathname.split('/').pop();
  let getScenarios = null;
  if(location.pathname.includes('/document')) getScenarios = GetScenarios(_id, 'document');
  else getScenarios = GetScenarios(_id, 'project');

  // Carregar scenarios ao montar
  useEffect(() => {
    async function loadScenarios() {
      const scenarios = await getScenarios();
      setData(scenarios);
    }
    loadScenarios();
  }, [getScenarios, setData]);

  const handleEdit = (scenario) => {
    setEditScenario(scenario);
    setShowEditModal(true);
  };

  const handleEditChange = (event) => {
    setEditScenario({
      ...editScenario,
      [event.target.name]: event.target.value
    });
  };

  const handleEditSubmit = (event) => {
    event.preventDefault();
    axios.put(`${process.env.REACT_APP_BACKEND_URL}/scenarios/${editScenario._id}`, editScenario)
      .then(response => {
        // Atualize a lista de scenarios após edição
        setData(data.map(s => s._id === editScenario._id ? response.data : s));
        setShowEditModal(false);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleRefine = (event) => {
    event.preventDefault();
    axios.put(`${process.env.REACT_APP_BACKEND_URL}/scenarios/${_id}`, project._id)
      .then(response => {
        // Atualize scenarios após gerar/refinar
        setData(response.data.scenarios || []);
      })
      .catch(error => {
        console.error(error);
      });
  };

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
  };

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
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {data && data.length > 0 ? data.map((scenario, idx) => (
          <div key={scenario._id || idx} style={{
            border: '1px solid #ccc',
            borderRadius: '8px',
            padding: '20px',
            width: '350px',
            background: '#f9f9f9',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
          }}>
            <h5>{scenario.scenarioType}</h5>
            <p><strong></strong> {scenario.scenarioText}</p>
            <p><strong>Impactos Positivos:</strong>
              <ul>
                {scenario.positiveImpacts && scenario.positiveImpacts.map((imp, i) => (
                  <li key={i}>{imp}</li>
                ))}
              </ul>
            </p>
            <p><strong>Impactos Negativos:</strong>
              <ul>
                {scenario.negativeImpacts && scenario.negativeImpacts.map((imp, i) => (
                  <li key={i}>{imp}</li>
                ))}
              </ul>
            </p>
            <Button variant="primary" onClick={() => handleEdit(scenario)}>
              Editar
            </Button>
          </div>
        )) : <p>Nenhum cenário encontrado.</p>}
      </div>

      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Editar Cenário</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editScenario && (
            <Form onSubmit={handleEditSubmit}>
              <Form.Group>
                <Form.Label>Tipo</Form.Label>
                <Form.Control
                  type="text"
                  name="scenarioType"
                  value={editScenario.scenarioType || ''}
                  onChange={handleEditChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Texto</Form.Label>
                <Form.Control
                  as="textarea"
                  name="scenarioText"
                  value={editScenario.scenarioText || ''}
                  onChange={handleEditChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Impactos Positivos (um por linha)</Form.Label>
                <Form.Control
                  as="textarea"
                  name="positiveImpacts"
                  value={editScenario.positiveImpacts ? editScenario.positiveImpacts.join('\n') : ''}
                  onChange={e => setEditScenario({
                    ...editScenario,
                    positiveImpacts: e.target.value.split('\n')
                  })}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Impactos Negativos (um por linha)</Form.Label>
                <Form.Control
                  as="textarea"
                  name="negativeImpacts"
                  value={editScenario.negativeImpacts ? editScenario.negativeImpacts.join('\n') : ''}
                  onChange={e => setEditScenario({
                    ...editScenario,
                    negativeImpacts: e.target.value.split('\n')
                  })}
                />
              </Form.Group>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowEditModal(false)}>
                  Cancelar
                </Button>
                <Button variant="primary" type="submit">
                  Salvar
                </Button>
              </Modal.Footer>
            </Form>
          )}
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
}

export default Scenarios;