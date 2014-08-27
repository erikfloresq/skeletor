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
	coffee : ['./precom/coffee/*.coffee'],
	stylus : ['./precom/stylus/*.styl']
}

gulp.task('jade',function(){
	gulp.src(paths.jades)
		.pipe(jade({
			pretty : true
		}))
		.pipe(gulp.dest('./'))
		.pipe(livereload())
});

gulp.task('stylus',function(){
	gulp.src(paths.stylus)
		.pipe(stylus({use:[jeet(),rupture()]}))
		.pipe(gulp.dest('./css'))
		.pipe(livereload())
});

gulp.task('coffee',function(){
	gulp.src(paths.coffee)
		.pipe(coffee({bare: true})).on('error',gutil.log)
		.pipe(gulp.dest('./js'))
		.pipe(livereload())
});

gulp.task('default',['jade','stylus','coffee']);

gulp.task('watch',function(){
	gulp.watch(paths.jades,['jade']);
	gulp.watch(paths.stylus,['stylus']);
	gulp.watch(paths.coffee,['coffee']);
});