var Vector = (function () {
    function Vector(x, y, z) {
        if (z === void 0) { z = 0; }
        this.x = x;
        this.y = y;
        this.z = z;
    }
    Vector.prototype.add = function (v1) {
        this.x += v1.x;
        this.y += v1.y;
        this.z += v1.z;
        return this;
    };
    Vector.prototype.subtract = function (v1) {
        this.x -= v1.x;
        this.y -= v1.y;
        this.z -= v1.z;
        return this;
    };
    Vector.prototype.scale = function (s) {
        this.x *= s;
        this.y *= s;
        this.z *= s;
        return this;
    };
    Object.defineProperty(Vector.prototype, "sizeSquared", {
        get: function () {
            return this.x * this.x + this.y * this.y + this.z * this.z;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector.prototype, "size", {
        get: function () {
            return Math.sqrt(this.sizeSquared);
        },
        enumerable: true,
        configurable: true
    });
    Vector.prototype.dot = function (v1) {
        return this.x * v1.x + this.y * v1.y + this.z * v1.z;
    };
    Vector.prototype.cross = function (v1) {
        return new Vector(this.y * v1.z - this.z * v1.y, this.z * v1.x - this.x * v1.z, this.x * v1.y - this.y * v1.x);
    };
    Vector.prototype.normalise = function () {
        return this.clone().scale(1 / this.size);
    };
    Vector.prototype.rotateZ = function (angle) {
        return new Vector(this.x * Math.cos(angle) - this.y * Math.sin(angle), this.x * Math.sin(angle) + this.y * Math.cos(angle));
    };
    Vector.prototype.clone = function () {
        return new Vector(this.x, this.y, this.z);
    };
    Vector.scale = function (v1, s) {
        return v1.clone().scale(s);
    };
    Vector.origin = function () {
        return new Vector(0, 0);
    };
    return Vector;
})();
/// <reference path="vector.ts"/>
var Particle = (function () {
    function Particle(m, p, v, r) {
        if (p === void 0) { p = Vector.origin(); }
        if (v === void 0) { v = Vector.origin(); }
        if (r === void 0) { r = 0; }
        this.p = p;
        this.v = v;
        this.r = r;
        this.m = m;
    }
    Particle.prototype.move = function (dt, force) {
        if (this.m === 0)
            return;
        this.v.add(Vector.scale(force, dt / this.m));
        this.p.add(Vector.scale(this.v, dt));
    };
    Object.defineProperty(Particle.prototype, "m", {
        get: function () {
            return this._m;
        },
        set: function (newM) {
            if (newM < 0)
                throw new Error('Particles cannot have negative mass.');
            this._m = newM;
        },
        enumerable: true,
        configurable: true
    });
    return Particle;
})();
/// <reference path="../physics/particle.ts"/>
/// <reference path="../physics/vector.ts"/>
var Universe = (function () {
    function Universe(objects, gravity) {
        this.objects = objects;
        this.gravity = gravity;
    }
    Universe.prototype.add = function () {
        var objects = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            objects[_i - 0] = arguments[_i];
        }
        (_a = this.objects).push.apply(_a, objects);
        var _a;
    };
    Universe.prototype.remove = function () {
        var objects = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            objects[_i - 0] = arguments[_i];
        }
        // TODO
    };
    Universe.prototype.move = function (dt) {
        var forces = [];
        for (var _i = 0, _a = this.objects; _i < _a.length; _i++) {
            var m1 = _a[_i];
            var force = new Vector(0, 0);
            for (var _b = 0, _c = this.objects; _b < _c.length; _b++) {
                var m2 = _c[_b];
                if (m1 === m2)
                    continue;
                var forceM1M2 = this.computeForce(m1, m2);
                force.add(forceM1M2);
            }
            forces.push(force);
        }
        for (var i = 0; i < this.objects.length; ++i) {
            this.objects[i].move(dt, forces[i]);
        }
    };
    Universe.prototype.computeForce = function (p1, p2) {
        var diff = p2.p.clone().subtract(p1.p);
        if (diff.sizeSquared < 20) {
            return Vector.origin();
        }
        return diff.normalise().scale(p1.m * p2.m * this.gravity / diff.sizeSquared);
    };
    return Universe;
})();
/// <reference path="../physics/particle.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BURN_RATE = 0.1;
var Starship = (function (_super) {
    __extends(Starship, _super);
    function Starship(type, m, r, p, v, fuel, orientation) {
        if (orientation === void 0) { orientation = 0; }
        _super.call(this, m, p, v, r);
        this.type = type;
        this.fuel = fuel;
        this.orientation = orientation;
        this.fire = { up: false, down: false, left: false, right: false };
    }
    // overrides Particle.move()
    Starship.prototype.move = function (dt, force) {
        if (this.fire.up)
            force.add(new Vector(0, -0.00001));
        if (this.fire.down)
            force.add(new Vector(0, 0.00001));
        if (this.fire.left)
            force.add(new Vector(-0.00001, 0));
        if (this.fire.right)
            force.add(new Vector(0.00001, 0));
        // TODO reduce fuel
        _super.prototype.move.call(this, dt, force);
    };
    Starship.prototype.startEngine = function (direction) {
        this.fire[direction] = true;
    };
    Starship.prototype.stopEngine = function (direction) {
        this.fire[direction] = false;
    };
    return Starship;
})(Particle);
var StarshipType;
(function (StarshipType) {
    StarshipType[StarshipType["PROBE"] = 0] = "PROBE";
    StarshipType[StarshipType["SATELLITE"] = 1] = "SATELLITE";
})(StarshipType || (StarshipType = {}));
/// <reference path="../physics/particle.ts"/>
var CelestialBody = (function (_super) {
    __extends(CelestialBody, _super);
    function CelestialBody(type, m, r, p, v) {
        _super.call(this, m, p, v, r);
        this.type = type;
    }
    return CelestialBody;
})(Particle);
var CelestialType;
(function (CelestialType) {
    CelestialType[CelestialType["STAR"] = 0] = "STAR";
    CelestialType[CelestialType["PLANET"] = 1] = "PLANET";
    CelestialType[CelestialType["MOON"] = 2] = "MOON";
    CelestialType[CelestialType["NEBULA"] = 3] = "NEBULA";
    CelestialType[CelestialType["SPACE_DEBRIS"] = 4] = "SPACE_DEBRIS";
    CelestialType[CelestialType["SPACE_STATION"] = 5] = "SPACE_STATION";
})(CelestialType || (CelestialType = {}));
/// <reference path="universe.ts"/>
/// <reference path="../elements/starship.ts"/>
/// <reference path="../elements/celestial_body.ts"/>
var ARROW_KEYS = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
};
function orbitingPlanet(gravity, sun, mass, distance, radius, angle) {
    if (angle === void 0) { angle = 0; }
    var speed = Math.sqrt(gravity * (sun.m + mass) / distance);
    var p = new Vector(0, distance).rotateZ(angle);
    var v = new Vector(speed, 0).rotateZ(angle);
    return new CelestialBody(CelestialType.PLANET, mass, radius, sun.p.clone().add(p), v);
}
var Level = (function () {
    function Level(config) {
        if (config === void 0) { config = {}; }
        // ------ DEFAULT LEVEL ------
        var gravity = 0.001;
        var sun = new CelestialBody(CelestialType.STAR, 1000, 20, new Vector(0, 0), new Vector(0, 0));
        this.starship = new Starship(StarshipType.SATELLITE, 0.1, 8, new Vector(0, 200), new Vector(0.04, -0.05), 100);
        var planet1 = orbitingPlanet(gravity, sun, 1, 300, 14, 0);
        var planet2 = orbitingPlanet(gravity, sun, 1, 200, 11, 2 / 3 * Math.PI);
        var planet3 = orbitingPlanet(gravity, sun, 1, 100, 8, 4 / 3 * Math.PI);
        // ------ DEFAULT LEVEL ------
        this.universe = new Universe([sun, planet1, planet2, planet3, this.starship], gravity);
    }
    Level.prototype.begin = function () {
        var _this = this;
        window.addEventListener('keydown', function (e) {
            var direction = ARROW_KEYS[e.keyCode];
            if (direction)
                _this.starship.startEngine(direction);
        });
        window.addEventListener('keyup', function (e) {
            var direction = ARROW_KEYS[e.keyCode];
            if (direction)
                _this.starship.stopEngine(direction);
        });
    };
    Level.prototype.move = function (dt) {
        this.universe.move(dt);
        // TODO check if the level is completed
    };
    Level.prototype.onComplete = function (callback) {
        // TODO remove event listener
    };
    return Level;
})();
/// <reference path="../game/universe.ts"/>
/// <reference path="../elements/celestial_body.ts"/>
/// <reference path="../elements/starship.ts"/>
function getCelestialBodyColour(type) {
    switch (type) {
        case CelestialType.STAR: return '#D90';
        case CelestialType.PLANET: return '#C51';
        default: return '#333';
    }
}
var Stage = (function () {
    function Stage(id) {
        this.id = id;
        this.canvas = document.getElementById(id);
        this.context = this.canvas.getContext('2d');
        this.width = this.canvas.width = this.canvas.offsetWidth;
        this.height = this.canvas.height = this.canvas.offsetHeight;
    }
    Stage.prototype.paint = function (universe) {
        this.background();
        for (var _i = 0, _a = universe.objects; _i < _a.length; _i++) {
            var obj = _a[_i];
            if (obj instanceof CelestialBody) {
                obj = obj;
                this.circle(obj.p.x, obj.p.y, obj.r, getCelestialBodyColour(obj.type));
            }
            else if (obj instanceof Starship) {
                obj = obj;
                this.rect(obj.p.x, obj.p.y, 8, 8, '#0CF');
                if (obj.fire.up)
                    this.rect(obj.p.x, obj.p.y + 9, 6, 10, '#F00');
                if (obj.fire.down)
                    this.rect(obj.p.x, obj.p.y - 9, 6, 10, '#F00');
                if (obj.fire.left)
                    this.rect(obj.p.x + 9, obj.p.y, 10, 6, '#F00');
                if (obj.fire.right)
                    this.rect(obj.p.x - 9, obj.p.y, 10, 6, '#F00');
            }
        }
    };
    Stage.prototype.background = function (colour) {
        if (colour === void 0) { colour = '#013'; }
        this.context.fillStyle = colour;
        this.context.fillRect(0, 0, this.width, this.height);
    };
    Stage.prototype.circle = function (x, y, radius, fill) {
        this.context.beginPath();
        this.context.fillStyle = fill;
        this.context.arc(x + this.width / 2, y + this.height / 2, radius, 0, 2 * Math.PI);
        this.context.fill();
    };
    Stage.prototype.rect = function (x, y, width, height, fill) {
        this.context.fillStyle = fill;
        this.context.fillRect(x - width / 2 + this.width / 2, y - height / 2 + this.height / 2, width, height);
    };
    return Stage;
})();
/// <reference path="level.ts"/>
/// <reference path="../renderer/stage.ts"/>
var Game = (function () {
    function Game(stage, levelConfigs) {
        this.stage = stage;
        this.score = 0;
        this.levels = levelConfigs.map(function (l) { return new Level(l); });
    }
    Game.prototype.play = function (levelNumber) {
        if (levelNumber === void 0) { levelNumber = 0; }
        var _this = this;
        var level = this.levels[levelNumber];
        if (!level)
            this.complete();
        level.begin();
        var animation = this.loop(level);
        level.onComplete(function (score) {
            animation.stop();
            _this.score += score;
            _this.play(levelNumber + 1);
        });
    };
    Game.prototype.complete = function () {
        console.log('All levels completed!');
        console.log('Final score: ' + this.score);
    };
    Game.prototype.loop = function (level) {
        var _this = this;
        var running = true;
        function getFrame() {
            if (running)
                window.requestAnimationFrame(getFrame);
            var now = Date.now();
            level.move(Math.min(now - _this.lastPaint, 20));
            _this.stage.paint(level.universe);
            _this.lastPaint = now;
        }
        this.lastPaint = Date.now();
        getFrame();
        return {
            stop: function () { running = false; }
        };
    };
    return Game;
})();
/// <reference path="game/game.ts"/>
/// <reference path="renderer/stage.ts"/>
var stage = new Stage('voyager');
var game = new Game(stage, [{ id: 'level1' }, { id: 'level2' }]);
game.play();
