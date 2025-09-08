const checkBtn = document.getElementById("check-btn");
const clearBtn = document.getElementById("clear-btn");

const userInput = document.getElementById("user-input");
const resultDiv = document.getElementById("results-div");

checkBtn.addEventListener("click", () => {
    const phoneNumber = userInput.value;
    const PhoneRegex = /^(1)?\s*(\d\d\d|\(\d\d\d\))(-|\s)*(\d\d\d)(-|\s)*(\d\d\d\d)$/;
    if (phoneNumber==="") {
        alert("Please provide a phone number");
        return;
    } else if (phoneNumber.match(PhoneRegex)) {
        resultDiv.textContent = `Valid US number: ${phoneNumber}`;
        resultDiv.style.color = "#00FF4C";
        
    } else {
        resultDiv.textContent = `Invalid US number: ${phoneNumber}`;
        resultDiv.style.color = "#FF4242";
    }
});

clearBtn.addEventListener("click", () => {
    userInput.value = "";
    resultDiv.textContent = "";
});