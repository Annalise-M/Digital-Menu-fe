// import React, { useEffect, useState } from 'react';
// import { Switch, Route } from 'react-router-dom';
// import { gsap } from 'gsap';
// import AuthProvider from '../auth/AuthProvider';
// import Home from '../home/Home';
// import Signup from '../auth/Signup';
// import Login from '../auth/Login';
// import PrivateRoute from '../auth/PrivateRoute';
// import Dashboard from '../dashboard/dashboard';
// // import styles from './App.css';
// import { VscAccount } from 'react-icons/vsc';


// // 1. import ionicons 
// // 2. anchor toggle to icon
// // 3. set design style to icon

// export function Sidebar() {
//   const { menuState, setMenuState } = React.useState();

//   const container = React.createRef();

//   useEffect(() => {
//     gsap.fromTo('.container', {
//       duration: 0,
//       x: '100%'
//     }, {
//       delay: 800,
//       opacity: 1,
//       duration: 1,
//       x: '0%',
//       stagger: {
//         amount: 0.5
//       }
//     });
//   }, []);

//   return <>
//     <section style={{ background: 'lightblue', width: '100%', height: '100%' }}>
//       <VscAccount 
//         type={`{menuState}`}
//         className="sidebar-toggle"
//         onClick={this.toggle}
//       />
//       <div className="container" ref={container}>
//         <AuthProvider>
//           <Switch>
//             <Route exact path="/" component={Home} />
//             <Route exact path="/signup" component={Signup} />
//             <Route exact path="/login" component={Login} />
//             <PrivateRoute exact path="/dashboard" component={Dashboard} />
//           </Switch>
//         </AuthProvider>
//       </div>
//     </section>
//   </>
// }
