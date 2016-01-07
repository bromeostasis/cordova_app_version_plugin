#!/usr/bin/env node

var fs = require('fs');
var xml = require('xml')
module.exports = function(context) {

	var cordova_util = context.requireCordovaModule("cordova-lib/src/cordova/util"),
	ConfigParser = context.requireCordovaModule('cordova-lib/src/configparser/ConfigParser'),
	projectRoot = cordova_util.isCordova(),
	xml = cordova_util.projectConfig(projectRoot),
	cfg = new ConfigParser(xml),
	version = cfg.version();
	console.log('**************');
	console.log(xml);
	parser = new DOMParser();
	xmlDoc = parser.parseFromString(xml, "text/xml");
	analytics = xmlDoc.getElementsByTagName("analytics")[0].childNodes[0].nodeValue;

	fs.writeFileSync(
		'../../www/getAppVersion.js',
		'module.exports.getAppVersion = function() { return "' + analytics + '";}; \n'
		'module.exports.getAnalytics = function() { return "' + analytics + '";};'
	);
};