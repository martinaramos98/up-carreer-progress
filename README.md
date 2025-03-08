# Trabajo Practico Devops - Progreso Carreras UP  

Repositio para el proyecto de la materia DEVOPS de la UP. La tematica del proyecto va a ser minimante desarollar una API REST, para la autogestion de las carreras y materias de un usuario. 

Para el frontend en caso de llegar seria dar una representacion visual y de la administracion a traves de una ui de la api a desarrollar.

> [!NOTE]
> Esta aplicion debe ser ejecutada en un entorno Linux/Mac. Por lo que en caso de utilizar windows debera instalar WSL.  

## Frontend

### Tecnologias Utilizadas 
## Backend 

### Instalacion

Para instalar la app debe contar con la version de *deno 2.2.3*, luego ejecutar: 
```bash
deno install
```
Para el desarrollo local sin docker debera instalar las siguientes aplicaciones y ejecutar los siguientes comandos.

#### Base de Datos

Turso?  

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


### Swagger 

### Build

### Registry Push


### Deploy 


### Tecnologias utilizadas

Acá se encontrarán las principales librerias y tecnologias utilizadas para el backend del proyecto. 

- Se utilizo como tecnologia [Deno](https://deno.com/), que es un interprete de **Javascript/Typescript**.
- Como framework para la REST API se utilizo [Express](https://expressjs.com/)
- Como **ORM** para la base de datos se utilizo [Drizzle](https://orm.drizzle.team/)
- Como Base de Datos se utilizo: Turso? MongoDB? postgress?



## Docker Compose
Docker compose permite ejecutar un ambiente con varios docker images. Por ejemplo se puede buildear el backend, ddbb y frontend para el uso de todo junto en un solo entorno de ejecucion.

Para levantar ejecute el comando:
```
docker up --build
```
Para detener los nodos que se esten ejecutando incluso aquellos que quedaron ejecutandose por alguna razon:
```
docker down --orphans
```
