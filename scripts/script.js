//bringing the canvas to draw
const canvas = document.querySelector('canvas'), 
      context = canvas.getContext('2d');

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
draw(360,70,360,130); //body
draw(360,130,380,170); //right leg
draw(360,130,340,170); //left leg
draw(360,80,380,120); //right arm
draw(360,80,340,120); //left arm

//draw head
context.beginPath();
context.arc(360,50,20,0,2*Math.PI);
context.stroke();

//---------------------- beginning code for words --------------------

const words = ["caballo", "perro", "gato", "manzana", "pera", "desayuno", "huevo", "cocina", "doctor", "verano", "invierno"];

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

const hiddenWord = document.querySelector('#hidden-word');
let dividedWord = randWord(words).split('');

for (let i in dividedWord)
{
    let letters = document.createElement('p');
    letters.classList.add('invisible-word');
    letters.textContent = dividedWord[i].toLocaleUpperCase();

    hiddenWord.appendChild(letters);
}







