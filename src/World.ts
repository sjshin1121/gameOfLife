import {Cell} from "./Cell";
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
}
