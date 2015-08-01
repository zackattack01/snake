(function () {
  if (typeof Snake === "undefined") {
    window.Snake = {};
  }

  var View = window.Snake.View = function (board, $el) {
    this.board = board;
    this.bindListeners();
    this.setupBoard();
    this.promptNextGame(false);
  };

  View.prototype.step = function () {
    this.board.snake.move();
    if (!this.board.snake.alive) { 
      clearInterval(this.endGame);
      this.promptNextGame(true);
    }
    this.renderBoard();
  };

  View.prototype.startGameLoop = function () {
    var that = this;
    this.endGame = setInterval(function () {
      that.step();
    }, 100);
  };

  View.prototype.promptNextGame = function (gameOver) {
    if (gameOver) {
      var text = "GAME OVER<br><small>PRESS ENTER TO PLAY AGAIN</small>";
    } else {
      var text = "<small>YOUR'E GOING &#8593<br>>ARROW KEYS TO REDIRECT<br>>ENTER TO BEGIN</small>"
    }
    var $message = $("<div class='popup'><h1>" + text + "</h1></div>")
    $('body').append($message);
  };

  View.prototype.handleEnter = function (e) {
    if (e.keyCode === 13) {
      $('.popup').remove();
      this.board.reset();
      this.startGameLoop();
    }
  };

  View.prototype.renderBoard = function () {
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
    $(document).on("keydown", this.handleKeyEvent.bind(this))
    $(document).on('keydown', this.handleEnter.bind(this));
  };

  View.KEYCODES = {
    38: "N",
    37: "W",
    40: "S",
    39: "E"
  };

  View.prototype.handleKeyEvent = function (e) {
    var dir = e.keyCode;
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