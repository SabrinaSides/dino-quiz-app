/**
 * Example store structure
 */
const store = {
  // 5 or more questions are required
  questions: [
    {
      question: 'How long did dinosaurs live on Earth?',
      answers: [
        '245 million years',
        '3 million years',
        '20 million years',
        '900,000 years'
      ],
      correctAnswer: '245 million years'
    },
    {
      question: 'Scientists can estimate the _____ of a dinosaur based off of an individual footprint.',
      answers: [
        'Weight',
        'Height',
        'Color',
        'Aggression level'
      ],
      correctAnswer: 'Height'
    },
    {
      question: 'The heaviest and longest dinosaur to have ever lived was the Argentinosaurus dinosaur. Weighing 77 tons, this dinosaur weighed as much as ___________ .',
      answers: [
        'A greyhound bus',
        '17 African elephants',
        '50 cows',
        '3 Tyrannosaurus rex'
      ],
      correctAnswer: '17 African elephants'
    },
    {
      question: 'Stegosaurus was most likely the dumbest dinosaur based on it’s brain size. A stegosaurus’ brain was the size of a ________.',
      answers: [
        'Football',
        'Walnut',
        'Coffee Mug',
        'Watermelon'
      ],
      correctAnswer: 'Walnut'
    },
    {
      question: 'It is widely accepted that dinosaurs became extinct after a massive meteor struck Earth, altering global temperatures and severely decreasing sun exposure which caused death of vegetation. Where did this massive meteor hit Earth?',
      answers: [
        'The Yucatán Peninsula',
        'Near the center of modern day Russia',
        'The Bering Land Bridge',
        'Inside the Artic Circle'
      ],
      correctAnswer: 'The Yucatán Peninsula'
    }
  ],
  quizStarted: false,
  questionNumber: 0,
  score: 0
};


/**
 * 
 * Technical requirements:
 * 
 * Your app should include a render() function, that regenerates the view each time the store is updated. 
 * See your course material and access support for more details.
 *
 * NO additional HTML elements should be added to the index.html file.
 *
 * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
 *
 * SEE BELOW FOR THE CATEGORIES OF THE TYPES OF FUNCTIONS YOU WILL BE CREATING 👇
 * 
 */

/********** TEMPLATE GENERATION FUNCTIONS **********/

// These functions return HTML templates
// return start page HTML
function generateStartPage() {
  return `
  <section>
  <div class='container'>
      <p>Is your knowledge of prehistoric creatures "dino-mite"? Take the quiz and find out!</p>
      <button type='button' id='js-start-quiz'>Start Quiz</button>
    </div>
  </section>
  `
}

//uses questionNumber (increased after each submit click) to find position of next question in array-- returns appropriate question page HTML
function generateQuestionPage() {
  let currentQuestion = store.questions[store.questionNumber];
  return `
  <section>
    <div class='container'>
    <h3>Question ${store.questionNumber + 1} of 5</h3>
    <form id='js-form'>
      <fieldset>
          <legend><h2>${currentQuestion.question}</h2></legend>
        <ul>
          <li> 
            <input type='radio' name='answers' id='answer1' value='${currentQuestion.answers[0]}' required></input>
            <label for='answer1'>${currentQuestion.answers[0]}</label>
          </li>
          <li> 
            <input type='radio' name='answers' id='answer2' value='${currentQuestion.answers[1]}'></input>
            <label for='answer2'>${currentQuestion.answers[1]}</label>
          </li>
          <li> 
            <input type='radio' name='answers' id='answer3' value='${currentQuestion.answers[2]}'></input>
            <label for='answer3'>${currentQuestion.answers[2]}</label>
          </li>
          <li> 
            <input type='radio' name='answers' id='answer4' value='${currentQuestion.answers[3]}'></input>
            <label for='answer4'>${currentQuestion.answers[3]}</label>
          </li>
        </ol>
        <button type='submit' id='js-submit-btn'>Submit</button> 
        <button type='submit' id='js-next-btn' style='display: none;'>Next</button>
      </fieldset>
    </form>
    <div>
    <h3 class='js-results'></h3>
    </div>
    <div class='score'>
    <h3>Score ${store.score} of 5</h3>
    </div>
    </div>
  </section>
  `
}

//returns HTML for final page with end score
function generateFinalPage() {
  return `
  <section class='container'>
      <p>You finished the quiz! Here is your final score: </p>
      <p> Score: ${store.score}/5</p>
      <button type='submit' id='js-restart-btn'>Restart Quiz</button>
  </section>
  `
}

/********** RENDER FUNCTION(S) **********/

// This function conditionally replaces the contents of the <main> tag based on the state of the store

function renderQuiz() {
  if (store.quizStarted === false) {
    $('main').html(generateStartPage());
    return;
  } else if (store.questionNumber < store.questions.length) {
    $('main').html(generateQuestionPage());
    return;
  } else {
    $('main').html(generateFinalPage());
    return;
  }
}

/********** EVENT HANDLER FUNCTIONS **********/

// These functions handle events (submit, click, etc)

//actions after start button click
function handleStartQuizClick() {
  $('main').on('click', '#js-start-quiz', () => {
    store.quizStarted = true;
    renderQuiz();
  })
}

//actions after submit button click
function handleSubmitQuestionClick() {
  $('main').on('submit', '#js-form', function(event){
  event.preventDefault();
let currentQuestion = store.questions[store.questionNumber];
        //hide submit button
    $('#js-submit-btn').hide();
        // disable all inputs
    $('input[type=radio]').each(() => {
      $('input[type=radio]').attr('disabled', true);
    });
      //show next button
    $('#js-next-btn').show();
    let userAnswer = $('input[name=answers]:checked').val();
    console.log(userAnswer);
    // correct answer pop-up
    if (userAnswer === currentQuestion.correctAnswer) {
      $('.js-results').html( $("input:checked").val() + " is correct!");
      //add to score count
      store.score = store.score + 1; 
    //incorrect answer pop-up
    } else {
      $('.js-results').html( $("input:checked").val() + ` is incorrect. The correct answer is: ${currentQuestion.correctAnswer}.`);
    }
    //helps move down question object
    store.questionNumber++;
  })
}

//action after next button click--> go to next page determined by rendering criteria
function handleNextQuestionClick() {
  $('main').on('click', '#js-next-btn', () => {
    renderQuiz();
  })
}

//set everything back to store original aka start page
function restartQuiz() {
  store.quizStarted = false;
  store.questionNumber = 0;
  store.score = 0;
}

//action after restart button clicked
function handleRestartQuizClick() {
  $('main').on('click', '#js-restart-btn', () => {
    restartQuiz();
    renderQuiz();
  });
}

function handleQuiz() {
  renderQuiz();
  handleStartQuizClick();
  handleSubmitQuestionClick();
  handleNextQuestionClick();
  handleRestartQuizClick();
}

$(handleQuiz);
