var Chemical = require("organic").Chemical,
		Organel  = require("organic").Organel,
		util 		 = require("util"),
		fs 			 = require('fs');

module.exports = function Render(plasma, config) {
	Organel.call(this, plasma);

	var getTemplate = function(file, callback) {
		return fs.readFileSync(config.templates + file);
	}

	var formatTemplate = function(html, templateVars) {
		for(var name in templateVars) {
			html = html.replace("{" + name + "}", templateVars[name]);
		}
		return html;
	}

	var templates = {
		layout: getTemplate("layout.html").toString(),
		index: getTemplate("index.html").toString(),
		about: getTemplate("about.html").toString(),
		notFound: getTemplate("notFound.html").toString()
	}

	var vars = {},
			self = this;

	this.on("css", function(chemical){
		vars.css = chemical.value;
	}); 

	this.on("page", function(chemical){
		console.log("Opening" + chemical.page + "page.");
		var html = templates[chemical.page] ? templates[chemical.page] : templates.notFound;
		html = formatTemplate(templates.layout, {content: html});
		html = formatTemplate(html, vars);
		chemical.ready(html);
	});
}

util.inherits(module.exports, Organel);