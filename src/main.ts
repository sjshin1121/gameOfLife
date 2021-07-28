import {World} from "./World";
import {Renderer} from "./Renderer";

export function start(el) {
	const w = new World(new Renderer(el))
	w.draw();
}
