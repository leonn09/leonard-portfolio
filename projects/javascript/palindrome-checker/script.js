const checkBtn = document.getElementById("check-btn");
const textInput = document.getElementById("text-input");
const result = document.getElementById("result");

checkBtn.addEventListener ("click", checkPalindrome);

function checkPalindrome () {
    const inputValue = textInput.value;
    const cleaned = inputValue.toLowerCase().replace(/[\W_]/g, '');
    const reversed = cleaned.split('').reverse().join('');
    if (inputValue=="") {
        alert("Please input a value")
    } else if  (cleaned === reversed) {
        result.innerText = `${inputValue} is a palindrome`;
    } else if (cleaned !== reversed){
        result.innerText = `${inputValue} is not a palindrome`;
    } else {
        alert("Sorry, the PALINDROMECHECKER is just a project for a freeCodeCamp course. If this alert was shown, you are probably testing it. I'm sorry I'm still learning.");
    }
}