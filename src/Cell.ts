export interface Cell {
	nextGeneration(north: Cell, south: Cell, east: Cell, west: Cell, northeast: Cell, northwest: Cell, southeast: Cell, southwest: Cell): boolean
	edge(row: number, column: number): Cell
	transition(): boolean
	draw(renderer, x, y): void
	userClicked(x, y): void
	isAlive(): boolean
	widthInCells(): number
	create(): Cell
	clear(): void
}

export const DUMMY = new class Dummy implements Cell {
	clear(): void {
	}

	create(): Cell {
		return undefined;
	}

	edge(row: number, column: number): Cell {
		return this;
	}

	nextGeneration(north: Cell, south, east, west, northeast, northwest, southeast, southwest): boolean {
		return false;
	}

	isAlive(): boolean {
		return false;
	}

	draw(): void {
	}

	transition(): boolean {
		return false;
	}

	userClicked(): void {
	}

	widthInCells(): number {
		return 0;
	}

}
