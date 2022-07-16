class GameState {
  constructor() {
   
  }

  bootstrap() {
    this.highscores = JSON.parse(window.localStorage.getItem("highscores"));
    if (this.highscores == null) {
      this.highscores = [];
    }
    this.state = "START"
    this.questions = [
      {
        num: 1, 
        question: "What is the player called that scores points in roller derby?",
        answer: "answer1",
        options: [
          "jammer",
          "blocker",
          "pivot",
          "baddie",
        ]
      },
      {
        num: 2, 
        question: "What are the max points you can score on one pass?",
        answer: "answer2",
        options: [
          "10",
          "5",
          "4",
          "8",
        ]
      },
      {
        num: 3, 
        question: "How many penalties can you receive before fouling out of the game?",
        answer: "answer4",
        options: [
          "3",
          "9",
          "5",
          "7",
        ]
      },
      {
        num: 4, 
        question: "How many players are on the track at one time?",
        answer: "answer3",
        options: [
          "14",
          "10",
          "5",
          "3",
        ]
      },
      {
        num: 5, 
        question: "Who is the only player than can receive a star pass?",
        answer: "answer1",
        options: [
          "pivot",
          "blocker",
          "opposing jammer",
          "coach",
        ]

      },
    ]
    this.currentQuestion = 0;
    this.secondsRemaining = 75; 
    this.score = 0;

    setInterval(this.updateTimer.bind(this), 1000);
  }
  
  startGame() {
    this.state = "RUNNING";
    document.getElementById("openingpage").classList.add("hidden");
    document.getElementById("questiontext").classList.remove("hidden");
    document.getElementById("options").classList.remove("hidden");
  }

  finishGame() {    
    this.state = "OVER";
    document.getElementById("questiontext").classList.add("hidden");
    document.getElementById("options").classList.add("hidden");
    document.getElementById("donescreen").classList.remove("hidden");
    document.getElementById("finalscore").textContent = this.score;
}
  updateTimer() {
    var timer = document.getElementById("timer");
    timer.textContent = this.secondsRemaining;
    console.log(this.secondsRemaining);
    if (
        this.state == "RUNNING" &&  this.secondsRemaining > 0
       ) {
       
       
      this.secondsRemaining = this.secondsRemaining-1;
      
    }
  else if(this.secondsRemaining === 0) {
      clearInterval(this.bootstrap);
      this.finishGame();
    }
  }

  displayCurrentQuestion() {
    var currentQuestion = this.questions[this.currentQuestion];
    
    var questionText = currentQuestion.question;
    var questionEl =document.getElementById("questiontext");
    questionEl.textContent = questionText;

    var option1 = currentQuestion.options[0];
    var option1El = document.getElementById("answer1");
    option1El.textContent = option1;

    var option2 = currentQuestion.options[1];
    var option2El = document.getElementById("answer2");
    option2El.textContent = option2;
  
    var option3 = currentQuestion.options[2];
    var option3El = document.getElementById("answer3");
    option3El.textContent = option3;
    
    var option4 = currentQuestion.options[3];
    var option4El = document.getElementById("answer4");
    option4El.textContent = option4;
  }

  answerQuestion(id) {
    var currentQuestion = this.questions[this.currentQuestion];
    if (currentQuestion.answer == id) {
      this.score = this.score + 1; 
    } else {
      this.secondsRemaining = this.secondsRemaining - 5;
    }
    this.currentQuestion = this.currentQuestion + 1;
    if (this.currentQuestion == this.questions.length) {
      this.finishGame();
    } else {
      this.displayCurrentQuestion();
    }
  }

  submitHighScore() {
    var initials = document.getElementById("initials");
    var score = this.score; 
    this.highscores.push([initials.value, score]);
    
    window.localStorage.setItem("highscores", JSON.stringify(this.highscores));
    
    this.viewHighScores();
  }

  viewHighScores() {
    document.getElementById("donescreen").classList.add("hidden");
    document.getElementById("highscores").classList.remove("hidden");
    document.getElementById("openingpage").classList.add("hidden");

    
    var highscoresHTML = "<ol>" ;
    this.highscores.forEach(
      (currentValue) =>
      {
        highscoresHTML += "<li>" + currentValue[0] + "," + currentValue[1] + "</li>";
      }
    )
    highscoresHTML += "</ol>"

    document.getElementById("highscorescontainer").innerHTML = highscoresHTML;
  };

  resethighscores() {
    window.localStorage.removeItem("highscores");
    this.highscores = [];
    this.viewHighScores();
  }

  startOver() {
    document.getElementById("questiontext").classList.add("hidden");
    document.getElementById("options").classList.add("hidden");
    document.getElementById("donescreen").classList.add("hidden");
    document.getElementById("openingpage").classList.remove("hidden");
    document.getElementById("highscores").classList.add("hidden");
  }

}

var game = new GameState;
game.bootstrap();
game.displayCurrentQuestion();

// to do - refactor code - tracking of game state - style buttons consistently - wrong answers and timer deduction?
// fix timer for game over 
// refactor stylings on buttons - 
// when go back is clicked - time doesn't restart 
// 