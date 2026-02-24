import React from 'react';

export default function CSVPreviewTable({ data, importType, categories }) {
  const renderMenuHeaders = () => (
    <thead>
      <tr>
        <th>#</th>
        <th>Item Name</th>
        <th>Description</th>
        <th>Price</th>
        <th>Category</th>
        <th>Status</th>
      </tr>
    </thead>
  );

  const renderBeerHeaders = () => (
    <thead>
      <tr>
        <th>#</th>
        <th>Brewery</th>
        <th>Style</th>
        <th>ABV</th>
        <th>Price</th>
        <th>Category</th>
        <th>Status</th>
      </tr>
    </thead>
  );

  const renderMenuRow = (row) => (
    <tr key={row.index} className={getRowClass(row)}>
      <td>{row.index + 1}</td>
      <td>{row.data['Item Name'] || '-'}</td>
      <td className="description-cell">
        {row.data['Description'] ? truncate(row.data['Description'], 50) : '-'}
      </td>
      <td>${parseFloat(row.data['Price'] || 0).toFixed(2)}</td>
      <td>{row.data['Category'] || '-'}</td>
      <td className="status-cell">{renderStatus(row)}</td>
    </tr>
  );

  const renderBeerRow = (row) => (
    <tr key={row.index} className={getRowClass(row)}>
      <td>{row.index + 1}</td>
      <td>{row.data['Brewery'] || '-'}</td>
      <td>{row.data['Style'] || '-'}</td>
      <td>{row.data['ABV'] || '-'}%</td>
      <td>${parseFloat(row.data['Price'] || 0).toFixed(2)}</td>
      <td>{row.data['Category'] || '-'}</td>
      <td className="status-cell">{renderStatus(row)}</td>
    </tr>
  );

  const getRowClass = (row) => {
    if (!row.isValid) return 'error-row';
    if (row.hasWarnings) return 'warning-row';
    return 'valid-row';
  };

  const renderStatus = (row) => {
    if (!row.isValid) {
      return (
        <div className="status-errors">
          {row.errors.map((error, i) => (
            <div key={i} className="error-message">✗ {error}</div>
          ))}
        </div>
      );
    }
    if (row.hasWarnings) {
      return (
        <div className="status-warnings">
          {row.warnings.map((warning, i) => (
            <div key={i} className="warning-message">⚠ {warning}</div>
          ))}
        </div>
      );
    }
    return <div className="status-valid">✓ Valid</div>;
  };

  const truncate = (str, maxLength) => {
    if (str.length <= maxLength) return str;
    return str.substring(0, maxLength) + '...';
  };

  return (
    <div className="csv-preview-table-container">
      <table className="csv-preview-table">
        {importType === 'menu' ? renderMenuHeaders() : renderBeerHeaders()}
        <tbody>
          {data.map(row =>
            importType === 'menu' ? renderMenuRow(row) : renderBeerRow(row)
          )}
        </tbody>
      </table>
    </div>
  );
}
