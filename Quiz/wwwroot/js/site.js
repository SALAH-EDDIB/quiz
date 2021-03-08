//*  :::::::::::::::::::::::       Selector

const testBtn = document.querySelector(".start-btn");
const questionnaire = document.querySelector(".questionnaire");
const Préambule = document.querySelector(".Préambule");
const stepper = document.querySelectorAll(".stepper h1");
const nextBtn = document.querySelector(".next");
const previousBtn = document.querySelector(".previous");
const currentquestion = document.querySelector(".question");
const answerInputs = document.querySelector(".answer-inputs");
const progressBar = document.querySelector(".bar");
const questionNumber = document.querySelector(".question-number");
const animateBox = document.querySelector(".animation");
const result = document.querySelector(".Préambule h1");
const resultBox = document.querySelector(".results");
const resultMessage = document.querySelector(".Préambule p");

// ?  :::::::::::::::::::      Event Listener

testBtn.addEventListener("click", startTest);



animateBox.addEventListener("input", (e) => {
    const input = e.target;


    if (input.type === "number") {
        const number = parseFloat(input.value);

        if (number >= input.min && number <= input.max) {
            //answers["Q"+currentQuestionIndex] = input.value;
            //console.log(answers);

            nextBtn.disabled = false;
        } else {
            nextBtn.disabled = true;
        }
    } else {


        answers[currentQuestionIndex] = input.id;

        //var trueAnswer = questions[currentQuestionIndex].answers.find(a => a.isCorrect == true);

        //if (trueAnswer.answerText == input.id) {

        //    if (currentQuestionIndex != answerIndex) {
        //        answers += 1;
        //        answerIndex = currentQuestionIndex;
        //    }
            
        //}
        
        //console.log(answers);
        nextBtn.disabled = false;
    }
});

// ! :::::::::::::::::::     fuction

let currentQuestionIndex = 0;
let answerIndex;

var interval;

function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    interval = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.text(minutes + ":" + seconds);

        if (timer == 0) {

            Results();

        } else {
            timer--;
        }
    }, 1000);
}


function startTest() {
    stepper[0].classList.remove("select");
    stepper[1].classList.add("select");
    testBtn.style.display = "none";
    Préambule.style.display = "none";
    questionnaire.style.display = "block";
    previousBtn.classList.add("hide");
    nextBtn.disabled = true;
    showQuestion(questions[currentQuestionIndex]);
    folowProgress(currentQuestionIndex);

    var fiveMinutes = 60 * 5,
        display = $('#time');
    startTimer(fiveMinutes, display);
}

nextBtn.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        showQuestion(questions[currentQuestionIndex]);
        folowProgress(currentQuestionIndex);
        
        transition("next");
        nextBtn.disabled = true;
        if (currentQuestionIndex === questions.length - 1) {
            nextBtn.innerText = "Terminer le test";
            nextBtn.classList.add("result");
            const resultBtn = document.querySelector(".result");
            resultBtn.addEventListener("click", Results);
        } else {
            nextBtn.innerText = "Suivant";
        }
    }
});



function showQuestion(question) {
    var number = currentQuestionIndex + 1;
    currentquestion.innerText = "Q" + number  +'-  ' + question.questionText;
    answerInputs.innerHTML = ""; 

    const answers = question.answers;



    answers.forEach((answer) => {
        answerInputs.innerHTML += `
                <div class="form-check ml-5 ">
                    <input type="radio"  class="form-check-input "  name="${question.Id}" id="${answer.id}">
                    <label   class="form-check-label h4 ml-2 pb-2 " style="color:#787878;"  for="${answer.id}">
                    <span>${answer.answerText}</span>
                     </label>
                </div>`;
    });

}

 

function folowProgress(number) {
    const currentNmber = number + 1;

    questionNumber.innerText = currentNmber;
    progressBar.style.width = `calc(${currentNmber} * calc(100% / ${questions.length }))`;
}

function transition(frame) {
    animateBox.style.animation = ` ${frame} .5s ease `;
    animateBox.addEventListener("animationend", () => {
        animateBox.style.animation = ``;
    });
}

let answers = [];

let score = 0;

function Results() {

    clearInterval(interval);

    for (var i = 0; i < questions.length; i++) {

        var trueAnswer = questions[i].answers.find(a => a.isCorrect == true);

        if (trueAnswer.id == answers[i]) {
            score++ ;
        }



    }

    console.log(score);

     $.ajax({
     url: '/Record/Create',
         type: 'Post',
         contentType: 'application/x-www-form-urlencoded',

     data:{

         score: score 

     },
     success: function (data) {
         console.log(data);
     },
     error: function (err) {
         alert(err.status + ": error : " + err.responseText);
     }
 });
   

    showResult(score);


}

function showResult(score) {
    stepper[1].classList.remove("select");
    stepper[2].classList.add("select");
    testBtn.style.display = "block";
    testBtn.removeEventListener("click", startTest)
    questionnaire.style.display = "none";
    Préambule.style.display = "block";
    testBtn.textContent = " voir le résultat ";
    resultMessage.innerHTML = score + "/" + questions.length;

    resultMessage.style.color = score < questions.length / 2 ? "#d63031" : "#8EFA99"  ;
    resultMessage.style.fontSize = "50px";
    resultMessage.style.fontWeight = "bold";
    testBtn.addEventListener("click", () => {
        for (var i = 0; i < questions.length; i++) {

            testBtn.textContent = " Recommencer le test";
            
            testBtn.addEventListener("click", () => {
                resultBox.innerHTML = '';
                window.location.reload();
            });
            var trueAnswer = questions[i].answers.find(a => a.isCorrect == true);

            if (trueAnswer.id == answers[i]) {

                resultBox.innerHTML += `<section class="Préambule" style="background-color: #8EFA99;" >
                                         <p style=" font-weight : bold; font-size : 24px"; >
                                           Q-${i + 1}      ${questions[i].questionText}
                                         </p>

  
                                         <p style=" font-weight : bold; font-size : 20px"; >
                                            -${trueAnswer.answerText}

                                         </p>
                                        </section>`

            } else {

                resultBox.innerHTML += `<section class="Préambule" style="background-color: #F59C8C;" >
                                         <p style=" font-weight : bold; font-size : 24px"; >
                                           Q-${i + 1}       ${questions[i].questionText}
                                         </p>

  
                                         <p style=" font-weight : bold; font-size : 20px"; >
                                            -${trueAnswer.answerText}

                                         </p>
                                        </section>`

            }



        }
        

    });


   

}











// $.ajax({
//     url: '/Question/questions',
//     type: 'GET',
//     dataType: 'json',

//     contentType: 'application/json',
//     success: function (data) {
//         console.log(data);
//     },
//     error: function (err) {
//         alert(err.status + " : " + err.statusText);
//     }
// });








































