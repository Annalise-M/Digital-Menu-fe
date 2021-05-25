import React from 'react';
import { Provider } from 'react-redux';
import store from '../../store';
import CreateMenu from '../create/CreateMenu';
import MenuList from '../list/MenuList';
import AuthProvider from '../auth/AuthProvider';
// import createBeerCard
// import beerList

// This is where I'm gonna want to set the react-redux state for the store, because only admin access will be able to CRUD the menu's & beer's api { instead of App.js like in the example }
export default function Dashboard() {
  // state = {
  //   token: localStorage.getItem('TOKEN'),
  // }

  // handleToken = (token) => {
  //   this.setState({ token: token })
  //   localStorage.setItem('TOKEN', token)
  // }

  // clearToken = () => {
  //   this.setState({ token: '' })
  //   localStorage.setItem('TOKEN', '')
  // }
  

  return (
    <Provider store={store}>
       <AuthProvider>

      <CreateMenu />
      <MenuList />
       </AuthProvider>
      {/* 
      <CreateBeer />
      <BeerList />
       */}
    </Provider>
  )
}

// const Dashboard = () => (
//   <h1>Dashboard. This is private. Admin access only</h1>
// );


