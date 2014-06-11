var Telemob = (function($) {
	'use strict';

	var mainContainer,
	app,
	ctx,
	templatesPath ='templates/'
	;

	function initialize() {
		mainContainer = $('#main');
		initSammy();
	}

	function initSammy() {
		app = $.sammy('#main', function() {
			this.use('Mustache', 'ms');

			this.get('#/', function() {
				ctx = this;
				Telemob.menu.init();
			});
		});

		app.debug = true;
		app.run('#/');
	}

	// start
	$(function(){
		initialize();
	});

	return {
		// initialize: initialize

		getContext: function() {
			return ctx;
		},

		getMainContainer: function() {
			return mainContainer;
		},

		getTemplatePath: function() {
			return templatesPath;
		}

	};

})(jQuery);