// Outstanding: Need to still add methods and functions for logic of the game!!!!!!!!!

$(document).ready(function(){
  
   $("#start").on('click', DisneyTrivia.start);  
  
  var DisneyTrivia = {
    
    correctAnswers: 0,
    incorrectAnswers: 0,
    unanswered: 0,
    timer: 10,
    timerOn: false,
     // questions, choices and answers
    questions: {
      q1: 'Which Disney character can freeze an entire city?',
      q2: 'What kind of animal is Dori?',
      q3: 'The bare necessities, the simple bare necessities',
      
    },
    choices: {
      q1: ['Elsa', 'Rapunzel', 'The Grinch', 'Anna'],
      q2: ['Cat', 'Dog', 'Coral Reef', 'Fish'],
      q3: ['Moana', 'Frozen', 'Ratatouille', 'The Jungle Book'],
     
    },
    answers: {
      q1: 'Elsa',
      q2: 'Fish',
      q3: 'The Jungle Book',
      
    }
  }

})
    // Outstanding: Need to still add methods and functions for logic of the game
  