import React from 'react';
import { createRoot } from 'react-dom/client';
import App3 from './components/app/App3';
import './styles/tailwind.css';
import './components/app/style.scss';

const root = createRoot(document.getElementById('root'));
root.render(
  <div>
    <App3 />
  </div>
);
