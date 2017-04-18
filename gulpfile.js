'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var del = require('del');
var runSequence = require('run-sequence');
var babel = require('gulp-babel');
var pug = require('gulp-pug');
var stylus = require('gulp-stylus');
var rupture = require('rupture');
var gutil = require('gulp-util');
var browserSync = require('browser-sync');
var spritesmith = require('gulp.spritesmith');
var nib = require('nib');
var concat = require('gulp-concat');
var reload = browserSync.reload;

// Rutas
var path = {
	pug : 'app/precom/pug/*.pug',
	es2015 : 'app/precom/js/*.js',
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
};
//precompiladores
gulp.task('pug',function(){
	gulp.src(path.pug)
		.pipe(pug({ pretty : true }))
		.pipe(gulp.dest(path.root));
});

gulp.task('stylus',function(){
	return gulp.src(path.stylus)
				.pipe(stylus({use:[rupture(),nib()]}))
				.pipe(gulp.dest(path.rootCss));
});

gulp.task('babel',function(){
	return gulp.src(path.es2015)
				.pipe(babel({
            presets: ['es2015']
        }))
				.pipe(gulp.dest(path.rootJs));
});


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
		server: {
			baseDir : [path.root],
			routes: {
				'/bower_components': 'bower_components'
			}
		}
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

// Utilitarios
gulp.task('watch',function(){
	gulp.watch([path.pug],['pug',reload]);
	gulp.watch([path.stylus],['stylus',reload]);
	gulp.watch([path.es2015], ['babel',reload]);
});

gulp.task('js',['babel','concatjs']);

// Tarea por default
gulp.task('default', function () {
  runSequence(['pug','babel','stylus']);
});
