import React from 'react';
import CreateMenu from './CreateMenu';
import CreateBeer from './CreateBeer';
import './allForms.scss';

export default function AllForms() {
  return (
    <section>
      <div className="container">
        <div className="form-split">
          <div>
            <CreateMenu />
          </div>
          <div>
            <CreateBeer />
          </div>
        </div>
      </div>
    </section>
  )
};
