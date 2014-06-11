	var gulp = require('gulp'),
		gutil = require('gulp-util'),
		uglify = require('gulp-uglify'),
		concat = require('gulp-concat'),
		connect = require('gulp-connect'),
		bower = require('gulp-bower-src'),
		gulpFilter = require('gulp-filter'),
		debug = require('gulp-debug'),
		inject = require('gulp-inject'),
		es = require('event-stream'),
		watch = require('gulp-watch')
	;


	var filesToMove = [
		'bower_components/fastclick/lib/fastclick.js',
		
	];

	var filter = gulpFilter('**/*.min.js');

	gulp.task('webserver', function() {
		connect.server({
			livereload: true
		});
	});

	gulp.task('boweride', function() {
		bower()
			.pipe(filter)
			// .pipe(uglify())
			// .pipe(filter.restore())
			// .pipe(debug())
			.pipe(gulp.dest('./lib'));
	});

	gulp.task('js', function() {
		var vendorStream = gulp.src('./lib/**/*.min.js')
			.pipe(concat('vendors.js'))
			.pipe(gulp.dest('./dist'));

		var appStream = gulp.src('assets/js/*.js')
			.pipe(concat('app.js'))
			// .pipe(uglify())
			.pipe(gulp.dest('./dist'));

		gulp.src('./assets/html/index.html')
			.pipe(inject(es.merge(appStream, vendorStream)))
			.pipe(gulp.dest('./dist'));
	});

	gulp.task('watch', function() {
		gulp.watch(['assets/js/*.js', './index.html'], ['js']);
	});

	gulp.task('livereload', function() {
		gulp.src('./dist/*.js')
			.pipe(watch())
			.pipe(connect.reload());
	});

	// gulp.task('default', ['webserver', 'boweride']);
	gulp.task('default', ['boweride', 'js', 'webserver', 'livereload', 'watch']);