
  document.addEventListener('DOMContentLoaded', (event) => {
    login();
    document.addEventListener('mousedown',()=>{
      toggleMusic('mouseclick')
    })
  });

const login = ()=>{
  let usernameForm = document.getElementById('user-login')
    usernameForm.addEventListener('submit', (event) => {
    event.preventDefault()
    let username = document.getElementById("username").value
    fetch("http://localhost:3000/users", {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({'username': username.toLowerCase()})
    })
    .then(res => res.json())
    .then(user => {
        slapUser(user);
        loadGame();
        toggleMusic('theme');
    })
  })
}

const toggleElements = ()=>{
    let style = ""
    if(document.querySelector(".flexboxHeader").style.display == "none") {
        document.querySelector(".grandParentContaniner").style.display = "none"
        style = ""
    }else{
        document.querySelector(".grandParentContaniner").style.display = ""
        style = "none"
    }
    document.querySelector(".flexboxHeader").style.display = style;
    document.querySelector(".flexboxMap").style.display = style;
    document.querySelector("#progressBar").style.display = style;

}

const toggleMusic = (sound)=>{
        document.getElementById(sound).volume = 0.10;
        document.getElementById(sound).load();
}

const slapUser= (user)=>{
  localStorage.id = user.id
  localStorage.highscore = user.highscore
  document.getElementById('userDisplay').innerText = user.username;
  document.getElementById('highscore').innerText = `Highscore = ${user.highscore}`;
}