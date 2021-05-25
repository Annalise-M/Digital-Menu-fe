import React from 'react';
// import CreateMenu from '../create/CreateMenu';
import CreateBeer from '../create/CreateBeer';
import styles from './createForms.scss';

export default function CreateForms() {
  return (
    <section>
      <div className="container" style={styles}>
        <div className="menu-split">
          <div>
            {/* <CreateMenu /> */}
          </div>
          <div>
            <CreateBeer />
          </div>
        </div>
      </div>
    </section>
  )
}
