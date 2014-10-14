var words;
var curword;
var answer;

var anotherGame;


document.addEventListener('DOMContentLoaded', function(e){
    console.log('DOM Ready');
    clientInit();

});

var round = 1;
function clientInit(){

    //cache a list of p tags from article
    words = document.getElementsByClassName('word');
    answer = document.getElementById('answer');

    var anotherGame = document.getElementById('another');

    curword = words[0];
    curword.classList.add('current');

    var exceptional = document.getElementsByClassName('exceptional');
    if(exceptional.length){
        var fontsize = 1 + round*50/100;
        exceptional[0].style.fontSize = fontsize + 'em';
        exceptional[0].dataset.round = round;
        if(round > 5 ) {
            exceptional[0].dataset.font = 'large';
        }
    }

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

function roundOver(){
    round++;

    $('.complete').removeClass('complete');

    clientInit();
}
function mainLoop(time){

    var keepGoing = check(curword, answer);

    keepGoing   ? requestAnimationFrame(mainLoop)
                : roundOver();

}

//                          DOM     DOM
function highlightMatched(curword, answer){
//TODO: these are global to ease in debug.. scope to local
     input = inputQueue.slice(0, inputQueue.length);
     var inputLength = answer.value.length;
     wordlist = Array
                .prototype
                .slice
                .call( curword.children, 0, inputLength );

    wordlist.forEach(function(c, i) {
        if(c.classList.contains(input[i])){
            c.classList.add('complete');
            //in case user backspaced
            c.classList.remove('wrong');
        } else {
            c.classList.add('wrong');
        }
    });

    backspaced = Array
                .prototype
                .slice
                .call( curword.children, inputLength, curword.childElementCount);
    backspaced.forEach(function(c, i){
        c.classList.remove('wrong');
        c.classList.remove('complete');
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

        //becaue highlight wont run for this word
        curword.lastChild.classList.add('complete');

        next = curword.nextSibling;
        if(next) {
            curword = next;
            curword.classList.add('current')
        } else {
            processNext = false;
        }

    } else {
        //show error
        highlightMatched(word, answer);
    }

    return processNext;
}

