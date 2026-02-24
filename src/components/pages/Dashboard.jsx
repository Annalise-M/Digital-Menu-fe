import React, { useState } from 'react';
import MenuList from '../list/MenuList';
import BeerList from '../list/BeerList';
import CombinedForm from '../form-creation/CombinedForm';
import CSVImport from '../csv-import/CSVImport';
import './dashboard.scss';

export default function Dashboard() {
  const [showImportModal, setShowImportModal] = useState(false);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Menu Dashboard</h1>
        <button
          className="csv-import-button"
          onClick={() => setShowImportModal(true)}
          title="Import items from CSV file"
        >
          📥 Import CSV
        </button>
      </div>

      <CombinedForm />
      <MenuList />
      <BeerList />

      {showImportModal && (
        <CSVImport onClose={() => setShowImportModal(false)} />
      )}
    </div>
  );
}
