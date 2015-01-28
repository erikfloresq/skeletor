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
	spritesmith = require('gulp.spritesmith'),
	nib = require('nib'),
	concat = require('gulp-concat'),
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
	html : 'app/*.html',
	img : 'app/img/sprite/*.png',
	imgSpriteDest : 'app/img/',
	cssSpriteDest : 'app/precom/stylus/'
}

gulp.task('jade',function(){
	gulp.src(paths.jade)
		.pipe(jade({
			pretty : true
		}))
		.pipe(gulp.dest(paths.root))
});

gulp.task('stylus',function(){
	return gulp.src(paths.stylus)
				.pipe(stylus({use:[jeet(),rupture()]}))
				.pipe(gulp.dest(paths.rootCss))
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

gulp.task('sprite', function () {
  var spriteData = gulp.src(paths.img)
  					.pipe(spritesmith({
  						algorithm: 'binary-tree',
					    imgName: 'sprite.png',
					    cssName: 'sprite.styl',
					    imgPath : '../../public/static/o/mapfre/img/sprite.png'
				  	}));

      spriteData.img.pipe(gulp.dest(paths.imgSpriteDest));
      spriteData.css.pipe(gulp.dest(paths.cssSpriteDest));
});

gulp.task('concatjs',function(){
	gulp.src(paths.allJs)
		.pipe(concat('mapfre_campana.js'))
		.pipe(gulp.dest('../../public/static/o/mapfre/js/'));
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
  gulp.watch([paths.jade],['jade',reload]);
  gulp.watch([paths.stylus],['stylus',reload]);
  gulp.watch([paths.coffee], ['coffee',reload]);
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

gulp.task('js',['coffee','concatjs']);

// Build Production Files, the Default Task
gulp.task('default', ['clean'], function (cb) {
  runSequence(['jade','coffee','stylus','jshint', 'copy'], cb);
});