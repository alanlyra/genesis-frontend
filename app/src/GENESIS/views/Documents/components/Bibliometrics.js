import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Button, Modal, Form } from 'react-bootstrap';
import ReactTags from 'react-tag-autocomplete';
import { useHistory, useLocation } from 'react-router-dom';
import { TiEdit } from "react-icons/ti";
import { FcTimeline } from "react-icons/fc";
import axios from 'axios';
import Table from './Table';
import GetDocuments from '../connections/DocumentsConnection';

function Bibliometrics({ data, setData }) {
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

  const [tags, setTags] = useState([]);
  const [defaultSwitch, setDefaultSwitch] = useState(true);
  

  const toggleHandler = () => {
    setDefaultSwitch(prevState => !prevState);
  };

  const handleProjectChange = (event) => {
    setProject({
      ...project,
      [event.target.name]: event.target.value
    });
  };

  const handleProjectAddition = (tag) => {
    setTags([...tags, tag]);
    setProject({
      ...project,
      keywords: [...project.keywords, tag.name]
    });
  };

  const handleProjectDelete = (i) => {
    const newTags = tags.slice(0);
    newTags.splice(i, 1);
    setTags(newTags);
    const newKeywords = project.keywords.slice(0);
    newKeywords.splice(i, 1);
    setProject({
      ...project,
      keywords: newKeywords
    });
  };

  const handleProjectSubmit = (event) => {
    event.preventDefault();

    axios.post(`${process.env.REACT_APP_BACKEND_URL}/projects`, project)
    .then(response => {
      console.log(response.data);
      // Redirecionar para a página de projetos ou limpar o formulário

      // Supondo que o ID do projeto seja retornado na resposta
      const projectId = response.data._id;

      const workflowUrl = `${process.env.REACT_APP_BACKEND_URL}/workflow/project/${projectId}`;
      console.log('Calling workflow endpoint:', workflowUrl);

      axios.post(workflowUrl, project)
        .then(response => {
          console.log(response.data);
          // Redirecionar para a página de projetos ou limpar o formulário
        })
        .catch(error => {
          console.error(error);
        });
    })
    .catch(error => {
      console.error(error);
    });
  }

  const history = useHistory();
  const location = useLocation();
  const _id = location.pathname.split('/').pop();
  const getDocuments = GetDocuments(_id);
  const [idProject, setIdProject] = useState(null);
  const [roadmapProject, setRoadmapProject] = useState(null);

  const loadDocuments = async () => {
  const projectWithDocuments = await getDocuments();
  setData(projectWithDocuments.bibliometrics.documents);
  setIdProject(projectWithDocuments._id);
  setRoadmapProject(projectWithDocuments.roadmap);
  }

  useEffect(() => {
    loadDocuments()
  }, []);

  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editDocument, setEditDocument] = useState(null);

  const handleDocumentChange = (event) => {
    setProject({
      ...project,
      [event.target.name]: event.target.value
    });
  };
  

  // Crie uma função para lidar com a edição do documento
  const handleDocumentEditSubmit = (event) => {
    event.preventDefault();

    axios.put(`${process.env.REACT_APP_BACKEND_URL}/documents/${editDocument._id}`, editDocument)
      .then(response => {
        loadDocuments();
        setShowEditModal(false);
      })
      .catch(error => {
        console.error(error);
      });
  };

  // Crie uma função para lidar com a exclusão do documento
  const handleDocumentDelete = () => {
    axios.delete(`${process.env.REACT_APP_BACKEND_URL}/documents/${editDocument._id}`)
      .then(response => {
        loadDocuments();
        setShowDeleteModal(false);
        setShowEditModal(false)
      })
      .catch(error => {
        console.error(error);
      });
  };

  const columns = React.useMemo(
    () => [
      {
        Header: 'Document Info',
        columns: [
          {
            Header: 'Document Name',
            accessor: 'title',
          },
          {
            Header: 'Description',
            accessor: 'description',
          },
          {
            Header: 'Author(s)',
            accessor: row => (row.author && row.author != "" ? row.author : row.creator),
          },
          {
            Header: 'Upload Date',
            accessor: row => {
              const date = new Date(row.uploadDate);
              //date.setDate(date.getDate() + 1); //corrige falha no banco que salva a data com um dia a menos
              return date.toLocaleDateString('pt-BR');
            },
            id: 'startDate',
          },
          {
            Header: '#Events',
            accessor: row => (
              roadmapProject 
                ? roadmapProject.filter(item => item.forecastDate !== null && item.deleted !== true && item.document === row._id).length 
                : 0
            ),
          },
          /* {
            Header: 'Status',
            accessor: 'roadmapStatus',
          }, */
          {
            Header: 'Actions',
            accessor: 'b',
            disableSortBy: true,
            Cell: ({ row }) => (
              <div>
                <button
                  className="btn btn-link"
                  onClick={() => {
                    const _id = row.original._id;
                    history.push(`/roadmap/document/${_id}`);
                  }}
                >
                  <FcTimeline title={'Document Roadmap'} size={28} style={{ margin: '0px', padding: '0px' }} />
                </button>
                <button
                  className="btn btn-link"
                  onClick={() => {
                    setEditDocument(row.original);
                    setShowEditModal(true);
                  }}
                >
                  <TiEdit title={'Manage document'} size={28} style={{ margin: '0px', padding: '0px' }} />
                </button>
              </div>
            ),
          }
        ],
      }
    ],
    [history, idProject,roadmapProject]
  )

  return (
    <React.Fragment>
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Bibliometrics Keywords</Card.Title>
            </Card.Header>
            <Form onSubmit={handleProjectSubmit}>
              <Form.Group controlId="formProjectKeywords">
                      <ReactTags
                        classNames={{root: 'react-tags bootstrap-tagsinput', selectedTag: 'react-tags__selected-tag btn-primary'}}
                        allowNew={true}
                        tags={tags}
                        onDelete={handleProjectDelete}
                        onAddition={handleProjectAddition}
                />
              </Form.Group>
            </Form>
            <Card.Body>
              <Table columns={columns} data={data} />
              <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
                <Modal.Header closeButton>
                  <Modal.Title>Manage Document</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form onSubmit={handleDocumentEditSubmit}>
                    <Form.Group controlId="documentName">
                      <Form.Label>Document Name</Form.Label>
                      <Form.Control type="text" value={editDocument ? editDocument.title : ''} onChange={e => setEditDocument({ ...editDocument, title: e.target.value })} />
                    </Form.Group>
                    <Form.Group controlId="description">
                      <Form.Label>Description</Form.Label>
                      <Form.Control type="text" value={editDocument ? editDocument.description : ''} onChange={e => setEditDocument({ ...editDocument, description: e.target.value })} />
                    </Form.Group>
                    <Form.Group controlId="author">
                      <Form.Label>Author</Form.Label>
                      <Form.Control type="text" value={editDocument ? editDocument.author : ''} onChange={e => setEditDocument({ ...editDocument, author: e.target.value })} />
                    </Form.Group>
                    {/* Adicione aqui os outros campos do formulário */}
                    <Modal.Footer>
                      <Button variant="secondary" onClick={() => setShowEditModal(false)}>
                        Close
                      </Button>
                      <Button variant="danger" onClick={() => setShowDeleteModal(true)}>
                        Delete
                      </Button>
                      <Button variant="primary" type="submit">
                        Save Changes
                      </Button>
                    </Modal.Footer>
                  </Form>
                </Modal.Body>
              </Modal>

              <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
                <Modal.Header closeButton>
                  <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  Are you sure you want to delete this document?
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                    Cancel
                  </Button>
                  <Button variant="danger" onClick={handleDocumentDelete}>
                    Delete
                  </Button>
                </Modal.Footer>
              </Modal>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  )
}

export default Bibliometrics;