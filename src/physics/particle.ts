/// <reference path="vector.ts"/>

class Particle {

	protected _m: number;

	public constructor(
		m: number,
		public p: Vector = Vector.origin(),
		public v: Vector = Vector.origin(),
		public r: number = 0
	) {
		this.m = m;
	}

	public move(dt: number, force: Vector) {
		if (this.m === 0) return;

		this.v.add(Vector.scale(force, dt/this.m));
		this.p.add(Vector.scale(this.v, dt));
	}

	public get m() {
		return this._m;
	}

	public set m(newM) {
		if (newM < 0) throw new Error('Particles cannot have negative mass.');
		this._m = newM;
	}
}
