/**
 * A table component with selectable rows.
 */

import React from 'react';
import PropTypes from 'prop-types';

/**
 * A selectable row component with columns defined by the columns prop.
 */
const SelectTableRow = ({
  rowId, row, columns, rowClasses, onChange,
}) => (
    <tr
      className={rowClasses && rowClasses.join(' ')}
      onClick={() => onChange(rowId)}
    >
    {
      columns.map((column, columnIndex) => {
        const value = (('accessor' in column) ? column.accessor(row) : row[columnIndex]);
        return (<td key={columnIndex}>{value}</td>);
      })
    }
    </tr>
);

SelectTableRow.propTypes = {
  rowId: PropTypes.any,
  row: PropTypes.any,
  columns: PropTypes.array,
  rowClasses: PropTypes.any,
  onChange: PropTypes.func,
};

/**
 * The main table component.
 */
const SelectTable = ({
  rows, columns, value, rowIdCallback, onChange,
}) => (
    <table className="table">
      <thead>
        <tr>
          {columns.map((column, index) => (<th key={index}>{column.label}</th>))}
        </tr>
      </thead>
      <tbody>
      {
        rows.map((row, index) => {
          const rowId = rowIdCallback(row, index);
          return (
            <SelectTableRow key={index}
              rowId={rowId}
              row={row}
              columns={columns}
              rowClasses={rowId === value ? ['selected'] : []}
              onChange={onChange}/>
          );
})
      }
      </tbody>
    </table>
);

SelectTable.propTypes = {
  rows: PropTypes.array.isRequired,
  columns: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    accessor: PropTypes.func,
  })).isRequired,
  value: PropTypes.any,
  rowIdCallback: PropTypes.func,
  onChange: PropTypes.func,
};

SelectTable.defaultProps = {
  rowIdCallback: (row, index) => index,
  onChange: () => {},
};

export default SelectTable;
