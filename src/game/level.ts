/// <reference path="universe.ts"/>
/// <reference path="../elements/starship.ts"/>
/// <reference path="../elements/celestial_body.ts"/>


function orbitingPlanet(gravity: number, sun: CelestialBody, mass: number, distance: number, radius: number, angle: number = 0) {
	let speed = Math.sqrt(gravity * (sun.m + mass) / distance);
	console.log(speed);
	
	let p = new Vector(0, distance).rotateZ(angle);
	let v = new Vector(speed, 0).rotateZ(angle);
	
	return new CelestialBody(CelestialType.PLANET, radius, mass, sun.p.clone().add(p), v);
}



class Level {
	
	public universe: Universe;
	
	constructor(config: Object = {}) {
		
		// ---- DEFAULT LEVEL ----
		let gravity = 0.001;
		let sun = new CelestialBody(CelestialType.STAR, 20, 1000, new Vector(250, 250), new Vector(0, 0));
				
		let planet1 = orbitingPlanet(gravity, sun, 1, 220, 5, 0);
		let planet2 = orbitingPlanet(gravity, sun, 1,   160, 10, 2*Math.PI/3);
		let planet3 = orbitingPlanet(gravity, sun, 1, 100, 8, 4*Math.PI/3);
				
		// let startship = new Starship(StarshipType.SATELLITE, 0.1, new Vector(265, 50), new Vector(0.09, 0.02), 100);
		// ---- DEFAULT LEVEL ----
		
		this.universe = new Universe([sun, planet1, planet2, planet3], 500, gravity);
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