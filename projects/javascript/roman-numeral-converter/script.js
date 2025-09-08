const userInput = document.getElementById("number");
const result = document.getElementById("output");
const convertButton = document.getElementById("convert-btn");


const convertRoman = () => {

    result.style.border =  "0.1rem solid";

    let num = parseInt(userInput.value);
    let roman = "";

    if (isNaN(num)) {
        result.innerText = "Please enter a valid number";
        return;
    }

    if (num < 1) {
        result.innerText = "Please enter a number greater than or equal to 1";
        return;
    }

    if (num < 4000) {

        while (num >= 1000) {

            num -= 1000;
            roman += "M";

        }

        while (num >= 900) {

            num -= 900;
            roman += "CM";

        }

        while (num >= 500) {

            num -= 500;
            roman += "D";

        }

        while (num >= 400) {

            num -= 400;
            roman += "CD";

        }

        while (num >= 100) {

            num -= 100;
            roman += "C";

        }

        while (num >= 90) {

            num -= 90;
            roman += "XC";

        }

        while (num >= 50) {

            num -= 50;
            roman += "L";

        }

        while (num >= 40) {

            num -= 40;
            roman += "XL";

        }

        while (num >= 10) {

            num -= 10;
            roman += "X";

        }

        while (num >= 9) {

            num -= 9;
            roman += "IX";

        }

        while (num >= 5) {

            num -= 5;
            roman += "V";

        }

        while (num >= 4) {

            num -= 4;
            roman += "IV";

        }

        while (num >= 1) {

            num -= 1;
            roman += "I";

        }

        result.innerText = roman;
        return;

    } else if (num >= 4000) {

        result.innerText = "Please enter a number less than or equal to 3999";
        return;
        
    } else {
        return;
    }

}

convertButton.addEventListener("click", convertRoman);