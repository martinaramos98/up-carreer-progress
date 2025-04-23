# Trabajo Practico Devops - Progreso Carreras UP  

Repositio para el proyecto de la materia DEVOPS de la UP. La tematica del proyecto va a ser minimante desarollar una API REST, para la autogestion de las carreras y materias de un usuario. 

Para el frontend en caso de llegar seria dar una representacion visual y de la administracion a traves de una ui de la api a desarrollar.

> [!NOTE]
> Esta aplicion debe ser ejecutada en un entorno Linux/Mac. Por lo que en caso de utilizar Windows debera instalar WSL.  

## Frontend

### Tecnologias Utilizadas 


## Backend 

### Instalacion

Para instalar la app debe contar con la version de *deno 2.2.9*, luego ejecutar: 
```bash
deno install
```
Para el desarrollo local sin docker debera instalar las siguientes aplicaciones y ejecutar los siguientes comandos.

#### Base de Datos

Para el uso de la aplicacion utilizamos como base de datos libsql que es una variante de sqlite.   
Puede ejecutarse desde la linea de comandos a traves de turso-cli o bien con docker compose a traves de la imagen provista.
Para ejecutar desde turso-cli instale el mismo y luego ejecute lo siguiente:
```bash

```

### Desarrollo

Para ejecutar la aplicacion en modo dev debera ejecutar localmente: 

Para levantar el server 
```bash
deno task dev
```

Para levantar la ddbb:
```
turso dev --local-file ./local-file
```
#### Drizzle Studio

En caso de querer utilizar drizzle studio como db manager, debe ejecutarlo con algun package manager de node ya que por ahora no es compatible con deno:npm. 

Para ello ejecute lo siguiente:
```bash
npm install
npm db:studio
```


### Swagger 

### Build


### Testing (Backend) 

Para los tests se ejecutan a traves de el frameowork de playwright.
Para ejecutar los test tiene 2 opciones: 

Con ui:


### CI (Backend)

Para el backend se encuentran 2 workflows uno dependiente del otro. 
El primero es el que ejecuta los tests, y se ejecuta cuando se detecta un push o un pull request en las ramas main,qa y dev. Tambien, solo se activara cuando sean cambios que se encuentren en la carpeta.
Si este workflow se completo, ejecutara otro que en caso de terminar bien los tests, realizara el deploy. 

### Registry Push




### Deploy 


### Tecnologias utilizadas

Acá se encontrarán las principales librerias y tecnologias utilizadas para el backend del proyecto. 

- Se utilizo como tecnologia [Deno](https://deno.com/), que es un interprete de **Javascript/Typescript**.
- Como framework para la REST API se utilizo [Express](https://expressjs.com/)
- Como **ORM** para la base de datos se utilizo [Drizzle](https://orm.drizzle.team/)
- Como Base de Datos se utilizo: (libsqld)[https://github.com/tursodatabase/libsql]
- Para tests integrales de la api, se utilizo [playwright](https://playwright.dev/) 



## Docker Compose

Docker compose permite ejecutar un ambiente con varios docker images. Por ejemplo se puede buildear el backend, ddbb y frontend para el uso de todo junto en un solo entorno de ejecucion y aislados entre si.
Se configuro 2 opciones de ejecucion: 

Para levantar en modo desarrollo:
```bash
docker-compose --profile dev up --build --watchdocker --profile  up --build 
```
Para levantar imagenes con buildeo de produccion:
```bash
docker-compose --profile prod up --build --watchdocker --profile  up --build 
```
Si es la primera que ejecuta el entorno, debera generar los schemas para las tablas de la base de datos. Para ello, situese dentro de la carpeta `/backend` y luego ejecute:
Para generar el .sql con las queries para la creacion de tablas:
```bash
npm run db:generate # puede reemplazar npm por su gestor de paquetes de preferencia
```
Para ejecutar el script:
```bash
npm run db:push # puede reemplazar npm por su gestor de paquetes de preferencia
```

Ya puede utilizar docker-compose con la apliacion 🐳.
