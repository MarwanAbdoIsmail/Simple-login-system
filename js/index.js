// ! variables

let nameInput = document.getElementById("sg-name");
let emailInput = document.getElementById("sg-email");
let passwordInput = document.getElementById("sg-password");
let lgEmail = document.getElementById("lg-email");
let lgPassword = document.getElementById("Lg-password");
let message = document.getElementById("message");
let loginBtn = document.getElementById("login");
let signupBtn = document.getElementById("signup");
let warnHome = document.querySelector(".warn-h");
let welcome = document.querySelector( ".wel" );
let logoutBtn = document.getElementById("logout");
var users = [];

if (localStorage.getItem("userName") !== null) {
  welcome.innerHTML = `Welcome ${localStorage.getItem("userName")}`;
}

if (localStorage.getItem("users") !== null) {
  users = JSON.parse(localStorage.getItem("users"));
} else {
  users = [];
}

// ! functions

function validation() {
  let regexName = /^[A-Za-z. ]{3,20}$/;
  let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  let regexPass = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9@#$%^&*]{8,15}$/;

  if (
    regexName.test(nameInput.value) &&
    regexEmail.test(emailInput.value) &&
    regexPass.test(passwordInput.value)
  ) {
    addUser();
  } else {
    message.innerHTML = `<span class="text-danger">All inputs are required and valid</span>`;
  }
}

function addUser() {
  var user = {
    name: nameInput.value,
    email: emailInput.value,
    password: passwordInput.value,
  };

  if (users.length == 0) {
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
    message.innerHTML = `<span class="text-success">Account created successfully</span>`;
    return true;
  } else if (isEmailExist() == false) {
    message.innerHTML = `<span class="text-danger">Email already exist</span>`;
  } else {
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
    message.innerHTML = `<span class="text-success">Account created successfully</span>`;
    clearForm();
  }
}

function isEmailExist() {
  for (let i = 0; i < users.length; i++) {
    if (users[i].email.toLowerCase() === emailInput.value.toLowerCase()) {
      return false;
    }
  }
}

function clearForm() {
  nameInput.value = "";
  emailInput.value = "";
  passwordInput.value = "";
}

function login() {
  for (let i = 0; i < users.length; i++) {
    if (
      users[ i ].email.toLowerCase() == lgEmail.value.toLowerCase() &&
      users[ i ].password == lgPassword.value
    )
    {
      window.location= "home.html";
      localStorage.setItem("userName", users[ i ].name);

    } else {
      warnHome.innerHTML = `<span class="text-danger">Wrong email or password</span>`;
    }
  }
}
function LogOut() {
  window.location= "index.html";
  localStorage.removeItem("userName");
}

// ! events
// Add event listeners here
loginBtn.addEventListener("click", login);
signupBtn.addEventListener( "click", validation, false );
logoutBtn.addEventListener( "click", LogOut );
