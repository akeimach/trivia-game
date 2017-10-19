# trivia-game


Pseudocode - ordering for function calls and timing events

Start with questionIndex 0
Increment questionIndex (first question in questions object has key 1)
Stop if questionIndex = maxQuestionIndex
    Display score and reset button
Otherwise show the question and available responses
Start and display countdown timer
    While there is still time left
        Listen for click response
    Check if a click was correct
        display win celebration for 5 seconds
    If wrong or time up
        tell user they lost and display correct answer for 5 secs
    return to increment questionindex
