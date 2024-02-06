import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { TiDocumentAdd } from "react-icons/ti";
import { FcTimeline } from "react-icons/fc";
import Table from './Table';
import GetProjects from '../connections/ProjectsConnection';

function Projects() {
  const history = useHistory();
  const getProjects = GetProjects();
  const [data, setData] = useState([]);

  useEffect(() => {
    getProjects().then(setData).catch(console.error);
  }, [getProjects]);

  console.log(data);

  const columns = React.useMemo(
    () => [
      {
        Header: 'Project Info',
        columns: [
          {
            Header: 'Project ID',
            accessor: '_id',
          }, {
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
              const date = new Date(row.startDate);
              date.setDate(date.getDate() + 1); //corrige falha no banco que salva a data com um dia a menos
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
            Header: 'Status',
            accessor: 'status',
          },
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
                    history.push(`/documents/${_id}`);
                    //window.location.reload();
                  }}
                >
                  <TiDocumentAdd title={'Add documents'} size={28} style={{ margin: '0px', padding: '0px' }} />
                </button>
                <button
                  className="btn btn-link"
                  onClick={() => {
                    const _id = row.original._id;
                    history.push(`/documents/${_id}`);
                  }}
                >
                  <FcTimeline title={'Roadmap'} size={28} style={{ margin: '0px', padding: '0px' }} />
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
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Col md={6}>
        <Card title="Sizes [ Small ]">
          <Button variant='primary' size='sm' onClick={() => {
            const _id = '123';
            history.push(`/documents/${_id}`);
          }}>Small Button</Button>
        </Card>
      </Col>
    </React.Fragment>
  )
}

export default Projects;