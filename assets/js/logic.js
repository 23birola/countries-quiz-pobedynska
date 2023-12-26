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

let time;
let timerId;
let score;
let i = 0;

function stopQuize() {
      clearInterval(timerId);
      score = 0;
      quetionsWrapper.setAttribute('class', 'hide');
      startPage.setAttribute('class', 'start');
}

// function that starts the quiz

function startQuize() {
  choices.textContent = '';
  i = 0;
  time = 50;
  score = 0;
  timerId = setInterval(() => {
    timer.textContent = time;
    time--;
    if (time === 0) {
      timer.textContent = time;
      clearInterval(timerId);
      score = 0;
      quetionsWrapper.setAttribute('class', 'hide');
      startPage.setAttribute('class', 'start');
    }
  }, 1000);
  startPage.setAttribute('class', 'hide');
  quetionsWrapper.setAttribute('class', 'start');
  showQustion(i);
}
  
// function that shows qustions

function showQustion(i) {
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
  window.location.href = '/highscores.html';
};

(startBtn) && startBtn.addEventListener('click', startQuize);

(choices) && choices.addEventListener('click', function handleChoice(e) {
  e.preventDefault();
  console.log(e.target.textContent);
  if (e.target.textContent === questions[i].corectAnswer) {
    console.log('corect');
  } else {
    time -= 10;
    if (time <= 0) {
      time = 0;
      score = 0;
      timer.textContent = time;
      clearInterval(timerId);
      alert('Time is over!!! Try again');
      quetionsWrapper.setAttribute('class', 'hide');
      startPage.setAttribute('class', 'start');
    } else {
      alert(`Oops! You are wrong!. The correct answer is ${questions[i].corectAnswer}`);
    }
  }
  i += 1;
  if (i >= questions.length) {
    score = time;
    console.log(`score`, score);
    time = 0;
    timer.textContent = time;
    clearInterval(timerId);
    quetionsWrapper.setAttribute('class', 'hide');
    endScreen.setAttribute('class', 'start');
    finalScore.textContent = score;

  } else { 
    choices.textContent = '';
    showQustion(i);
  }
});

(addScoreBtn) && addScoreBtn.addEventListener('click', addScore);

// Quize questions

const questions = [
    {
      question: 'What is the capital of the United Kingdom?',
      options: ['Paris', 'London', 'Manchester', 'Edinburgр'],
      corectAnswer: 'London',
    },
    {
      question: 'What is the capital of Germany?',
      options: ['Paris', 'London', 'Berlin', 'Munchen'],
      corectAnswer: 'Berlin',
    },
    {
      question: 'What is the capital of Spain?',
      options: ['Madrid', 'Barselona', 'Milan', 'Valencia'],
      corectAnswer: 'Madrid',
    },
    {
      question: 'What is the capital of France?',
      options: ['Paris', 'Marsel', 'Manchester', 'Oslo'],
      corectAnswer: 'Paris',
    },
    {
      question: 'What is the capital of Ukraine?',
      options: ['Warsaw', 'Kyiv', 'Prague', 'Kharkiv'],
      corectAnswer: 'Kyiv',
    }
];
