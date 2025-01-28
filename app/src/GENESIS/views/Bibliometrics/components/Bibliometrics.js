import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Button, Modal, Form } from 'react-bootstrap';
import ReactTags from 'react-tag-autocomplete';
import { useHistory, useLocation } from 'react-router-dom';
import { TiEdit } from "react-icons/ti";
import { FcTimeline } from "react-icons/fc";
import axios from 'axios';
import Table from './Table';
import GetProjectByID from '../connections/ProjectsConnection';

function Bibliometrics({ data, setData }) {
  const history = useHistory();
  const location = useLocation();
  const _id = location.pathname.split('/').pop();
  const getProject = GetProjectByID(_id);
  const [idProject, setIdProject] = useState(null);
  const [keywords, setKeywords] = useState([]);
  const [tags, setTags] = useState([]);

  const loadProject = async () => {
    const project = await getProject();
    setData(project.scopusResearch);
    setIdProject(project._id);
    setKeywords(project.keywords);
  };

  useEffect(() => {
    loadProject();
  }, []);

  useEffect(() => {
    if (keywords) {
      // Mapeie o array de keywords para o formato esperado pelo ReactTags
      const initialTags = keywords.map((keyword, index) => ({ id: index, name: keyword }));
      setTags(initialTags);
    }
  }, [keywords]);

  const handleAddition = (tag) => {
    setTags([...tags, tag]);
    setKeywords([...keywords, tag.name]);
  };

  const handleDelete = (i) => {
    const newTags = tags.slice(0);
    newTags.splice(i, 1);
    setTags(newTags);
    const newKeywords = keywords.slice(0);
    newKeywords.splice(i, 1);
    setKeywords(newKeywords);
  };

  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editDocument, setEditDocument] = useState(null);

  // Crie uma função para lidar com a edição do documento
  const handleEditSubmit = (event) => {
    event.preventDefault();

    axios.put(`${process.env.REACT_APP_BACKEND_URL}/documents/${editDocument._id}`, editDocument)
      .then(response => {
        loadProject();
        setShowEditModal(false);
      })
      .catch(error => {
        console.error(error);
      });
  };

  // Crie uma função para lidar com a exclusão do documento
  const handleDeleteDocument = () => {
    axios.delete(`${process.env.REACT_APP_BACKEND_URL}/documents/${editDocument._id}`)
      .then(response => {
        loadProject();
        setShowDeleteModal(false);
        setShowEditModal(false);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const saveKeywords = async () => {
    try {
      await axios.put(`${process.env.REACT_APP_BACKEND_URL}/projects/${idProject}`, { keywords });
    } catch (error) {
      console.error('Error saving keywords:', error);
    }
  };

  const handleWorkflow = async () => {
    await saveKeywords(); // Salve as keywords antes de executar o workflow

    const workflowUrl = `${process.env.REACT_APP_BACKEND_URL}/workflow/project/${idProject}`;
    console.log('Calling workflow endpoint:', workflowUrl);

    axios.post(workflowUrl, { id: idProject })
      .then(response => {
        console.log(response.data);
        loadProject(); // Atualiza os dados da tabela após a execução
      })
      .catch(error => {
        console.error(error);
      });
  };

  const columns = React.useMemo(
    () => [
      {
        Header: 'Bibliometrics Documents',
        columns: [
          {
            Header: 'DOI',
            accessor: 'doi',
            Cell: ({ value }) => (
              <a href={`https://www.google.com/search?q=${value}`} target="_blank" rel="noopener noreferrer">
                {value}
              </a>
            ),
          },
          {
            Header: 'Title',
            accessor: 'title',
          },
          {
            Header: 'Authors',
            accessor: 'authors',
          },
          {
            Header: 'Date',
            accessor: 'coverDate',
          }
        ],
      }
    ],
    [history, idProject, keywords]
  );

  // Filtre os dados para exibir apenas aqueles onde "doi" e "title" são diferentes de nulo e ""
  const filteredData = data.filter(item => item.doi && item.doi.trim() !== '' && item.title && item.title.trim() !== '');

  return (
    <React.Fragment>
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Bibliometrics</Card.Title>
            </Card.Header>
            
            <Card.Body>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                <Form.Group controlId="formProjectKeywords" style={{ flex: 1, marginRight: '10px' }}>
                  <Form.Label>Keywords</Form.Label>
                  <ReactTags
                    classNames={{ root: 'react-tags bootstrap-tagsinput', selectedTag: 'react-tags__selected-tag btn-primary' }}
                    allowNew={true}
                    tags={tags}
                    onDelete={handleDelete}
                    onAddition={handleAddition}
                    placeholderText='Add new keyword'
                  />
                </Form.Group>

                <Button variant="primary" onClick={handleWorkflow} style={{ flex: '0 0 15.5%', height: '80px', marginTop: '18px', marginRight: '0px' }}>
                  Run Bibliometrics
                </Button>
              </div>
              
              <Form.Label>Results</Form.Label>
              <Table columns={columns} data={filteredData} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
}

export default Bibliometrics;