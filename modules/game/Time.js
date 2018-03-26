export default class Time {
	constructor () {
		this._LAST = 0;
		this._CURRENT = 0;
		this.delta = 0;
	}

	update (current) {
		this._CURRENT = current;
		this.delta = (this._CURRENT - this._LAST) / 1000;
		this._LAST = this._CURRENT;
	}
}