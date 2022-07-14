//---------------------- beginning code for words --------------------

// words to guess
var words = ["caballo", "perro", "gato", "manzana", "pera", "desayuno", "huevo", "cocina", "doctor", "verano", "invierno"];

// function to add words to array

function addWord(word)
{
    words.push(word);
}

// function to separate words
function randWord(array)
{
    let rand = Math.random()*array.length | 0;
    let rValue = array[rand];
    return rValue;
}