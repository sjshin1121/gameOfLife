type command = {
	type: 'expression' | 'function'
	name: 'strokeRect' | 'strokeStyle' | 'fillRect',
	arg: (number | string) []
};

type listener = {
	type: 'click',
	func: (x:number, y:number) => void
}

export class Renderer {
	private canvasEl: HTMLCanvasElement;
	private ctx: CanvasRenderingContext2D;
	private mousePosition: { type: string, x: number, y: number } = { type: '', x: 0, y: 0 };
	private commands: command [] = [];
	private listeners: listener [] = [];
	
	constructor(el,
				width = window.innerWidth,
				height = window.innerHeight,
				isWindowEvent = false,
				eventNames = ['click'],
				elStyle = 'position: fixed;' +
				'top: 0;' +
				'left: 0;' +
				'z-index: -1;',) {
		this._initialize(el, width, height, elStyle);
		this._eventInitialize(isWindowEvent, eventNames);
	}

	_initialize (el, width, height, elStyle) {
		let canvasEl;
		canvasEl = el;
		if (!canvasEl) {
			canvasEl = document.createElement('canvas');
			document.body.appendChild(canvasEl);
		}
		canvasEl.width = width;
		canvasEl.height = height;
		canvasEl.style = elStyle;

		this.canvasEl = canvasEl;
		this.ctx = canvasEl.getContext('2d');
	}

	_eventInitialize (isWindowEvent, eventNames) {
		const listener = e => {
			this.mousePosition.type = e.type;
			this.mousePosition.x = e.x;
			this.mousePosition.y = e.y;
			this.listeners.filter(listener => listener.type === 'click').forEach(listener => listener.func(e.x, e.y));
		};

		eventNames.forEach(eventName => {
			if (isWindowEvent) {
				window.addEventListener(eventName, listener)
			} else {
				this.canvasEl.addEventListener(eventName, listener)
			}
		});
	}

	addRect(type: 'stroke' | 'fill' = 'stroke', x, y, width, height, style = 'black') {
		if (type === 'stroke') {
			this.commands.push({ type: 'expression', name: 'strokeStyle', arg: [style] })
			this.commands.push({ type: 'function', name: 'strokeRect', arg: [x, y, width, height] })
		} else if (type === 'fill') {
			this.commands.push({ type: 'function', name: 'fillRect', arg: [x, y, width, height] })
		}
	}
	
	render () {
		this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
		for (const { type, name, arg }: {name:string} of this.commands) {
			if (type === 'function') {
				this.ctx[name](...arg as [number, number, number, number]);
			} else if (type === 'expression') {
				this.ctx[name] = arg[0] as string;
			}
		}
		this.commands.length = 0;
	}

	addEvent(eventName, func) {
		this.listeners.push({type: eventName, func})
	}
}

