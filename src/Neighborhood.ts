import {Cell} from "./Cell";

export class Neighborhood implements Cell {
	private amActive: boolean = false;
	private readonly gridSize: number;
	private readonly grid: Cell[][];
	private oneLastRefreshRequired: boolean = false;
	constructor(gridSize: number, prototype: Cell) {
		this.gridSize = gridSize;
		this.grid = [];
		let row = 0;
		let column = 0;
		for(; row < gridSize; row++) {
			const rowArr = [];
			for(; column < gridSize; column++) {
				rowArr.push(prototype.create());
			}
			column = 0;
			this.grid.push(rowArr)
		}
	}

	clear(): void {
	}

	create(): Cell {
		return new Neighborhood(this.gridSize, this.grid[0][0]);
	}

	edge(row: number, column: number): Cell {
		return this.grid[row][column];
	}

	figureNestState(north: Cell, south, east, west, northeast, northwest, southeast, southwest): boolean {
		return false;
	}

	isAlive(): boolean {
		return false;
	}

	redraw(renderer, x, y): void {
		let width = 0;
		let row = 0;
		let column = 0;
		for(; row < this.gridSize; row++) {
			for(; column < this.gridSize; column++) {
				this.grid[row][column].redraw(renderer, row + (x * this.gridSize), column + (y * this.gridSize));
				width += this.grid[row][column].widthInCells();
			}
			column = 0;
		}
		width /= this.gridSize;
		renderer.addRect('stroke', x * width, y * width, width, width, this.amActive ? 'red' : 'black');
	}

	transition(): boolean {
		return false;
	}

	userClicked(x, y): void {
		let row = 0;
		let column = 0;
		let isActive = false;
		for(; row < this.gridSize; row++) {
			for(; column < this.gridSize; column++) {
				this.grid[row][column].userClicked(x, y);
				isActive = isActive || this.grid[row][column].isAlive();
			}
			column = 0;
		}
		this.amActive = isActive;
	}

	widthInCells(): number {
		return 0;
	}

}
