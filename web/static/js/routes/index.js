import React                 from 'react';
import { Route, IndexRoute } from 'react-router';
import CoreLayout            from 'layouts/CoreLayout';
import HomeView              from 'views/HomeView';
import PlaygroundView        from 'views/PlaygroundView';
import TicTacToe             from 'projects/TicTacToe/TicTacToe';

export default (
  <Route        component={CoreLayout} path='/'>
    <IndexRoute component={HomeView} />
    <Route      component={PlaygroundView} path='/playground' />
    <Route component={TicTacToe} path='/tictactoe' />
  </Route>
);
