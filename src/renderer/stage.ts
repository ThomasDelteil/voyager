/// <reference path="../game/universe.ts"/>
/// <reference path="../elements/celestial_body.ts"/>
/// <reference path="../elements/starship.ts"/>

function getCelestialBodyColour(type: CelestialType) {
    switch(type) {
        case CelestialType.STAR:   return '#D90';
        case CelestialType.PLANET: return '#C51';
        default:                   return '#333';
    }
}

class Stage {

	protected canvas: HTMLCanvasElement;
	protected context: CanvasRenderingContext2D;

    protected width: number;
    protected height: number;

	public constructor(protected id: string) {
		this.canvas = <HTMLCanvasElement> document.getElementById(id);
        this.context = this.canvas.getContext('2d');

        this.width = this.canvas.width = this.canvas.offsetWidth;
		this.height = this.canvas.height = this.canvas.offsetHeight;
	}

	public paint(universe: Universe) {
		this.background();

		for (let obj of universe.objects) {
            if (obj instanceof CelestialBody) {
                obj = <CelestialBody> obj;
                this.circle(obj.p.x, obj.p.y, obj.r, getCelestialBodyColour(obj.type));

            } else if (obj instanceof Starship) {
                obj = <Starship> obj;

                this.rect(obj.p.x, obj.p.y, 8, 8, '#0CF');
                if (obj.fire.up)    this.rect(obj.p.x, obj.p.y + 9, 6, 10, '#F00');
                if (obj.fire.down)  this.rect(obj.p.x, obj.p.y - 9, 6, 10, '#F00');
                if (obj.fire.left)  this.rect(obj.p.x + 9, obj.p.y, 10, 6, '#F00');
                if (obj.fire.right) this.rect(obj.p.x - 9, obj.p.y, 10, 6, '#F00');

            }
		}
	}

	protected background(colour: string = '#013'){
		this.context.fillStyle = colour;
		this.context.fillRect(0,0, this.width, this.height);
	}

	protected circle(x, y, radius, fill) {
		this.context.beginPath();
		this.context.fillStyle = fill;
        this.context.arc(x + this.width/2, y + this.height/2, radius, 0, 2 * Math.PI);
        this.context.fill();
	}

    protected rect(x, y, width, height, fill) {
        this.context.fillStyle = fill;
        this.context.fillRect(x - width/2 + this.width/2,y - height/2 + this.height/2, width, height);
    }

}
