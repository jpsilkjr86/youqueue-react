// imports react component classes
import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

// import YouQueue parent component
import YouQueue from './YouQueue.jsx';

// export directly as an element rather than a class in order to render properly.
// wrap everything in Router to take advantage of react-routing.
module.exports = (
  <Router>
    <YouQueue/>    
  </Router>
);