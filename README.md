# Creando una Red Social

Bienvenida a tu primer proyecto del track de Frontend en Laboratoria.

En este proyecto construirás una red social,Single-Page Application (SPA), responsive con persintencia de datos, utilizando HTML5,CCS3, JavaScript(ES6+) y Firebase, cuyo temática dejaremos a tu elección.

## Objetivos de Aprendizaje

El objetivo de aprendizaje de este proyecto es construir una Red Social, Single-Page Application (SPA), responsive en la que podamos escribir, leer, actualizar y eliminar datos.

En otras palabras, seguirás afianzando todo lo aprendido en el Common Core, pero adicionalmente verás :

### A nivel de planificación

* Utilizar el entorno de GitHub-project para gestionar la planificación de tu proyecto. Dicha planificación, será utilizada, por tus coaches, para ver el avance del equipo y dar feedback.

* Escribir, de manera colaborativa, las **Definiciones de terminado** y **Criterios de Aceptación** por cada **Historia de usuario** que te daremos para este proyecto y que se deberán ver reflejadas en tu planificación.

* Priorices, en función del valor que le aporta al usuario, y ejecutes en equipo todas las historias de usuario dentro del tiempo estimado para cada sprint y que finalmente se vean reflejadas en publicaciones de partes completas y utilizables al final del spint.

* Practicar el terminar una historia de usuario antes de pasar a la siguiente, es decir, que cumple con Definición de Terminado y Criterios de Aceptación contemplando todos los puntos que son objetivos de aprendizaje para este proyecto.

### A nivel del desarrollo frontend

#### Arquitectura

Como equipo, construirán una Single-Page Aplication (SPA), para ello, deberán aprender a estructurar sus carpetas y archivos para manejar la arquitectura modelo - vista - controlador.

#### Tecnologías HTML5 y CSS3

* Aplicar HTML5 semantico en tu proyecto.
* Apliques y refuerces los conceptos base de CSS3 tales como: modelo de cajas, posicionamiento (float, absolute, relative, fixed, flexbox), etc.
* Implementar selectores de clase evitando la redundancia de estilos en CCS3.
* Utilizar `media-queries` para lograr un diseño responsivo `mobile first`.
* Que puedas implementar un sistema de grillas básico que te permita crear un diseño adaptativo para **mobile y desktop**

A continuación te proporcionamos el layout (diseño) de la vista mobile y desktop que deberás replicar visualmente y cuyo contenido, colores y fuentes de texto, dejaremos a tu elección.

* Vista mobile

    ![mobile](https://user-images.githubusercontent.com/32286663/56174616-ec9f6100-5fb8-11e9-9edb-d5ef7c251d9c.png)

* Vista Desktop

    ![desktop](https://user-images.githubusercontent.com/32286663/56174626-fcb74080-5fb8-11e9-8854-26e8d9c4e25f.png)

#### JavaScript (ES6+)

* Utilizar modulos de ES6 para poder importar y exportar nuestro código JavaScript.
* Reforzar tu conocimiento sobre el uso de Template literals (Template strings).
* Reforzar tu conocimiento de la manipulacion de los elementos del DOM a traves JavaScript.
* Implementar un sistema de rutas para cambiar de una vista a otra (SPA).
* Testear las **funciones puras** que representen la lógica en la aplicación, con Jest cuidando que el coverage pase el 70% de statements (sentencias), functions (funciones), lines (líneas), y branches (ramas).

### A nivel de persistencia de datos

En los proyectos anteriores solo has consumido (leído) datos, por ejemplo, a través de un archivo json.
En este proyecto tendrás que crear esos datos, así como leer, actualizar, modificar y eliminarlos según los requerimiento del usuario. Para llevarlo a cabo, en este proyecto utilizaremos `Firebase`.

#### Firebase

El objetivo de usar Firebase, en este proyecto, es que aprendes a manejar y persistir datos a traves de una base de datos no relacional y puedas implementar operaciones CRUD (Creación, Lectura, Actualización y eliminación) de datos.

## Consideraciones generales del proyecto

* Este proyecto debe ser desarrollado en equipos de trabajo de 3 integrantes.

* La duración del proyecto es **3 sprints**

  * **Primer Sprint** : 22/04 al 26/04
  * **Segundo Sprint** : 29/04 al 03/05
  * **Tercer Sprint** : 06/05 al 10/05

* Te daremos las **historias de usuario** con el fin de presentarte los requerimientos y funcionalidades que desea el usuario final.

* La **planificación es vital**, para ello utilizaremos el flujo de trabajo colaborativo que nos ofrece Github - project, para que puedas **escribir tus definiciones de terminado** y **criterios de aceptación** por cada historia de usuario con el objetivo que determinen, en equipo, **qué hacer** en el sprint y **cómo se realizará**. Recuerda que esta planificación será revisada por tus coaches para ver el avance del equipo y dar feedback.

## Restricciones Técnicas

* No está permitido el uso de frameworks de CCS (bootstrap).

* Ya te damos un diseño (layout) de la vista mobile y desktop, queremos realmente que lo repliques en forma, el contenido depende de la temática que van a elegir como equipo.

* Los test son importantes, te sugerimos que pongas en práctica implementarlas desde la primera historia de usuario.

## Historias de Usuario

* Como usuario nuevo debo poder crear una cuenta con email y password para poder iniciar sesion. Si el mail o password no es válido, al momento de logearme, debo poder ver un mensaje de error. Por otro lado, necesito también tener la opción de iniciar sesión con mi cuenta de Google o Facebook. Al final debo poder ingresar a la red social y poder visualizar los datos de mi perfil creado o editarlos.

* Como usuario loggeado debo poder crear, guardar, modificar en el mismo lugar (in place) y eliminar una publicación (post) privada o pública, que puede ser una frase o una imagen.

* Como usuario loggeado debo poder ver todos los posts públicos y privados que he creado hasta ese momento, desde el más reciente hasta el más antiguo, así como la opción de poder cambiar la configuración de privacidad de mis post.

* Yo como usuario loggeado, puedo dar like y llevar un conteo de likes en mi publicación así como poder escribir, guardar, editar o eliminar un comentario en mi publicación.