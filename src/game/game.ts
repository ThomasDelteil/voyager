/// <reference path="level.ts"/>
/// <reference path="../renderer/stage.ts"/>

class Game {

	protected levels: Level[];
	protected score: number = 0;
	protected lastPaint: number;

	public constructor(protected stage: Stage, levelConfigs: Object[]) {
		this.levels = levelConfigs.map(l => new Level(l));
	}

	public play(levelNumber: number = 0) {
		let _this = this;
		let level = this.levels[levelNumber];
		if (!level) this.complete();

		level.begin();
		let animation = this.loop(level);

		level.onComplete(function(score: number) {
			animation.stop();
			_this.score += score;
			_this.play(levelNumber + 1)
		});
	}

	public complete() {
		console.log('All levels completed!');
		console.log('Final score: ' + this.score);
	}

	protected loop(level: Level) {
		let _this = this;
		let running = true;

		function getFrame() {
			if (running) window.requestAnimationFrame(getFrame);
			let now = Date.now();
			level.move(Math.min(now - _this.lastPaint, 20));
			_this.stage.paint(level.universe);
			_this.lastPaint = now;
		}

		this.lastPaint = Date.now();
		getFrame();

		return {
			stop: function() { running = false; }
		}
	}

}
