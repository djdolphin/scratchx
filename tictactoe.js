(function (ext) {
  var canvas = document.createElement('canvas');
  canvas.width = 480;
  canvas.height = 360;
  canvas.style.display = 'none';
  canvas.style.position = 'fixed';
  canvas.style.top = '72px';
  canvas.style.left = '6px';
  document.body.appendChild(canvas);
  var ctx = canvas.getContext('2d');

  var turn;
  var winner;
  var marks;

  function reset () {
    turn = 'red';
    winner = null;
    marks = [];
    for (var i = 0; i < 9; i++) {
      marks.push(i);
    }
  }
  reset();

  function logic () {
  	if (marks[0] === marks[1] && marks[0] === marks[2]) {
    	winner = marks[0];
    }
   	if (marks[3] === marks[4] && marks[3] === marks[5]) {
    	winner = marks[3];
    }
    if (marks[6] === marks[7] && marks[6] === marks[8]) {
    	winner = marks[6];
    }
    if (marks[0] === marks[3] && marks[0] === marks[6]) {
    	winner = marks[3];
    }
    if (marks[1] === marks[4] && marks[1] === marks[7]) {
    	winner = marks[1];
    }
    if (marks[2] === marks[5] && marks[2] === marks[8]) {
    	winner = marks[2];
    }
   	if (marks[0] === marks[4] && marks[0] === marks[8]) {
    	winner = marks[0];
    }
    if (marks[2] === marks[4] && marks[2] === marks[6]) {
    	winner = marks[2];
    }
    if (!winner) {
      for (var i = 0; i < 9; i++) {
        if (typeof marks[i] === 'number') return;
      }
      winner = 'nobody';
    }
  }

  function render () {
  	ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, 480, 360);

  	ctx.font = '18px Arial';
    ctx.textAlign = 'start';
    ctx.textBaseline = 'top';
  	if (!winner) {
    	ctx.fillStyle = turn;
      ctx.fillText(
      	(turn === 'red' ? 'Red' : 'Blue') + ' is on turn',
        10, 10
      );
    } else {
    	if (winner === 'nobody') {
      	ctx.fillStyle = 'black';
        ctx.fillText("It's a draw!", 10, 10);
      } else {
      	ctx.fillStyle = winner;
        ctx.fillText(
          (winner === 'red' ? 'Red' : 'Blue') + ' wins!',
          10, 10
      	);
      }
    }

  	ctx.fillStyle = 'black';
    ctx.fillRect(185, 60, 10, 300);
    ctx.fillRect(285, 60, 10, 300);
    ctx.fillRect(90, 155, 300, 10);
    ctx.fillRect(90, 255, 300, 10);

  	var x, y, mark;
    ctx.font = '64px Arial';
   	ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    y = 110;
  	for (var i = 0; i < 3; i++) {
    	x = 140;
    	for (var j = 0; j < 3; j++) {
      	mark = marks[i * 3 + j];
        if (typeof mark === 'string') {
        	ctx.fillStyle = mark;
          if (mark === 'red') {
          	ctx.fillText('X', x, y);
          } else {
          	ctx.fillText('O', x, y);
          }
        }
        x += 100;
      }
      y += 100;
    }

  	requestAnimationFrame(render);
  }
  requestAnimationFrame(render);

  canvas.addEventListener('click', function (e) {
  	if (winner) return;

  	var rect = canvas.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;
    var square = null;

  	if (x > 90 && x < 390 && y > 60) {
      if (x < 190) {
        square = 0;
      } else if (x < 290) {
      	square = 1;
      } else if (x < 390) {
      	square = 2;
      }
    	if (y >= 160) {
  			square += 3;
      }
      if (y >= 260) {
  			square += 3;
      }
    }

  	if (typeof marks[square] !== 'string') {
    	marks[square] = turn;
      if (turn === 'red') {
      	turn = 'blue';
      } else {
      	turn = 'red';
      }
      logic();
    }
  });

  ext.shutdown = function () {};

  ext._getStatus = function () {
      return {status: 2, msg: 'Ready'};
  };

  ext.play = function () {
    canvas.style.display = 'block';
    reset();
  }

  var descriptor = {
      blocks: [
          [' ', 'play tic tac toe', 'play']
      ]
  };

  ScratchExtensions.register('Tic tac toe', descriptor, ext);
})({});
