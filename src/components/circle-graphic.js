define([
		'entity-manager',
		'createjs',
		'stage'
	],
	function(
		EntityManager,
		createjs,
		stage
	) {
		'use strict';

		EntityManager.registerComponent('circle-graphic', function() {
			return {

				properties: {
					shape: null,
					radius: 10,
					color: 'black',
				},

				listensTo: [
					'self',
					'position'
				],

				eventHandlers: {
					'position.x': function(newX) {
						this.get('shape').x = newX;
					},
					'position.y': function(newY) {
						this.get('shape').y = newY;
					},
					'self.color': function() {
						this.get('shape')
							.graphics
							.clear()
							.setStrokeStyle(1)
							.beginStroke("black")
							.beginFill(this.get('color'))
							.drawCircle(0, 0, this.get('radius'));
					},
					'self.radius': function() {
						this._shape
							.graphics
							.clear()
							.setStrokeStyle(1)
							.beginStroke("black")
							.beginFill(this.get('color'))
							.drawCircle(0, 0, this.get('radius'));
					}
				},

				init: function() {
					var shape = new createjs.Shape(),
						position = this._parentEntity.getComponent('position');

					shape.x = position.get('x');
					shape.y = position.get('y');

					shape.graphics
						.setStrokeStyle(1)
						.beginStroke(this.get('outline'))
						.beginFill(this.get('color'))
						.drawCircle(0, 0, this.get('radius'));

					stage.addChild(shape);

					this.set('shape', shape);
				},
			};
		});
	}
);