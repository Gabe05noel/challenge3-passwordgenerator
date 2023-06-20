// An Array initializing the special characters to be included in the password
var specialCharacters = [
  '@',
  '%',
  '#',
  '$',
  '%',
  '^',
  '&',
  '*',
  '(',
  ')',
  '_',
  '-',
  '+',
  '=',
  '!',
  '~',
  '{',
  '}',
  '[',
  ']',
  '|',
  '.',
  '<',
  '>',
  '?',
  '/',
  ':',
  ';'
];

// An Array initializing the numeric characters to be included in the password
var numericCharaters =[
  '0',
  '1', 
  '2', 
  '3', 
  '4', 
  '5', 
  '6', 
  '7', 
  '8', 
  '9'
];

// An Array initializing the lower case characters to be included in the password
var lowerCasedCharacters = [
'a', 
'b',
'c',
'd',
'e',
'f',
'g',
'h',
'i',
'j',
'k',
'l',
'm',
'n',
'o',
'p',
'q',
'r',
's',
't',
'u',
'v',
'w',
'x',
'y',
'z'
];

// An Array initializing the upper case characters to be included in the password
var upperCasedCharacters = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z'
];

// A function that chooses a random element from an array
function randomSelector(inputArray){
  if (inputArray && inputArray.length){
      var randomIndex = Math.floor(Math.random()  * inputArray.length);
      return inputArray[randomIndex]
  } else {
    return null;
  }
}

// A function that generates a random number between 0 to maximum
function randomNumberGenerator(max){  
  return Math.floor(Math.random() * max);

}

// A function that randomizes a string
function shuffleString(input){
  
  var stringArray = input.split("");
  for(var i=stringArray.length-1; i>=0; i--){
    var randomIndex = randomNumberGenerator(stringArray.length);
    console.log(`swap character at index ${i} with character at index ${randomIndex}`);
    var temp = stringArray[i];
    stringArray[i] = stringArray[randomIndex];
    stringArray[randomIndex] = temp;
  }

  return stringArray.join("");
}

console.log(shuffleString("Hello World!"));

// Returns an object with all options initialized
function getPasswordOptions(){
    
    var passwordLength = parseInt(prompt('How many characters would you like your password to contain?'), 10);

    if(Number.isNaN(passwordLength)){
      alert('Password length must be provided as number');
      return null;
    }

    // Returns an alert when criteria is below minimum password length
    if (passwordLength < 8){
      alert('Password length CANNOT be less than 8 characters');
      return null;
    }

    // Returns an alert when criteria is above maximum password length
    if(passwordLength > 128){
      alert('Password Length CANNOT be more than 128 characters')
      return null;
    }

    // variable to store boolean regarding the inclusion of special characters
    var hasSpecialCharacters = confirm('Click OK to confirm including special characters.');

    // variable to store boolean regarding the inclusion of numeric characters
    var hasNumbericCharacters = confirm('Click OK to confirm including numeric characters.');

    // variable to store boolean regarding the inclusion of lowercase characters
    var hasLowerCasedCharacters = confirm('Click OK to confirm including lowercase characters.');

    // variable to store boolean regarding the inclusiong of uppercase characters
    var hasUpperCasedCharacters = confirm('Click OK to conirm including uppercase characters');

    // Returns an object of all stored booleans
    return {
      passwordLength,
      hasNumbericCharacters,
      hasSpecialCharacters,
      hasLowerCasedCharacters,
      hasUpperCasedCharacters
    }

}

function generatePassword(){
  var passwordOptions =getPasswordOptions();
  return createPassword(passwordOptions);
}

function createPassword(passwordOptions){

  if (!passwordOptions){
    return "Invald Password Option!";
  }

  var selectableCharacters = [];
  var mustHaveCharacters = [];
  var result = [];

  if(passwordOptions.hasNumbericCharacters){
    selectableCharacters = selectableCharacters.concat(numericCharaters);
    mustHaveCharacters.push(randomSelector(numericCharaters));
  }

  if(passwordOptions.hasLowerCasedCharacters){
    selectableCharacters = selectableCharacters.concat(lowerCasedCharacters);
    mustHaveCharacters.push(randomSelector(lowerCasedCharacters));
  }

  if(passwordOptions.hasUpperCasedCharacters){
    selectableCharacters = selectableCharacters.concat(upperCasedCharacters);
    mustHaveCharacters.push(randomSelector(upperCasedCharacters));
  }

  if (passwordOptions.hasSpecialCharacters){
    selectableCharacters = selectableCharacters.concat(specialCharacters);
    mustHaveCharacters.push(randomSelector(specialCharacters));
  }

  console.log(selectableCharacters);
  console.log(mustHaveCharacters);


  result = result.concat(mustHaveCharacters);
  for(i=0; i< (passwordOptions.passwordLength - mustHaveCharacters.length); i++){
      result.push(randomSelector(selectableCharacters));
  }

  // Prevents mustHaveCharacters from always being in the beginning
  return shuffleString(result.join(""));
}


// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
