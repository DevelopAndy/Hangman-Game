const inputAddWord = document.querySelector('.input-add-word'); // get input for add words
const buttonAddWord = document.querySelector('.btn-save'); // get button for save words
let words = ["caballo", "perro", "gato", "manzana", "pera", "desayuno", "huevo", "cocina", "doctor", "verano", "invierno"]; // words to guess


// saving new words in sessionstorage
buttonAddWord.addEventListener('click', (event) => {

    if (inputAddWord.value.length > 0) {
        sessionStorage.setItem("words", inputAddWord.value);
    }

    location = "game.html"; // open game page
}); 

// adding new words in array 'words'
if (sessionStorage.length > 1) {
    words.push(sessionStorage.getItem("words"));
}

//---------------------- beginning code for words --------------------

// function to separate words
function randWord(array)
{
    let rand = Math.random()*array.length | 0;
    let rValue = array[rand];
    return rValue;
}