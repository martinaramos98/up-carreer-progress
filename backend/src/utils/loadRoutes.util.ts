import { Express } from "express";
import {loadDBClient} from '../db/dbController.ts';
import { AppRoute, AppService } from "../models/route.ts";
export async function loadRoutes<T extends AppService>(app:Express,routes:(AppRoute<T>[])):Promise<void>{
  const client = await loadDBClient();
  for (const route of routes) {
    const service = new route.Service(client);
    const controller = new route.Controller(service);
    const router = route.routeLoader(controller);
    app.use(route.path, router);
  }
}