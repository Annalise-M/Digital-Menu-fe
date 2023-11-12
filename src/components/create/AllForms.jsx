import React from 'react';
import CreateMenu from './CreateMenu';
import CreateBeer from './CreateBeer';
// import styles from './allForms.scss';

export default function AllForms() {
  return (
    <section>
      <div className="container" style={styles}>
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
