const inputAddWord = document.querySelector('.input-add-word'); // get input for add words
const buttonAddWord = document.querySelector('#save'); // get button for save words
let words = ["caballo", "perro", "gato", "manzana", "pera", "desayuno", "huevo", "cocina", "doctor", "verano", "invierno", "vaso", "hormiga", "pantalon", "codigo", "abejas", "perdon", "Dios", "pereza", "sandwich", "pepino", "tuberculo", "persona", "frances", "torre", "maravilla", "maiz", "prensa", "hola", "programa", "proceso", "usuario"]; // words to guess


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
    if (isNaN(sessionStorage.key(i)) == true)
    {
        words.push(sessionStorage.getItem(sessionStorage.key(i)));
    }
}

//---------------------- beginning code for words --------------------

// function to separate words

function randWord(array)
{
    let rand = Math.random()*array.length | 0;

    if (!(rand in sessionStorage))
    {
        sessionStorage.setItem(rand, rand);
    }
    else 
    {
        let i = 0;
        while (rand in sessionStorage && (i < array.length))
        {
            rand = Math.random()*array.length | 0;
            i++;
            if (i === array.length)
            {
                alert('Ya no hay más palabras, ve al inicio y añade nuevas palabras');
            }
        }
    }
    
    let rValue = array[rand];
    return rValue;
}