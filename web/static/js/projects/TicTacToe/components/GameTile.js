import React from 'react';
import '../TicTacToe.scss';
import { connect }            from 'react-redux';
import {actions as ticTacToeActions} from 'actions/tictactoe';

const columns = {
  0: 'Left',
  1: 'Middle',
  2: 'Right'
};

const classes = {
  'O': 'nought',
  'X': 'cross'
};

const tileMap = {
  'topLeft': 0,
  'topMiddle': 1,
  'topRight': 2,
  'centerLeft': 3,
  'centerMiddle': 4,
  'centerRight': 5,
  'bottomLeft': 6,
  'bottomMiddle': 7,
  'bottomRight': 8
};

const mapStateToProps = (state) => {
  return {
    gameBoard: state.tictactoe.board,
    winner: state.tictactoe.winner,
    playerTurn: state.tictactoe.playerTurn,
    playerSigil: state.tictactoe.playerSigil,
    computerSigil: state.tictactoe.computerSigil
  };
};

class GameTile extends React.Component {
  static propTypes = {
    row: React.PropTypes.string.isRequired,
    column: React.PropTypes.number.isRequired,
    playerMove: React.PropTypes.func.isRequired,
    gameBoard: React.PropTypes.array.isRequired,
    playerTurn: React.PropTypes.bool,
    tileClick: React.PropTypes.func,
    playerSigil: React.PropTypes.string,
    computerSigil: React.PropTypes.string
  }

  constructor (props) {
    super(props);
    this.state = {
      tile: `${this.props.row}${columns[this.props.column]}`
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillReceiveProps (propObj) {
    if (propObj.gameBoard[tileMap[this.state.tile]] === this.props.computerSigil) {
      this.handleComputer();
    }

    if (propObj.winner) {
      if (propObj.winner.result !== 'draw') {
        let index = propObj.winner.winningTiles.indexOf(this.state.tile);
        if (index !== -1) {
          this.handleWinner(propObj.winner.winningDirection);
        }
      } else {
        this.disable();
      }
    }
  }

  handleComputer () {
    const input = this.refs.input;
    input.click();
    input.setAttribute('disabled', 'true');
    const tile = this.refs.tile;
    tile.classList.remove('active');
    setTimeout(() => {
      tile.classList.add(classes[this.props.computerSigil]);
    });
  }

  disable () {
    const input = this.refs.input;
    input.click();
    input.setAttribute('disabled', 'true');
    const tile = this.refs.tile;
    tile.classList.remove('active');
  }

  handleWinner (direction) {
    const tile = this.refs.tile;
    this.disable();
    setTimeout(() => {
      tile.classList.add(direction);
    }, 200);
  }

  handleClick () {
    function clickThis () {
      const input = this.refs.input;
      input.setAttribute('disabled', 'true');
      const tile = this.refs.tile;
      tile.classList.remove('active');
      setTimeout(() => {
        tile.classList.add(classes[this.props.playerSigil]);
      });
      setTimeout(() => {
        this.props.playerMove({move: this.state.tile});
      });
    }
    this.props.tileClick(clickThis.bind(this));
  }

  render () {
    return (
      <div className='game-tile active' ref='tile'>
        <input id={this.state.tile}
          onClick={this.handleClick}
          ref='input'
          type='checkbox' />
        <label htmlFor={this.state.tile} />
      </div>
    );
  }
}

export default connect(mapStateToProps, ticTacToeActions)(GameTile);
