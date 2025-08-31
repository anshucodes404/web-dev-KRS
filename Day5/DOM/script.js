console.log(document.title)
console.log(document.body)

const grandParent = document.getElementById("gp-id")
console.log(grandParent)

grandParent.style.backgroundColor = "purple"
let parent = document.querySelectorAll(".parent")
console.log(parent)  //output a nodeList while in getElement returns a HTMLcollection which only contains the html it is not an array so array methods won't work on it while querySelectorAll returns an array so array methods work on it


//to convert a non array into array for example HTMLcollection

let parents = document.getElementsByClassName("parent")
console.log(parents)

const parentsArray = Array.from(parents)
console.log(parentsArray)

const text = document.querySelector(".text")
text.innerText = "Hello"