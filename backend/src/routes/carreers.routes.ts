import express from 'express';
import { type CarreersController } from "../Controllers/Carrers.controller.ts";

const router = express.Router();
export function carreersRoutes(carreersController:CarreersController){
  router.get('/', carreersController.getCarreers.bind(carreersController));
  router.get('/:id', carreersController.getCarreerData.bind(carreersController));
  router.post('/', carreersController.addNewCarreer.bind(carreersController));
  return router;
}