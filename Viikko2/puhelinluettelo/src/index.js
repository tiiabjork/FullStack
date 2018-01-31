import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'

const persons =
      [
        {
          name: 'Arto Hellas',
          number: '040505859845'
        },
        {
          name: 'Tiia Björk',
          number: '8653'
        }
      ]

ReactDOM.render(<App persons={persons}/>, document.getElementById('root'));
