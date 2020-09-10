var ctx = null;
var gameMap = [
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
	1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
	1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
	1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
	1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
	1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
	1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
	1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0

];
var tileW = 40, tileH = 40;
var mapW = 10, mapH = 10;
var currentSecond = 0, frameCount = 0, framesLastSecond = 0, lastFrameTime = 0;

var keysDown = {
	37 : false,
	38 : false,
	39 : false,
	40 : false
};

var player = new Character();

function Character()
{
	this.tileFrom	= [1,1];
	this.tileTo		= [1,1];
	this.timeMoved	= 0; 
	this.dimensions	= [30,30];
	this.position	= [45,45];
	this.delayMove	= 100;
}
Character.prototype.placeAt = function(x, y)
{
	this.tileFrom	= [x,y];
    this.tileTo		= [x,y];
    // offsetting the character to center it
	this.position	= [((tileW*x)+((tileW-this.dimensions[0])/2)),
		((tileH*y)+((tileH-this.dimensions[1])/2))];
};
// current time elap in the game
Character.prototype.processMovement = function(t)
{
    // if the character is not moving
    if(this.tileFrom[0]==this.tileTo[0] && this.tileFrom[1]==this.tileTo[1]) 
    { return false; }
    // if the character moves
	if((t-this.timeMoved)>=this.delayMove)
	{
		this.placeAt(this.tileTo[0], this.tileTo[1]);
	}
	else
	{
        this.position[0] = (this.tileFrom[0] * tileW) + 
        ((tileW-this.dimensions[0])/2);
        
        this.position[1] = (this.tileFrom[1] * tileH) + 
        ((tileH-this.dimensions[1])/2);
        // checking if the character moving in x
		if(this.tileTo[0] != this.tileFrom[0])
		{
			var diff = (tileW / this.delayMove) * (t-this.timeMoved);
			this.position[0]+= (this.tileTo[0]<this.tileFrom[0] ? 0 - diff : diff);
        }
        // checking if the character moving in y
		if(this.tileTo[1] != this.tileFrom[1])
		{
			var diff = (tileH / this.delayMove) * (t-this.timeMoved);
			this.position[1]+= (this.tileTo[1]<this.tileFrom[1] ? 0 - diff : diff);
		}

		this.position[0] = Math.round(this.position[0]);
		this.position[1] = Math.round(this.position[1]);
	}

	return true;
}

function toIndex(x, y)
{
	return((y * mapW) + x);
}

window.onload = function()
{
	ctx = document.getElementById('game').getContext("2d");
	requestAnimationFrame(drawGame);
	ctx.font = "bold 10pt sans-serif";
    // press down the key
	window.addEventListener("keydown", function(e) {
        if(e.keyCode>=37 && e.keyCode<=40) 
            { keysDown[e.keyCode] = true; }
    });
    // letting go of the key
	window.addEventListener("keyup", function(e) {
        if(e.keyCode>=37 && e.keyCode<=40) 
            { keysDown[e.keyCode] = false; }
	});
};

function drawGame()
{
	if(ctx==null) { return; }

	var currentFrameTime = Date.now();
	var timeElapsed = currentFrameTime - lastFrameTime;

	var sec = Math.floor(Date.now()/1000);
	if(sec!=currentSecond)
	{
		currentSecond = sec;
		framesLastSecond = frameCount;
		frameCount = 1;
	}
	else { frameCount++; }

	if(!player.processMovement(currentFrameTime))
	{
        // when character moves it's checking if the movement is valid(within bound the map and tile is valid)
        // character going Up
		if(keysDown[38] && player.tileFrom[1]>0 && gameMap[toIndex(player.tileFrom[0], player.tileFrom[1]-1)]==1) 
			{ player.tileTo[1]-= 1; }
        // character going Down
		else if(keysDown[40] && player.tileFrom[1]<(mapH-1) && gameMap[toIndex(player.tileFrom[0], player.tileFrom[1]+1)]==1)
			{ player.tileTo[1]+= 1; }
        // character going Left
		else if(keysDown[37] && player.tileFrom[0]>0 && gameMap[toIndex(player.tileFrom[0]-1, player.tileFrom[1])]==1) 
			{ player.tileTo[0]-= 1; }
        // character going Right
		else if(keysDown[39] && player.tileFrom[0]<(mapW-1) && gameMap[toIndex(player.tileFrom[0]+1, player.tileFrom[1])]==1) 
			{ player.tileTo[0]+= 1; }
        // checking if character moving or not
		if(player.tileFrom[0]!=player.tileTo[0] || player.tileFrom[1]!=player.tileTo[1])
		{ player.timeMoved = currentFrameTime; }
	}
    // top to bottom and left to right going through the grid
	for(var y = 0; y < mapH; ++y)
	{
		for(var x = 0; x < mapW; ++x)
		{
            // fill in the block with color
			switch(gameMap[((y*mapW)+x)])
			{
				case 0:
					ctx.fillStyle = "#685b48";
					break;
				default:
					ctx.fillStyle = "#5aa457";
			}
            // draw the tile 
			ctx.fillRect( x*tileW, y*tileH, tileW, tileH);
		}
	}
    // character icon
	ctx.fillStyle = "#0000ff";
	ctx.fillRect(player.position[0], player.position[1],
		player.dimensions[0], player.dimensions[1]);

	// ctx.fillStyle = "#ff0000";
	// ctx.fillText("FPS: " + framesLastSecond, 10, 20);

	lastFrameTime = currentFrameTime;
	requestAnimationFrame(drawGame);
};



// var i = 0;
// function move() {
//   if (i == 0) {
//     i = 1;
//     var elem = document.getElementById("myBar");
//     var width = 1;
//     var id = setInterval(frame, 10);
//     function frame() {
//       if (width >= 100) {
//         clearInterval(id);
//         i = 0;
//       } else {
//         width++;
//         elem.style.width = width + "%";
//       }
//     }
//   }
// }

function progress(timeleft, timetotal, $element) {
    var progressBarWidth = timeleft * $element.width() / timetotal;
    $element.find('div').animate({ width: progressBarWidth }, 500).html(timeleft%60);
    if(timeleft > 0) {
        setTimeout(function() {
            progress(timeleft - 1, timetotal, $element);
        }, 1000);
    }
    else{
        alert("I guess you couldn't break the code pweny human <[0_0]<")
    }
};


progress(5, 5, $('#progressBar'));