const minimax = (function () {
  const winningPositions = [
    '012', '036', '048', '147', '258', '345', '678', '246'
  ];

  const winningDirections = {
    '012': 'final-180',
    '345': 'final-180',
    '678': 'final-180',
    '036': 'final-90',
    '147': 'final-90',
    '258': 'final-90',
    '048': 'final-45',
    '246': 'final-135'
  };

  const arrayToBoard = {
    0: 'topLeft',
    1: 'topMiddle',
    2: 'topRight',
    3: 'centerLeft',
    4: 'centerMiddle',
    5: 'centerRight',
    6: 'bottomLeft',
    7: 'bottomMiddle',
    8: 'bottomRight'
  };

  const boardToArray = Object.keys(arrayToBoard).reduce((acc, key) => {
    acc[arrayToBoard[key]] = key;
    return acc;
  }, {});

  function all (arr, pred) {
    let hasAll = true;
    arr.forEach(elem => {
      if (!pred(elem)) {
        hasAll = false;
      }
    });
    return hasAll;
  }

  const mini =  {};
  mini.choice = [];

  mini.diff = function (oldBoard, newBoard) {
    return newBoard.reduce((acc, curr, index) => {
      if (curr !== oldBoard[index]) {
        /*eslint-disable*/
        acc = index;
        /*eslint-enable*/
      }
      return acc;
    }, -1);
  };

  mini.terminalState = function (board) {
    const noOpenSquares = board.indexOf(0) === -1;
    const winningPosition = winningPositions.reduce((acc, curr) => {
      const positions = curr.split('').map(elem => ({position: board[elem], index: elem}));
      acc.push(positions);
      return acc;
    }, []).filter(elem => {
      return all(elem, item => item.position === 'O')
        || all(elem, item => item.position === 'X');
    });

    if (winningPosition.length) {
      const winner = winningPosition.pop();
      const winningTiles = winner.map(elem => arrayToBoard[elem.index]);
      const winningDirection = winningDirections[winner.map(elem => elem.index).join('')];
      return {
        endState: true,
        result: winner[0].position + '-won',
        winningTiles: winningTiles,
        winningDirection: winningDirection
      };
    }

    if (noOpenSquares) {
      return {endState: true, result: 'draw'};
    }

    return false;
  };

  mini.getMoves = function (board, player) {
    let children = [];
    board.map((elem, index) => ({elem, index}))
      .filter(elem => elem.elem === 0)
      .forEach(elem => {
        const newBoard = board.slice();
        newBoard[elem.index] = player;
        children.push(newBoard);
      });
    return children;
  };

  mini.score = function (board, depth) {
    const result = mini.terminalState(board);
    if (result) {
      if (result.result === 'X-won') {
        return -10 + depth;
      } else if (result.result === 'O-won') {
        return 10 - depth;
      } else {
        return 0;
      }
    }
    return 0 + depth;
  };

  mini.convertBoardToArray = function (board) {
    return boardToArray(board);
  };

  mini.minimax = function (board, depth, player, alpha = -Infinity, beta = Infinity) {
    let result = mini.terminalState(board);
    if (result) {
      return mini.score(board, depth);
    }

    let nextPlayer = player === 'O' ? 'X' : 'O';
    let children = mini.getMoves(board, player);
    let best;
    let bestIndex;

    if (player === 'O') {
      best = -Infinity;
      for (let i = 0; i < children.length; i++) {
        let possible = mini.minimax(children[i],
                                    depth + 1,
                                    nextPlayer,
                                    alpha,
                                    beta);
        if (possible > best) {
          best = possible;
          bestIndex = i;
        }
        /*eslint-disable*/
        alpha = Math.max(alpha, best);
        /*eslint-enable*/
        if (beta <= alpha) {
          break;
        }
      }
    } else {
      best = Infinity;
      for (let i = 0; i < children.length; i++) {
        let possible = mini.minimax(children[i],
                                    depth + 1,
                                    nextPlayer,
                                    alpha,
                                    beta);
        if (possible < best) {
          best = possible;
          bestIndex = i;
        }
        /*eslint-disable*/
        beta = Math.min(beta, best);
        /*eslint-enable*/
        if (beta <= alpha) {
          break;
        }
      }
    }
    mini.choice = children[bestIndex];
    return best;
  };


  return mini;
})();

export default minimax;
