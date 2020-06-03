class Camera{

	constructor(x,y)
	{
		this.x = x;
		this.y = y;
		this.camSpeed = 2;
		this.horizontalPos=x;
		this.verticalPos=y;
	}

	changeCameraPos(cameraMove)
	{
		switch(cameraMove)
		{
			case 'UP':
				this.y-=this.camSpeed;
			break;

			case 'DOWN':
				this.y+=this.camSpeed;
			break;

			case 'LEFT':
				this.x-=this.camSpeed;
			break;

			case 'RIGHT':
				this.x+=this.camSpeed;
			break;
		}

		var data = {
			x:this.x + c.width/2,
			y:this.y + c.height/2,
			id:socket.id
		}
		socket.emit('ppos', data);
	}
}