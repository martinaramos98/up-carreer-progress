import { Router } from "express";
import { CarreerService } from "../Services/Carreers.service.ts";
import { CoursesService } from "../Services/Courses.service.ts";
import { CarreersController } from "../Controllers/Carrers.controller.ts";
import { CoursesController } from "../Controllers/Courses.controller.ts";
import { DBClient } from "../db/dbController.ts";

export type ControllerForServiceMap = {
  CoursesService: CoursesController;
  CarreersService: CarreersController;
} 
export type ControllerForService<T> = T extends keyof ControllerForServiceMap ? ControllerForServiceMap[T] : never;


export type AppController = CarreersController | CoursesController;
export type AppService = CarreerService | CoursesService;
export type ServiceConstructor = new (client: DBClient) => AppService;
export type ControllerConstructor<T extends AppService> = new (service: T) => ControllerForService<T>;

export interface AppRoute<S extends AppService> {
  path: string;
  Service: ServiceConstructor;
  Controller: ControllerForService<S>;
  routeLoader: (controller: ControllerForService<S>) => Router;
}
