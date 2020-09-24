

// jQuery like selection of elements.
// window.$$ = document.querySelectorAll.bind(document);

let text = ''
const RANDOM_API_QUOTE_URL = 'https://api.quotable.io/random'

 async function getRandomQuotes(){
      return fetch(RANDOM_API_QUOTE_URL)
  .then(response => response.json())
  .then(data => data)
}




//Dom Elements
// let inputTextBox = window.$$('#inputTextBox')[0];

const language = document.getElementById('language');
const level = document.getElementById('level');
const btnStart = document.getElementById('btnStart');
const btnRefresh = document.getElementById('btnRefresh');
const quoteBox = document.getElementById('quoteBox');
const inputTextBox = document.getElementById('inputTextBox')
// let error = document.getElementById('error');
let timer = document.getElementById('timer');
// let wpm = document.getElementById('wpm');




let spanList = []

// let wordSection = window.$$('#wordSection')[0]

window.onload = function () {
    addText();

    spanList = document.getElementsByClassName('typing-character');
    if (spanList.length > 0) {
        spanList[0].classList.add('purple');
    }
    // console.log(spanList);
}

//Got error with geetting next text with Async func. so removed
async function addText() {
    let quote  = await getRandomQuotes()
    
   
    text = quote    .content
    let quoteContent = quote.content;

    text = quoteContent

    quoteContent.split('').map(element => {
        let spanNode = document.createElement('span');
        spanNode.innerText = element;
        spanNode.classList.add('typing-character')
        quoteBox.appendChild(spanNode)

    });

}

function calculateWpm(seconds,totalCharacter,uncorrectChar) {
    const minute = seconds / 60;

    grossWpm = Math.ceil((totalCharacter/5)/minute)
              
    let netWpm = Math.ceil(((totalCharacter/5)-uncorrectChar)/minute)

    let accuracy = Math.floor((netWpm/grossWpm)*100);


    return {'netWpm':netWpm,'accuracy':accuracy}
}

class typingTest {
    constructor() {
        this.index = 0; // main index
        this.totalWord = 0; //getting total words .
        this.words = 0; // completed word index
        this.errorWord = 0; // mistakely typed word
        this.correctWord = 0; // correct word index
        this.typing = false;// check if currently typing or not
        this.duration = 1;
        this.cpm = 0;
        this.wpm = 0;

        this.quote = []; //Copy of total text 
        this.language = language.value || 2;
    }

    performTest() {
        //Only if user is not started the typing 
        if (!this.typing) {
            this.typing = true;

            inputTextBox.addEventListener('keypress', event => {
                //prevent the deafult action 
                event.preventDefault();

                //if not event 
                event = event || window.event;


                //getting the pressed key code 
                let pressedKeyCode = event.which || event.keyCode;
          
                if(this.quote.charCodeAt(this.index) == '32'){
                    this.words++;
                   
                }
                
                // if(pressedKeyCode)

                //typed character 
                let typedChar = String.fromCharCode(pressedKeyCode);
           
                // console.log(this.language);
                if (this.language == 2) {
                    this.testEnglish(typedChar)
                }
            })
        }
    }

    endTest(intervalId = false) {
        if (intervalId) {
            clearInterval(intervalId)
            // this = self
        }
        inputTextBox.disabled = true; //disabling the input box 
        this.typing = false
        quoteBox.innerText = ''// clearing the input boxes
    
        let {netWpm,accuracy}= calculateWpm(30,this.index,this.errorWord)
        
        quoteBox.innerHTML = `
        <h1 class="bg-danger"> Your Net wpm is : ${netWpm} , </h1>
        <h2 class="bg-info"> Your Accuracy is ${accuracy} % </h2> 
        `
      


    }


    start(second) {
        // spanList[this.index].classList.add('purple');
        //1 .filter the quotes based on level later we could implement it .
   
        this.quote = text.trim()
    
        //focusing the typing area
        inputTextBox.disabled = false;
        inputTextBox.focus();

        let self = this
        let intervalId = setInterval(function () {
            if (second <= 0) {
                self.endTest(intervalId);
            } else {
                second--;
                timer.innerText = second
                this.duration = second

            }
        }, 1000)


        this.performTest();


    }



    addPurple() {
        if (this.quote.length == this.index) {
            // alert("entered here !!")
            quoteBox.innerText = ''
            this.quote = ''
            this.totalWord += this.index
            this.index = 0
            addText()
            console.log("text.............")
            console.log(text);
            this.quote = text.trim()
            // console.log(this.quote);

        }
        else {
            spanList[this.index].classList.add('purple');

        }
        // error.innerText = this.errorWord;
    }

    testEnglish(typedChar) {
        if (typedChar === this.quote.charAt(this.index)) {
            spanList[this.index].classList.remove('purple');
            spanList[this.index].classList.add('green');
            this.index++;
            this.correctWord++;
            this.addPurple();


        }
        else {
            spanList[this.index].classList.remove('purple');
            spanList[this.index].classList.add('red');

            this.index++;
            this.errorWord++;
            this.addPurple();

        }

    }

}


btnStart.addEventListener('click', function init() {
    let typing = new typingTest();
    typing.start(30);
});
btnRefresh.addEventListener('click', function () {
    location.reload();
})

