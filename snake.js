(function () {
  if (typeof Snake === "undefined") {
    window.Snake = {};
  }

  var Snake = window.Snake.Snake = function (dir, board) {
    this.dir = Snake.DIRECTIONS[dir];
    this.board = board;
    this.segments = [[5,5]];
    this.alive = true;
    this.inTurn = false;
  };

  Snake.DIRECTIONS = {"W": [0, -1], "S": [1, 0], "E": [0, 1], "N": [-1, 0]};

  Snake.prototype.move = function () {
    this.inTurn = false;
    var nextPos = Snake.plus(this.segments[0], this.dir);
    if (nextPos[0] < 0 || nextPos[0] > 9 || nextPos[1] < 0 || 
        nextPos[1] > 9 || this.occupied(nextPos)) {
      this.alive = false;
    } else {
      if (Snake.equals(nextPos, this.board.appleSpot)) {
        this.board.newApple();
      } else {
        this.segments.pop();
      }
      this.segments.unshift(nextPos);
    }
  };

  Snake.prototype.turn = function (newDir) {
    if (!this.inTurn) {
      var dirVec = Snake.DIRECTIONS[newDir];
      if (!Snake.isOpposite(this.dir, dirVec)) {
        this.dir = dirVec;
      }
    }
    this.inTurn = true;
  };

  Snake.prototype.occupied = function (pos) {
    return this.segments.some(function (el) {
      return Snake.equals(pos, el);
    });
  };

  Snake.plus = function (arr1, arr2) {
    var x = arr1[0] + arr2[0];
    var y = arr1[1] + arr2[1];
    return [x, y];
  };

  Snake.equals = function (arr1, arr2) {
    return (arr1[0] === arr2[0] && arr1[1] === arr2[1]);
  };

  Snake.isOpposite = function (arr1, arr2) {
    var x = arr2[0] * -1;
    var y = arr2[1] * -1;
    return Snake.equals(arr1, [x, y]);
  };

  var Board = window.Snake.Board = function () {
    this.grid = [];
    for (var i = 0; i < 10; i++) {
      var row = [];
      for (var j = 0; j < 10; j++) {
        row.push([]);
      }
      this.grid.push(row);
    }
    this.snake = new Snake("N", this);
    this.newApple();
  };

  Board.prototype.reset = function () {
    this.snake = new Snake("N", this);
    this.newApple();
  };

  Board.prototype.newApple = function() {
    var pos = [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)]
    if (!this.snake.occupied(pos)) {
      this.appleSpot = pos;
    } else {
      this.newApple();
    }
  };

  Board.prototype.render = function () {
    var renderArr = [];
    for (var i = 0; i < this.grid.length; i++) {
      for (var j = 0; j < this.grid[i].length; j++) {
        if (this.snake.occupied([i,j])){
          renderArr.push("S");
        } else if (Snake.equals(this.appleSpot, [i, j])) {
          renderArr.push("A");
        } else {
          renderArr.push(".");
        }
      }
    }
    return renderArr;
  };
})();