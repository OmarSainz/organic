var Chemical = require("organic").Chemical,
		Organel  = require("organic").Organel,
		util 		 = require("util"),
		fs 			 = require('fs');

module.exports = function CSS(plasma, config) {
	Organel.call(this, plasma);

	var cssStyles = fs.readFileSync(config.file).toString();
	var self = this;
	this.on('page', function (chemical){
		self.emit(new Chemical({
			type: "css",
			value: "cssStyles"
		}));
		return false;
	});

}

util.inherits(module.exports, Organel);