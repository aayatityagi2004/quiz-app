const URL = "https://opentdb.com/api.php?amount=5&category=19&difficulty=easy&type=multiple";

const questions = document.querySelector(".question-container");
const choices = document.querySelector("#option-buttons");
const next = document.querySelector(".NEXT");
const exit = document.querySelector(".EXIT");
let counter=0;

let currentindex = 0;
let quizzes = [];
async function getdata (){
    let response = await fetch(URL);
    let data = await response.json();
    quizzes = data.results;
    printData();
    getChoices();
    console.log(quizzes);
}

function printData(){
   questions.innerHTML = quizzes[currentindex].question;
};

 next.addEventListener('click',() => {
    currentindex ++;
    printData();
    getChoices();
    }
);

exit.addEventListener("click", ()=>{
    alert(`Your Final Score is ${counter}`)
    counter=0;
    document.querySelector("#counter")=counter;
});

function getChoices(){
    let allAnswers = [...quizzes[currentindex].incorrect_answers, quizzes[currentindex].correct_answer];
    allAnswers.sort(()=> Math.random() - 0.5);
    choices.innerHTML="";
    for(let i=0; i<allAnswers.length; i++){
        let btn = document.createElement("button");
        btn.innerText = allAnswers[i];
        btn.className= "option-buttons";
        btn.addEventListener('click', ()=> checkAnswer(allAnswers[i]));
        choices.appendChild(btn);
    }
};

function checkAnswer(selectedAnswer){
    const correctAnswer = quizzes[currentindex].correct_answer;
    if(selectedAnswer===correctAnswer){
        alert("CORRECT ANSWER!!");
        counter++;
        document.getElementById("counter").innerText = counter;
    }else {
        alert(`WRONG! The correct answer is: ${correctAnswer}`);
    }
    currentindex ++;
    printData();
    getChoices();
}


getdata();
