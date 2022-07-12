//bringing the canvas to draw
const canvas = document.querySelector('canvas'), 
      context = canvas.getContext('2d');

//draw head
function drawHead()
{
    context.beginPath();
    context.arc(360,50,20,0,2*Math.PI);
    context.stroke();
}      

//draw lines
function draw(xi,yi,xf,yf) 
{
    context.beginPath();
    context.lineWidth = 3;
    context.moveTo(xi, yi);
    context.lineTo(xf, yf);
    context.stroke();
}

draw(200,199,400,199); //base
draw(230,200,230,0); //pole
draw(230,1,360,1); //ceiling
draw(360,0,360,30); //rope

//---------------------- beginning code for words --------------------

// words to guess
const words = ["caballo", "perro", "gato", "manzana", "pera", "desayuno", "huevo", "cocina", "doctor", "verano", "invierno"];

// function to separate words
function randWord(array)
{
    let rand = Math.random()*array.length | 0;
    let rValue = array[rand];
    return rValue;
}

// code to not repeat the words

// wordGame = [];

// for (let i in words)
// { 
//     newWord = randWord(words);
//     while (wordGame.includes(newWord))
//     {
//         newWord = randWord(words);
//     }
    
//     wordGame.push(newWord);

//     console.log(firstWord);
// }

// ------------- beginning code for to create tags and seperate letters -------------------

const hiddenWord = document.querySelector('#hidden-word'); // bringing the div were the word will go to guess
let dividedWord = randWord(words).split(''); // dividing the word to guess
let result =[]; // capturing each letter of the word to guess

// creating the div for the word to guess
for (let i in dividedWord) //creating a div for each letter of the word to guess
{
    let divLetters = document.createElement('div'); //creating the div
    divLetters.classList.add('guess', 'invisible-word'); // adding the class to the div
    divLetters.textContent = dividedWord[i].toLocaleUpperCase(); //assigning the content to the div... the content is the separate word
    result.push(dividedWord[i].toLocaleUpperCase()); //adding the content in a variable outside

    hiddenWord.appendChild(divLetters); //putting divLetters div into hiddenWord div
}

// ------------- beginning code for incorrect letters and for drawing body parts --------------

const $html = document.querySelector('html'); //getting all html elements
const guess = document.querySelectorAll('.guess'); // getting all created div
const failWord = document.querySelector('#fail-word'); // getting the div were the incorrect letter will go 
let lives= 6; // number of lives in the game
let guessed = []; // creating a new array of guessed letters

// function to guess word and show wrong letters
const guessWord = (event) => {
    let inputText = (event.key).toLocaleUpperCase(); // capturing the keyboard
    const pattern = new RegExp('^[A-Z]$'); // creating a regex pattern for the keyboard
    let exist = false; // checking if letter dont exist in the word to guess

    for (let i in result) // loop for check the letter in the word to guess
    {
        if (result[i].includes(inputText)) // checking if the pressed character is in the word to guess
        {
            guess[i].classList.remove('invisible-word'); // removing the class from the letter
            exist = true; // the letter exist in the word to guess
            guessed.splice(i, 0, result[i]); // prueba
            if (result.length == guessed.length)
            {
                const container = document.querySelector('.container'), // get conatiner div
                gameOver = document.createElement('div'); // creating game-ove div
                
                gameOver.classList.add('game-over'); // add class to div 
                gameOver.textContent = '¡GANASTE!'; // add text content

                container.appendChild(gameOver); // putting gameOver div into container div

                $html.removeEventListener('keyup', guessWord); // remove event listener from html
            }
        }
    }

    if (exist == false) //if the letter is not in the word to guess
    {
        if (pattern.test(inputText)) // checking if the pressed character is in the regex pattern
        {
            failWord.textContent += inputText; // writing the letter failed in the div
            switch (lives){ // drawing body parts according to lives 
                case 6:
                    drawHead(); // draw head
                    break;
                case 5:
                    draw(360,70,360,130); // draw body
                    break;
                case 4:
                    draw(360,130,380,170); // draw right leg
                    break;
                case 3:
                    draw(360,130,340,170); // draw left leg
                    break;
                case 2:
                    draw(360,80,380,120); // draw right arm
                    break;
                case 1:
                    draw(360,80,340,120); // draw left arm
                    break;
                case 0:
                    draw(320,70,400,70); // dead
                    const container = document.querySelector('.container'), // get conatiner div
                          gameOver = document.createElement('div'); // creating game-ove div
                          
                    gameOver.classList.add('game-over'); // add class to div 
                    gameOver.textContent = '¡PERDISTE!'; // add text content

                    container.appendChild(gameOver); // putting gameOver div into container div

                    $html.removeEventListener('keyup', guessWord); // remove event listener from html
                    break;
            }
            lives--; // decrease the number of lives by 1
        }
    } 
}

// adding a event listener for the html
$html.addEventListener('keyup', guessWord);

// ------------------- beginning code for new game button and desist -------------------------

const NewGame = document.querySelector('#newGame'); // get new game button
NewGame.addEventListener('click', _=> {location.reload();}) //reload the game

// ------------------- beginning code for when you finish the game ------------------------

