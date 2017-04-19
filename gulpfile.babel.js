import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import del from 'del';
import runSequence from 'run-sequence';
import babel from 'gulp-babel';
import pug from 'gulp-pug';
import stylus from 'gulp-stylus';
import rupture from 'rupture';
import browserSync from 'browser-sync';
import spritesmith from 'gulp.spritesmith';
import nib from 'nib';
import concat from 'gulp-concat';

const $ = gulpLoadPlugins();
const reload = browserSync.reload;

// Rutas
const path = {
  pug: 'app/precom/pug/*.pug',
  es2015: 'app/precom/js/*.js',
  stylus: 'app/precom/stylus/*.styl',
  root: 'app/',
  rootJs: 'app/js',
  rootCss: 'app/css',
  js: 'app/js/*.js',
  css: 'app/css/*.css',
  html: 'app/*.html',
  img: 'app/img/sprite/*.png',
  imgSpriteDest: 'app/img/',
  cssSpriteDest: 'app/precom/stylus/',
};

// preprocesadores
gulp.task('pug', () => {
  gulp.src(path.pug)
  .pipe(pug({ pretty: true }))
  .pipe(gulp.dest(path.root));
});

gulp.task('stylus', () => {
  gulp.src(path.stylus)
  .pipe(stylus({ use: [rupture(), nib()] }))
  .pipe(gulp.dest(path.rootCss));
});

gulp.task('babel', () => {
  gulp.src(path.es2015)
  .pipe(babel({ presets: ['es2015'] }))
  .pipe(gulp.dest(path.rootJs));
});


gulp.task('sprite', () => {
  const smith =
    spritesmith({
      algorithm: 'binary-tree',
      imgName: 'sprite.png',
      cssName: 'sprite.styl',
      imgPath: 'app/img/sprite.png',
    });

  const spriteData =
    gulp.src(path.img)
      .pipe(smith);

  spriteData.img.pipe(gulp.dest(path.imgSpriteDest));
  spriteData.css.pipe(gulp.dest(path.cssSpriteDest));
});

// concatenador de js
gulp.task('concatjs', () => {
  gulp.src(path.allJs)
   .pipe(concat('script.js'))
   .pipe(gulp.dest('app/js/'));
});

// iniciar servidor
gulp.task('browserSync', () => {
  browserSync({
    notify: true,
    server: {
      baseDir: [path.root],
    },
  });
});

gulp.task('serve', () => {
  runSequence(['browserSync', 'watch']);
});

// produccion - aun no se implementa bien
gulp.task('serve:dist', ['default'], () => {
  browserSync({
    notify: false,
    server: 'dist',
  });
});

gulp.task('clean', del.bind(null, ['dist']));

gulp.task('copy', () => {
  gulp.src(
    ['app/**', '!app/{precom,precom/**}'],
    { dot: true },
  )
  .pipe(gulp.dest('dist'))
  .pipe($.size({ title: 'copy' }));
});

// Utilitarios
gulp.task('watch', () => {
  gulp.watch([path.pug], ['pug', reload]);
  gulp.watch([path.stylus], ['stylus', reload]);
  gulp.watch([path.es2015], ['babel', reload]);
});

gulp.task('js', ['babel', 'concatjs']);

// Tarea por default
gulp.task('default', () => {
  runSequence(['pug', 'babel', 'stylus']);
});
