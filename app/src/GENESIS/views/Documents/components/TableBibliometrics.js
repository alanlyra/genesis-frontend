import React from 'react';
import { Row, Col, Pagination } from 'react-bootstrap';
import BTable from 'react-bootstrap/Table';
import { useTable, usePagination, useGlobalFilter } from 'react-table';
import { GlobalFilter } from '../../../utils/GlobalFilter';

function TableBibliometrics({ columns, data }) {
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

export default TableBibliometrics;