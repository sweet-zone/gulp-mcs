
var gulp = require('gulp'),
	minifyCSS = require('gulp-minify-css'),
	clean = require('gulp-clean'),
	mcss = require('../index.js');

gulp.task('clean', function() {
	return gulp.src('./css')
		.pipe(clean())
})

gulp.task('mcss', ['clean'], function() {
	gulp.src('./mcss/*.mcss')
		.pipe(mcss())
		.pipe(minifyCSS())
		.pipe(gulp.dest('./css'))
})