import React from 'react';
import ReactDOM from 'react-dom';
import ShoppingList from './demo';

console.log( ALLSITES , "All sites");
console.log( APIURL ,"api url ");

ReactDOM.render(
  <ShoppingList api = { APIURL } sites ={ ALLSITES.split(",")}></ShoppingList>,
  document.getElementById('root')
);
