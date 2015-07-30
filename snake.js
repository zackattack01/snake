(function () {
  if (typeof Snake === "undefined") {
    window.Snake = {};
  }

  var Snake = window.Snake.Snake = function (dir, board) {
    this.dir = Snake.DIRECTIONS[dir];
    this.board = board;
    this.segments = [[5,5],[5,6],[5,7]];
  };

  Snake.DIRECTIONS = {"W": [0, -1], "S": [1, 0], "E": [0, 1], "N": [-1, 0]};

  Snake.prototype.move = function () {
    var nextPos = Snake.plus(this.segments[0], this.dir);
    if (!this.board.appleSpot(nextPos)) {
      this.segments.unshift(nextPos);
      this.segments.pop();
    } else {
      this.board.removeApple(nextPos);
      this.segments.unshift(nextPos);
    }
  };

  Snake.prototype.turn = function (newDir) {
    var dirVec = Snake.DIRECTIONS[newDir];
    if (!Snake.isOpposite(this.dir, dirVec)) {
      this.dir = dirVec;
    }
  };

  Snake.prototype.occupied = function (pos) {
    if (this.segments.some(function (el) {
      return Snake.equals(pos, el);
    })) {
      return true;
    } else {
      return false;
    }
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
    this.snake = new Snake("N", this);
    this.grid = [];
    this.apples = [];
    for (var i = 0; i < 10; i++) {
      var row = [];
      for (var j = 0; j < 10; j++) {
        row.push([]);
      }
      this.grid.push(row);
    }
  };

  Board.prototype.appleSpot = function(pos) {
    if (this.apples.some(function (el) {
      return Snake.equals(pos, el);
    })) {
      return true;
    } else {
      return false;
    }
  };

  Board.prototype.removeApple = function (pos) {
    for (var i = 0; i < this.apples.length; i++) {
      if (Snake.equals(pos, this.apples[i])) {
        this.apples.splice(i, 1);
      };
    };
  }

  Board.prototype.addApple = function() {
    var pos = [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)]
    this.apples.push(pos)
  };

  Board.prototype.render = function () {
    var renderArr = [];
    for (var i = 0; i < this.grid.length; i++) {
      for (var j = 0; j < this.grid[i].length; j++) {
        if (this.snake.occupied([i,j])){
          renderArr.push("S");
        } else if (this.appleSpot([i, j])) {
          renderArr.push("A");
        } else {
          renderArr.push(".");
        }
      }
    }
    return renderArr;
  };
})();
