import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { useHistory, useLocation  } from 'react-router-dom';
import { TiDocumentAdd } from "react-icons/ti";
import { FcTimeline } from "react-icons/fc";
import Table from './Table';
import GetDocuments from '../connections/DocumentsConnection';

function Documents() {
  const history = useHistory();
  const location = useLocation();
  const _id = location.pathname.split('/').pop();
  const getDocuments = GetDocuments(_id);
  const [data, setData] = useState([]);

  useEffect(() => {
    getDocuments().then(setData).catch(console.error);
  }, [getDocuments]);

  console.log(data);

  const columns = React.useMemo(
    () => [
      {
        Header: 'Document Info',
        columns: [
          {
            Header: 'Document ID',
            accessor: '_id',
          }, {
            Header: 'Document Name',
            accessor: 'name',
          },
          {
            Header: 'Description',
            accessor: 'description',
          },
          {
            Header: 'Upload Date',
            accessor: row => {
              const date = new Date(row.uploadDate);
              date.setDate(date.getDate() + 1); //corrige falha no banco que salva a data com um dia a menos
              return date.toLocaleDateString('pt-BR');
            },
            id: 'startDate',
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
              <Card.Title as="h5">Documents</Card.Title>
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

export default Documents;