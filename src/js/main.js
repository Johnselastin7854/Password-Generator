const lengthSlider = document.querySelector(".pass-length input");
const generateBtn = document.querySelector(".generate-btn");
const passwordInput = document.querySelector(".input-box input");
const options = document.querySelectorAll(".option input");
const passwordIndicator = document.querySelector(".pass-indicator");
const copyIcon = document.querySelector(".input-box span");

const characters = {
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers: "0123456789",
  symbols: "^!$%&|{}[]:;.,*+_#@<>~",
};

// Generate Password
const generatePassword = () => {
  let staticPassword = "";
  randomPassword = "";
  excludeDuplicate = false;
  passLength = lengthSlider.value;

  options.forEach((option) => {
    // looping through each options checkbox
    if (option.checked) {
      // if the checkbox is checked
      if (option !== "exc-duplicate" && option.id !== "spaces") {
        // if checkbox is not exc-duplicate && spaces
        staticPassword += characters[option.id];
        // adding key value frim character object to staticPassword
      } else if (option.id === "spaces") {
        staticPassword += ` ${staticPassword}  `;
      } else {
        // else pass true to excludeDuplicate
        excludeDuplicate = true;
      }
    }
  });
  for (let i = 0; i < passLength; i++) {
    //getting randomChar from the staticPassword
    let randomChar =
      staticPassword[Math.floor(Math.random() * staticPassword.length)];
    if (excludeDuplicate) {
      // if excludeDuplicate is true
      // if randomPassword doesn't contains the current randomChar or randomChar is equal to space " " then add randomChar to randomPassword else decrement i by -1.
      !randomPassword.includes(randomChar) || randomChar == " "
        ? (randomPassword += randomChar)
        : i--;
    } else {
      //else add randomChar to randomPassword
      randomPassword += randomChar;
    }
    passwordInput.value = randomPassword; // Passing ranomPassword to passwordInput value
  }
};
// updatePasswordIndicator
const updatePasswordIndicator = () => {
  // if lengthSlider value is less than 8 pass "weak" as passIndicator id else if lengthSlider value is less than 16 then pass "medium" as i else pass "strong" as id.
  passwordIndicator.id =
    lengthSlider.value <= 8
      ? "weak"
      : lengthSlider.value <= 16
      ? "medium"
      : "strong";
};
//  Update Slider Value
function updateSlider() {
  // passing sliler value as counter
  document.querySelector(".pass-length span").innerHTML = lengthSlider.value;
  generatePassword();
  updatePasswordIndicator();
}
updateSlider();
//copyPassword
const copyPassword = () => {
  navigator.clipboard.writeText(passwordInput.value); // copying random password
  copyIcon.innerText = "check"; // changing copy icon to tick
  setTimeout(() => {
    // after 1500 ms, changing tick icon back to copy
    copyIcon.innerText = "copy_all";
  }, 1500);
};
// Events
lengthSlider.addEventListener("input", updateSlider);
generateBtn.addEventListener("click", generatePassword);
copyIcon.addEventListener("click", copyPassword);
