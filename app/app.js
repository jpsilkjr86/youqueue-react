// principle react dependencies
import React from 'react';
import { render } from 'react-dom';

// imports wrapping router component
import router from './components/router.jsx';

// renders wrapping router component to DOM id "#app"
render(router, document.getElementById("app"));