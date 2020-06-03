class Tile
{
	constructor(x,y,sprite)
	{
		this.x = x;
		this.y = y;
		this.sprite = sprite;
		this.width = sprite.width;
		this.height = sprite.width;
	}

	draw()
	{
		ctx.drawImage(this.sprite,this.x - camera.x,this.y - camera.y);
	}

	checkMouse(mouseX,mouseY)
	{
		if(mouseX + 2*camera.x > this.x && mouseX + 2*camera.x < this.x + this.width 
		&& mouseY + 2*camera.y > this.y && mouseY + 2*camera.y < this.y + this.height)
		{
			ctx.fillStyle = 'rgba(0,0,0,0)';
			ctx.fillRect(this.x - camera.x,this.y - camera.y,this.x+this.width - camera.x, this.y+this.height - camera.y);
		}
	}
}

