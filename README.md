skeletor
========

## ¿Que es?

Es una estructura base para comenzar un proyecto basado en jade, stylus, coffee script.
Se usa gulp para la gestión de tareas.

## ¿Como se usa?

Entrar a la raiz del proyecto y hacer
- sudo npm install
Para poder instalar todas las dependencias que usara gulp

Las Tareas que estamos manejando son

- jade, para compilar los archivos jade
- stylus, para compilar los archivos stylus
- coffee, para compilar los archivos coffee
- jshint, para validar js
- clean, para eliminar la carpeta dist
- copy, pasar los archivos de la carpeta app a la carpeta dist sin la carpeta precom (tiene los archivos jade, coffee, stylus)
- serve, crear un servidor y asu vez, reacciona a los cambios en los archivos jade, stylus y coffee, los cuales compila y luego refresca todos los navegadores que tengan la página en visualización. :D
- watch, reacciona a los cambios en los archivos jade, stylus, coffee y los compila.
- default, ejecuta las tareas jade, stylus, coffee

Los plugins de gulp que se estan usando son
	- [gulp](https://www.npmjs.org/package/gulp)
	- [gulp-coffee](https://www.npmjs.org/package/gulp-coffee)
	- [gulp-jade](https://www.npmjs.org/package/gulp-jade)
	- [gulp-stylus](https://www.npmjs.org/package/gulp-stylus)
	- [browser-sync](https://www.npmjs.org/package/browser-sync)
	- [del](https://www.npmjs.org/package/del)
	- [gulp-if](https://www.npmjs.org/package/gulp-if)
	- [gulp-jshint](https://www.npmjs.org/package/gulp-jshint)
	- [gulp-load-plugins](https://www.npmjs.org/package/gulp-load-plugins)
	- [gulp-size](https://www.npmjs.org/package/gulp-size)
	- [gulp-util](https://www.npmjs.org/package/gulp-util)
	- [jeet](https://www.npmjs.org/package/jeet)
	- [jshint-stylish](https://www.npmjs.org/package/jshint-stylish)
	- [run-sequence](https://www.npmjs.org/package/run-sequence)
	- [rupture](https://www.npmjs.org/package/rupture)
	- [nib](https://www.npmjs.org/package/nib)
	- [gulp.spritesmith](https://www.npmjs.org/package/gulp.spritesmith)
	- [gulp-concat](https://www.npmjs.org/package/gulp-concat)

Recuerda que para installar los plugins tienes que hacer
- sudo npm install (linux, mac)

Si se desea se puede usar bower para la gestion de dependencias, si es asi, se debe de hacer un
- bower install

Las dependencias que se estan instalando son
 - jQuery
 - html5shiv
 - normalize
 - jquery-validate