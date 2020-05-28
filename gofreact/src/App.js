import React from 'react';
import './App.css';
import {Typography, Link} from '@material-ui/core'

import Game from './Game/Game';

function App() {
  return (
    <div className="App">
      <Link href="https://en.wikipedia.org/wiki/Cellular_automaton"></Link>
      <Typography variant="h4" component="h1" gutterBottom>
        Patrick's Game of Life
      </Typography>
      <Game/>
    </div>
  );
}

export default App;
