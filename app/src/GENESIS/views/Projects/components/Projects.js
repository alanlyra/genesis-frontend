import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Button, Modal, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { TiFolderOpen, TiEdit } from "react-icons/ti";
import { FcTimeline } from "react-icons/fc";
import axios from 'axios';
import Table from './Table';
import GetProjects from '../connections/ProjectsConnection';

function Projects() {
  const history = useHistory();
  const getProjects = GetProjects();
  const [data, setData] = useState([]);

  const [showEditModal, setShowEditModal] = useState(false);
  const [editProject, setEditProject] = useState(null);
  const handleClose = () => setShowEditModal(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const handleEdit = (project) => {
    console.log('Editing project:', project);
    setEditProject(project);
    setShowEditModal(true);
  };

  const handleEditChange = (event) => {
    setEditProject({
      ...editProject,
      [event.target.name]: event.target.value
    });
  };

  const handleEditSubmit = (event) => {
    event.preventDefault();

    axios.put(`${process.env.REACT_APP_BACKEND_URL}/projects/${editProject._id}`, editProject)
      .then(response => {
        getProjects().then(setData).catch(console.error);
        setShowEditModal(false);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleDelete = () => {
    axios.delete(`${process.env.REACT_APP_BACKEND_URL}/projects/${editProject._id}`)
      .then(response => {
        getProjects().then(setData).catch(console.error);
        setShowEditModal(false);
        setShowDeleteModal(false);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleSoftDelete = (event) => {
    event.preventDefault();
    editProject.deleted = true;
    editProject.deletedDate = new Date();
    axios.put(`${process.env.REACT_APP_BACKEND_URL}/projects/${editProject._id}`, editProject)
      .then(response => {
        getProjects().then(setData).catch(console.error);
        setShowEditModal(false);
      })
      .catch(error => {
        console.error(error);
      });
  };

  useEffect(() => {
    getProjects().then(setData).catch(console.error);
  }, [getProjects]);

  const columns = React.useMemo(
    () => [
      {
        Header: 'Project Info',
        columns: [
          {
            Header: 'Project Name',
            accessor: 'name',
          },
          {
            Header: 'Description',
            accessor: 'description',
          },
          {
            Header: 'Creation',
            accessor: row => {
              const date = new Date(row.createdDate);
              //date.setDate(date.getDate() + 1); //corrige falha no banco que salva a data com um dia a menos
              return date.toLocaleDateString('pt-BR');
            },
            id: 'startDate',
          },
          {
            Header: '#Files',
            accessor: row => (row.bibliometrics && row.bibliometrics.documents ? row.bibliometrics.documents.length : 0),
            id: 'documentsCount',
          },
          {
            Header: '#Events',
            //Aqui decidimos contar apenas os eventos que possuem data de previsão e que não foram deletados
            accessor: row => (
              row.roadmap 
                ? row.roadmap.filter(item => item.forecastDate !== null && item.deleted !== true).length 
                : 0
            ),
            id: 'eventsRoadmapCount',
          },
          /* {
            Header: 'Status',
            accessor: 'status',
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
                    history.push(`/bibliometrics/${_id}`);
                  }}
                  >
                    <TiEdit title={'Manage Bibliometrics'} size={28} style={{ margin: '0px', padding: '0px' }} />
                  </button>
                <button
                  className="btn btn-link"
                  onClick={() => {
                    const _id = row.original._id;
                    history.push(`/documents/${_id}`);
                  }}
                >
                  <TiFolderOpen title={'Manage Documents'} size={28} style={{ margin: '0px', padding: '0px' }} />
                </button>
                <button
                  className="btn btn-link"
                  onClick={() => {
                    const _id = row.original._id;
                    history.push(`/roadmap/project/${_id}`);
                  }}
                >
                  <FcTimeline title={'Project Roadmap'} size={28} style={{ margin: '0px', padding: '0px' }} />
                </button>
                <button
                  className="btn btn-link"
                  onClick={() => {
                    const _id = row.original._id;
                    history.push(`/scenarios/project/${_id}`);
                  }}
                >
                  <TiEdit title={'Project Scenarios'} size={28} style={{ margin: '0px', padding: '0px' }} />
                </button>
                <button
                  className="btn btn-link"
                  onClick={() => handleEdit(row.original)}
                >
                  <TiEdit title={'Manage Project'} size={28} style={{ margin: '0px', padding: '0px' }} />
                </button>
              </div>
            ),
          }
        ],
      }
    ],
    [history]
  )

  return (
    <React.Fragment>
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Projects</Card.Title>
            </Card.Header>
            <Card.Body>
              <Table columns={columns} data={data} />
              <Modal show={showEditModal} onHide={handleClose} centered>
                <Modal.Header closeButton>
                  <Modal.Title>Manage Project</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form onSubmit={handleEditSubmit}>
                    <Form.Group controlId="formProjectName">
                      <Form.Label>Project Name</Form.Label>
                      <Form.Control type="text" name="name" value={editProject ? editProject.name : ''} onChange={handleEditChange} />
                    </Form.Group>

                    <Form.Group controlId="formProjectDescription">
                      <Form.Label>Project Description</Form.Label>
                      <Form.Control as="textarea" name="description" value={editProject ? editProject.description : ''} onChange={handleEditChange} />
                    </Form.Group>

                    {/* Adicione aqui outros campos do formulário */}
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleClose}>
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
                  Are you sure you want to delete this project?
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                    Cancel
                  </Button>
                  <Button variant="danger" onClick={handleDelete}>
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

export default Projects;