RickMortyChallenge V1.0

1) Roadmap:

El código se encuentra dividido en 6 carpetas principales:

- Components: aquí se definen las pantallas, sus estílos y su lógica.

- Services: aquí se definen los servicios que procesan las API's. 

- Models: aquí se definen los modelos de datos.

- Shared: aquí se encuentran las herramientas y servicios auxiliares utilizados los distintos componentes.

- Environments: aquí se definen los endpoints de las API's utilizadas en el ambiente de producción y de desarrollo. 

- Assets: incluye todos los recursos adicionales utilizados en la aplicación (imágenes, fuentes, etc).

2) Challenge:

La lógica que contiene la solución de los problemas se encuentra en el componente MainLayoutComponent.ts. El Char Count Challenge se encuentra
en la función runCharCounter() y el Episode Location Challenge se encuentra en la función runEpisodeCounter().

3) Instalación:

- Paso 0: Instalar NodeJS en caso la consola no reconozca los comandos npm.

- Paso 1: abrir la consola y ejecutar el comando: npm install - g @angular/cli

- Paso 2: clonar el repositorio: git clone https://github.com/github_username/repo_name.git

- Paso 3: abrir la consola en la carpeta del proyecto y ejecutar el comando: npm install

- Paso 4: al finalizar la instalación ya se podrá ejecutar el servidor local mediante el comando: ng serve

- Paso 5: acceder a http://localhost:4200/ a través de un navegador


4) Uso:

Abrir la aplicación y esperar a que carguen todos los datos del Rick & Morty API. Luego seleccionar cualquiera de los 2 botones para iniciar el
desafío correspondiente y mostrar los resultados. (Los resultados también se imprimen en la consola del navegador)


5) Angular CLI Details:

# RickMortyChallenge

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.7.


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
