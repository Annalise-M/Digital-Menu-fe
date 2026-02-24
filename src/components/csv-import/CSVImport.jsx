import React, { useState, useRef } from 'react';
import Papa from 'papaparse';
import { useBulkImportMenus } from '../../hooks/useMenus';
import { useBulkImportBeers } from '../../hooks/useBeers';
import { useMenuCategories } from '../../hooks/useMenuCategories';
import { useBeerCategories } from '../../hooks/useBeerCategories';
import CSVPreviewTable from './CSVPreviewTable';
import {
  validateMenuRow,
  validateBeerRow,
  transformMenuRow,
  transformBeerRow,
  normalizeHeaders
} from '../../utils/csvValidation';
import './csvImport.scss';

export default function CSVImport({ onClose }) {
  const [importType, setImportType] = useState('menu'); // 'menu' or 'beer'
  const [parsedData, setParsedData] = useState([]);
  const [validatedData, setValidatedData] = useState([]);
  const [fileName, setFileName] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const menuMutation = useBulkImportMenus();
  const beerMutation = useBulkImportBeers();
  const { data: menuCategories = [] } = useMenuCategories();
  const { data: beerCategories = [] } = useBeerCategories();

  const categories = importType === 'menu' ? menuCategories : beerCategories;
  const validateRow = importType === 'menu' ? validateMenuRow : validateBeerRow;
  const transformRow = importType === 'menu' ? transformMenuRow : transformBeerRow;

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check file type
    if (!file.name.endsWith('.csv')) {
      alert('Please select a CSV file');
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File must be less than 5MB');
      return;
    }

    setFileName(file.name);
    setIsUploading(true);

    // Parse CSV
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header) => {
        // Normalize headers to handle case variations
        const lower = header.toLowerCase().trim();
        const mapping = {
          'item name': 'Item Name',
          'item': 'Item Name',
          'name': 'Item Name',
          'description': 'Description',
          'detail': 'Description',
          'details': 'Description',
          'price': 'Price',
          'category': 'Category',
          'brewery': 'Brewery',
          'style': 'Style',
          'abv': 'ABV',
          'alcohol': 'ABV'
        };
        return mapping[lower] || header;
      },
      complete: (results) => {
        if (results.errors.length > 0) {
          alert(`CSV parsing errors: ${results.errors.map(e => e.message).join(', ')}`);
          setIsUploading(false);
          return;
        }

        if (results.data.length === 0) {
          alert('CSV file is empty');
          setIsUploading(false);
          return;
        }

        if (results.data.length > 1000) {
          alert('Maximum 1000 items per import');
          setIsUploading(false);
          return;
        }

        // Validate each row
        const validated = results.data.map((row, index) => {
          const validation = validateRow(row, categories);
          return {
            index,
            data: row,
            ...validation
          };
        });

        setParsedData(results.data);
        setValidatedData(validated);
        setIsUploading(false);
      },
      error: (error) => {
        alert(`Failed to parse CSV: ${error.message}`);
        setIsUploading(false);
      }
    });
  };

  // Handle import
  const handleImport = async () => {
    // Only import valid rows
    const validRows = validatedData.filter(row => row.isValid);

    if (validRows.length === 0) {
      alert('No valid rows to import');
      return;
    }

    // Transform rows to API format
    const items = validRows.map(row => transformRow(row.data, categories));

    try {
      const mutation = importType === 'menu' ? menuMutation : beerMutation;
      const result = await mutation.mutateAsync(items);
      alert(`Successfully imported ${result.imported} items!`);
      onClose();
    } catch (error) {
      alert(`Import failed: ${error.error || error.message}`);
    }
  };

  // Download template
  const handleDownloadTemplate = () => {
    const templateFile = importType === 'menu'
      ? '/templates/menu-template.csv'
      : '/templates/beer-template.csv';

    const link = document.createElement('a');
    link.href = templateFile;
    link.download = `${importType}-template.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Reset
  const handleReset = () => {
    setParsedData([]);
    setValidatedData([]);
    setFileName('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const validCount = validatedData.filter(row => row.isValid).length;
  const warningCount = validatedData.filter(row => row.hasWarnings && row.isValid).length;
  const errorCount = validatedData.filter(row => !row.isValid).length;

  return (
    <div className="csv-import-overlay" onClick={onClose}>
      <div className="csv-import-modal" onClick={(e) => e.stopPropagation()}>
        <div className="csv-import-header">
          <h2>Import CSV</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        <div className="csv-import-body">
          {/* Import Type Toggle */}
          <div className="import-type-toggle">
            <button
              className={importType === 'menu' ? 'active' : ''}
              onClick={() => {
                setImportType('menu');
                handleReset();
              }}
            >
              Menu Items
            </button>
            <button
              className={importType === 'beer' ? 'active' : ''}
              onClick={() => {
                setImportType('beer');
                handleReset();
              }}
            >
              Beers
            </button>
          </div>

          {/* Instructions */}
          {validatedData.length === 0 && (
            <div className="import-instructions">
              <h3>How to import:</h3>
              <ol>
                <li>Download the CSV template below</li>
                <li>Fill in your {importType} data (max 1000 items)</li>
                <li>Upload the completed CSV file</li>
                <li>Review the preview and fix any errors</li>
                <li>Click "Import" to add items to your menu</li>
              </ol>
              <button className="download-template-button" onClick={handleDownloadTemplate}>
                📥 Download {importType === 'menu' ? 'Menu' : 'Beer'} Template
              </button>
            </div>
          )}

          {/* File Upload */}
          <div className="file-upload-section">
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              style={{ display: 'none' }}
              id="csv-file-input"
            />
            <label htmlFor="csv-file-input" className="upload-button">
              {isUploading ? '⏳ Parsing CSV...' : '📄 Choose CSV File'}
            </label>
            {fileName && <span className="file-name">{fileName}</span>}
          </div>

          {/* Preview Table */}
          {validatedData.length > 0 && (
            <>
              <div className="import-summary">
                <span className="valid-count">✓ {validCount} valid</span>
                {warningCount > 0 && <span className="warning-count">⚠ {warningCount} warnings</span>}
                {errorCount > 0 && <span className="error-count">✗ {errorCount} errors</span>}
              </div>

              <CSVPreviewTable
                data={validatedData}
                importType={importType}
                categories={categories}
              />

              {/* Action Buttons */}
              <div className="import-actions">
                <button className="reset-button" onClick={handleReset}>
                  Reset
                </button>
                <button
                  className="import-button"
                  onClick={handleImport}
                  disabled={validCount === 0 || menuMutation.isPending || beerMutation.isPending}
                >
                  {menuMutation.isPending || beerMutation.isPending
                    ? '⏳ Importing...'
                    : `Import ${validCount} Items`}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
