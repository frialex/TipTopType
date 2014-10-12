var words;
var curword;
var answer;

var anotherGame;


document.addEventListener('DOMContentLoaded', function(e){
    console.log('DOM Ready');
    clientInit();

});

function clientInit(){

    //cache a list of p tags from article
    words = document.getElementsByClassName('word');
    answer = document.getElementById('answer');

    var anotherGame = document.getElementById('another');

    curword = words[0];
    curword.classList.add('current');

    answer.autocomplete = curword.innerText;

    requestAnimationFrame(mainLoop);

}

function mainLoop(time){
    var next = curword;

    check(curword, answer);

    console.log('next: ' + next);

    next ? requestAnimationFrame(mainLoop)
         : console.log('game over');

}

function check(word, answer){
    var processNext = true;
    if(answer.value == word.innerText){

        console.log('Good Typing!');
        curword.classList.remove('current');
        answer.value = '';

        next = curword.nextSibling;
        curword = next;
        curword ? curword.classList.add('current')
                : processNext = false;

    } else {
        //show error

    }

    return processNext;
}

