let $card = $('.flashcard');
const definition = document.querySelector('.definition')
const meaning = document.querySelector('.meaning')
const current_number = document.querySelector('.current-display') 
const current_number_progress = document.querySelector('.current-display-progress') 


let alphabet_definition = ['あ', 'い', 'う', 'え', 'お', 'か', 'き', 'く', 'け', 'こ', 'さ', 'し', 'す', 'せ', 'そ', 'た', 'ち', 'つ', 'て', 'と', 'な', 'に', 'ぬ', 'ね', 'の', 'は', 'ひ', 'ふ', 'へ', 'ほ', 'ま', 'み', 'む', 'め', 'も', 'や', 'ゆ', 'よ', 'ら', 'り', 'る', 'れ', 'ろ', 'わ', 'を', 'ん' ]

let alphabet_meaning = ['a', 'i', 'u', 'e', 'o', 'ka', 'ki', 'ku', 'ke', 'ko', 'sa', 'shi', 'su', 'se', 'so', 'ta', 'chi', 'tsu', 'te', 'to', 'na', 'ni', 'nu', 'ne', 'no', 'ha', 'hi', 'fu', 'he', 'ho', 'ma', 'mi', 'mu', 'me', 'mo', 'ya', 'yu', 'yo', 'ra', 'ri', 'ru', 're', 'ro', 'wa', 'wo', 'n']

$('.flashcard').click( function() {
    $card.toggleClass('is-active')
})

let current_index = 0;
let current_display = 1;

const left_arrow = document.querySelector('.left-arrow');
const right_arrow = document.querySelector('.right-arrow');

left_arrow.addEventListener('click', decrease);
right_arrow.addEventListener('click', increase);

function decrease() {
    if (current_index == 0 || current_display == 1) return;
    else {
        current_index --;
        current_display --;
        current_number.innerHTML = current_display;
        current_number_progress.innerHTML = current_display;
        definition.innerHTML = alphabet_definition[current_index];
        meaning.innerHTML = alphabet_meaning[current_index];
    }
}

function increase() {
    if (current_index == 45 || current_display == 46) return;
    else {
        current_index ++;
        current_display ++;
        current_number.innerHTML = current_display;
        current_number_progress.innerHTML = current_display;
        definition.innerHTML = alphabet_definition[current_index];
        meaning.innerHTML = alphabet_meaning[current_index];
    }
}

function load() {
    definition.innerHTML = alphabet_definition[0];
    meaning.innerHTML = alphabet_meaning[0];
}

window.onload = load();