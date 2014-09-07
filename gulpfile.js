var gulp = require('gulp'),
	$ = require('gulp-load-plugins')(),
	del = require('del'),
	runSequence = require('run-sequence'),
	coffee = require('gulp-coffee'),
	jade = require('gulp-jade'),
	stylus = require('gulp-stylus'),
	jeet = require('jeet'),
	rupture = require('rupture'),
	gutil = require('gulp-util'),
	browserSync = require('browser-sync'),
	reload = browserSync.reload;

var paths = {
	jade : 'app/precom/jade/*.jade',
	coffee : 'app/precom/coffee/*.coffee',
	stylus : 'app/precom/stylus/*.styl',
	root : 'app/',
	rootJs : 'app/js',
	rootCss : 'app/css',
	js : 'app/js/*.js',
	css : 'app/css/*.css',
	html : 'app/*.html'
}

gulp.task('jade',function(){
	gulp.src(paths.jade)
		.pipe(jade({
			pretty : true
		}))
		.pipe(gulp.dest(paths.root))
		.pipe(reload({stream: true, once: true}))
});

gulp.task('stylus',function(){
	return gulp.src(paths.stylus)
				.pipe(stylus({use:[jeet(),rupture()]}))
				.pipe(gulp.dest(paths.rootCss))
				.pipe(reload({stream: true, once: true}))
});

gulp.task('coffee',function(){
	gulp.src(paths.coffee)
		.pipe(coffee({bare: true})).on('error',gutil.log)
		.pipe(gulp.dest(paths.rootJs))
});

gulp.task('jshint', function () {
  return gulp.src(paths.js)
    .pipe(reload({stream: true, once: true}))
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.if(!browserSync.active, $.jshint.reporter('fail')));
});

gulp.task('clean', del.bind(null, ['dist']));

gulp.task('copy', function () {
  return gulp.src([
    'app/**',
    '!app/{precom,precom/**}'
  ], {
    dot: true
  })
  .pipe(gulp.dest('dist'))
    .pipe($.size({title: 'copy'}));
});

gulp.task('serve', function () {
  browserSync({
    notify: false,
    server: [paths.root]
  });
  gulp.watch([paths.html]);
  gulp.watch([paths.css]);
  gulp.watch([paths.js], ['jshint']);
});

gulp.task('serve:dist', ['default'], function () {
  browserSync({
    notify: false,
    server: 'dist'
  });
});

gulp.task('watch',function(){
	gulp.watch(paths.jade,['jade']);
	gulp.watch(paths.stylus,['stylus']);
	gulp.watch(paths.coffee,['coffee']);
});

gulp.task('compile',['jade','stylus','coffee']);

// Build Production Files, the Default Task
gulp.task('default', ['clean'], function (cb) {
  runSequence(['jade','coffee','stylus','jshint', 'copy'], cb);
});