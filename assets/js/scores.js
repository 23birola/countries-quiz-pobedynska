const scoreList = document.getElementById('highscores');
const clearBtn = document.getElementById('clear');
const startBtn = document.getElementById('start');

// function that show highscores

function showHighScores() {
  const highscores = Object.entries(localStorage).map(([key, value]) => ({ key, value }));
  highscores.sort((a, b) => b.value - a.value); 
  console.log(highscores);
  for (let i = 0; i < 5; i++) {
    const userEl = document.createElement('li');
    userEl.textContent = `${highscores[i].key} : ${highscores[i].value}`;
    scoreList.appendChild(userEl);
  }
  startBtn.setAttribute('class', 'start');
  return highscores;
}

// function that clear localStorage

function clearLocalStorage() {
  localStorage.clear();
  scoreList.textContent = '';
}

(localStorage) && document.addEventListener('DOMContentLoaded', showHighScores);

(clearBtn) && clearBtn.addEventListener('click', clearLocalStorage);