import {Cell, DUMMY} from "./Cell";
import {Neighborhood} from "./Neighborhood";
import {Renderer} from "./Renderer";
import {Resident} from "./Resident";

export class World {
	private readonly DEFAULT_CELL_SIZE: number = 4;
	private outermostCell: Cell;
	private readonly renderer: Renderer;
	constructor(renderer) {
		this.renderer = renderer;
		this.outermostCell = new Neighborhood(this.DEFAULT_CELL_SIZE ** 2,
			new Neighborhood(
				this.DEFAULT_CELL_SIZE,
				new Resident()
			));

		this.renderer.addEvent('click', (x, y) => {
			this.clickedCell(x, y);
			this.draw();
		})
	}

	clickedCell(x: number, y: number) {
		this.outermostCell.userClicked(x, y);
	}
	
	draw() {
		this.outermostCell.redraw(this.renderer, 0, 0);
		this.renderer.render()
	}

	timerStart(time) {
		console.log('timerStart', time);
		window.setInterval(() => {
			this.outermostCell.nextState(DUMMY, DUMMY, DUMMY, DUMMY, DUMMY, DUMMY, DUMMY, DUMMY);
			this.outermostCell.transition();
			this.draw();
		}, time);
	}
}
