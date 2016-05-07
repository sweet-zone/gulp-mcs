
var through = require('through2'),
	gutil = require('gulp-util'),
	PluginError = gutil.PluginError,
	mcss = require('mcss');

const PLUGIN_NAME = 'gulp-mcs';

module.exports = function(opt) {
	opt = opt || {};

	var stream = through.obj(function(file, enc, cb) {

		if (file.isNull()) {
			return cb();
		}
		if (file.isStream()) {
			this.emit('error', new PluginError(PLUGIN_NAME,  'Streaming not supported'));
			return cb();
		}

		var self = this;
		mcss(opt).set('filename', file.path).translate().done(function(text) {
			file.contents = new Buffer(text);
			file.path = gutil.replaceExtension(file.path, '.css');
			self.push(file);
			cb();
		}).fail(function(error) {
			mcss.error.format(error)
			console.log(error.message);
			cb();
		});

	});

	return stream;
}