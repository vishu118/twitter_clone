const signup = document.querySelector('.sign-up')
const login = document.querySelector('.Log-in')
const login_page = document.querySelector('.login-page')
const main_page = document.querySelector('.main-page')
const feeds_page = document.querySelector('.feeds-page')

const signup_container = document.querySelector('.signup_container')
const fullName = document.getElementById('name')
const email = document.getElementById('email')
const userID = document.getElementById('userId')
const password = document.getElementById('password')
const cnfPassword = document.getElementById('confirmPassword')
const signupBtn = document.getElementById('signupBtn')

const form = document.getElementById('form')
const error = document.querySelector(".alert-message");
const button = document.querySelector(".button");
const delete_tweets = document.querySelector(".delete_tweets");



let count = 0;
let userDetails = [];




// =================================login===========================================================
// let login_id = document.getElementById('login_id').value;
// let login_password = document.getElementById('login_password').value;
// // let login_id1 = JSON.parse(getItem("userDetails"))
// let masterArray = JSON.parse(localStorage.getItem("UserDetails.find((e)=>e.userid)"));
// console.log(masterArray)





// =================================login===========================================================


let tweetOffset = 0;
let runningCriticalFunction = false;

async function getTweetsAndInsertHTML() {
    if(runningCriticalFunction) {
        return;
    }
    runningCriticalFunction = true;
    const result = await fetch(`https://twitter-backend-6yot.onrender.com/tweet/recent?offset=${tweetOffset}`); // Paginated API 

    const tweets = await result.json();

    console.log(tweets.data);

    tweetOffset = tweetOffset + tweets.data.length;

    document.getElementById('posts').insertAdjacentHTML('beforeend', tweets.data.map((tweet) => {
        const date = new Date(tweet.creationDatetime);
        
        return ` <div id=${tweet._id} class="post ">
              <div class="user_avatar">
                <img
                  src="https://hips.hearstapps.com/esquireuk.cdnds.net/16/18/1462267385-tom-hiddleston-main.jpg"
                  alt="user"
                />
              </div>

              <div class="post_content">
                <div class="post_user_info ">
                  <h4>Loki</h4>
                  <i class="fa fa-check-circle"></i>
                  <p>${date.toDateString()}</p>
                  <span>@loki123</span>
                </div>
                
                <p class="post_text ">
                  <span id='span-${tweet._id}'>${tweet.title}
                </span>
                </p>
                <div class="post_img">
                  <img
                    src="https://snworksceo.imgix.net/dtc/9691d685-ab26-4d9a-84e1-27676efa4fd6.sized-1000x1000.jpeg?w=1000"
                    alt="post_img"
                  />
                </div>
                <div class="post_icons">
                <div>
                  <i class="fa fa-comment"></i>
                  <i class="fa fa-retweet"></i>
                  <i class="fa fa-heart"></i>
                  <i class="fa fa-share-alt"></i>
                  
                </div>
               
                <span><i class="fa-solid fa-ellipsis-vertical" id="vertical_dot"></i></span>

                
              </div>
              <div class="delete_tweets">
                <button data-id=${tweet._id} class="tweet-edit" id="tweet-edit">
                  Edit
              </button>
              <button data-id=${tweet._id} class="tweet-delete" id="tweet-delete">
                  Delete
              </button>
              </div>


                
              </div>
            </div>`
    }).join(""))
    runningCriticalFunction = false;
}

window.onload = async () => {
    getTweetsAndInsertHTML();
}

document.addEventListener('click', async (event) => {
    if(event.target.classList.contains('button')) {
        const tweetText = document.querySelector('.textarea ').value;

        const data = {
            title: tweetText,
            text: "Random Value",
            userId: "12345"
        }
        
        const tweetResponse = await fetch('https://twitter-backend-6yot.onrender.com/tweet/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })

        const tweet = await tweetResponse.json();

        if(tweet.status !== 200) {
            alert(tweet.message);
            return;
        }

        document.querySelector('.textarea').value = "";
        alert(tweet.message);
    }

    if(event.target.classList.contains('tweet-delete')) {

        if(confirm("Are you sure you want to delete this tweet?")) {
            const tweetId = event.target.getAttribute('data-id');

            const data = {
                tweetId,
                userId: "12345"
            };

            const response = await fetch('https://twitter-backend-6yot.onrender.com/tweet/delete', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })

            const result = await response.json();

            if(result.status !== 200) {
                alert(result.message);
                return;
            }
            
            alert("Tweet deleted successfuly");
            document.getElementById(tweetId).remove();
           
        }
    }

    if(event.target.classList.contains('tweet-edit')) {
        const tweetId = event.target.getAttribute('data-id');

        const span = document.getElementById('span-' + tweetId);

        const tweetText = prompt("Enter new tweet text", span.innerText);

        const data = {
            tweetId,
            title: tweetText,
            text: "Random value",
            userId: "12345"
        }

        const response = await fetch('https://twitter-backend-6yot.onrender.com/tweet/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })

        const result = await response.json();

        if(result.status !== 200) {
            alert(result.message);
            return;
        }

        alert("Updated Successfully");
        span.innerText = tweetText;
        
    }

    // if(event.target.classList.contains('show_more')) {
    //     getTweetsAndInsertHTML();
    // }
}) 

window.addEventListener('scroll', () => {
    const {
        scrollTop,
        scrollHeight,
        clientHeight
    } = document.documentElement;

    // console.log(scrollTop, scrollHeight, clientHeight);

    if((scrollTop + clientHeight) >= (scrollHeight - 20)) {
        getTweetsAndInsertHTML();
    }
})





signup.addEventListener('click',()=>{
    signup_container.style.display = "block"
    
})
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
      userID.value == "" ||
      password.value == ""
    ) {
      error.innerText = "Add Something In Input";
      setTimeout(() => {
        error.innerText = "";
      }, 1000);
    }else if
      (password.value !== cnfPassword.value){
        error.innerText = "Password Is Not Same";
      setTimeout(() => {
        error.innerText = "";
      }, 1000);
    }
     else {
      acceptata();
      feeds_page.style.display="block"
      signup_container.style.display = "none"
      main_page.style.display = "none"
    
      }
    }
  

  let acceptata = () => {
    let details = {
        id: count++,
        Name: fullName.value,
        Email: email.value,
        UserId: userID.value,
        Password: password.value,
    };
  
    
    userDetails.push(details);
    localStorage.setItem("UserDetails", JSON.stringify(userDetails));
    resetForm()

    
  
  };

  function resetForm() {
    fullName.value = "";
    email.value = "";
    userID.value = "";
    password.value = "";
    cnfPassword.value = "";
  }
