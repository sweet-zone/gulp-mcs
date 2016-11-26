var path = require('path');
var mcss = require('mcss');
var through = require('through2');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;
var cwd = process.cwd();

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

        var include;

        if (opt.include) {
            if (!Array.isArray(opt.include)) { opt.include = [ opt.include ]; }
            include = opt.include.map(function (p) {
                return path.resolve(cwd, p);
            });
        }

        var instance = mcss(opt);

        if (include) { instance.include(include); }

		var self = this;
		instance.set('filename', file.path).translate().done(function(text) {
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
