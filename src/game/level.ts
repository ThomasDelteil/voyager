/// <reference path="universe.ts"/>
/// <reference path="../elements/starship.ts"/>
/// <reference path="../elements/celestial_body.ts"/>


function orbitingPlanet(
	gravity: number,
	sun: CelestialBody,
	mass: number,
	distance: number,
	radius: number,
	angle: number = 0
) {
	let speed = Math.sqrt(gravity * (sun.m + mass) / distance);

	let p = new Vector(0, distance).rotateZ(angle);
	let v = new Vector(speed, 0).rotateZ(angle);

	return new CelestialBody(CelestialType.PLANET, mass, radius, sun.p.clone().add(p), v);
}



class Level {

	public universe: Universe;

	constructor(config: Object = {}) {

		// ------ DEFAULT LEVEL ------
		let gravity = 0.001;

		let sun = new CelestialBody(
			CelestialType.STAR,
			1000, 20,
            new Vector(0, 0),
			new Vector(0, 0)
		);

		let starship = new Starship(
			StarshipType.SATELLITE,
			0.1, 8,
			new Vector(0, 200),
			new Vector(0.04, -0.05),
			100
		);

		let planet1 = orbitingPlanet(gravity, sun, 1, 300, 14, 0);
		let planet2 = orbitingPlanet(gravity, sun, 1, 200, 11, 2/3 * Math.PI);
		let planet3 = orbitingPlanet(gravity, sun, 1, 100,  8, 4/3 * Math.PI);
		// ------ DEFAULT LEVEL ------

		this.universe = new Universe([sun, planet1, planet2, planet3, starship], gravity);
	}

	begin() {
		// TODO initialise stuff
	}

	move(dt) {
		this.universe.move(dt);
		// TODO check if the level is completed
	}

	onComplete(callback: Function) {

	}

}
