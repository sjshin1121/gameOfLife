import assert from "assert";
import {Cell} from "./Cell";

export class Resident implements Cell{
	private amAlive: boolean = false;
	private willBeAlive: boolean = false;
	private readonly DEFAULT_RESIDENT_SIZE: number = 10
	private x: number;
	private y: number;

	private isStable(): boolean {
		return this.amAlive === this.willBeAlive;
	}
	figureNestState(north: Cell, south, east, west, northeast, northwest, southeast, southwest): boolean {
		let neighbors = 0;
		if (north.isAlive()) ++neighbors;
		if (south.isAlive()) ++neighbors;
		if (east.isAlive()) ++neighbors;
		if (west.isAlive()) ++neighbors;
		if (northeast.isAlive()) ++neighbors;
		if (northwest.isAlive()) ++neighbors;
		if (southeast.isAlive()) ++neighbors;
		if (southwest.isAlive()) ++neighbors;
		this.willBeAlive = (neighbors === 3 || (this.amAlive && neighbors === 2));
		return !this.isStable();
	}
	edge(row: number, column: number): Cell {
		assert(row === 0 && column === 0)
		return this;
	}

	clear(): void {
		this.amAlive = this.willBeAlive = false;
	}

	create(): Cell {
		return new Resident();
	}

	isAlive(): boolean {
		return this.amAlive;
	}

	redraw(renderer, x, y): void {
		this.x = x * this.DEFAULT_RESIDENT_SIZE;
		this.y = y * this.DEFAULT_RESIDENT_SIZE;
		renderer.addRect(
			this.isAlive() ? 'fill' : 'stroke',
			this.x,
			this.y,
			this.DEFAULT_RESIDENT_SIZE,
			this.DEFAULT_RESIDENT_SIZE,
			'#ebebeb'
		);
	}

	transition(): boolean {
		const changed = this.isStable();
		this.amAlive = this.willBeAlive;
		return changed;
	}

	userClicked(x, y): void {
		if (x > this.x && x < this.x + this.DEFAULT_RESIDENT_SIZE && y > this.y && y < this.y + this.DEFAULT_RESIDENT_SIZE) {
			this.amAlive = !this.amAlive;
		}
	}

	widthInCells(): number {
		return this.DEFAULT_RESIDENT_SIZE;
	}

}
