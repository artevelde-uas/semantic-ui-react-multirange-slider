import React from 'react';
import { createRoot } from 'react-dom/client';

import 'semantic-ui-css/semantic.css';
import 'semantic-ui-react-multirange-slider/styles.css';

import App from './App';

import './index.css';


const root = createRoot(document.getElementById('root'));

root.render(React.createElement(App));
