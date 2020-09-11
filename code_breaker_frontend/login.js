
  document.addEventListener('DOMContentLoaded', (event) => {
    toggleElements();
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
          console.log(user.id)
          loadGame();
          toggleMusic('theme');
      })
    })
  });


const toggleElements = ()=>{
    let style = ""
    if(document.querySelector("body > div.flexboxHeader").style.display == "none") {
        style = ""
    }else{
        style = "none"
    }
    document.querySelector("body > div.flexboxHeader").style.display = style;
    document.querySelector("body > main > section > div.flexboxMap").style.display = style;
    document.querySelector("#progressBar").style.display = style;
}

const toggleMusic = (sound)=>{
        document.getElementById(sound).volume = 0.15;
        document.getElementById(sound).load();
}