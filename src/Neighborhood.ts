import {Cell} from "./Cell";
import {Renderer} from "./Renderer";

export class Neighborhood implements Cell {
	private amActive: boolean = false;
	private readonly gridSize: number;
	private readonly children: Cell[][];
	constructor(gridSize: number, prototype: Cell) {
		this.gridSize = gridSize;
		this.children = [];
		let row = 0;
		let column = 0;
		for(; row < gridSize; row++) {
			const rowArr = [];
			for(column = 0; column < gridSize; column++) {
				rowArr.push(prototype.create());
			}
			this.children.push(rowArr)
		}
	}

	clear(): void {
	}

	create(): Cell {
		return new Neighborhood(this.gridSize, this.children[0][0]);
	}

	edge(row: number, column: number): Cell {
		return this.children[row][column];
	}

	nextGeneration(north: Cell, south: Cell, east: Cell, west: Cell, northeast: Cell, northwest: Cell, southeast: Cell, southwest: Cell): boolean {
		const gridSize = this.gridSize;
		let northCell, southCell, eastCell, westCell, northeastCell, northwestCell, southeastCell, southwestCell;
		let row = 0;
		let column = 0;
		for(; row < gridSize; row++) {
			for(column = 0; column < gridSize; column++) {
				if (row === 0) {
					northwestCell = column === 0 ?
						northwest.edge(gridSize - 1, gridSize - 1) :
						north.edge(gridSize - 1, column - 1);

					northCell = north.edge(gridSize - 1, column);

					northeastCell = column === (gridSize - 1) ?
						northeast.edge(gridSize - 1, 0) :
						north.edge(gridSize - 1, column + 1);
				} else {
					northwestCell = column === 0 ?
						west.edge(row - 1, gridSize - 1) :
						this.children[row - 1][column - 1];

					northCell = this.children[row - 1][column];

					northeastCell = column === (gridSize - 1) ?
						east.edge(row - 1, 0) :
						this.children[row - 1][column + 1];
				}

				westCell = column === 0 ?
					west.edge(row, gridSize - 1) :
					this.children[row][column - 1];
				eastCell = column === (gridSize - 1) ?
					east.edge(row, 0) :
					this.children[row][column + 1];

				if (row === (gridSize - 1)) {
					southwestCell = column === 0 ?
						southwest.edge(0, gridSize - 1) :
						south.edge(0, column - 1);

					southCell = south.edge(0, column);

					southeastCell = column === (gridSize - 1) ?
						southeast.edge(0, 0) :
						south.edge(0, column + 1);
				} else {
					southwestCell = column === 0 ?
						west.edge(row + 1, gridSize - 1) :
						this.children[row + 1][column - 1];

					southCell = this.children[row + 1][column];

					southeastCell = column === (gridSize - 1) ?
						east.edge(row + 1, 0) :
						this.children[row + 1][column + 1];
				}

				if (this.children[row][column].nextGeneration(
					northCell, southCell,
					eastCell, westCell,
					northeastCell, northwestCell,
					southeastCell, southwestCell
				)) {
					this.amActive = true;
				}
			}
		}
		return this.amActive;
	}

	isAlive(): boolean {
		return this.amActive;
	}

	draw(renderer: Renderer, x: number, y: number): void {
		let width = 0;
		let row = 0;
		let column = 0;
		for(; row < this.gridSize; row++) {
			for(column = 0; column < this.gridSize; column++) {
				this.children[row][column].draw(renderer, row + (x * this.gridSize), column + (y * this.gridSize));
				width += this.children[row][column].widthInCells();
			}
		}
		width /= this.gridSize;
		renderer.addRect('stroke', x * width, y * width, width, width, this.amActive ? 'red' : 'black');
	}

	transition(): boolean {
		let result = false;
		let isAlive = false;
		for (const childrenRow of this.children) {
			for (const child of childrenRow) {
				if (child.transition()) {
					result = true;
				}
				if (child.isAlive()) {
					isAlive = true;
				}
			}
		}
		this.amActive = isAlive;
		return result;
	}

	userClicked(x, y): void {
		let isActive = false;
		for (const childrenRow of this.children) {
			for (const child of childrenRow) {
				child.userClicked(x, y);
				isActive = isActive || child.isAlive();
			}
		}
		this.amActive = isActive;
	}

	widthInCells(): number {
		return 0;
	}

}
