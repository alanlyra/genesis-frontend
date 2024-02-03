import React, { useEffect, useState, useCallback } from 'react'
import { Row, Col, Card, Pagination, Button } from 'react-bootstrap';
import BTable from 'react-bootstrap/Table';
import { useTable, usePagination, useGlobalFilter } from 'react-table'

//import makeData from '../../data/tableData';
import ModuleNotification from '../../components/Widgets/Statistic/Notification';
import { GlobalFilter } from './GlobalFilter';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function useGetProjects() {
  return useCallback(() => fetch('http://localhost:4100/get-projects')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    }), []);
}

function Table({ columns, data }) {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    globalFilter,
    setGlobalFilter,

    // The rest of these things are super handy, too ;)

    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    useGlobalFilter,
    usePagination
  )
  //console.log(data);

  // Render the UI for your table
  return (
    <>
      <Row className='mb-3'>
        <Col className="d-flex align-items-center">
          Show
          <select
            className='form-control w-auto mx-2'
            value={pageSize}
            onChange={e => {
              setPageSize(Number(e.target.value))
            }}
          >
            {[5, 10, 20, 30, 40, 50].map(pageSize => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
          entries
        </Col>
        <Col>
          <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
        </Col>
      </Row>
      <BTable striped bordered hover responsive {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </BTable>
      <Row className='justify-content-between mt-3'>
        <Col sm={12} md={6}>
          <span className="d-flex align-items-center">
            Page {' '} <strong> {pageIndex + 1} of {pageOptions.length} </strong>{' '}
            | Go to page:{' '}
            <input
              type="number"
              className='form-control ml-2'
              defaultValue={pageIndex + 1}
              onChange={e => {
                let page = e.target.value ? Number(e.target.value) - 1 : 0;
                if (page >= pageOptions.length) {
                  page = pageOptions.length - 1;
                  e.target.value = page + 1;
                }

                if (page < 0) {
                  page = 0;
                  e.target.value = 1;
                }
                gotoPage(page);
              }}
              style={{ width: '100px' }}
            />
          </span>
        </Col>
        <Col sm={12} md={6}>
          <Pagination className='justify-content-end'>
            <Pagination.First onClick={() => gotoPage(0)} disabled={!canPreviousPage} />
            <Pagination.Prev onClick={() => previousPage()} disabled={!canPreviousPage} />
            <Pagination.Next onClick={() => nextPage()} disabled={!canNextPage} />
            <Pagination.Last onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage} />
          </Pagination>
        </Col>
      </Row>
    </>
  )
}

function App() {

  const history = useHistory();
  const getProjects = useGetProjects();
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
            Header: 'Project Name',
            accessor: 'name',
          }, {
            Header: 'Project ID',
            accessor: '_id',
          },
          {
            Header: '',
            accessor: 'b',
            disableSortBy: true,
            Cell: ({ row }) => (
              <div>
                <button
                  className="btn btn-link"
                  onClick={() => {
                    const _id = row.original._id;
                    history.push(`/genesis-file-upload/${_id}`);
                  }}
                >
                  Alo alo
                </button>
              </div>
            ),
          }
        ],
      }
    ],
    []
  )

  return (
    <React.Fragment>
      <Row>
        <Col sm={12}>
          <ModuleNotification message="For more info please check the components's official documentation" link='https://react-table.tanstack.com/' />
        </Col>
      </Row>
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
            history.push(`/genesis-file-upload/${_id}`);
            // history.push({
            //   pathname: '/genesis-file-upload',
            //   state: { _id: 'fileTest' }
            // });
          }}>Small Button</Button>
        </Card>
      </Col>
    </React.Fragment>
  )
}

export default App
