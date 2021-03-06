

var intervalId;
var questionIndex = 0;
var correctAnswer = 0;
var wrongAnswer = 0;
var noAnswer = 0;
var timeRemaining;
var timePerQuestion = 25;
var timePerAnswer = 6;

var questions = {
    "1": new Question("How long is the Appalachian Trail?",
        ["3.6 vertical miles", "1,792 miles", "2,185 miles", "3,429 miles"],
        2, "The trail runs from Georgia to Maine, and through 14 states.",
        "assets/images/appalachian_trail.gif"),
    "2": new Question("Which is the tallest mountain in the US?",
        ["Mauna Kea", "Mt Everest", "Mt Shasta", "Denali"],
        3, "Denali is 20,320 feet tall and located in Denali National Park and Preserve, Alaska",
        "assets/images/denali.gif"),
    "3": new Question("How many national parks are in the US?",
        ["59", "45", "74", "23"],
        0, "There are 59! Try and see them all!",
        "assets/images/national-parks.gif"),
    "4": new Question("Who is General Sherman?",
        ["Retired National Park activist", "An enormous sequoia tree", 
            "Mini horse living in Yellowstone", "The owner of a historical cabin"],
        1, "General Sherman is the largest known living single stem tree on Earth",
        "assets/images/general_sherman.gif"),
    "5": new Question("The longest cave system is located in which state?", 
        ["Kentucky", "New Mexico", "Tennessee", "Virginia"], 
        0, "Mammoth Caves has 3454 miles mapped, and more to come!",
        "assets/images/mammoth-caves.gif"),
    "6": new Question("Which park is the largest?", 
        ["Glacier National Park", "Yosemite National Park", "Badlands National Park",
            "Wrangell-St. Elias National Park"],
        3, "It covers three climate zones and an area larger than Switzerland",
        "assets/images/wrangell-st_elias.gif"),
    "7": new Question("Which National Park is the youngest?",
        ["Grand Teton National Park", "Acadia National Park", "Pinnacles National Park",
            "Yellowstone National Park"],
        2, "Pinnacles National Park was established in California in January 2013.",
        "assets/images/pinnacles.gif")
};


function Question(question, responseArray, answerIndex, answerSupplement, answerImage) {
    this.question = question;
    this.responseArray = responseArray;
    this.answerIndex = answerIndex;
    this.answerSupplement = answerSupplement;
    this.answerImage = answerImage;
}


function displayTime(currentTime) {
    var minutes = Math.floor(currentTime / 60);
    var seconds = currentTime - (minutes * 60);
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    if (minutes === 0) {
      minutes = "00";
    }
    else if (minutes < 10) {
      minutes = "0" + minutes;
    }
    $("#time-remaining").html(minutes + ":" + seconds);
}


function runClock() {
    timeRemaining--;
    displayTime(timeRemaining);
    if (!timeRemaining) {
        clearInterval(intervalId);
        getResponse(-1);
    }
}


function startClock() {
    clearInterval(intervalId);
    timeRemaining = timePerQuestion;
    displayTime(timeRemaining);
    intervalId = setInterval(runClock, 1000);
}


function displayQuestion() {
    clearHTML();
    $("#show-question").html(questions[questionIndex].question);
    var responses = questions[questionIndex].responseArray;
    for (var i = 0; i < responses.length; i++) {
        $("#response-container").append("<button id=" + i + ">" + responses[i] + "</button>");
    }
}


function nextQuestion() {
    questionIndex++;
    if (questionIndex > Object.keys(questions).length) {
        clearInterval(intervalId);
        $("#result-container").html("<h2>Correct answers: " + correctAnswer 
            + "</h2><h2>Incorrect answers: " + wrongAnswer 
            + "</h2><h2>Unanswered: " + noAnswer + "</h2>");
        $("#reset-quiz").show();
        return;
    }
    displayQuestion(); // make the response buttons, wait for clicks
    startClock(); // clear clock, reset time, display time, set new interval
}


function clearHTML() {
    $("#time-remaining").empty();
    $("#show-question").empty();
    $("#response-container").empty();
    $("#result-container").empty();
}


function getResponse(input) {
    clearHTML();
    if (input == questions[questionIndex].answerIndex) {
        $("#result-container").html("<h2>Correct!</h2>");
        correctAnswer++;
    }
    else {
        if (input === -1) { // called from runClock function being out of time
            $("#result-container").html("<h2>Out of time</h2>");
            noAnswer++;
        }
        else {
            $("#result-container").html("<h2>Wrong</h2>");
            wrongAnswer++;
        }
        $("#result-container").append("<h2>The correct answer was " +
            questions[questionIndex].responseArray[questions[questionIndex].answerIndex] + "</h2>");
    }
    $("#result-container").append("<h2>" + questions[questionIndex].answerSupplement
            + "</h2><img src='" + questions[questionIndex].answerImage + "' >");
    setTimeout(nextQuestion, timePerAnswer * 1000);
}


$(document).ready(function() {

    $("#reset-quiz").hide();

    $("#start-quiz").on("click", function() {
        $("#start-quiz").hide();
        nextQuestion();
    });

    $("#response-container").on("click", function(event) {
        clearInterval(intervalId);
        getResponse(event.target.id);
    });

    $("#reset-quiz").on("click", function() {
        $("#reset-quiz").hide();
        $("#start-quiz").show();
        clearHTML();
        questionIndex = 0;
        correctAnswer = 0;
        wrongAnswer = 0;
        noAnswer = 0;
    });

});

