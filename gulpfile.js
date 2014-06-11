/* jslint node: true */
'use strict';

var gulp = require('gulp'),
	concat = require('gulp-concat'),
	less = require('gulp-less'),
	connect = require('gulp-connect'),
	minifyCss = require('gulp-minify-css');


gulp.task('js', function() {
	gulp.src('assets/js/**/*.js')
		.pipe(connect.reload())
		;
});

gulp.task('styles', function() {
	gulp.src(['assets/css/style.less'])
		.pipe(less())
		// .pipe(minifyCss())
		.pipe(gulp.dest('assets/css'))
		.pipe(connect.reload())
		;
});

gulp.task('html', function() {
	gulp.src(['./index.html', './templates/**/*.ms'])
		.pipe(connect.reload())
		;
});

gulp.task('webserver', function() {
	connect.server({
		livereload: true
	});
});

gulp.task('watch', function() {
	gulp.watch('assets/css/**', ['styles']);

	gulp.watch(['./index.html', './templates/**/*.ms'], ['html']);

	gulp.watch(['assets/js/**/*.js'], ['js']);

});

gulp.task('default', ['webserver', 'styles', 'js', 'watch']);