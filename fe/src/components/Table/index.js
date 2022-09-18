import React from 'react';
import Table from 'react-bootstrap/Table';
import { unitsTableConfig } from '../../constants/Tables/unitTable';

import { units } from '../../mocks/units';

export function UnitsTable({ data = units }) {
  const renderRow = () => {
    return data.map((row, index) => {
      return <tr key={index}></tr>;
    });
  };

  return (
    <Table bordered hover>
      <thead>
        <tr>
          {unitsTableConfig.columns.map(({ columnName, label }) => (
            <th key={columnName}>{label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {renderRow()}
        {/* {
          data.map((row) => {
            return 
          })
        } */}
        {/* <tr>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
        </tr> */}
        {/* <tr>
          <td>2</td>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <td>3</td>
          <td colSpan={2}>Larry the Bird</td>
          <td>@twitter</td>
        </tr> */}
      </tbody>
    </Table>
  );
}
