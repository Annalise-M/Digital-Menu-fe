import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from '../pages/Home';
import Signup from '../auth/Signup';
import AuthProvider from '../auth/AuthProvider';
import Login from '../auth/Login';
import Dashboard from '../pages/Dashboard';
import PrivateRoute from '../auth/PrivateRoute';

import Header from '../pages/Header';

import './style.scss';

const App3 = () => {
  const [menuState, setMenuState] = useState(false);

  return (
    <BrowserRouter>
      <div className="app container">
        {/* holding burgerMenu animation state here */}
        <Header menuState={menuState} setMenuState={setMenuState} />
        
   
        <Switch>
          <AuthProvider>
            <Route exact path="/" component={Home} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/login" component={Login} />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
          </AuthProvider>
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App3;

// export default class App3 extends Component {
//   render() {
//     return (
//       <div>
//         <Sidebar />
//       </div>
//     );
//   }
// }
