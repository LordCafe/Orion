import React from 'react';
import ReactDOM from 'react-dom';
import ShoppingList from './demo';

console.log( typeof APIURL , "demo");

ReactDOM.render(
  <ShoppingList api = { APIURL }></ShoppingList>,
  document.getElementById('root')
);
