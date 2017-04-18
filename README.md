💀 skeletor 💀
========

## ¿Que és?

Es una estructura base para comenzar un proyecto basado en jade, stylus, es2015.
Se usa gulp para la gestión de tareas.

## ¿Cómo se usa?

Para instalar las dependencias que necesitamos debemos hacer en nuestro terminal de confianza:

```
yarn install
```

Las Tareas que estamos manejando en el __gulpfile__:

- __jade__: para compilar los archivos jade
- __stylus__: para compilar los archivos stylus
- __babel__: para compilar los js desarrollados en es2015
- __clean__: para eliminar la carpeta dist
- __copy__: pasar los archivos de la carpeta app a la carpeta dist sin la carpeta precom (tiene los archivos jade, js, stylus)
- __serve__: crear un servidor y asu vez, reacciona a los cambios en los archivos jade, stylus y babel, los cuales compila y luego refresca todos los navegadores que tengan la página en visualización. :D
- __watch__: reacciona a los cambios en los archivos jade, stylus, babel y los compila.
- __default__: ejecuta las tareas jade, stylus, babel

Los paquetes que estamos usando para nuestro trabajo con gulp son:

	- [gulp](https://www.npmjs.org/package/gulp)
	- [gulp-babel](https://www.npmjs.org/package/gulp-babel)
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

En el caso que quieras validar tu js puedes usar:

```
yarn lint
```
