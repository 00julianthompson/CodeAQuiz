const startButton = document.getElementById('start-btn')
const questionContainerElement = document.getElementById('start-btn')
const nextButton = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const countdownEl = document.getElementById('countdown');
const scoreText = document.querySelector("#score")





let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

const timerText = document.getElementById("timer-text");

const btnStart  = document.getElementById("btn-start");

const btnPause  = document.getElementById("btn-pause");




let count = 0;

let intervalID;

btnStart.addEventListener("click", function() {
     intervalID =setInterval(function () {
      count += 1;

      timerText.textContent = count;

    }, 1000);

    btnPause.addEventListener("click", function () {
        clearInterval(intervalID);

    });

   

});




function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex ) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')

  
}


const questions = [
  {
    question: 'Did OJ do it?',
    answers: [
      { text: 'No', correct: true },
      { text: 'Yes', correct: false }
    ]
  },
  {
    question: 'Where do Tupac live now?',
    answers: [
      { text: 'Cuba', correct: true },
      { text: 'North Carolina', correct: true },
      { text: 'The White House', correct: true },
      { text: 'Heaven', correct: true }
    ]
  },
  {
    question: 'Who is the best NBA player ever?',
    answers: [
      { text: 'MJ', correct: false },
      { text: 'Lebron James', correct: true },
      { text: 'Larry Bird', correct: false },
      { text: 'Shaq', correct: false }
    ]
  },
  {
    question: 'Are you drunk?',
    answers: [
      { text: 'No', correct: false },
      { text: 'Yes', correct: true }
    ]
  }
]
const SCORE_POINTS = 100
const MAX_QUESTIONS = 4 

startGame = () => {
    questioncounter = 0
    score = 0
    availableQuestions =[...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionscounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')

        questionCounter++
        progressText.innerText = 'Question ${questionCounter} of $(MAX_QUESTIONS)'
    }
}


