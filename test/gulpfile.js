
var path = require('path');
var gulp = require('gulp');
var mcss = require('../index.js');
var minifyCSS = require('gulp-minify-css');
var clean = require('gulp-clean');

gulp.task('clean', function() {
	return gulp.src('./css')
		.pipe(clean())
});

gulp.task('mcss', ['clean'], function() {
	gulp.src('./mcss/*.mcss')
		.pipe(mcss({
			include: path.join(__dirname, 'include')
		}))
		.pipe(minifyCSS())
		.pipe(gulp.dest('./css'))
});
