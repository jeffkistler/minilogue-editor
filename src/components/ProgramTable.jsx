/**
 * A table component with sortable rows.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import Icon from './Icon.jsx';
import LoadLibraryProgramContainer from '../containers/LoadLibraryProgramContainer.jsx';
import DeleteLibraryProgramContainer from '../containers/DeleteLibraryProgramContainer.jsx';

import checkIcon from '../assets/check.svg';
import trashIcon from '../assets/trash.svg';

/**
 * A sortable row component with columns defined by the columns prop.
 */
const ProgramTableRow = SortableElement(({
  rowIndex, row, columns,
}) => (
    <tr
      className="table-row"
    >
    {
      columns.map((column, columnIndex) => {
        const value = (('accessor' in column) ? column.accessor(row) : row[columnIndex]);
        return (
          <td className="table-cell" key={columnIndex}>{value}</td>
        );
      })
    }
      <td className="table-cell" key={'actions-column'}>
        <div className="row-actions">
          <LoadLibraryProgramContainer index={rowIndex} title="Load in Panel">
            <Icon use={checkIcon.url} viewBox={checkIcon.viewBox} height={20} width={20} />
          </LoadLibraryProgramContainer>
          <DeleteLibraryProgramContainer index={rowIndex} title="Delete from Library">
            <Icon use={trashIcon.url} viewBox={trashIcon.viewBox} height={20} width={20} />
          </DeleteLibraryProgramContainer>
        </div>
      </td>
    </tr>
));

ProgramTableRow.propTypes = {
  rowId: PropTypes.any,
  row: PropTypes.any,
  columns: PropTypes.array,
};

const SortableRows = SortableContainer(({ rows, columns }) => (
  <tbody>
  {
    rows.map((row, index) => (
        <ProgramTableRow
          helperClass="sorting"
          index={index}
          rowIndex={index}
          key={`row-${index}`}
          row={row}
          columns={columns}
        />
    ))
  }
  </tbody>
));


/**
 * The main table component.
 */
const ProgramTable = ({ columns, ...props }) => (
    <table className="table">
      <thead>
        <tr className="table-head-row">
          {columns.map((column, index) => (
            <th className="table-cell table-heading" key={index}>{column.label}</th>
          ))}
        </tr>
      </thead>
      <SortableRows
        helperClass="sorting"
        columns={columns}
        pressDelay={100}
        shouldCancelStart={() => (props.rows.length <= 1)}
        {...props}
      />
    </table>
);

ProgramTable.propTypes = {
  rows: PropTypes.array.isRequired,
  columns: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    accessor: PropTypes.func,
  })).isRequired,
};

export default ProgramTable;
