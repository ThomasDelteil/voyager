/// <reference path="vector.ts"/>

class Particle {
	
	protected _m: number;
	
	public constructor(
		m: number,
		public p: Vector = Vector.origin(),
		public v: Vector = Vector.origin(),
		public r: number
	) {
		this.m = m;
	}

	public move(dt: number, force: Vector) {
		this.v.add(Vector.scale(force, dt/this.m));
		this.p.add(Vector.scale(this.v, dt));
	}
	
	public get m() {
		return this._m;
	}
	
	public set m(newM) {
		if (newM <= 0) throw new Error("Cannot have a mass small than 0")
		this._m = newM;
	}
}