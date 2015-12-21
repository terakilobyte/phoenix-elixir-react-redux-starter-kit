import React from 'react';
import './TicTacToe.scss';
import { connect }            from 'react-redux';
import { actions as ticTacToeActions } from 'actions/tictactoe';

import GameBoard from './components/GameBoard';
import { throttle } from 'lodash';

const mapStateToProps = (state) => {
  return {
    playerTurn: state.tictactoe.playerTurn,
    winner: state.tictactoe.winner,
    playerSigil: state.tictactoe.playerSigil,
    computerSigil: state.tictactoe.computerSigil
  };
};

class TicTacToe extends React.Component {
  static propTypes = {
    playerTurn: React.PropTypes.bool,
    computerMove: React.PropTypes.func,
    winner: React.PropTypes.bool,
    resetGame: React.PropTypes.func,
    playerMove: React.PropTypes.func,
    playerSigil: React.PropTypes.string,
    init: React.PropTypes.func

  }

  constructor (props) {
    super(props);
    this.state = {
      gameKey: Date.now(),
      playerSigil: this.props.playerSigil
    };
    this.handleReset = this.handleReset.bind(this);
    this.firstReset = this.firstReset.bind(this);
    this.handleUserClickThrottled = throttle(this.handleUserClick.bind(this), 5000);
    this.throttledComputerMove = throttle(this.computerMove, 5000);
  }

  componentWillReceiveProps (propObj) {
    if (!propObj.winner) {
      if (!propObj.playerTurn) {
        setTimeout(() => {
          this.throttledComputerMove();
          this.handleUserClickThrottled.cancel();
        }, 200);
      }
    }
    // nothing else, the player can't win
  }

  computerMove () {
    this.props.computerMove();
  }

  handleUserClick (fun) {
    if (!this.props.winner) {
      fun();
      this.throttledComputerMove.cancel();
    }
  }

  firstReset () {
    this.props.resetGame();
    this.setState({playerSigil: ''});
  }

  handleReset () {
    this.handleUserClickThrottled.cancel();
    this.throttledComputerMove.cancel();
    this.props.resetGame();
    this.props.init({playerSigil: arguments[0]});
    this.setState({gameKey: Date.now(), playerSigil: arguments[0]});
    if (arguments[0] === 'O') {
      setTimeout(() => {
        this.throttledComputerMove();
      }, 200);
    }
  }

  render () {
    let notifier;

    if (this.props.winner.result) {
      const message = this.props.winner.result === 'draw'
              ? 'IT\'S A ' + this.props.winner.result.toUpperCase()
              : this.props.winner.result.toUpperCase().split(/-/).join(' ');
      notifier = (
        <div className='text-center'>
          <h1 className='text-center'>{message}</h1>
          <span className='reset'
                onClick={this.firstReset}>
            Reset
          </span>
        </div>
      );
    }

    if (!this.state.playerSigil) {
      return (
        <div className='text-center'>
          <h1 className='text-center'>Make your choice...</h1>
          <span className='reset'
                onClick={this.handleReset.bind(this, 'X')}>
            Play as X
          </span>
          <span>&nbsp;&nbsp;</span>
          <span className='reset'
                onClick={this.handleReset.bind(this, 'O')}>
            Play as O
          </span>
        </div>
      );
    } else {
      return (
        <div key={this.state.gameKey}>
          <h1 className='text-center'>Tic-Tac-Toe</h1>
          <h3 className='text-center'>You can't win</h3>
          <hr />
          <GameBoard key={this.state.gameKey}
                     tileClick={this.handleUserClickThrottled}  />
          <hr />
          {notifier}
        </div>
      );
    }
  }
}

export default connect(mapStateToProps, ticTacToeActions)(TicTacToe);
