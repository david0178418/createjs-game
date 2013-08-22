define(function() {
	"use strict";

	return function() {
		return {
			properties: {
				x: 0,
				y: 0,
			},
			get x() {
				return this.get('x');
			},
			set x(x) {
				this.set('x', x);
			},
			get y() {
				return this.get('y');
			},
			set y(y) {
				this.set('y', y);
			}
		};
	};
});