const scoreList = document.getElementById('highscores');
const clearBtn = document.getElementById('clear');

// function that show highscores

function showHighScores() {
  const highscores = Object.entries(localStorage).map(([key, value]) => ({ key, value }));
  highscores.sort((a, b) => b.value - a.value); 
  let listLength = (highscores.length < 5) ? highscores.length : 5;
  for (let i = 0; i < listLength; i++) {
    const userEl = document.createElement('li');
    userEl.textContent = `${highscores[i].key} : ${highscores[i].value}`;
    scoreList.appendChild(userEl);
  }
  return highscores;
}

// function that clear localStorage

function clearLocalStorage() {
  localStorage.clear();
  scoreList.textContent = '';
}

(localStorage) && document.addEventListener('DOMContentLoaded', showHighScores);

(clearBtn) && clearBtn.addEventListener('click', clearLocalStorage);