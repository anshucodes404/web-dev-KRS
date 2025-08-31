const btn = document.getElementById("btn");
const p = document.getElementById("para")

// btn.addEventListener("click", () => { //this is called handler function
//     p.innerText = "Button was clicked"
//     alert("Less gooo")
    
// })

function changeText() {
    p.innerText = "Button was clicked"
    console.log("hello I was clicked")
    btn.removeEventListener("click", changeText);
}

btn.addEventListener("click", changeText); //here parantheses can't put because it will execute without any event

const inputField = document.getElementById("myInput")

inputField.addEventListener("keydown", (e) => {
    console.log("Key Pressed " + e.key)
    alert(e.key + " was clicked")
})

//in onClick inline JS we can also use but only one function if many functions are there of same name then last function will run can run but using eventListener can run multiple functions

// DIFFERENCE BETWEEN onclick AND addEventListener

//USING ONCLICK FUNCTIONS

function btn2Click(){
    alert(" btn2 OnClick Handler 1 ");
}


function btn2Click(){
    alert(" btn2 OnClick Handler 2 ");
    console.log("first handler is overwritten by second handler");
}



//USING ADDEVENTLISTENER

const btn2 = document.getElementById("btn2");


btn2.addEventListener("click", function() {
    alert(" Handler 1");
    console.log("first handler is NOT overwritten by second handler");
});

btn2.addEventListener("click", function() {
    alert(" Handler 2 is also working");
    console.log("second handler is also working");
});



// We can add multiple event listeners to the same element without overwriting each other
// using AddEventListeners,    but onClick only allows one handler at a time.

// const btn = document.getElementById("btn");

btn.addEventListener("mouseover", function () {
  btn.style.backgroundColor = "red";
  btn.innerText = "Mouse is inside !";
  console.log("Mouse is over the button!");
});

btn.addEventListener("mouseout", function () {
  btn.style.backgroundColor = "lightblue";
  btn.innerText = "Mouse is outside !";
  console.log("Mouse is out of the button!");
});