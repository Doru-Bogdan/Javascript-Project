
var drawModule = (function () { 

  var bodySnake = function(x, y) {
        ctx.fillStyle = 'green';
        ctx.fillRect(x*snakeSize, y*snakeSize, snakeSize, snakeSize);
        ctx.strokeStyle = 'darkgreen';
        ctx.strokeRect(x*snakeSize, y*snakeSize, snakeSize, snakeSize);
  };

  var pizza = function(x, y) {
        ctx.fillStyle = 'yellow';
        ctx.fillRect(x*snakeSize, y*snakeSize, snakeSize, snakeSize);
        ctx.fillStyle = 'red';
        ctx.fillRect(x*snakeSize+1, y*snakeSize+1, snakeSize-2, snakeSize-2);
  };

  var scoreText = function() {
        var score_text = "Score: " + score;
        ctx.fillStyle = 'blue';
        ctx.fillText(score_text, 145, h-5);
  };

  var highScoreText = function() {
      var score_text = "High Score: " + highScore;
      ctx.fillStyle = 'blue';
      ctx.fillText(score_text, w-230, h-5);
  };

  var drawSnake = function() {
      var length = 4;
      snake = [];
      for (var i = length-1; i>=0; i--) {
          snake.push({x:i, y:0});
      }  
  };
    
  var paint = function(){
      ctx.fillStyle = 'lightgrey';
      ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = 'black';
      ctx.strokeRect(0, 0, w, h);

      btn.setAttribute('disabled', true);

      var snakeX = snake[0].x;
      var snakeY = snake[0].y;

      if (direction === 'right') {
        snakeX++; }
      else if (direction === 'left') {
        snakeX--; }
      else if (direction === 'up') {
        snakeY--; }
      else if(direction === 'down') {
        snakeY++; }

      if (snakeX === -1 || snakeX === w/snakeSize || snakeY === -1 || snakeY === h/snakeSize || checkCollision(snakeX, snakeY, snake)) {
          //restart game
          btn.removeAttribute('disabled', true);

          ctx.clearRect(0,0,w,h);
          gameloop = clearInterval(gameloop);
          score = 0;
          return;          
        }
        
        if(snakeX === food.x && snakeY === food.y) {
          var tail = {x: snakeX, y: snakeY}; //Create a new head instead of moving the tail
          score ++;
          if (highScore < score) {
              highScore = score;
              localStorage.setItem('HighScore', score.toString());
              console.log(highScore);
          }

          createFood(); //Create new food
        } else {
          var tail = snake.pop(); //pops out the last cell
          tail.x = snakeX; 
          tail.y = snakeY;
        }
        //The snake can now eat the food.
        snake.unshift(tail); //puts back the tail as the first cell

        for(var i = 0; i < snake.length; i++) {
          bodySnake(snake[i].x, snake[i].y);
        } 
        
        pizza(food.x, food.y); 
        scoreText();
        highScoreText();
  };

  var createFood = function() {
      food = {
        x: Math.floor((Math.random() * 30) + 1),
        y: Math.floor((Math.random() * 30) + 1)
      };

      for (var i=0; i>snake.length; i++) {
        var snakeX = snake[i].x;
        var snakeY = snake[i].y;
      
        if (food.x===snakeX && food.y === snakeY || food.y === snakeY && food.x===snakeX) {
          food.x = Math.floor((Math.random() * 30) + 1);
          food.y = Math.floor((Math.random() * 30) + 1);
        }
      }
  };

  var checkCollision = function(x, y, array) {
      for(var i = 0; i < array.length; i++) {
          if (array[i].x === x && array[i].y === y)
              return true;
      }
      return false;
  };

  var init = function(){
      var audio = new Audio("audio/audio.mp3");
      audio.play();

      let readStorage = localStorage.getItem("difficulty");
      if (readStorage === "Choose...")
          dificulty = 100;
      else if (readStorage === "Easy")
          dificulty = 200;
      else if (readStorage === "Medium")
          dificulty = 100;
      else dificulty = 70;
      let copyDif = dificulty;

      direction = 'down';
      drawSnake();
      createFood();
      var pressed = false;
      document.getElementById("btnPause").addEventListener("click", function () {
         if (pressed) {
             pressed = false;
             audio.play();
             gameloop = setInterval(paint, dificulty);
         }
         else {
             pressed = true;
             audio.pause();
             gameloop = clearInterval(gameloop);
         }
      });
      if (!pressed)
        gameloop = setInterval(paint, dificulty);
  };


    return {
      init : init
    };

}());
