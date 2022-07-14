const inputAddWord = document.querySelector('.input-add-word'); // get input for add words
const buttonAddWord = document.querySelector('.btn-save'); // get button for save words

// add more words
buttonAddWord.addEventListener('click', (event) => {
    addWord(inputAddWord.value);
    console.log(words);
}); 