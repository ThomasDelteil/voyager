/// <reference path="../game/universe.ts"/>

class Stage {
	
	protected canvas: HTMLCanvasElement;
	protected context: CanvasRenderingContext2D;

	public constructor(protected id: string, protected width: number, protected height: number) {
		this.canvas = <HTMLCanvasElement> document.getElementById(id)
		this.canvas.width = width;
		this.canvas.height = height;
		this.context = this.canvas.getContext('2d');
	}
	
	public paint(universe: Universe) {
		this.background();
		
		for (let obj of universe.objects) {
			
			this.circle(obj.p.x, obj.p.y, obj.r, '#F00');
		}
	}
	
	protected background(colour: string = '#006'){
		this.context.fillStyle = colour;
		this.context.fillRect(0,0, this.width, this.height);
	}
	
	protected circle(x, y, radius, fill) {
		this.context.beginPath();
		this.context.fillStyle = fill;
        this.context.arc(x, y, radius, 0, 2 * Math.PI);
        this.context.fill();
		this.context.strokeStyle = '#CCF'
		this.context.stroke();
	}

}
