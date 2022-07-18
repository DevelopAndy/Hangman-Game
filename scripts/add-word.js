const inputAddWord = document.querySelector('.input-add-word'); // get input for add words
const buttonAddWord = document.querySelector('.btn-save'); // get button for save words
let words = ["caballo", "perro", "gato", "manzana", "pera", "desayuno", "huevo", "cocina", "doctor", "verano", "invierno"]; // words to guess


// saving new words in sessionstorage
buttonAddWord.addEventListener('click', (event) => {

    if (inputAddWord.value.length > 0) {
        if (sessionStorage.getItem(inputAddWord.value) == null) {
        sessionStorage.setItem(inputAddWord.value, inputAddWord.value);
        }
    }

    location = "game.html"; // open game page
}); 

// adding new words in array 'words'
for (let i=0; i<sessionStorage.length; i++)
{    
    words.push(sessionStorage.getItem(sessionStorage.key(i)));
}

//---------------------- beginning code for words --------------------

// function to separate words
function randWord(array)
{
    let rand = Math.random()*array.length | 0;
    let rValue = array[rand];
    return rValue;
}