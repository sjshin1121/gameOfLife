
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('assert')) :
    typeof define === 'function' && define.amd ? define(['exports', 'assert'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.gameOfLife = {}, global.assert));
}(this, (function (exports, assert) { 'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var assert__default = /*#__PURE__*/_interopDefaultLegacy(assert);

    var Neighborhood = /** @class */ (function () {
        function Neighborhood(gridSize, prototype) {
            this.amActive = false;
            this.oneLastRefreshRequired = false;
            this.gridSize = gridSize;
            this.grid = [];
            var row = 0;
            var column = 0;
            for (; row < gridSize; row++) {
                var rowArr = [];
                for (; column < gridSize; column++) {
                    rowArr.push(prototype.create());
                }
                column = 0;
                this.grid.push(rowArr);
            }
        }
        Neighborhood.prototype.clear = function () {
        };
        Neighborhood.prototype.create = function () {
            return new Neighborhood(this.gridSize, this.grid[0][0]);
        };
        Neighborhood.prototype.edge = function (row, column) {
            return this.grid[row][column];
        };
        Neighborhood.prototype.figureNestState = function (north, south, east, west, northeast, northwest, southeast, southwest) {
            return false;
        };
        Neighborhood.prototype.isAlive = function () {
            return false;
        };
        Neighborhood.prototype.redraw = function (renderer, x, y) {
            var width = 0;
            var row = 0;
            var column = 0;
            for (; row < this.gridSize; row++) {
                for (; column < this.gridSize; column++) {
                    this.grid[row][column].redraw(renderer, row + (x * this.gridSize), column + (y * this.gridSize));
                    width += this.grid[row][column].widthInCells();
                }
                column = 0;
            }
            width /= this.gridSize;
            renderer.addRect('stroke', x * width, y * width, width, width, this.amActive ? 'red' : 'black');
        };
        Neighborhood.prototype.transition = function () {
            return false;
        };
        Neighborhood.prototype.userClicked = function (x, y) {
            var row = 0;
            var column = 0;
            var isActive = false;
            for (; row < this.gridSize; row++) {
                for (; column < this.gridSize; column++) {
                    this.grid[row][column].userClicked(x, y);
                    isActive = isActive || this.grid[row][column].isAlive();
                }
                column = 0;
            }
            this.amActive = isActive;
        };
        Neighborhood.prototype.widthInCells = function () {
            return 0;
        };
        return Neighborhood;
    }());

    var Resident = /** @class */ (function () {
        function Resident() {
            this.amAlive = false;
            this.willBeAlive = false;
            this.DEFAULT_RESIDENT_SIZE = 10;
        }
        Resident.prototype.isStable = function () {
            return this.amAlive === this.willBeAlive;
        };
        Resident.prototype.figureNestState = function (north, south, east, west, northeast, northwest, southeast, southwest) {
            var neighbors = 0;
            if (north.isAlive())
                ++neighbors;
            if (south.isAlive())
                ++neighbors;
            if (east.isAlive())
                ++neighbors;
            if (west.isAlive())
                ++neighbors;
            if (northeast.isAlive())
                ++neighbors;
            if (northwest.isAlive())
                ++neighbors;
            if (southeast.isAlive())
                ++neighbors;
            if (southwest.isAlive())
                ++neighbors;
            this.willBeAlive = (neighbors === 3 || (this.amAlive && neighbors === 2));
            return !this.isStable();
        };
        Resident.prototype.edge = function (row, column) {
            assert__default['default'](row === 0 && column === 0);
            return this;
        };
        Resident.prototype.clear = function () {
            this.amAlive = this.willBeAlive = false;
        };
        Resident.prototype.create = function () {
            return new Resident();
        };
        Resident.prototype.isAlive = function () {
            return this.amAlive;
        };
        Resident.prototype.redraw = function (renderer, x, y) {
            this.x = x * this.DEFAULT_RESIDENT_SIZE;
            this.y = y * this.DEFAULT_RESIDENT_SIZE;
            renderer.addRect(this.isAlive() ? 'fill' : 'stroke', this.x, this.y, this.DEFAULT_RESIDENT_SIZE, this.DEFAULT_RESIDENT_SIZE, '#ebebeb');
        };
        Resident.prototype.transition = function () {
            var changed = this.isStable();
            this.amAlive = this.willBeAlive;
            return changed;
        };
        Resident.prototype.userClicked = function (x, y) {
            if (x > this.x && x < this.x + this.DEFAULT_RESIDENT_SIZE && y > this.y && y < this.y + this.DEFAULT_RESIDENT_SIZE) {
                this.amAlive = !this.amAlive;
            }
        };
        Resident.prototype.widthInCells = function () {
            return this.DEFAULT_RESIDENT_SIZE;
        };
        return Resident;
    }());

    var World = /** @class */ (function () {
        function World(renderer) {
            var _this = this;
            this.DEFAULT_CELL_SIZE = 4;
            this.renderer = renderer;
            this.outermostCell = new Neighborhood(Math.pow(this.DEFAULT_CELL_SIZE, 2), new Neighborhood(this.DEFAULT_CELL_SIZE, new Resident()));
            this.renderer.addEvent('click', function (x, y) {
                _this.clickedCell(x, y);
                _this.draw();
            });
        }
        World.prototype.clickedCell = function (x, y) {
            this.outermostCell.userClicked(x, y);
        };
        World.prototype.draw = function () {
            this.outermostCell.redraw(this.renderer, 0, 0);
            this.renderer.render();
        };
        return World;
    }());

    var Renderer = /** @class */ (function () {
        function Renderer(el, width, height, isWindowEvent, eventNames, elStyle) {
            if (width === void 0) { width = window.innerWidth; }
            if (height === void 0) { height = window.innerHeight; }
            if (isWindowEvent === void 0) { isWindowEvent = false; }
            if (eventNames === void 0) { eventNames = ['click']; }
            if (elStyle === void 0) { elStyle = 'position: fixed;' +
                'top: 0;' +
                'left: 0;' +
                'z-index: -1;'; }
            this.mousePosition = { type: '', x: 0, y: 0 };
            this.commands = [];
            this.listeners = [];
            this._initialize(el, width, height, elStyle);
            this._eventInitialize(isWindowEvent, eventNames);
        }
        Renderer.prototype._initialize = function (el, width, height, elStyle) {
            var canvasEl;
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
        };
        Renderer.prototype._eventInitialize = function (isWindowEvent, eventNames) {
            var _this = this;
            var listener = function (e) {
                _this.mousePosition.type = e.type;
                _this.mousePosition.x = e.x;
                _this.mousePosition.y = e.y;
                _this.listeners.filter(function (listener) { return listener.type === 'click'; }).forEach(function (listener) { return listener.func(e.x, e.y); });
            };
            eventNames.forEach(function (eventName) {
                if (isWindowEvent) {
                    window.addEventListener(eventName, listener);
                }
                else {
                    _this.canvasEl.addEventListener(eventName, listener);
                }
            });
        };
        Renderer.prototype.addRect = function (type, x, y, width, height, style) {
            if (type === void 0) { type = 'stroke'; }
            if (style === void 0) { style = 'black'; }
            if (type === 'stroke') {
                this.commands.push({ type: 'expression', name: 'strokeStyle', arg: [style] });
                this.commands.push({ type: 'function', name: 'strokeRect', arg: [x, y, width, height] });
            }
            else if (type === 'fill') {
                this.commands.push({ type: 'function', name: 'fillRect', arg: [x, y, width, height] });
            }
        };
        Renderer.prototype.render = function () {
            var _a;
            this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
            for (var _i = 0, _b = this.commands; _i < _b.length; _i++) {
                var _c = _b[_i], type = _c.type, name_1 = _c.name, arg = _c.arg;
                if (type === 'function') {
                    (_a = this.ctx)[name_1].apply(_a, arg);
                }
                else if (type === 'expression') {
                    this.ctx[name_1] = arg[0];
                }
            }
            this.commands.length = 0;
        };
        Renderer.prototype.addEvent = function (eventName, func) {
            this.listeners.push({ type: eventName, func: func });
        };
        return Renderer;
    }());

    function start(el) {
        var w = new World(new Renderer(el));
        w.draw();
    }

    exports.start = start;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
