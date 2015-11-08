/// <reference path="../physics/particle.ts"/>

const BURN_RATE = 0.1;

class Starship extends Particle {

	public isBurning = false;

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
		super.move(dt, force);
		// TODO burn fuel
	}

	public startEngine() {
		this.isBurning = true;
	}

	public stopEngine() {
		this.isBurning = false;
	}

}

enum StarshipType {
	PROBE,
	SATELLITE
}
