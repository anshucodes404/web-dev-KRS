const form = document.getElementById("loginForm");
console.log(form);

const p = document.getElementById("response");

form.addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent the default form submission

  const userName = form.name.value;
  console.log("User Name: " + userName);
  alert("Welcome, " + userName + "!");

  p.innerText = "User Name: " + userName;
});

// event.preventDefault() is a method that stops the default behavior of an event
// jaise form mei jab submit click karte hai toh page reload ho jata hai apne aap,
// isko humlog prevent kar sakte hai using event.preventDefault();

//we cannot process the data with JS before reload, but after refresh the entered input may disappear or reset
// That's why we use event.preventDefault() to stop the reload and process the data with JS
