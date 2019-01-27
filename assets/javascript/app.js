$(document).ready(function () {

  // Event listeners
  $("#remaining-time").hide();
  $("#start").on('click', trivia.startGame);
  $(document).on('click', '.option', trivia.guessChecker);

})

var trivia = {
  // Properties
  correct: 0,
  incorrect: 0,
  unanswered: 0,
  currentSet: 0,
  timer: 20,
  timerOn: false,
  timerId: '',

  // Questions 
  questions: {
    q1: 'Which Disney character can freeze an entire city?',
    q2: 'Ooh, this is the night and it is a beautiful night and we call it Bella Note.',
    q3: 'The bare necessities, the simple bare necessities',
    q4: 'Thank you for choosing Magic Carpet for all your travel needs. Do not stand until the rug has come to a complete stop. Thank you. Goodbye now.',
    q5: 'Supercalifragilisticexpialidocious',

  },
  options: {
    q1: ['Elsa', 'Rapunzel', 'The Grinch', 'Anna'],
    q2: ['Ratatouille', 'Peter Pan', 'Lady and the Tramp', 'Dumbo'],
    q3: ['Moana', 'Frozen', 'Ratatouille', 'The Jungle Book'],
    q4: ['The Lion King', 'ALice in Wonderland', 'Aladdin', 'Pinocchio'],
    q5: ['Pirates of the Caribbean', 'Ferdinand The Bull', '101 Dalmations', 'Mary Poppins'],


  },
  answers: {
    q1: 'Elsa',
    q2: 'Lady and the Tramp',
    q3: 'The Jungle Book',
    q4: 'Aladdin',
    q5: 'Mary Poppins',

  },

  // Method to initialize game
  startGame: function () {

    //will Restarting Results of the Game 
    trivia.currentSet = 0;
    trivia.correct = 0;
    trivia.incorrect = 0;
    trivia.unanswered = 0;
    clearInterval(trivia.timerId);

    // To show game section
    $('#game').show();

    //  To empty the last results
    $('#results').html('');

    // To show the timer
    $('#timer').text(trivia.timer);

    // To remove the start button
    $('#start').hide();

    $('#remaining-time').show();

    // Prompts the first question
    trivia.nextQuestion();

  },
  // Method to loop through and display questions 
  nextQuestion: function () {

    // Sets timer to 10 seconds for each question
    trivia.timer = 10;
    $('#timer').removeClass('last-seconds');
    $('#timer').text(trivia.timer);

    // Prevents timer speed up
    if (!trivia.timerOn) {
      trivia.timerId = setInterval(trivia.timerRunning, 1000);
    }

    var questionContent = Object.values(trivia.questions)[trivia.currentSet];
    $('#question').text(questionContent);


    var questionOptions = Object.values(trivia.options)[trivia.currentSet];


    $.each(questionOptions, function (index, key) {
      $('#options').append($('<button class="option btn btn-info btn-lg">' + key + '</button>'));
    })

  },
  // Method to decrement counter. Also counts unanswered when timer runs out
  timerRunning: function () {
    // When timer has time left and there are still questions left to prompt the user
    if (trivia.timer > -1 && trivia.currentSet < Object.keys(trivia.questions).length) {
      $('#timer').text(trivia.timer);
      trivia.timer--;
      if (trivia.timer === 4) {
        $('#timer').addClass('last-seconds');
      }
    }
    // Time out. Unanswered results are incremented and results are shown
    else if (trivia.timer === -1) {
      trivia.unanswered++;
      trivia.result = false;
      clearInterval(trivia.timerId);
      resultId = setTimeout(trivia.guessResult, 1000);
      $('#results').html('<h3>Out of time! The answer was ' + Object.values(trivia.answers)[trivia.currentSet] + '</h3>');
    }
    // When all questions have been prompted. Game ends and results are displayed. 
    else if (trivia.currentSet === Object.keys(trivia.questions).length) {

      // Displays the result for Correct, Incorrect and Unanswered questions 
      $('#results')
        .html('<h3>Thank you for playing!</h3>' +
          '<p>Correct: ' + trivia.correct + '</p>' +
          '<p>Incorrect: ' + trivia.incorrect + '</p>' +
          '<p>Unaswered: ' + trivia.unanswered + '</p>' +
          '<p>Would you like to give it another shot?</p>');

      // Hide game sction
      $('#game').hide();

      // Shows the start button to begin a new game
      $('#start').show();
    }

  },
  // Method to evaluate the option clicked
  guessChecker: function () {

    // Timer ID for game result setTimeout
    var resultId;

    // Answer to the current question being asked
    var currentAnswer = Object.values(trivia.answers)[trivia.currentSet];

    // If user answer matches answer of the current question the correct results get incremented
    if ($(this).text() === currentAnswer) {
      // Button color changes to green when picked answers is correct
      $(this).addClass('btn-success').removeClass('btn-info');

      trivia.correct++;
      clearInterval(trivia.timerId);
      resultId = setTimeout(trivia.guessResult, 1000);
      $('#results').html('<h3>That is correct. You must be a Disney Fan!</h3>');
    }
    // when the user's answer does not match the question's answer. Incorrect results get incremented
    else {
      // Button color changes to red when picked answers is correct
      $(this).addClass('btn-danger').removeClass('btn-info');

      trivia.incorrect++;
      clearInterval(trivia.timerId);
      resultId = setTimeout(trivia.guessResult, 1000);
      $('#results').html('<h3> Incorrect. Better luch next time! ' + currentAnswer + '</h3>');
    }

  },
  // Method to remove previous question results and options
  guessResult: function () {

    // Increments to next question set
    trivia.currentSet++;

    // Removes the options and results
    $('.option').remove();
    $('#results h3').remove();

    // Starts next question
    trivia.nextQuestion();

  }

}