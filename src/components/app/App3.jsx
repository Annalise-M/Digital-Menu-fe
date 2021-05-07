import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from '../pages/Header';
import './style.scss';

const App3 = () => {
  const [menuState, setMenuState] = useState(false);
  return (
    <div className="app container">
      <BrowserRouter>
        {/* holding burgerMenu animation state here */}
        <Header menuState={menuState} setMenuState={setMenuState} />
      </BrowserRouter>
    </div>
  );
};

export default App3;
