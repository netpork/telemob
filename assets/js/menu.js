Telemob.menu = (function() {
	'use strict';

	function init() {
		load();
	}

	function load() {
		Telemob.getContext()
			.load(Telemob.getTemplatePath() + 'menu/index.ms')
			.appendTo(Telemob.getMainContainer());
	}

	function show() {

	}


	return {
		init: init,
		load: load
	};

})();