class Vector {
	
	public constructor(public x: number, public y:number, public z: number = 0){}
	
	public add(v1: Vector) : Vector {
		this.x += v1.x;
		this.y += v1.y;
		this.z += v1.z;
		return this;
	}
		
	public subtract(v1: Vector) : Vector {
		this.x -= v1.x;
		this.y -= v1.y;
		this.z -= v1.z;
		return this;
	}
	
	public scale(s: number) : Vector {
		this.x *= s;
		this.y *= s;		
		this.z *= s;
		return this;	
	}
	
	get sizeSquared() : number {
		return this.x * this.x + this.y * this.y + this.z * this.z;
	}
	
	get size() : number{
		return Math.sqrt(this.sizeSquared);
	}
	
	public dot(v1: Vector) : number {
		return this.x*v1.x + this.y*v1.y + this.z*v1.z;
	}
	
	public cross(v1: Vector) : Vector {
		return new Vector(
			this.y*v1.z - this.z*v1.y,
			this.z*v1.x - this.x*v1.z,
			this.x*v1.y - this.y*v1.x
		);
	}
	
	public normalise() : Vector {
		return this.clone().scale(1/this.size);
	}
	
	public rotateZ(angle: number) : Vector {
		return new Vector(
			this.x * Math.cos(angle) - this.y * Math.sin(angle),
			this.x * Math.sin(angle) + this.y * Math.cos(angle)
		);
	}
	
	public clone(): Vector {
		return new Vector(
			this.x,
			this.y,
			this.z
		);
	}
		
	public static scale(v1: Vector, s: number): Vector {
		return v1.clone().scale(s);
	}
	
	public static origin() : Vector {
		return new Vector(0,0);
	}
	
}

