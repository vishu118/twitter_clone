const signup = document.querySelector('.sign-up')
const login = document.querySelector('.Log-in')
const login_page = document.querySelector('.login-page')
const main_page = document.querySelector('.main-page')
const signup_container = document.querySelector('.signup_container')
const fullName = document.getElementById('name')
const email = document.getElementById('email')
const userId = document.getElementById('userID')
const password = document.getElementById('password')
const cnfPassword = document.getElementById('confirmPassword')
const signupBtn = document.getElementById('signupBtn')
const form = document.getElementById('form')
const error = document.querySelector(".alert-message");

let count = 0;
let userDetails = [];




// signup.addEventListener('click',()=>{
//     signup_container.style.display = "block"
    
// })
login.addEventListener('click',()=>{
    login_page.style.display = "block"
    main_page.style.display = "none"
})


signup.addEventListener("click", () => {
    signup_container.style.display = "block"
});

form.addEventListener("submit", (e) => {
e.preventDefault();

formValidation();
});

function formValidation(e) {
    if (
        fullName.value == "" ||
      email.value == "" ||
    //   userId.value == "" ||
      password.value == ""
    ) {
      error.innerText = "Add Something In Input";
      setTimeout(() => {
        error.innerText = "";
      }, 1000);
    }
     else {
      acceptata();
    }
  }

  let acceptata = () => {
    let details = {
        id: count++,
        Name: fullName.value,
        Email: email.value,
        // UserId: userId.value,
        Password: password.value,
    };
  
    
    userDetails.push(details);
    localStorage.setItem("UserDetails", JSON.stringify(userDetails));
   
    
    // resetForm();
  };


