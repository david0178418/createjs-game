define([
		'underscore',
	],
	function(_) {
		"use strict";

		return {
			run: function(entities, dt) {

				if(this.processAll) {
					this.processAll(entities, dt);
				}

				if(this.processOne) {
					_(entities).each(function(entity) {
						this.processOne(entity, dt);
					}, this);
				}

				_(entities).each(function(entity) {
					entity.broadcastComponentUpdates();
				}, this);
			}
		};
	}
);