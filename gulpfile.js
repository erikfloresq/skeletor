var gulp = require('gulp'),
	coffee = require('gulp-coffee'),
	jade = require('gulp-jade'),
	stylus = require('gulp-stylus'),
	jeet = require('jeet'),
	rupture = require('rupture'),
	gutil = require('gulp-util'),
	livereload = require('gulp-livereload');

var paths = {
	jades : ['./precom/jade/*.jade'],
	scripts : ['./precom/coffee/*.coffee'],
	stylus : ['./precom/stylus/*.styl']
}

gulp.task('jade',function(){
	gulp.src(paths.jades)
		.pipe(jade({
			pretty : true
		}))
		.pipe(gulp.dest('./'))
});

gulp.task('stylus',function(){
	return gulp.src(paths.stylus)
				.pipe(stylus({use:[jeet(),rupture()]}))
				.pipe(gulp.dest('./css'))
});

gulp.task('coffee',function(){
	gulp.src(paths.coffee)
		.pipe(coffee({bare: true})).on('error',gutil.log)
		.pipe(gulp.dest('./js'))
});

gulp.task('default',['jade','stylus']);

gulp.task('watch',function(){
	livereload.listen();
	gulp.watch(paths.jades,['jade']).on('change', livereload.changed);
	gulp.watch(paths.stylus,['stylus']).on('change', livereload.changed);
	//gulp.watch(paths.coffee,['coffee']);
});



