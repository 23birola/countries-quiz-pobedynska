const startBtn = document.getElementById('start');
const timer = document.getElementById('time');
const startPage = document.getElementById('start-screen');
const quetionsWrapper = document.getElementById('questions');
const questionTitle = document.getElementById('question-title');
const choices = document.getElementById('choices');
const endScreen = document.getElementById('end-screen');
const finalScore = document.getElementById('final-score');
const addScoreBtn = document.getElementById('submit');
const initials = document.getElementById('initials');
const infoMessage = document.getElementById('message');
const audioCorect = new Audio('./assets/sfx/correct.wav');
const audioWrong = new Audio('./assets/sfx/incorrect.wav');

let time;
let timerId;
let score;
let i = 0;

function stopQuiz() {
  clearInterval(timerId);
  score = 0;
  i = 0;
  infoMessage.setAttribute('class', 'message wrong');
  infoMessage.textContent = 'Time is over!!! Try again';
  setTimeout(() => { quetionsWrapper.setAttribute('class', 'hide'), startPage.setAttribute('class', 'start') }, 2000);
}

/* function that starts the quiz */
function startQuiz() {
  choices.textContent = '';
  quetionsWrapper.
  i = 0;
  time = 50;
  score = 0;
  timer.textContent = time;
  timerId = setInterval(() => {
    if (time > 0) {
      time--;
      timer.textContent = time;
    } else {
      timer.textContent = time;
      stopQuiz();
    }
  }, 1000);
  console.log(i);
  startPage.setAttribute('class', 'hide');
  quetionsWrapper.setAttribute('class', 'start');
  infoMessage.textContent = '';
  infoMessage.setAttribute('class', '');
  showQustion(i);
}
  
// function that shows qustions

function showQustion(i) {
  choices.classList.remove('disabled');
  questionTitle.textContent = questions[i].question;
  for (let j = 0; j < questions[i].options.length; j++) {
    let choice = document.createElement('button');
    choice.textContent = `${questions[i].options[j]}`;
    choices.appendChild(choice);
  }
}

// function that adds results to the highscores

function addScore() {
  localStorage.setItem(initials.value, score);
  window.location.href = 'highscores.html';
};

(startBtn) && startBtn.addEventListener('click', startQuiz);

(choices) && choices.addEventListener('click', function handleChoice(e) {
  choices.classList.add('disabled');
  e.preventDefault();
  if (e.target.textContent === questions[i].corectAnswer) {
    audioCorect.play();
    infoMessage.setAttribute('class', 'message correct');
    infoMessage.textContent = 'Correct!!!';
  } else {
      audioWrong.play();
      infoMessage.setAttribute('class', 'message wrong');
      infoMessage.textContent = 'Wrong!!!';
      time -= 10;
      if (time <= 0) {
        time = 0;
        timer.textContent = time;
        stopQuiz();
        return;
      }
  }
  
  i += 1;
  if (i >= questions.length) {
    score = time;
    time = 0;
    timer.textContent = time;
    clearInterval(timerId);
    setTimeout(() => { quetionsWrapper.setAttribute('class', 'hide'), endScreen.setAttribute('class', 'start'); }, 1000);
    finalScore.textContent = score;

  } else { 
    setTimeout(() => {
      choices.textContent = '';
      infoMessage.textContent = '';
      infoMessage.setAttribute('class', '');
      showQustion(i);
    }, 1000);
  }
});

(addScoreBtn) && addScoreBtn.addEventListener('click', addScore);

// Quize questions

const questions = [
    {
      question: 'What is the capital of the United Kingdom?',
      options: ['Paris', 'London', 'Manchester', 'Edinburgh'],
      corectAnswer: 'London',
    },
    {
      question: 'What is the capital of Germany?',
      options: ['Paris', 'London', 'Berlin', 'Munchen'],
      corectAnswer: 'Berlin',
    },
    {
      question: 'What is the capital of Spain?',
      options: ['Madrid', 'Barcelona', 'Milan', 'Valencia'],
      corectAnswer: 'Madrid',
    },
    {
      question: 'What is the capital of France?',
      options: ['Paris', 'Marseille', 'Manchester', 'Oslo'],
      corectAnswer: 'Paris',
    },
    {
      question: 'What is the capital of Ukraine?',
      options: ['Warsaw', 'Kyiv', 'Prague', 'Kharkiv'],
      corectAnswer: 'Kyiv',
    }
];
