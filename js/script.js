import { wordList } from "./word.js";

const inputs = document.querySelector(".inputs");
const resetBtn = document.querySelector(".reset-btn");
const hint= document.querySelector(".hint span");
const typingInput=document.querySelector(".typing-input");
const wrongLetter =  document.querySelector(".wrong-letter span");
const guessLeft = document.querySelector(".guess-left span")
let word,maxGuesses,incorrect= [],corrects=[];
function randWord(){
    //getting random object from wordList
    let randObj = wordList[Math.floor(Math.random() * wordList.length)];
    word = randObj.word;  //getting random word
    maxGuesses=8; incorrect=[]; corrects=[];
    hint.innerText = randObj.hint;
    guessLeft.innertext = maxGuesses;
    let html="";
    for (let i = 0; i < word.length; i++) {
        html+=`<input type="text" disabled> `;
    }
    inputs.innerHTML =html;
}
function initGame(e){
    let key = e.target.value;
    if(key.match(/^[A-Za-z]+$/) && !incorrect.includes(`${key}`) && !corrects.includes(key)){
        console.log(key);
        if(word.includes(key)){
            //showing match letter in Input
            for(let i=0;i<word.length;i++){
                if(word[i] === key){
                    corrects.push(key);
                    inputs.querySelectorAll("input")[i].value = key;
                }
            }
        }else{
            maxGuesses--; // decrementing maxGuesses by 1
            incorrect.push(`${key}`);
        }
        guessLeft.innerText = maxGuesses;
        wrongLetter.innerText = incorrect;
    }
   
    typingInput.value="";
    setTimeout(()=>{
        if(corrects.length === word.length){
            alert(`Congrats you have found the word : ${word.toUpperCase()}`);
            randWord();
        }
        else if(maxGuesses < 1){
            alert("Game over... you don't have remaining guesses");
                //showing all letters in the Input
                for(let i=0;i<word.length;i++){
                        inputs.querySelectorAll("input")[i].value = word[i];
                }
        }
    });

}
resetBtn.addEventListener("click",randWord);
typingInput.addEventListener("input",initGame);
inputs.addEventListener("click",()=>typingInput.focus());
document.addEventListener("keydown",() => typingInput.focus());
