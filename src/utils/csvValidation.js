// Normalize header names to handle case-insensitive and alternate naming
const normalizeHeader = (header) => {
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
};

// Validate a single menu row
export const validateMenuRow = (row, categories = []) => {
  const errors = [];
  const warnings = [];

  // Required: Item Name
  if (!row['Item Name'] || row['Item Name'].trim().length === 0) {
    errors.push('Item name is required');
  } else if (row['Item Name'].length > 100) {
    errors.push('Item name max 100 characters');
  }

  // Optional: Description
  if (row['Description'] && row['Description'].length > 500) {
    errors.push('Description max 500 characters');
  }

  // Required: Price
  if (!row['Price']) {
    errors.push('Price is required');
  } else {
    const price = parseFloat(row['Price']);
    if (isNaN(price)) {
      errors.push('Price must be a valid number');
    } else if (price <= 0) {
      errors.push('Price must be positive');
    }
  }

  // Optional: Category
  if (row['Category']) {
    const categoryName = row['Category'].trim();
    const categoryExists = categories.some(
      cat => cat.name.toLowerCase() === categoryName.toLowerCase()
    );
    if (!categoryExists && categoryName.toLowerCase() !== 'uncategorized') {
      warnings.push(`Category "${categoryName}" not found - will use Uncategorized`);
    }
  }

  return {
    isValid: errors.length === 0,
    hasWarnings: warnings.length > 0,
    errors,
    warnings
  };
};

// Validate a single beer row
export const validateBeerRow = (row, categories = []) => {
  const errors = [];
  const warnings = [];

  // Required: Brewery
  if (!row['Brewery'] || row['Brewery'].trim().length === 0) {
    errors.push('Brewery name is required');
  } else if (row['Brewery'].length > 100) {
    errors.push('Brewery name max 100 characters');
  }

  // Required: Style
  if (!row['Style'] || row['Style'].trim().length === 0) {
    errors.push('Beer style is required');
  } else if (row['Style'].length > 100) {
    errors.push('Beer style max 100 characters');
  }

  // Required: ABV
  if (!row['ABV']) {
    errors.push('ABV is required');
  } else {
    const abv = parseFloat(row['ABV']);
    if (isNaN(abv)) {
      errors.push('ABV must be a valid number');
    } else if (abv <= 0) {
      errors.push('ABV must be positive');
    }
  }

  // Required: Price
  if (!row['Price']) {
    errors.push('Price is required');
  } else {
    const price = parseFloat(row['Price']);
    if (isNaN(price)) {
      errors.push('Price must be a valid number');
    } else if (price <= 0) {
      errors.push('Price must be positive');
    }
  }

  // Optional: Category
  if (row['Category']) {
    const categoryName = row['Category'].trim();
    const categoryExists = categories.some(
      cat => cat.name.toLowerCase() === categoryName.toLowerCase()
    );
    if (!categoryExists && categoryName.toLowerCase() !== 'uncategorized') {
      warnings.push(`Category "${categoryName}" not found - will use Uncategorized`);
    }
  }

  return {
    isValid: errors.length === 0,
    hasWarnings: warnings.length > 0,
    errors,
    warnings
  };
};

// Transform CSV row to API format for menu items
export const transformMenuRow = (row, categories = []) => {
  const categoryName = row['Category']?.trim();
  let categoryId = null;

  if (categoryName) {
    const category = categories.find(
      cat => cat.name.toLowerCase() === categoryName.toLowerCase()
    );
    categoryId = category ? parseInt(category.id) : null;
  }

  return {
    item: row['Item Name']?.trim() || '',
    detail: row['Description']?.trim() || null,
    price: parseFloat(row['Price']) || 0,
    categoryId,
    available: true
  };
};

// Transform CSV row to API format for beer items
export const transformBeerRow = (row, categories = []) => {
  const categoryName = row['Category']?.trim();
  let categoryId = null;

  if (categoryName) {
    const category = categories.find(
      cat => cat.name.toLowerCase() === categoryName.toLowerCase()
    );
    categoryId = category ? parseInt(category.id) : null;
  }

  return {
    brewery: row['Brewery']?.trim() || '',
    style: row['Style']?.trim() || '',
    abv: parseFloat(row['ABV']) || 0,
    price: parseFloat(row['Price']) || 0,
    categoryId,
    available: true
  };
};

// Normalize CSV headers
export const normalizeHeaders = (headers) => {
  return headers.map(normalizeHeader);
};
