import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Routing from './Components/Routing';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div className='h-100'>
      <Routing />
    </div>  
  </React.StrictMode>
);
