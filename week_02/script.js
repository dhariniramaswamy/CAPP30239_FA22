/* 
This is a javascript example for 
week 2. 
*/

// inline comment

// FUNCTIONS
let num = 100; //integer

function foo(){
    let num2 = 200;
    console.log(num) 
};
//can access num because it's a global var
// console.log(num2);
foo();

// let anonFun = function() {
//     console.log("hello");

// }

let anonFun = () => console.log("hello") //arrow functions are shorthand

(function() {
    console.log("hi")
})();

let person = "Summer";

function people(peopleName){
    console.log("Hello" + peopleName);
};

people(person);
//what's an invoked function?

//ARRAYS
let arr = ["foo", 123, ["zar", "bar"]];
console.log(arr[2][0])

//Set item in array
arr[1] = "barbar";

console.log(arr)

//Add item to the end of the array
arr.push("car");

console.log(arr)

//Removing an item from the array (index, deleteCount)
arr.splice(2, 2)
console.log(arr)

//Loop through each item in the array
//"of" will loop through array and return the name of the item
for (let item of arr) {
    console.log(item);
};

//Loop through index in array
//"in" will get you the index 
for (let i in arr) {
    console.log(i + " " + arr[i])
}

//Loop through each item in the array with its index - forEach
arr.forEach((item, i) => console.log(i + " " + item));

//Objects - json object with key, value

let obj1 = {
    name: "Jill",
    age: 85,
    job: "Cactus Hunter"
};

console.log(obj1.name);
console.log(obj1["name"]);

//Set value
obj1.job = "Barista";

console.log(obj1);

//Loop through objects
for (let key in obj1) {
    let value = obj1[key];
    console.log(`${key}: ${value}`); //string literal
}

//alternative to string literal
console.log("hello " + obj1["name"] + " " + foo);

//object notation
console.log(`hello ${obj1["name"]} ${num}`);

//Loop using an iterator
for (let i = 0; i <10; i++) {
    console.log(i)
}

//if else
let x = 75;
if(x > 50) {
    console.log("Above average");
} else if (x > 5) {
    console.log("Below Average");
} else {
    console.log("Really below average");
}

//ternary operator (aka inline if else)
let y = (x > 50) ? "Above Average" : "Below Average";

//traversing the DOM
//get element by ID
let example = document.getElementById("example");

//add something to the div from pervious line
example.innerHTML += "Hello world!";

//script.js:123 Uncaught TypeError: Cannot read properties of null (reading 'innerHTML')
//for this error, the JS part is running before the div, so we copied and pasted the script
//to be below the div id