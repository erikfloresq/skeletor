//paquetes
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
//rutas
var path = {
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
//precompiladores
gulp.task('jade',function(){
	gulp.src(path.jade)
		.pipe(jade({
			pretty : true
		}))
		.pipe(gulp.dest(path.root))
});

gulp.task('stylus',function(){
	return gulp.src(path.stylus)
				.pipe(stylus({use:[jeet(),rupture(),nib()]}))
				.pipe(gulp.dest(path.rootCss))
});

gulp.task('coffee',function(){
	gulp.src(path.coffee)
		.pipe(coffee({bare: true})).on('error',gutil.log)
		.pipe(gulp.dest(path.rootJs))
});

//sprites para css
gulp.task('sprite', function () {
  var spriteData = gulp.src(path.img)
  					.pipe(spritesmith({
  						algorithm: 'binary-tree',
					    imgName: 'sprite.png',
					    cssName: 'sprite.styl',
					    imgPath : 'app/img/sprite.png'
				  	}));

      spriteData.img.pipe(gulp.dest(path.imgSpriteDest));
      spriteData.css.pipe(gulp.dest(path.cssSpriteDest));
});

//validador de js
gulp.task('jshint', function () {
  return gulp.src(path.js)
    .pipe(reload({stream: true, once: true}))
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.if(!browserSync.active, $.jshint.reporter('fail')));
});

//concatenador de js
gulp.task('concatjs',function(){
	gulp.src(path.allJs)
		.pipe(concat('script.js'))
		.pipe(gulp.dest('app/js/'));
});

//iniciar servidor
gulp.task('browserSync',function(){
	browserSync({
    	notify: true,
    	server: [path.root]
  	});
});

gulp.task('serve', function () {
  runSequence(['browserSync','watch']);
});

//produccion - aun no se implementa bien
gulp.task('serve:dist', ['default'], function () {
  browserSync({
    notify: false,
    server: 'dist'
  });
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

//Utilitarios
gulp.task('watch',function(){
	gulp.watch([path.jade],['jade',reload]);
  	gulp.watch([path.stylus],['stylus',reload]);
  	gulp.watch([path.coffee], ['coffee',reload]);
});

gulp.task('js',['coffee','concatjs']);

// Tarea por default
gulp.task('default', function () {
  runSequence(['jade','coffee','stylus']);
});