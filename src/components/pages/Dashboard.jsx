import React from 'react';
import { Provider } from 'react-redux';
import store from '../../store';
// import CreateMenu from '../create/CreateMenu';
import MenuList from '../list/MenuList';
import AuthProvider from '../auth/AuthProvider';
import CreateForms from '../create/CreateForms'
import BeerList from '../list/BeerList';
// import createBeerCard
// import beerList

// This is where I'm gonna want to set the react-redux state for the store, because only admin access will be able to CRUD the menu's & beer's api { instead of App.js like in the example }
export default function Dashboard() {
  return (
    <Provider store={store}>
      <AuthProvider>
        {/* <CreateMenu /> */}
        <CreateForms />
        <MenuList />
        <BeerList />
      </AuthProvider>
      {/* 
      <CreateBeer />
      <BeerList />
       */}
    </Provider>
  )
}


