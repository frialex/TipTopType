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

    //answer.addEventListener('input', pushInput);
    answer.onkeydown = pushInput; //doesn't capture shift
    //answer.onkeyup = pushInput;

}

var inputQueue = [];
function pushInput(kpe){
    var keyCode = kpe.keyCode;
    console.log("Receive keyCode: " + keyCode);
    if( keyCode == 8) {
        inputQueue.pop();
    }
    if( keyCode >= 65 ){
        var key = String.fromCharCode(keyCode);
        if(!kpe.shiftKey)
            key = key.toLowerCase();
        inputQueue.push(key);
        console.log(inputQueue);
    }
}

function mainLoop(time){
    var next = curword;

    check(curword, answer);

    highlightMatched(curword, answer);

    //console.log('next: ' + next);

    next ? requestAnimationFrame(mainLoop)
         : console.log('game over');

}

//                          DOM     DOM
function highlightMatched(curword, answer){
     input = inputQueue.slice(0, inputQueue.length);
     wordlist = Array.prototype.slice.call( curword.children,
                                            0,
                                            answer.value.length);
    //FUCK!!! now the cases matter!!! fuckkk
        //TODO: back to pushInput and check for case
    wordlist.forEach(function(c, i) {
        if(c.classList.contains(input[i])){
            c.classList.add('complete');
            //in case user backspaced
            c.classList.remove('wrong');
        } else {
            c.classList.add('wrong');
        }
    });
}

function check(word, answer){
    var processNext = true;
    if(answer.value == word.innerText){

        console.log('Good Typing!');
        curword.classList.remove('current');
        curword.classList.add('complete');
        answer.value = '';
        inputQueue.splice(0, inputQueue.length);

        next = curword.nextSibling;
        curword = next;
        curword ? curword.classList.add('current')
                : processNext = false;

    } else {
        //show error

    }

    return processNext;
}

