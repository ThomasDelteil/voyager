/// <reference path="../physics/particle.ts"/>

const BURN_RATE = 0.1;

class Starship extends Particle {

	public fire = { up: false, down: false, left: false, right: false };

	public constructor(
		public type: StarshipType,
		m: number,
		r: number,
		p: Vector,
		v: Vector,
		public fuel: number,
		public orientation: number = 0
	) {
		super(m, p, v, r)
	}

	// overrides Particle.move()
	public move(dt, force) {

		if (this.fire.up)    force.add(new Vector(0, -0.00001));
		if (this.fire.down)  force.add(new Vector(0,  0.00001));
		if (this.fire.left)  force.add(new Vector(-0.00001, 0));
		if (this.fire.right) force.add(new Vector( 0.00001, 0));

		// TODO reduce fuel
		super.move(dt, force);
	}

	public startEngine(direction: string) {
		this.fire[direction] = true;
	}

	public stopEngine(direction) {
		this.fire[direction] = false;
	}

}

enum StarshipType {
	PROBE,
	SATELLITE
}
