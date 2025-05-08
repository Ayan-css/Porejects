document.addEventListener('DOMContentLoaded', () => {
  const StartBtn = document.getElementById('start-btn')
  const nextBtn = document.getElementById('next-btn')
  const restartBtn = document.getElementById('restart-btn')
  const questionContainerDisplay = document.getElementById('question-container')
  const questionText = document.getElementById('question-text')
  const choicesList = document.getElementById('choices-list')
  const resultDisplay = document.getElementById('result-container')
  const scoreDisplay = document.getElementById('score')
  const quizContainerDisplay = document.getElementById('quiz-container')
   
   
    const questions = [
        {
          question: "What is the capital of France?",
          choices: ["Paris", "London", "Berlin", "Madrid"],
          answer: "Paris",
        },
        {
          question: "Which planet is known as the Red Planet?",
          choices: ["Mars", "Venus", "Jupiter", "Saturn"],
          answer: "Mars",
        },
        {
          question: "Who wrote 'Hamlet'?",
          choices: [
            "Charles Dickens",
            "Jane Austen",
            "William Shakespeare",
            "Mark Twain",
          ],
          answer: "William Shakespeare",
        },
      ];
     
      let currentQuestionIndex = 0
      let score = 0

      StartBtn.addEventListener('click', startQuiz)

      nextBtn.addEventListener('click',() => {
        currentQuestionIndex++
        if(currentQuestionIndex < questions.length){
            showQuestion()
        }else {
            showResult()
        }
      })
      restartBtn.addEventListener('click', () =>{
        currentQuestionIndex = 0
        score = 0
        resultDisplay.classList.add('hidden')
        startQuiz()

      })
      function startQuiz() {
        StartBtn.classList.add('hidden')
        resultDisplay.classList.add('hidden')
        questionContainerDisplay.classList.remove('hidden')
        showQuestion()
      }
      function showQuestion() {
        nextBtn.classList.add('hidden')
        questionText.textContent = questions[currentQuestionIndex].question;
        choicesList.innerHTML = "" //clear previos chioces
        questions[currentQuestionIndex].choices.forEach(choice => {
            const li = document.createElement('li')
            li.textContent = choice
            li.addEventListener('click',() => selectAnswer(choice))
            choicesList.appendChild(li)
        })
      }

      function selectAnswer(choice) {
        const correctAnswer = questions[currentQuestionIndex].answer
        if(choice === correctAnswer){
            score++
        }
        nextBtn.classList.remove('hidden')
      }
      function showResult() {
        questionContainerDisplay.classList.add('hidden')
        resultDisplay.classList.remove('hidden')
        scoreDisplay.textContent = `${score} out of ${questions.length}`
      }
})