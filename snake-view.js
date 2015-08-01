(function () {
  if (typeof Snake === "undefined") {
    window.Snake = {};
  }

  var View = window.Snake.View = function (board, $el) {
    this.board = board;
    this.bindListeners();
    this.setupBoard();
    this.timeAlive = 0;
    var that = this;
    this.endGame = setInterval(function () {
      that.step();
      that.timeAlive += 1;
    }, 100);
  };

  View.prototype.step = function () {
    this.board.snake.move();
    if (!this.board.snake.alive) { clearInterval(this.endGame) };
    this.renderBoard();
  };

  View.prototype.renderBoard = function() {
    var boardArr = this.board.render();
    var $squares = $(".square");
    $squares.removeClass("snake apple");
    for (var i = 0; i < $squares.length; i++) {
      $square = $($squares[i])
      if (boardArr[i] === "S") { 
        $square.addClass("snake");
      } else if (boardArr[i] === "A") {
        $square.addClass("apple")
      }
    };
  };

  View.prototype.bindListeners = function () {
    var that = this;
    $(document).on("keydown", function (event) {
      that.handleKeyEvent(event);
    });
  };

  View.KEYCODES = {
    38: "N",
    37: "W",
    40: "S",
    39: "E"
  };

  View.prototype.handleKeyEvent = function (event) {
    var dir = event.keyCode;
    if (View.KEYCODES[dir]) {
      this.board.snake.turn(View.KEYCODES[dir]);
    };
  };

  View.prototype.setupBoard = function () {
    for (var i = 0; i < 10; i++) {
      var $row = $("<div></div>");
      $row.addClass("row group");
      $el.append($row);
      for (var j = 0; j < 10; j++) {
        var $square = $("<div></div>");
        $square.addClass("square");
        $row.append($square);
      }
    }
  };
})();