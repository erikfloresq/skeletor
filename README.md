skeletor
========

## ¿Que es?

Es una estructura base para comenzar un proyecto basado en jade, stylus, es2015.
Se usa gulp para la gestión de tareas.

## ¿Como se usa?

Entrar a la raiz del proyecto y hacer
- sudo npm install
Para poder instalar todas las dependencias que usara gulp

Las Tareas que estamos manejando son

- jade, para compilar los archivos jade
- stylus, para compilar los archivos stylus
- babel, para compilar los js desarrollados en es2015
- clean, para eliminar la carpeta dist
- copy, pasar los archivos de la carpeta app a la carpeta dist sin la carpeta precom (tiene los archivos jade, js, stylus)
- serve, crear un servidor y asu vez, reacciona a los cambios en los archivos jade, stylus y babel, los cuales compila y luego refresca todos los navegadores que tengan la página en visualización. :D
- watch, reacciona a los cambios en los archivos jade, stylus, babel y los compila.
- default, ejecuta las tareas jade, stylus, babel

Los plugins de gulp que se estan usando son
	- [gulp](https://www.npmjs.org/package/gulp)
	- [gulp-coffee](https://www.npmjs.org/package/gulp-coffee)
	- [gulp-pug](https://www.npmjs.org/package/gulp-pug)
	- [gulp-stylus](https://www.npmjs.org/package/gulp-stylus)
	- [browser-sync](https://www.npmjs.org/package/browser-sync)
	- [del](https://www.npmjs.org/package/del)
	- [gulp-if](https://www.npmjs.org/package/gulp-if)
	- [gulp-load-plugins](https://www.npmjs.org/package/gulp-load-plugins)
	- [gulp-size](https://www.npmjs.org/package/gulp-size)
	- [gulp-util](https://www.npmjs.org/package/gulp-util)
	- [run-sequence](https://www.npmjs.org/package/run-sequence)
	- [rupture](https://www.npmjs.org/package/rupture)
	- [nib](https://www.npmjs.org/package/nib)
	- [gulp.spritesmith](https://www.npmjs.org/package/gulp.spritesmith)
	- [gulp-concat](https://www.npmjs.org/package/gulp-concat)

Recuerda que para installar los plugins tienes que hacer

```
yarn install
```

En el caso que quieras validar tu js puede usar

```
yarn lint
```
