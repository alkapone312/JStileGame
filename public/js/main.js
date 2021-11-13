//---------------------CREATE THINGS--------------

//-----networking-----

var socket = io();


//-----no-networking----

//create camera
var camera = new Camera(0,0);
var cameraMove = 0;
var camX = 0;
var camY = 0;

//create canvas and context
var c = document.createElement("canvas");
var ctx = c.getContext('2d');
c.width = document.body.clientWidth;
c.height = document.body.clientHeight;
document.body.appendChild(c);

//prerendering tile sprites
var wall = prerender('img/wall.bmp');
wall.title = "wall";
var floor = prerender('img/floor.bmp');
floor.title = "floor";
var players = prerender('img/player.png');
players.title = "player";
var smth = prerender('img/smth.png');
smth.title = "wall"
var blank = document.createElement('canvas');

//create player
var player = new Player(c.width/2,c.height/2, players);
var guest = new Array();

//other players

socket.on('disc', function(id){
	for(let i = 0 ; i < guest.length; i++)
	{
		if(guest[i].id == id)
		{
			guest.splice(i);
		}
	}
});

socket.on('ppos', function(data){
	var key = false;
	for(let i = 0 ; i < guest.length; i++)
	{
		if(guest[i].id == data.id)
		{
			guest[i].x = data.x - camera.x;
			guest[i].y = data.y - camera.y;
			key = true;
			break;
		}
	}
	if(!key)
	{
		var p = new Player(999999,999999,players);
		p.id = data.id;
		guest.push(p);
	}
});

//create tiles
	var tiles = new Array();
	for(let i = 0 ; i < map[0].length; i++)
	{
		tiles[i] = new Array();
		for(let j = 0; j < map.length; j++)
		{
			if(map[j][i] == 'w')
			tiles[i][j] = new Tile(i*100,j*100,wall);
			else if(map[j][i] == 'f')
			tiles[i][j] = new Tile(i*100,j*100,floor);
			else if(map[j][i] == 's')
			tiles[i][j] = new Tile(i*100,j*100,smth);
			else
			tiles[i][j] = new Tile(i*100,j*100,blank);
		}
	}


//---------------------MOUSE--------------
var mouseX;
var mouseY;
c.addEventListener('mousemove', function(e)
{
	mouseX = e.clientX;
	mouseY = e.clientY;
});



//---------------------KEYBOARD--------------
document.addEventListener('keydown', function(e)
	{
		switch(e.keyCode)
		{
			case 37:
				cameraMove = 'LEFT';
			break;

			case 39:
				cameraMove = 'RIGHT';
			break;

			case 38:
				cameraMove = 'UP';
			break;

			case 40:
				cameraMove = 'DOWN';
			break;
		}
	});
document.addEventListener('keyup', function(e)
	{cameraMove=0;});


//function to clear things up
function clear()
{
	ctx.fillStyle='white';
	ctx.fillRect(-200,-200,4000,4000);
}

//animation is doing here
function frame()
{
	clear();
	for(let i = 0 ; i < tiles.length; i++)
	{
		for(let j = 0; j < tiles[0].length; j++)
		{
			var t = tiles[i][j];
			if(t.sprite.title == 'wall')
			{
				player.checkCollision(t.x, t.y, t.x + t.width, t.y + t.height);
			}
		}
	}


	for(let i = 0 ; i < tiles.length; i++)
	{
		for(let j = 0; j < tiles[0].length; j++)
		{
			var t = tiles[i][j];
			t.draw();
			t.checkMouse(mouseX-camera.x, mouseY-camera.y);

		}
	}

	camera.changeCameraPos(cameraMove);
	player.draw();
	player.update();

	for(let i = 0 ; i<guest.length; i++)
	{
		if(guest[i].x != 999999)
		{
			guest[i].draw();
		}
	}
	
}
var interval = setInterval(frame,10);
