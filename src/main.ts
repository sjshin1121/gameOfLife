import {World} from "./World";
import {Renderer} from "./Renderer";


export function init(el) {
	const w = new World(new Renderer(el))
	w.draw();
	return w;
}
