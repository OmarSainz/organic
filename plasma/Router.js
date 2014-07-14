var Chemical = require('organic').Chemical,
		Organel  = require('organic').Organel,
		util		 = require('util');

module.exports = function Router(plasma, config) {
	Organel.call(this, plasma);
	var self = this;
	this.on('request', function(chemical, sender, callback){
		var page = chemical.req.url.substr(1, chemical.req.url.lenght);
		page = page == "" || page == "/" ? "index" : page;
		self.emit(new Chemical({
			type: "page",
			page: page,
			ready: callback
		}));
	});
}

util.inherits(module.exports, Organel);