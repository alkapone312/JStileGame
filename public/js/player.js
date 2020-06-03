class Player
{
	constructor(x, y, sprite)
	{
		this.x = x;
		this.y = y;
		this.mapX;
		this.mapY;
		this.sprite = sprite;
		this.width = sprite.width;
		this.height = sprite.height;
	}


	checkCollision(x,y,x2,y2)
	{
		if (x < this.mapX + this.width &&	x2 > this.mapX &&
	   		y < this.mapY + this.height&&	y2 > this.mapY)
		{
			if(x < this.mapX + this.width && this.mapX + this.width - 5 < x)
			{
			camera.x = x - this.width - this.x;
			}
			if(x2 > this.mapX && x2 < this.mapX + 5)
			{
			camera.x = x2 - this.x;
			}

			if(y < this.mapY + this.height && y > this.mapY + this.height - 5)
			{
			camera.y = y - this.height - this.y;
			}


			if(y2 > this.mapY && y2 < this.mapY + 5)
			{
			camera.y = y2 - this.y;
			}

		}
	}

	draw()
	{
		ctx.drawImage(this.sprite,this.x,this.y);
	}

	update()
	{
		this.mapX = this.x + camera.x;
		this.mapY = this.y + camera.y;
	}
}