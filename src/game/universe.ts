/// <reference path="../physics/particle.ts"/>
/// <reference path="../physics/vector.ts"/>

class Universe {

	public constructor(public objects: Particle[],public gravity: number) {

	}

	public add(...objects: Particle[]) {
		this.objects.push(...objects);
	}

	public remove(...objects: Particle[]) {
		// TODO
	}

	public move(dt) {

		let forces = [];


		for (let m1 of this.objects) {
			let force = new Vector(0, 0);
			for (let m2 of this.objects) {
				if (m1 === m2) continue;
				let forceM1M2 = this.computeForce(m1, m2);
				force.add(forceM1M2);
			}
			forces.push(force);
		}

		for (let i=0; i<this.objects.length; ++i) {
			this.objects[i].move(dt, forces[i]);
		}
	}

	protected computeForce(p1 : Particle, p2: Particle): Vector {
		let diff = p2.p.clone().subtract(p1.p);

		if (diff.sizeSquared < 20) {
			return Vector.origin();
		}

		return diff.normalise().scale(p1.m * p2.m * this.gravity / diff.sizeSquared);

	}

}
