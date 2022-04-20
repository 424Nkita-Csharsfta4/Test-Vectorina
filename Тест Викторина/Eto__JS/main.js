const questions = [
    {
      questionText: "Для чего используется оператор && ?",
      options: ["1. Строка", "2. логическое что-то там", "3. вывод на экран", "4. логическое и,или"],
      answer: "4. логическое и,или",
    },
    {
      questionText: "Для чего используется тег div",
      options: [
        "1. Самолет",
        "2. Блок",
        "3. Это диван",
        "4. Все ответы не правильные",
      ],
      answer: "2. Блок",
    },
    {
      questionText:
        " С помощью какого атрибута можно задать текст для картинки, который будет отображен, если её не удастся загрузить?",
      options: ["1. title", "2. popup", "3. alt", "4. caption"],
      answer: "3. quotes",
    },
    {
      questionText:
        "Какую кодировку следует использовать на сайте?",
      options: [
        "1. UTF-16",
        "2. UTF-32",
        "3. WINSOWS-1251",
        "4. UTF-8",
      ],
      answer: "4. console.log",
    },
    {
      questionText:
        "Как правильно оформить нумерованный список?",
      options: ["1.Поместить внутрь тега <ol> теги <li>, внутри которых написать текст", "2.  Разделить каждую строку с помощью тега <br>, на каждой новой строке перед текстом добавить число, точку и пробел", "3. Просто написать текст в формате: число, точка, пробел, текст, перенос строки. Браузер автоматически распознает данную структуру"],
      answer: "1.Поместить внутрь тега <ol> теги <li>, внутри которых написать текст",
    },
    {
      questionText:
        "Каким является следующий адрес ссылки: ../page2.html?",
      options: ["1.Относительным", "2.Абсолютным"],
      answer: "1.Относительным",
    },
    {
      questionText:
        "С помощью какого тега в HTML создаются ссылки?",
      options: ["1.<b>", "2.<p>","3.<li>","4.<a>"],
      answer: "4.<a>",
    },
    {
      questionText:
        "Какой тег при создании страницы не является обязательным?",
      options: ["1.strong", "2.body","3.head","4.doctype"],
      answer: "3.head",
    },
    {
      questionText:
        "Какое из значений свойства background-attachment закрепляет фоновое изображение относительно окна браузера?",
      options: ["1.fixed", "2.нет правильного ответа","3.scroll"],
      answer: "1.fixed>",
    },
    {
      questionText:
        "Какое значение свойства display установлено по умолчанию у HTML-элемента div?",
      options: ["1.block", "2.list-item","3.inline-block"],
      answer: "1.block",
    },
    {
      questionText:
        "Являются ли одинаковыми селекторы .some и .SOME в HTML и CSS?",
      options: ["1.нет, ","2.да"],
      answer: "1.нет",
    },
  ];
  
  //select each card div by id and assign to variables
  const startCard = document.querySelector("#start-card");
  const questionCard = document.querySelector("#question-card");
  const scoreCard = document.querySelector("#score-card");
  const leaderboardCard = document.querySelector("#leaderboard-card");
  
  //hide all cards
  function hideCards() {
    startCard.setAttribute("hidden", true);
    questionCard.setAttribute("hidden", true);
    scoreCard.setAttribute("hidden", true);
    leaderboardCard.setAttribute("hidden", true);
  }
  
  const resultDiv = document.querySelector("#result-div");
  const resultText = document.querySelector("#result-text");
  
  //hide result div
  function hideResultText() {
    resultDiv.style.display = "none";
  }
  
  //these variables are required globally
  var intervalID;
  var time;
  var currentQuestion;
  
  document.querySelector("#start-button").addEventListener("click", startQuiz);
  
  function startQuiz() {
    //hide any visible cards, show the question card
    hideCards();
    questionCard.removeAttribute("hidden");
  
    //assign 0 to currentQuestion when start button is clicked, then display the current question on the page
    currentQuestion = 0;
    displayQuestion();
  
    //set total time depending on number of questions
    time = questions.length * 9;
  
    //executes function "countdown" every 1000ms to update time and display on page
    intervalID = setInterval(countdown, 1000);
  
    //invoke displayTime here to ensure time appears on the page as soon as the start button is clicked, not after 1 second
    displayTime();
  }
  
  //reduce time by 1 and display new value, if time runs out then end quiz
  function countdown() {
    time--;
    displayTime();
    if (time < 1) {
      endQuiz();
    }
  }
  
  //display time on page
  const timeDisplay = document.querySelector("#time");
  function displayTime() {
    timeDisplay.textContent = time;
  }
  
  //display the question and answer options for the current question
  function displayQuestion() {
    let question = questions[currentQuestion];
    let options = question.options;
  
    let h2QuestionElement = document.querySelector("#question-text");
    h2QuestionElement.textContent = question.questionText;
  
    for (let i = 0; i < options.length; i++) {
      let option = options[i];
      let optionButton = document.querySelector("#option" + i);
      optionButton.textContent = option;
    }
  }
  
  //behaviour when an answer button is clicked: click event bubbles up to div with id "quiz-options"
  //eventObject.target identifies the specific button element that was clicked on
  document.querySelector("#quiz-options").addEventListener("click", checkAnswer);
  
  //Compare the text content of the option button with the answer to the current question
  function optionIsCorrect(optionButton) {
    return optionButton.textContent === questions[currentQuestion].answer;
  }
  
  //if answer is incorrect, penalise time
  function checkAnswer(eventObject) {
    let optionButton = eventObject.target;
    resultDiv.style.display = "block";
    if (optionIsCorrect(optionButton)) {
      resultText.textContent = "Правильно";
      setTimeout(hideResultText, 1000);
    } else {
      resultText.textContent = "Неправильно";
      setTimeout(hideResultText, 1000);
      if (time >= 10) {
        time = time - 10;
        displayTime();
      } else {
        //if time is less than 10, display time as 0 and end quiz
        //time is set to zero in this case to avoid displaying a negative number in cases where a wrong answer is submitted with < 10 seconds left on the timer
        time = 0;
        displayTime();
        endQuiz();
      }
    }
  
    //increment current question by 1
    currentQuestion++;
    //if we have not run out of questions then display next question, else end quiz
    if (currentQuestion < questions.length) {
      displayQuestion();
    } else {
      endQuiz();
    }
  }
  
  //display scorecard and hide other divs
  const score = document.querySelector("#score");
  
  //at end of quiz, clear the timer, hide any visible cards and display the scorecard and display the score as the remaining time
  function endQuiz() {
    clearInterval(intervalID);
    hideCards();
    scoreCard.removeAttribute("hidden");
    score.textContent = time;
  }
  
  const submitButton = document.querySelector("#submit-button");
  const inputElement = document.querySelector("#initials");
  
  //store user initials and score when submit button is clicked
  submitButton.addEventListener("click", storeScore);
  
  function storeScore(event) {
    //prevent default behaviour of form submission
    event.preventDefault();
  
    //check for input
    if (!inputElement.value) {
      alert("Плиз введи свое Имя");
      return;
    }
  
    //store score and initials in an object
    let leaderboardItem = {
      initials: inputElement.value,
      score: time,
    };
  
    updateStoredLeaderboard(leaderboardItem);
  
    //hide the question card, display the leaderboardcard
    hideCards();
    leaderboardCard.removeAttribute("hidden");
  
    renderLeaderboard();
  }
  
  //updates the leaderboard stored in local storage
  function updateStoredLeaderboard(leaderboardItem) {
    let leaderboardArray = getLeaderboard();
    //append new leaderboard item to leaderboard array
    leaderboardArray.push(leaderboardItem);
    localStorage.setItem("leaderboardArray", JSON.stringify(leaderboardArray));
  }
  
  //get "leaderboardArray" from local storage (if it exists) and parse it into a javascript object using JSON.parse
  function getLeaderboard() {
    let storedLeaderboard = localStorage.getItem("leaderboardArray");
    if (storedLeaderboard !== null) {
      let leaderboardArray = JSON.parse(storedLeaderboard);
      return leaderboardArray;
    } else {
      leaderboardArray = [];
    }
    return leaderboardArray;
  }
  
  //display leaderboard on leaderboard card
  function renderLeaderboard() {
    let sortedLeaderboardArray = sortLeaderboard();
    const highscoreList = document.querySelector("#highscore-list");
    highscoreList.innerHTML = "";
    for (let i = 0; i < sortedLeaderboardArray.length; i++) {
      let leaderboardEntry = sortedLeaderboardArray[i];
      let newListItem = document.createElement("li");
      newListItem.textContent =
        leaderboardEntry.initials + " - " + leaderboardEntry.score;
      highscoreList.append(newListItem);
    }
  }
  
  //sort leaderboard array from highest to lowest
  function sortLeaderboard() {
    let leaderboardArray = getLeaderboard();
    if (!leaderboardArray) {
      return;
    }
  
    leaderboardArray.sort(function (a, b) {
      return b.score - a.score;
    });
    return leaderboardArray;
  }
  
  const clearButton = document.querySelector("#clear-button");
  clearButton.addEventListener("click", clearHighscores);
  
  //clear local storage and display empty leaderboard
  function clearHighscores() {
    localStorage.clear();
    renderLeaderboard();
  }
  
  const backButton = document.querySelector("#back-button");
  backButton.addEventListener("click", returnToStart);
  
  //Hide leaderboard card show start card
  function returnToStart() {
    hideCards();
    startCard.removeAttribute("hidden");
  }
  
  //use link to view highscores from any point on the page
  const leaderboardLink = document.querySelector("#leaderboard-link");
  leaderboardLink.addEventListener("click", showLeaderboard);
  
  function showLeaderboard() {
    hideCards();
    leaderboardCard.removeAttribute("hidden");
  
    //stop countdown
    clearInterval(intervalID);
  
    //assign undefined to time and display that, so that time does not appear on page
    time = undefined;
    displayTime();
  
    //display leaderboard on leaderboard card
    renderLeaderboard();
  }