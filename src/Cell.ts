import * as assert from 'assert';

interface Direction {
}

interface Memento {
}

export interface Cell {
	figureNestState(north: Cell, south, east, west, northeast, northwest, southeast, southwest): boolean
	edge(row: number, column: number): Cell
	transition(): boolean
	redraw(renderer, x, y): void
	userClicked(x, y): void
	isAlive(): boolean
	widthInCells(): number
	create(): Cell
	clear(): void
}

export const DUMMY = new class implements Cell {
	clear(): void {
	}

	create(): Cell {
		return undefined;
	}

	edge(row: number, column: number): Cell {
		return undefined;
	}

	figureNestState(north: Cell, south, east, west, northeast, northwest, southeast, southwest): boolean {
		return false;
	}

	isAlive(): boolean {
		return false;
	}

	isDisruptiveTo(): Direction {
		return undefined;
	}

	redraw(): void {
	}

	transfer(memento: Memento): boolean {
		return false;
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
