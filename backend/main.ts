import express from "npm:express";
// import { createRequire } from "node:module";
// const require = createRequire(import.meta.url);
// globalThis.require = require;
// import { loadRoutes } from "./src/utils/loadRoutes.util.ts";
// import { CoursesService } from "./src/Services/Courses.service.ts";
// import { CoursesController } from "./src/Controllers/Courses.controller.ts";
// import { coursesRoutes } from "./src/routes/courses.routes.ts";
// import { CarreerService } from "./src/Services/Carreers.service.ts";
// import { CarreersController } from "./src/Controllers/Carrers.controller.ts";
// import { carreersRoutes } from "./src/routes/carreers.routes.ts";

console.log("starting server...");
const app = express();
app.listen(8000);
app.use(express.json());
// loadRoutes(app, [{
//   path: "/courses",
//   Service: CoursesService,
//   Controller: CoursesController,
//   routeLoader: coursesRoutes,
// },
// {
//   path: "/carreers",
//   Service: CarreerService,
//   Controller: CarreersController,
//   routeLoader: carreersRoutes,

// }
// ]);

app.get("/version", (_req, res) => {
  res.send("0.1.0");
})
console.log(`Server is running on http://localhost:8000`);

