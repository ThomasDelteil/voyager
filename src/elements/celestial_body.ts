/// <reference path="../physics/particle.ts"/>

class CelestialBody extends Particle {

	public constructor(
		public type: CelestialType,
		m: number,
		r: number,
		p: Vector,
		v: Vector
	) {
		super(m, p, v, r)
	}
}

enum CelestialType {
	STAR,
	PLANET,
	MOON,
	NEBULA,

	SPACE_DEBRIS,
	SPACE_STATION
}
