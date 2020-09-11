let timer = 0;

const progress = (timeleft, timetotal, $element)=>{
    stop(timer);
    var progressBarWidth = timeleft * $element.width() / timetotal;
    $element.find('div').animate({ width: progressBarWidth }, 500).html(Math.floor(timeleft/60) + ":"+ timeleft%60);
    if(timeleft > 0) {
        timer = setTimeout(function() {
            progress(timeleft - 1, timetotal, $element);
        }, 1000);
    }
    else{
        alert("I guess you couldn't break the code pweny human <[0_0]<")
        setHighscore();
    }
};

const getSeconds = ()=>{
    secondsArray = document.querySelector('.bar').innerText.split(':');
    return seconds = Number(secondsArray[0])*60 + Number(secondsArray[1]);
}

const stop = (clock)=> {
    if (clock) {
        clearTimeout(clock);
    }
}
