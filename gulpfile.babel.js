const { src, dest, series, watch } = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const del = require('del');
const babel = require('gulp-babel');
const pug = require('gulp-pug');
const stylus = require('gulp-stylus');
const rupture = require('rupture');
const browserSync = require('browser-sync');
const nib = require('nib');
const concat = require('gulp-concat');

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
};

// preprocesadores
function html(cb) {
  src(path.pug)
    .pipe(pug({ pretty: true }))
    .pipe(dest(path.root));
  cb();
}

function css(cb) {
  src(path.stylus)
    .pipe(stylus({ use: [rupture(), nib()] }))
    .pipe(dest(path.rootCss));
  cb();
}

function js(cb) {
  src(path.es2015)
    .pipe(babel({ presets: ['@babel/preset-env'] }))
    .pipe(dest(path.rootJs));
  cb();
}

// concatenador de js
function concatjs(cb) {
  src(path.allJs)
    .pipe(concat('script.js'))
    .pipe(dest('app/js/'));
  cb();
}

// iniciar servidor
function browserSyncUpdate() {
  browserSync({
    notify: true,
    server: {
      baseDir: [path.root],
    },
  });
}

function serve() {
  series(browserSync, watch);
}

// produccion - aun no se implementa bien
// gulp.task('serve:dist', ['default'], () => {
//   browserSync({
//     notify: false,
//     server: 'dist',
//   });
// });

function clean() {
  del.bind(null, ['dist']);
}

function copy() {
  src(
    ['app/**', '!app/{precom,precom/**}'],
    { dot: true },
  )
  .pipe(dest('dist'))
  .pipe($.size({ title: 'copy' }));
}

// Utilitarios
function watcher() {
  watch([path.pug], ['pug', reload]);
  watch([path.stylus], ['stylus', reload]);
  watch([path.es2015], ['babel', reload]);
};

//gulp.task('js', ['babel', 'concatjs']);

exports.js = js
exports.default = series(html, js, css);
