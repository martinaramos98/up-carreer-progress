import * as Sentry from "npm:@sentry/deno";
import express from "npm:express";
import cors from "npm:cors";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
globalThis.require = require;
import { loadRoutes } from "./src/utils/loadRoutes.util.ts";
import { CoursesService } from "./src/Services/Courses.service.ts";
import { CoursesController } from "./src/Controllers/Courses.controller.ts";
import { coursesRoutes } from "./src/routes/courses.routes.ts";
import { CarreerService } from "./src/Services/Carreers.service.ts";
import { CarreersController } from "./src/Controllers/Carrers.controller.ts";
import { carreersRoutes } from "./src/routes/carreers.routes.ts";

console.log("[DEBUG] SENTRY_DSN", Deno.env.get("SENTRY_DSN"));
Sentry.init({
  dsn: Deno.env.get("https://docs.github.com/en/actions/writing-workflows/choosing-when-your-workflow-runs/using-conditions-to-control-job-execution"),
  tracesSampleRate: 1.0,
  tracePropagationTargets: ["https://up-carreer-progress-vtr7.onrender.com"],
  sendDefaultPii: true,
});
const app = express();
app.listen(8000);
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173'
  
}));

loadRoutes(app, [{
  path: "/courses",
  Service: CoursesService,
  Controller: CoursesController,
  routeLoader: coursesRoutes,
},
{
  path: "/grades",
  Service: CarreerService,
  Controller: CarreersController,
  routeLoader: carreersRoutes,

}
]);

app.get("/version", (_req, res) => {
  res.send("0.1.0");
})
if(Deno.env.get("TEST_MODE") === "true"){
  import ("./mocks/mock.ts").then(({setDBMockData}) => { 
    setDBMockData()
  })
}

app.get("/test_error", (_req, res) => {
  throw new Error("Test error for sentry");
})
console.log(`Server is running on http://localhost:8000`);
