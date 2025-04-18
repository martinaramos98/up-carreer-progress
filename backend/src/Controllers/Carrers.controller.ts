import type { Request, Response } from "express";
import { type CarreerService } from "../Services/Carreers.service.ts";
export class CarreersController {
  private carrersService: CarreerService;
  constructor(carreerService: CarreerService) {
    this.carrersService = carreerService;
  }
  async getCarreers(_req: Request, res: Response) {
    try {
      const carrers = await this.carrersService.getCarreers();
      res.status(200).json(carrers);
    } catch (_error) {
      // FIXME: handle status error by type of error throwed by service
      res.status(404).json({ error: "Cannot get carreers" });
    }
  }
  async getCarreerData(req: Request, res: Response) {
    try {
      const carreerId = req.params.id;
      const carreer = await this.carrersService.getCarreerData(carreerId);
      res.status(200).json(carreer);
    } catch (error) {
      res.status(404).json({
        error: "Cannot get carreer data",
        errorData: error,
      });
    }
  }
  async getCarreerCourses(req: Request, res: Response) {
    try {
      const carreerId = req.params.id;
      const courses = await this.carrersService.getCarreerCourses(carreerId);
      res.status(200).json(courses);
    } catch (error) {
      res.status(500).json({message:"Error on get courses on db data",error})
    }
  }
  async addNewCarreer(req: Request, res: Response) {
    try {
      const carreerData = req.body;
      const result = await this.carrersService.addNewCarrer(carreerData);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(400).json({
        error: "Cannot add new carreer",
        description: error.message,
      });
    }
  }
  async deleteCarreer(req: Request, res: Response) {
    try {
      const carreerId = req.params.id;
      const idResult = await this.carrersService.deleteCarreer(carreerId);
      res.status(200).json(idResult);
    } catch (error) {
      res.status(404).json({
        error: "Cannot delete carreer",
        errorData: error,
      });
    }
  }
  async updateCarreer(req: Request, res: Response) {
    try {
      const carreerId = req.params.id;
      const carreerData = req.body;
      const result = await this.carrersService.updateCarreer(
        carreerId,
        carreerData,
      );
      res.status(200).json({ ...result });
    } catch (error) {
      res.status(404).json({
        error: "Cannot update carreer",
        errorData: error,
      });
    }
  }
}
