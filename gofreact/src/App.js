import React from 'react';
import './App.css';
import {Typography, Link} from '@material-ui/core'

import Game from './Game/Game';

function App() {
  return (
    <div className="App">
      
      <Typography variant="h4" component="h1" gutterBottom>
        Patrick's Game of Life
      </Typography>
      <Typography variant="h6" component="h7" gutterBottom>
      <Link href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life">Conway's Game of Life Rules</Link>
      </Typography>
      <Game/>
    </div>
  );
}

export default App;
