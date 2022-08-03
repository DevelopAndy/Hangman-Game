//bringing the canvas to draw
const canvas = document.querySelector('canvas'), 
      context = canvas.getContext('2d');

//draw head
function drawHead(x,y,r)
{
    context.beginPath();
    context.arc(x,y,r,0,2*Math.PI);
    context.strokeStyle = '#d2ccc3';
    context.stroke();
}      

//draw lines
function draw(xi,yi,xf,yf) 
{
    context.beginPath();
    context.lineWidth = 3;
    context.moveTo(xi, yi);
    context.lineTo(xf, yf);
    context.strokeStyle = '#d2ccc3';
    context.stroke();
}

// code to change the size of the drawing depending on the size of the screen
const mediumBp = matchMedia("(max-width:768px)");
const shortBp = matchMedia("(max-width:400px)");
const smallBp = matchMedia("(max-height:450px)");

const keyboard = document.querySelector("#keyboard");

function changeSize()
{
    if (smallBp.matches == true)
    {
        canvas.style.height = "100px";
        canvas.style.width = "200px";

        draw(60,199,530,199); //base
        draw(150,200,150,0); //pole
        draw(150,1,450,1); //ceiling
        draw(450,0,450,30); //rope

        keyboard.classList.remove("invisible");
    }
    else if (shortBp.matches == true) 
    {
        canvas.style.height = "250px";
        canvas.style.width = "375px";

        draw(60,199,530,199); //base
        draw(150,200,150,0); //pole
        draw(150,1,450,1); //ceiling
        draw(450,0,450,30); //rope

        keyboard.classList.remove("invisible");
    }
    else if (mediumBp.matches == true)
    {
        canvas.style.height = "400px";
        canvas.style.width = "600px";

        draw(160,199,440,199); //base
        draw(220,200,220,0); //pole
        draw(220,1,400,1); //ceiling
        draw(400,0,400,30); //rope

        keyboard.classList.remove("invisible");
    }
    else
    {
        draw(200,199,400,199); //base
        draw(230,200,230,0); //pole
        draw(230,1,360,1); //ceiling
        draw(360,0,360,30); //rope
    }
}

mediumBp.addListener(changeSize);
shortBp.addListener(changeSize);
smallBp.addListener(changeSize);
changeSize();

// ------------- beginning code for to create tags and seperate letters -------------------

const hiddenWord = document.querySelector('#hidden-word'); // bringing the div were the word will go to guess
let dividedWord = randWord(words).split(''); // dividing the word to guess
let result =[]; // capturing each letter of the word to guess

// creating the div for the word to guess
for (let i in dividedWord) // creating a div for each letter of the word to guess
{
    let divLetters = document.createElement('div'); //creating the div
    divLetters.classList.add('guess', 'invisible-word'); // adding the class to the div
    divLetters.textContent = dividedWord[i].toLocaleUpperCase(); //assigning the content to the div... the content is the separate word
    result.push(dividedWord[i].toLocaleUpperCase()); //adding the content in a variable outside

    hiddenWord.appendChild(divLetters); //putting divLetters div into hiddenWord div
}

// ------------- beginning code for incorrect letters and for drawing body parts --------------

const $html = document.querySelector('html'); // getting all html elements
const guess = document.querySelectorAll('.guess'); // getting all created div
const failWord = document.querySelector('#fail-word'); // getting the div were the incorrect letter will go 
let lives= 6; // number of lives in the game
let guessed = result; // array to verify if you win the game
let removeLetter = [];

// function to guess word and show wrong letters
const guessWord = (event) => {
    let inputText = (event.key).toLocaleUpperCase(); // capturing the keyboard
    let keyboardContent = keyboard.value.charAt(keyboard.value.length - 1).toLocaleUpperCase()
    const pattern = new RegExp('^[A-Z]$'); // creating a regex pattern for the keyboard
    let exist = false; // checking if letter dont exist in the word to guess

    for (let i in result) // loop to check the letter in the word to guess
    {
        if (mediumBp.matches == true || shortBp.matches == true || smallBp.matches == true)
        {
            if (result[i].includes(keyboardContent))
            {
                removeLetter = guessed.filter((item) => item !== keyboardContent); // remove guessed letter of array 'guessed'

                guessed = removeLetter; // now array 'guessed' doesn't contain the guessed letter
            
                guess[i].classList.remove('invisible-word'); // removing the class from the letter
                exist = true; // the letter exist in the word to guess

                // code for when you win the game
                if (guessed.length == 0) // When array 'guessed' is empty, then, you win the game
                {
                    const container = document.querySelector('.container'), // get conatiner div
                    gameOver = document.createElement('div'); // creating game-over div
                    
                    gameOver.classList.add('game-over'); // add class to div 
                    gameOver.textContent = '¡GANASTE!'; // add text content

                    container.appendChild(gameOver); // putting gameOver div into container div

                    $html.removeEventListener('keyup', guessWord); // remove event listener from html
                }
            }
        }
        else
        {
            if (result[i].includes(inputText)) // checking if the pressed character is in the word to guess
            {        
                removeLetter = guessed.filter((item) => item !== inputText); // remove guessed letter of array 'guessed'

                guessed = removeLetter; // now array 'guessed' doesn't contain the guessed letter
                
                guess[i].classList.remove('invisible-word'); // removing the class from the letter
                exist = true; // the letter exist in the word to guess

                // code for when you win the game
                if (guessed.length == 0) // When array 'guessed' is empty, then, you win the game
                {
                    const container = document.querySelector('.container'), // get conatiner div
                    gameOver = document.createElement('div'); // creating game-over div
                    
                    gameOver.classList.add('game-over'); // add class to div 
                    gameOver.textContent = '¡GANASTE!'; // add text content

                    container.appendChild(gameOver); // putting gameOver div into container div

                    $html.removeEventListener('keyup', guessWord); // remove event listener from html
                }
            }
        }
    }

    if (exist == false) //if the letter is not in the word to guess
    {
        if (mediumBp.matches == true || shortBp.matches == true || smallBp.matches == true)
        {
            if (pattern.test(keyboardContent)) // checking if the pressed character is in the regex pattern
            {
                failWord.textContent += keyboardContent; // writing the letter failed in the div
                switch (lives){ // drawing body parts according to lives 
                    case 6:
                        if (shortBp.matches == true)
                        {
                            drawHead(450,55,25); // draw head
                        }
                        else if (mediumBp.matches == true)
                        {
                            drawHead(400,50,20); // draw head
                        }
                        else
                        {
                            drawHead(360,50,20); // draw head
                        }
                        
                        break;
                    case 5:
                        if (shortBp.matches == true)
                        {
                            draw(450,80,450,150); // draw body
                        }
                        else if (mediumBp.matches == true)
                        {
                            draw(400,70,400,140); // draw body
                        }
                        else
                        {
                            draw(360,70,360,130); // draw body
                        }
                        break;
                    case 4:
                        if (shortBp.matches == true)
                        {
                            draw(450,150,480,190); // draw right leg
                        }
                        else if (mediumBp.matches == true)
                        {
                            draw(400,140,430,170); // draw right leg                        
                        }
                        else
                        {
                            draw(360,130,380,170); // draw right leg
                        }
                        break;
                    case 3:
                        if (shortBp.matches == true)
                        {
                            draw(450,150,420,190); // draw left leg
                        }
                        else if (mediumBp.matches == true)
                        {
                            draw(400,140,370,170); // draw left leg                        
                        }
                        else
                        {
                            draw(360,130,340,170); // draw left leg   
                        }
                        break;
                    case 2:
                        if (shortBp.matches == true)
                        {
                            draw(450,90,420,140); // draw right arm
                        }
                        else if (mediumBp.matches == true)
                        {
                            draw(400,80,420,120); // draw right arm
                        }
                        else
                        {
                            draw(360,80,380,120); // draw right arm
                        }
                        break;
                    case 1:
                        if (shortBp.matches == true)
                        {
                            draw(450,90,480,140); // draw left arm
                        }
                        else if (mediumBp.matches == true)
                        {
                            draw(400,80,380,120); // draw left arm                        
                        }
                        else
                        {
                            draw(360,80,340,120); // draw left arm
                        }
                        break;
                    case 0:
                        if (shortBp.matches == true)
                        {
                            draw(400,80,500,80); // dead
                        }
                        else if (mediumBp.matches == true)
                        {
                            draw(360,70,440,70); // dead                        
                        }
                        else
                        {
                            draw(320,70,400,70); // dead
                        }
                        const container = document.querySelector('.container'), // get conatiner div
                              gameOver = document.createElement('div'); // creating game-ove div
                              
                        gameOver.classList.add('game-over'); // add class to div 
                        gameOver.textContent = '¡PERDISTE!'; // add text content
    
                        container.appendChild(gameOver); // putting gameOver div into container div
    
                        $html.removeEventListener('keyup', guessWord); // remove event listener from html
                        break;
                }
            }
        }
        else
        {        
            if (pattern.test(inputText)) // checking if the pressed character is in the regex pattern
            {
                failWord.textContent += inputText; // writing the letter failed in the div
                switch (lives){ // drawing body parts according to lives 
                    case 6:
                        if (shortBp.matches == true)
                        {
                            drawHead(450,55,25); // draw head
                        }
                        else if (mediumBp.matches == true)
                        {
                            drawHead(400,50,20); // draw head
                        }
                        else
                        {
                            drawHead(360,50,20); // draw head
                        }
                        
                        break;
                    case 5:
                        if (shortBp.matches == true)
                        {
                            draw(450,80,450,150); // draw body
                        }
                        else if (mediumBp.matches == true)
                        {
                            draw(400,70,400,140); // draw body
                        }
                        else
                        {
                            draw(360,70,360,130); // draw body
                        }
                        break;
                    case 4:
                        if (shortBp.matches == true)
                        {
                            draw(450,150,480,190); // draw right leg
                        }
                        else if (mediumBp.matches == true)
                        {
                            draw(400,140,430,170); // draw right leg                        
                        }
                        else
                        {
                            draw(360,130,380,170); // draw right leg
                        }
                        break;
                    case 3:
                        if (shortBp.matches == true)
                        {
                            draw(450,150,420,190); // draw left leg
                        }
                        else if (mediumBp.matches == true)
                        {
                            draw(400,140,370,170); // draw left leg                        
                        }
                        else
                        {
                            draw(360,130,340,170); // draw left leg   
                        }
                        break;
                    case 2:
                        if (shortBp.matches == true)
                        {
                            draw(450,90,420,140); // draw right arm
                        }
                        else if (mediumBp.matches == true)
                        {
                            draw(400,80,420,120); // draw right arm
                        }
                        else
                        {
                            draw(360,80,380,120); // draw right arm
                        }
                        break;
                    case 1:
                        if (shortBp.matches == true)
                        {
                            draw(450,90,480,140); // draw left arm
                        }
                        else if (mediumBp.matches == true)
                        {
                            draw(400,80,380,120); // draw left arm                        
                        }
                        else
                        {
                            draw(360,80,340,120); // draw left arm
                        }
                        break;
                    case 0:
                        if (shortBp.matches == true)
                        {
                            draw(400,80,500,80); // dead
                        }
                        else if (mediumBp.matches == true)
                        {
                            draw(360,70,440,70); // dead                        
                        }
                        else
                        {
                            draw(320,70,400,70); // dead
                        }
                        const container = document.querySelector('.container'), // get conatiner div
                            gameOver = document.createElement('div'); // creating game-ove div
                            
                        gameOver.classList.add('game-over'); // add class to div 
                        gameOver.textContent = '¡PERDISTE!'; // add text content

                        container.appendChild(gameOver); // putting gameOver div into container div

                        $html.removeEventListener('keyup', guessWord); // remove event listener from html
                        break;
                }
            }
        }
        lives--; // decrease the number of lives by 1
    } 
}

// adding an event listener for the html
$html.addEventListener('keyup', guessWord);

// ------------------- beginning code to new game button and desist -------------------------

const NewGame = document.querySelector('#newGame'); // get new game button
NewGame.addEventListener('click', _=> {location.reload();}) //reload the game