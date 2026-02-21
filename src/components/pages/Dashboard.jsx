import React from 'react';
import MenuList from '../list/MenuList';
import BeerList from '../list/BeerList';
import CombinedForm from '../form-creation/CombinedForm';

export default function Dashboard() {
  return (
    <div className="dashboard-container">
      <CombinedForm />
      <MenuList />
      <BeerList />
    </div>
  );
}
