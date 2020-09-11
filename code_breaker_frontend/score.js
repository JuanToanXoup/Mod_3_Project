let scoretimer = 0;
const score = (scoreTotal, $element)=>{
    stop(scoretimer);
    $element.innerText = (`Score = ${scoreTotal}`);

    scoretimer = setTimeout(function() {
        score(scoreTotal+5, $element);
    }, 1000);
};

const getScore = ()=>{
    return Number(document.getElementById('score').innerText.split('=')[1])
}

const setHighscore = ()=>{
    debugger
    if (getScore() > Number(localStorage.highscore)) {
        fetch(`http://localhost:3000/users/${localStorage.id}`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({'highscore': getScore()})
          })
          .then(res => res.json())
          .then(user => {
            slapUser(user);
          })
        }
    loadGame();
    toggleElements();
}